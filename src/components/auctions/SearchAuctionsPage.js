 import React, {useEffect, useState} from 'react';
import SearchBar from '../searchBar/SearchBar';
import {searchAuctions} from '../../services/auctionsService';
import GenericPageableAuctionsList from "./GenericPageableAuctionList";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {useSearchParams} from 'react-router-dom';
import {Alert, Button, Typography} from '@mui/material';


export default function SearchAuctionsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchedTermInAuctionName, setSearchedTermInAuctionName] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProvinceName, setSelectedProvinceName] = useState(null);
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [selectedRadius, setSelectedRadius] = useState(0);
    const [selectedSortByField, setSelectedSortByField] = useState(null);
    const [selectedSortOrder, setSelectedSortOrder] = useState('ASC');
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [pagedAuctions, setPagedAuctions] = useState(null);

    const [isLoading, setIsLoading] = useState(true)
    const [currentlyAppliedFilters, setCurrentlyAppliedFilters] = useState({})

    useEffect(() => {
        const fetchDefaultAuctions = async () => {
            setIsLoading(true)
            // updateStateFromURL()
            try {
                const initialFilters = {};
                const result = await searchAuctions(pageNumber, pageSize, initialFilters);
                setPagedAuctions(result);
                setCurrentlyAppliedFilters(initialFilters)
            } catch (error) {
                console.error("Error searching auctions:", error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchDefaultAuctions();
    }, [
        // searchParams
    ]);


    function mapToFilters() {
        return {
            searchPhrase: searchedTermInAuctionName,
            categoryId: selectedCategory?.value,
            province: selectedProvinceName?.value,
            cityId: selectedCityId?.value,
            radius: selectedRadius?.value,
            sortBy: selectedSortByField?.value,
            sortOrder: selectedSortOrder,
        };
    }

    // Fetch auctions with new filters criteria and move to first page
    const fetchAuctionsOnFiltersChange = async () => {
        setIsLoading(true);
        setPageNumber(0)
        const filters = mapToFilters();

        try {
            const result = await searchAuctions(pageNumber, pageSize, filters);
            setPagedAuctions(result);
            setCurrentlyAppliedFilters(filters)
            saveCurrentStateToURL()
        } catch (error) {
            console.error("Error searching auctions:", error);
        } finally {
            setIsLoading(false);
        }
    };


    // Fetch auctions keeping currently applied filters
    const fetchAuctionsOnPageChange = async pageNumber => {
        setIsLoading(true)
        setPageNumber(pageNumber);
        try {
            const result = await searchAuctions(pageNumber, pageSize, currentlyAppliedFilters);
            setPagedAuctions(result);
            saveCurrentStateToURL()
        } catch (error) {
            console.error("Error searching auctions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const clearFilters = () => {
        // Reset filter states and trigger a new search
        setSearchedTermInAuctionName(null);
        setSelectedCategory(null);
        setSelectedProvinceName(null);
        setSelectedCityId(null);
        setSelectedRadius(null);
        setSelectedSortByField(null);
        setSelectedSortOrder('ASC');
        fetchAuctionsOnFiltersChange();
    };

    const updateStateFromURL = () => {
        const updatedSearchedTermInAuctionName = searchParams.get('searchedTermInAuctionName') || '';
        const updatedSelectedCategory = searchParams.get('selectedCategory') ? JSON.parse(searchParams.get('selectedCategory')) : null;
        const updatedSelectedProvinceName = searchParams.get('selectedProvinceName') ? JSON.parse(searchParams.get('selectedProvinceName')) : null;
        const updatedSelectedCityId = searchParams.get('selectedCityId') ? JSON.parse(searchParams.get('selectedCityId')) : null;
        const updatedSelectedRadius = searchParams.get('selectedRadius') ? JSON.parse(searchParams.get('selectedRadius')) : null;
        const updatedSelectedSortByField = searchParams.get('selectedSortByField') ? JSON.parse(searchParams.get('selectedSortByField')) : null;
        const updatedSelectedSortOrder = searchParams.get('selectedSortOrder') ? JSON.parse(searchParams.get('selectedSortOrder')) : null;
        const updatedPageNumber = parseInt(searchParams.get('pageNumber'));
        const updatedPageSize = parseInt(searchParams.get('pageSize'));

        setSearchedTermInAuctionName(updatedSearchedTermInAuctionName);
        setSelectedCategory(updatedSelectedCategory);
        setSelectedProvinceName(updatedSelectedProvinceName);
        setSelectedCityId(updatedSelectedCityId);
        setSelectedRadius(updatedSelectedRadius);
        setSelectedSortByField(updatedSelectedSortByField);
        setSelectedSortOrder(updatedSelectedSortOrder);
        setPageNumber(updatedPageNumber);
        setPageSize(updatedPageSize);
    };

    const saveCurrentStateToURL = () => {
        const params = {
            searchedTermInAuctionName: searchedTermInAuctionName,
            selectedCategory: selectedCategory ? JSON.stringify(selectedCategory) : null,
            selectedProvinceName: selectedProvinceName ? JSON.stringify(selectedProvinceName) : null,
            selectedCityId: selectedCityId ? JSON.stringify(selectedCityId) : null,
            selectedRadius: selectedRadius ? JSON.stringify(selectedRadius) : null,
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
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <AiOutlineLoading3Quarters className="animate-spin text-3xl text-white"/>
                </div>
            ) : (
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
                        onSearch={fetchAuctionsOnFiltersChange}
                    />

                    {pagedAuctions && pagedAuctions.pageCount === 0 ? (
                        <div className="w-4/5 mx-auto text-center">
                            <Alert severity="error" sx={{mb: 2}}>
                                Nie znaleziono aukcji, wprowadź inne kryteria wyszukiwania i ponów próbę.
                            </Alert>
                            <Button variant="outlined" onClick={clearFilters} sx={{mb: 2}}>
                                Wyczyść filtry
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <div className="w-4/5 mx-auto text-center">
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    sx={{textAlign: 'center', color: 'white'}}>
                                    Liczba wyników wyszukiwania: {pagedAuctions?.totalAuctionsCount}
                                </Typography>
                            </div>
                            <GenericPageableAuctionsList
                                pagedAuctions={pagedAuctions}
                                onPageChange={newPageNumber => fetchAuctionsOnPageChange(newPageNumber)}
                            />
                        </div>

                    )}
                </div>
            )}
        </div>
    );
}