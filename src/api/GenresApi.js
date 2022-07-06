import ApiHelper from './ApiHelper'

function getGenres(railId) {
    return ApiHelper({
        url: '/genres',
        method: 'GET',
    })
}

const GenresApi = {
    getGenres,
}

export default GenresApi
