import React, { createContext, useContext, useEffect, useState } from 'react';

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState(() => {
        try {
            const saved = localStorage.getItem('watchlist');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Failed to load watchlist from localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (movie) => {
        setWatchlist((prev) => {
            if (prev.some(item => item.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };

    const removeFromWatchlist = (movieId) => {
        setWatchlist((prev) => prev.filter(item => item.id !== movieId));
    };

    const isInWatchlist = (movieId) => {
        return watchlist.some(item => item.id === movieId);
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};
