const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

const Endpoints = {
    Users: {
        Register: `${API_URL}/users/register`,
        Login: `${API_URL}/users/login`,
        Me: `${API_URL}/users/me`,
    },
    Books: {
        All: `${API_URL}/books`,
        Single: (bookId) => `${API_URL}/books/${bookId}`,
    },
    Reservations: {
        All: `${API_URL}/reservations/`,
        Delete: (reservationId) => `${API_URL}/reservations/${reservationId}`,
    }
}



export default Endpoints;