import axios from "axios";

class MovieDataService {
    getAll(page = 0) {
        return axios.get(`https://mern-stact.onrender.com/api/v1/movies?page=${page}`)
    }
    get(id) {
        return axios.get(`https://mern-stact.onrender.com/api/v1/movies/id/${id}`)
    }
    find(title) {
        return axios.get(
            `https://mern-stact.onrender.com/api/v1/movies?title=${title}`
        )
    }
    find(query, by = "title", page = 0, rating) {
        return axios.get(
            `https://mern-stact.onrender.com/api/v1/movies?${by}=${query}&page=${page}&rating=${rating}`
        )
    }
    createReview(data) {
        return axios.post("https://mern-stact.onrender.com/api/v1/movies/review", data)
    }
    updateReview(data) {
        return axios.put("https://mern-stact.onrender.com/api/v1/movies/review", data)
    }
    deleteReview(id, userId) {
        return axios.delete(
            "https://mern-stact.onrender.com/api/v1/movies/review",
            { data: { review_id: id, user_id: userId } }
        )
    }
    getRatings() {
        return axios.get("https://mern-stact.onrender.com/api/v1/movies/ratings")
    }
}

const movieDataService = new MovieDataService();

export default movieDataService;
