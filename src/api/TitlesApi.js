import ApiHelper from "./ApiHelper";

function searchTitles() {
    return ApiHelper({
        url: `/videos/`,
        method: "GET",
    });
}

function getSpecificTitle(titleUuid) {
    return ApiHelper({
        url: `/videos/${titleUuid}/`,
        method: "GET",
    });
}

function searchSeries() {
    return ApiHelper({
        url: `/series/published/`,
        method: "GET",
    });
}

function getSpecificSeries(seriesGuid) {
    return ApiHelper({
        url: `/series/search/${seriesGuid}/`,
        method: "GET",
    });
}

const TitlesApi = {
    searchTitles,
    getSpecificTitle,
    searchSeries,
    getSpecificSeries,
};

export default TitlesApi;
