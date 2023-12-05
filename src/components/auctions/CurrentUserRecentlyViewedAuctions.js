import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, Alert, Box, IconButton, Modal, Backdrop, Fade } from '@mui/material';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';
import { format } from 'date-fns';
import auctionMsApi from '../../services/auctionMsApi';
import "../../assets/styles/index.css";
import "../../assets/styles/auctionsList/styles.css";
import LoadingSpinner from "../spinner/LoadingSpinner";
import {useNavigate} from "react-router-dom";

const CurrentUserMostViewedAuctions = () => {
    const [auctions, setAuctions] = useState([]);
    const [isExpanded, setIsExpanded] = useState(true);
    const [selectedAuctionDates, setSelectedAuctionDates] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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

    if (isLoading) {
        return (
            <LoadingSpinner />
        );
    } else if (auctions.length === 0) {
        return false;
    }

    return (
        <div className="w-8/12 mx-auto mt-10 content-center">
            <div className="mb-4 header shadow-lg" onClick={toggleCollapse}>
                <h4 className="text-white text-3xl font-semibold">
                    Ostatnio wyświetlane aukcje
                </h4>
                {isExpanded ? <IoIosArrowUp className="text-white" /> : <IoIosArrowDown className="text-white" />}
            </div>

            {isExpanded && (
                <Grid
                    container
                    spacing={3}
                    justifyContent="center"
                    alignItems="center"
                >
                    {auctions.map((auction) => (
                        <Grid item key={auction.auctionDetails.id} xs={12} sm={6} md={4} lg={4}>
                            <Box p={2}>
                                <Card style={{ borderRadius: '20px' }}>
                                    <CardMedia
                                        component="img"
                                        alt="Auction Thumbnail"
                                        className="object-fill h-48 w-full cursor-pointer"
                                        height="300"
                                        width="300"
                                        image={`data:image/jpeg;base64,${auction.auctionDetails.thumbnail}`}
                                        onClick={() => navigateToAuction(auction.auctionDetails.id)}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" style={{ fontFamily: 'Cairo, sans-serif' }}>
                                            {auction.auctionDetails.name}
                                        </Typography>
                                        <Typography variant="subtitle1" style={{ fontFamily: 'Cairo, sans-serif' }}>
                                            Cena: {Number(auction.auctionDetails.price).toLocaleString('pl-PL', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })} PLN
                                        </Typography>
                                        <Typography variant="subtitle1" style={{ fontFamily: 'Cairo, sans-serif' }}>
                                            <div className="flex items-center mb-2">
                                                <MdLocationOn/>
                                                <Typography variant="subtitle1" className="ml-2">
                                                    {auction.auctionDetails.cityName}, {auction.auctionDetails.province}
                                                </Typography>
                                            </div>
                                        </Typography>
                                        <Typography variant="body2">
                                            <Alert severity="info" onClick={() => openModal(auction.viewsDetails.viewsTimestamps)}>
                                                Tę aukcję wyświetliłeś{' '}
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
