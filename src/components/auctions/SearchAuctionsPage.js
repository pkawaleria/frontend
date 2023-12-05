import React, {useEffect, useState} from 'react';
import SearchBar from '../searchBar/SearchBar';
import {searchAuctions, searchAuctionsWithFullQueryParams} from '../../services/auctionsService';
import GenericPageableAuctionsList from "./GenericPageableAuctionList";
import {useSearchParams} from 'react-router-dom';
import {Alert, Button, Typography} from '@mui/material';
import LoadingSpinner from "../spinner/LoadingSpinner";
import { useFontSize } from '../fontSize/FontSizeContext';

export default function SearchAuctionsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchedTermInAuctionName, setSearchedTermInAuctionName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProvinceName, setSelectedProvinceName] = useState(null);
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [selectedRadius, setSelectedRadius] = useState(0);
    const [selectedPriceTo, setSelectedPriceTo] = useState('');
    const [selectedPriceFrom, setSelectedPriceFrom] = useState('');
    const [selectedSortByField, setSelectedSortByField] = useState(null);
    const [selectedSortOrder, setSelectedSortOrder] = useState('ASC');
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [pagedAuctions, setPagedAuctions] = useState(null);

    const [isLoading, setIsLoading] = useState(true)
    const [currentlyAppliedFilters, setCurrentlyAppliedFilters] = useState({})

    const {isFontLarge} = useFontSize();


    useEffect(() => {
        const fetchDefaultAuctions = async () => {
            setIsLoading(true)
            const initialPagingAndFilters = updateStateAndGetApiQueryParamsFromUrl();
            try {
                const result = await searchAuctionsWithFullQueryParams(initialPagingAndFilters);
                setPagedAuctions(result);
                setCurrentlyAppliedFilters(initialPagingAndFilters)
            } catch (error) {
                console.error("Error searching auctions:", error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchDefaultAuctions();
    }, []);


    const mapToApiFilters = () => {
        return {
            searchPhrase: searchedTermInAuctionName,
            categoryId: selectedCategory?.value,
            province: selectedProvinceName?.value,
            cityId: selectedCityId?.value,
            radius: selectedRadius?.value,
            priceTo: selectedPriceTo,
            priceFrom: selectedPriceFrom,
            sortBy: selectedSortByField?.value,
            sortOrder: selectedSortOrder,
        };
    }

    // Fetch auctions with new filters criteria and move to first page
    const fetchAuctionsOnFiltersChange = async () => {
        setIsLoading(true);
        let firstPage = 0;
        setPageNumber(firstPage)
        const filters = mapToApiFilters();

        try {
            const result = await searchAuctions(firstPage, pageSize, filters);
            setPagedAuctions(result);
            setCurrentlyAppliedFilters(filters)
        } catch (error) {
            console.error("Error searching auctions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onSearchIconClick = async () => {
        fetchAuctionsOnFiltersChange().then(() => {
            saveCurrentFiltersAndPagingToUrl(0);
        })
    };


    // Fetch auctions keeping currently applied filters
    const fetchAuctionsOnPageChange = async pageNumber => {
        setIsLoading(true)
        setPageNumber(pageNumber);
        try {
            const result = await searchAuctions(pageNumber, pageSize, currentlyAppliedFilters);
            setPagedAuctions(result);
        } catch (error) {
            console.error("Error searching auctions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onPageChange = async pageNumber => {
        fetchAuctionsOnPageChange(pageNumber).then(() => saveCurrentFiltersAndPagingToUrl(pageNumber));
    }


    const clearFilters = async () => {
        setSearchedTermInAuctionName('');
        setSelectedCategory(null);
        setSelectedProvinceName(null);
        setSelectedCityId(null);
        setSelectedRadius(0);
        setSelectedPriceTo(null);
        setSelectedPriceFrom(null);
        setSelectedSortByField(null);
        setSelectedSortOrder('ASC');
        saveCurrentFiltersAndPagingToUrl();
        fetchAuctionsOnFiltersChange();
    };

    const updateStateAndGetApiQueryParamsFromUrl = () => {
        const updatedSearchedTermInAuctionName = searchParams.get('searchedTermInAuctionName') || '';
        const updatedSelectedCategory = searchParams.get('selectedCategory') ? JSON.parse(searchParams.get('selectedCategory')) : null;
        const updatedSelectedProvinceName = searchParams.get('selectedProvinceName') ? JSON.parse(searchParams.get('selectedProvinceName')) : null;
        const updatedSelectedCityId = searchParams.get('selectedCityId') ? JSON.parse(searchParams.get('selectedCityId')) : null;
        const updatedSelectedRadius = searchParams.get('selectedRadius') ? JSON.parse(searchParams.get('selectedRadius')) : 0;
        const updatedSelectedSortByField = searchParams.get('selectedSortByField') ? JSON.parse(searchParams.get('selectedSortByField')) : null;
        const updatedSelectedSortOrder = searchParams.get('selectedSortOrder') ? searchParams.get('selectedSortOrder') : 'ASC';
        const updatedPageNumber = searchParams.get('pageNumber') != null ? parseInt(searchParams.get('pageNumber')) : null;
        const updatedPageSize = searchParams.get('pageSize') != null ? parseInt(searchParams.get('pageSize')) : 20;
        const updatedPriceTo = searchParams.get('selectedPriceTo');
        const updatedPriceFrom = searchParams.get('selectedPriceFrom')

        setSearchedTermInAuctionName(updatedSearchedTermInAuctionName);
        setSelectedCategory(updatedSelectedCategory);
        setSelectedProvinceName(updatedSelectedProvinceName);
        setSelectedCityId(updatedSelectedCityId);
        setSelectedRadius(updatedSelectedRadius);
        setSelectedSortByField(updatedSelectedSortByField);
        setSelectedSortOrder(updatedSelectedSortOrder);
        setPageNumber(updatedPageNumber);
        setPageSize(updatedPageSize);
        setSelectedPriceFrom(updatedPriceFrom);
        setSelectedPriceTo(updatedPriceTo);

        return {
            searchPhrase: updatedSearchedTermInAuctionName,
            categoryId: updatedSelectedCategory?.value,
            province: updatedSelectedProvinceName?.value,
            cityId: updatedSelectedCityId?.value,
            radius: updatedSelectedRadius?.value,
            priceTo: updatedPriceTo,
            priceFrom: updatedPriceFrom,
            sortBy: updatedSelectedSortByField?.value,
            sortOrder: updatedSelectedSortOrder,
            pageNumber: updatedPageNumber,
            pageSize: updatedPageSize,
        };
    };


    const saveCurrentFiltersAndPagingToUrl = (pageNumber) => {
        const params = {
            searchedTermInAuctionName: searchedTermInAuctionName,
            selectedCategory: selectedCategory ? JSON.stringify(selectedCategory) : null,
            selectedProvinceName: selectedProvinceName ? JSON.stringify(selectedProvinceName) : null,
            selectedCityId: selectedCityId ? JSON.stringify(selectedCityId) : null,
            selectedRadius: selectedRadius ? JSON.stringify(selectedRadius) : null,
            selectedPriceTo: selectedPriceTo,
            selectedPriceFrom: selectedPriceFrom,
            selectedSortByField: selectedSortByField ? JSON.stringify(selectedSortByField) : null,
            selectedSortOrder: selectedSortOrder,
            pageNumber: pageNumber,
            pageSize: pageSize
        };
        const filteredParams = Object.fromEntries(
            Object.entries(params).filter(([key, value]) => value != null && value !== '')
        );
        setSearchParams(filteredParams);
    };

    return (
        <div>
            {isLoading ? (<LoadingSpinner/>) : (
                <div>
                    <SearchBar
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedProvinceName={selectedProvinceName}
                        setSelectedProvinceName={setSelectedProvinceName}
                        selectedCityId={selectedCityId}
                        setSelectedCityId={setSelectedCityId}
                        selectedRadius={selectedRadius}
                        setSelectedRadius={setSelectedRadius}
                        selectedSortByField={selectedSortByField}
                        setSelectedSortByField={setSelectedSortByField}
                        selectedSortOrder={selectedSortOrder}
                        setSelectedSortOrder={setSelectedSortOrder}
                        setSearchedTermInAuctionName={setSearchedTermInAuctionName}
                        searchedTermInAuctionName={searchedTermInAuctionName}
                        priceFrom={selectedPriceFrom}
                        setPriceFrom={setSelectedPriceFrom}
                        priceTo={selectedPriceTo}
                        setPriceTo={setSelectedPriceTo}
                        onSearch={onSearchIconClick}
                    />

                    {pagedAuctions && pagedAuctions.pageCount === 0 ? (
                        <div className="w-4/5 mx-auto text-center mt-3 min-h-screen">
                            <Alert severity="error" 
                                sx={{
                                    mb: 2,
                                    fontSize: isFontLarge ? "20px" : "16px"
                                }}>
                                Nie znaleziono aukcji, wprowadź inne kryteria wyszukiwania i ponów próbę.
                            </Alert>
                            <Button variant="outlined" onClick={clearFilters} 
                                sx={{
                                    mb: 2,
                                    fontSize: isFontLarge ? "20px" : "16px"
                                }}>
                                Wyczyść filtry
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    textAlign: "center",
                                    color: "white",
                                    marginBottom: "0px",
                                    marginTop: "10px",
                                    fontWeight: "bold",
                                    fontSize: isFontLarge ? "20px": "16px"
                                }}
                                gutterBottom>
                                Liczba wyników wyszukiwania: {pagedAuctions?.totalAuctionsCount}
                            </Typography>
                            <GenericPageableAuctionsList
                                pagedAuctions={pagedAuctions}
                                onPageChange={newPageNumber => onPageChange(newPageNumber)}/>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};