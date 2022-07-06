import { useState, useEffect } from "react";
import Fuse from "fuse.js";

import TitlesApi from "api/TitlesApi";
import { has_intersection } from "shared/utils/jsFunctions";

// https://fusejs.io/api/options.html
const searchMoviesOptions = {
    includeScore: true,
    shouldSort: true,
    threshold: 0.7,
    keys: ["titleName", "shortDescription", "longDescription"],
};

const searchSeriesOptions = {
    ...searchMoviesOptions,
    keys: ["name", "description"],
};

/**
 * `series` parameter can accept ["all", "movies", "series"]
 */
export default function useTitlesSearch(query, genres, content = "all") {
    // Fuse search object, will be instantiated with data
    const [moviesSearch, setMoviesSearch] = useState(null);
    const [seriesSearch, setSeriesSearch] = useState(null);

    const [filteredTitles, setFilteredTitles] = useState([]);
    const [moviesData, setMoviesData] = useState(null);
    const [seriesData, setSeriesData] = useState(null);

    useEffect(() => {
        async function fetchTitles() {
            try {
                const [isSeriesActive, isMoviesActive] = getWhatActive(content);

                const { data: moviesData } = await TitlesApi.searchTitles();
                const { data: seriesData } = await TitlesApi.searchSeries();

                if (isMoviesActive) {
                    setMoviesSearch(new Fuse(moviesData, searchMoviesOptions));
                    setMoviesData(moviesData);
                }

                if (isSeriesActive) {
                    setSeriesSearch(new Fuse(seriesData, searchSeriesOptions));
                    setSeriesData(seriesData);
                }
            } catch (err) {
                console.error(err);
            }
        }

        fetchTitles();
    }, [content]);

    useEffect(() => {
        const hasGenres = typeof genres === "string";
        const genresArray = hasGenres && !!genres ? genres.split(",") : [];

        let newFilteredTitles = [];

        // Movies
        if (query && query.length > 0) {
            newFilteredTitles = searchAndFilterTitlesList(
                query,
                moviesSearch,
                seriesSearch,
                genresArray,
                hasGenres,
                content
            );
        } else {
            // Filter titles by genres (if any)
            newFilteredTitles = filterTitlesList(
                moviesData,
                seriesData,
                genresArray,
                hasGenres,
                content
            );
        }

        setFilteredTitles(newFilteredTitles);
    }, [
        moviesData,
        seriesData,
        query,
        genres,
        content,
        moviesSearch,
        seriesSearch,
    ]);

    return filteredTitles;
}

function searchAndFilterTitlesList(
    query,
    moviesSearch,
    seriesSearch,
    genresArray,
    hasGenres,
    content
) {
    const [isSeriesActive, isMoviesActive] = getWhatActive(content);
    const newFilteredTitles = [];

    if (isMoviesActive) {
        moviesSearch.search(query).forEach((title) => {
            if (
                !hasGenres ||
                genresArray.length === 0 ||
                has_intersection(genresArray, title.item.genre)
            ) {
                newFilteredTitles.push(title);
            }
        });
    }

    if (isSeriesActive) {
        seriesSearch.search(query).forEach((title) => {
            if (
                !hasGenres ||
                genresArray.length === 0 ||
                has_intersection(genresArray, title.item.genre)
            ) {
                newFilteredTitles.push(title);
            }
        });
    }

    // Sort titles by search score and extract the item
    return newFilteredTitles
        .sort((a, b) => a.score > b.score)
        .map((v) => v.item);
}

function filterTitlesList(moviesData, seriesData, genresArray, hasGenres) {
    let filteredTitles = [];

    if (moviesData) {
        filteredTitles.push(
            ...moviesData.filter((title) => {
                return (
                    !hasGenres ||
                    genresArray.length === 0 ||
                    (title.genre && has_intersection(genresArray, title.genre))
                );
            })
        );
    }

    if (seriesData) {
        filteredTitles.push(
            ...seriesData.filter((title) => {
                return (
                    !hasGenres ||
                    genresArray.length === 0 ||
                    (title.genre && has_intersection(genresArray, title.genre))
                );
            })
        );
    }

    return filteredTitles;
}

function getWhatActive(content) {
    let isSeriesActive = false;
    let isMoviesActive = false;

    if (content === "all") {
        isSeriesActive = true;
        isMoviesActive = true;
    } else if (content === "series") {
        isSeriesActive = true;
    } else if (content === "movies") {
        isMoviesActive = true;
    }

    return [isSeriesActive, isMoviesActive];
}
