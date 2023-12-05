import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, Alert, Box, IconButton, Modal, Backdrop, Fade } from '@mui/material';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';
import { format } from 'date-fns';
import auctionMsApi from '../../services/auctionMsApi';
import "../../assets/styles/index.css";
import "../../assets/styles/auctionsList/styles.css";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useFontSize } from '../fontSize/FontSizeContext';

const CurrentUserMostViewedAuctions = () => {
    const [auctions, setAuctions] = useState([]);
    const [isExpanded, setIsExpanded] = useState(true);
    const [selectedAuctionDates, setSelectedAuctionDates] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const { isFontLarge } = useFontSize();

    useEffect(() => {
        auctionMsApi
            .get('/auction-service/viewed-auctions/latest-views')
            .then((response) => {
                setAuctions(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const toggleCollapse = () => {
        setIsExpanded(!isExpanded);
    };

    const openModal = (dates) => {
        setSelectedAuctionDates(dates);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const navigateToAuction = (auctionId) => {
        navigate(`/ogloszenie/${auctionId}`);
    };

    const formatPrice = (price) => {
        const parts = price.toFixed(2).toString().split('.');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const decimalPart = parts[1] === '00' ? '' : `.${parts[1]}`;
        const formattedPrice = `${integerPart}${decimalPart} zł`;

        return formattedPrice;
    };

    if (isLoading) {
        return (
            <LoadingSpinner />
        );
    } else if (auctions.length === 0) {
        return false;
    }

    return (
        <div className="w-8/12 mx-auto mt-10 content-center min-h-screen">
            <div className="mb-4 header shadow-lg dark:bg-neutral-700" onClick={toggleCollapse}>
                <p className={`${isFontLarge ? "text-5xl" : "text-3xl"} ease-linear duration-100 text-white font-semibold`}>
                    Ostatnio wyświetlane aukcje
                </p>
                {isExpanded
                    ? <IoIosArrowUp className={`${isFontLarge ? "text-4xl" : "text-2xl"} hover:cursor-pointer hover:text-gray-400 ease-linear duration-100 text-white`} />
                    : <IoIosArrowDown className={`${isFontLarge ? "text-4xl" : "text-2xl"} hover:cursor-pointer hover:text-gray-400 ease-linear duration-100 text-white`} />}
            </div>

            {isExpanded && (
                <Grid
                    container
                    spacing={3}
                    justifyContent="center"
                    alignItems="center">
                    {auctions.map((auction) => (
                        <Grid item key={auction.auctionDetails.id} xs={12} sm={6} md={4} lg={4}>
                            <Box p={2}>
                                <Card className="transition-transform transform-gpu hover:scale-105" style={{ borderRadius: '20px' }}>
                                    <CardMedia
                                        component="img"
                                        alt="Auction Thumbnail"
                                        className="object-fill h-48 w-full cursor-pointer transition-all duration-300 hover:brightness-70"
                                        height="300"
                                        width="300"
                                        image={`data:image/jpeg;base64,${auction.auctionDetails.thumbnail}`}
                                        onClick={() => navigateToAuction(auction.auctionDetails.id)} />
                                    <CardContent className='dark:bg-neutral-600 dark:text-neutral-100'>
                                        <Typography
                                            style={{
                                                fontFamily: 'Cairo, sans-serif',
                                                fontSize: isFontLarge ? "30px" : "20px"
                                            }}>
                                            {auction.auctionDetails.name}
                                        </Typography>
                                        <Typography 
                                            style={{ 
                                                fontFamily: 'Cairo, sans-serif',
                                                fontSize: isFontLarge ? "20px" : "15px" 
                                            }}>
                                            Cena: {formatPrice(auction.auctionDetails.price)}
                                        </Typography>
                                        <Typography 
                                            style={{ 
                                                fontFamily: 'Cairo, sans-serif',
                                                fontSize: isFontLarge ? "20px" : "15px" 
                                            }}>
                                            <div className="flex items-center mb-2">
                                                <MdLocationOn />
                                                <Typography 
                                                    style={{ 
                                                        fontFamily: 'Cairo, sans-serif',
                                                        fontSize: isFontLarge ? "20px" : "15px" 
                                                    }}
                                                    className="ml-2">
                                                    {auction.auctionDetails.cityName}, {auction.auctionDetails.province}
                                                </Typography>
                                            </div>
                                        </Typography>
                                        <Typography variant="body2">
                                            <Alert
                                                style={{ 
                                                    fontFamily: 'Cairo, sans-serif',
                                                    fontSize: isFontLarge ? "18px" : "15px" 
                                                }}
                                                severity="info" 
                                                className={`dark:bg-neutral-700 dark:text-neutral-100`} 
                                                onClick={() => openModal(auction.viewsDetails.viewsTimestamps)}>
                                                Tę aukcję wyświetliłaś/eś{' '}
                                                <b>{auction.viewsDetails.viewCounter}</b> razy w ciągu ostatnich
                                                14 dni.
                                            </Alert>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Modal */}
            <Modal
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isModalOpen}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            borderRadius: '12px',
                            p: 4,
                        }}
                    >
                        <Typography variant="h6" id="modal-title">
                            Tę aukcję wyświetlałeś w dniach:
                        </Typography>
                        <ul>
                            {selectedAuctionDates.map((date, index) => (
                                <li key={index}>{format(new Date(date), 'dd.MM.yyyy HH:mm')}</li>
                            ))}
                        </ul>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default CurrentUserMostViewedAuctions;
