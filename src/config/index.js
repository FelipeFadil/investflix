const URL_BACKEND = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080'
    : 'https://investflix-felipefadil.herokuapp.com';

    export default {
        URL_BACKEND,
    };