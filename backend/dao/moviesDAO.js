import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let movies;

export default class MoviesDAO {
  static async injectDB(conn) {
    if (movies) {
      return;
    }
    try {
      movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection("movies");
    } catch (e) {
      console.error(`unable to connect in MoviesDAO: ${e}`);
    }
  }

  static async getMovieById(id) {
    try {
      return await movies
        .aggregate([
          {
            $match: {
              _id: new ObjectId(id),
            },
          },
          {
            $lookup: {
              from: "reviews",
              localField: "_id",
              foreignField: "movie_id",
              as: "reviews",
            },
          },
        ])
        .next();
    } catch (e) {
      console.error(`something went wrong in getMovieById: ${e}`);
      throw e;
    }
  }

  static async getMovies({
    filters = null,
    page = 0,
    moviesPerPage = 20,
    sort = null,
  } = {}) {
    let query = {};
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters["title"] } };
      } else if ("rated" in filters) {
        query = { rated: filters["rated"] };
      }
    }

    try {
      let cursor = movies.find(query);

      if (sort) {
        cursor = cursor.sort(sort);
      }

      cursor = cursor.limit(moviesPerPage).skip(moviesPerPage * page);

      const moviesList = await cursor.toArray();
      const totalNumMovies = await movies.countDocuments(query);

      return { moviesList, totalNumMovies };
    } catch (e) {
      console.error(`Unable to issue find command: ${e}`);
      return { moviesList: [], totalNumMovies: 0 };
    }
  }

  static async getRatings() {
    try {
      return await movies.distinct("rated");
    } catch (e) {
      console.error(`unable to get ratings: ${e}`);
      return [];
    }
  }

  // New method to add a movie
  static async addMovie(movieData) {
    try {
      const result = await movies.insertOne(movieData);
      return result.insertedId;
    } catch (e) {
      console.error(`Unable to add movie: ${e}`);
      return { error: e };
    }
  }

  // New method to update a movie by ID
  static async updateMovie(id, updateData) {
    try {
      const result = await movies.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      return result.modifiedCount;
    } catch (e) {
      console.error(`Unable to update movie: ${e}`);
      return { error: e };
    }
  }

  // New method to delete a movie by ID
  static async deleteMovie(id) {
    try {
      const result = await movies.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount;
    } catch (e) {
      console.error(`Unable to delete movie: ${e}`);
      return { error: e };
    }
  }

  // Optional utility method to get total count of movies
  static async getTotalMoviesCount() {
    try {
      return await movies.countDocuments();
    } catch (e) {
      console.error(`Unable to count movies: ${e}`);
      return 0;
    }
  }
}
