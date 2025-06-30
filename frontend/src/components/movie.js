import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import {
  Card,
  Container,
  Image,
  Col,
  Row,
  Button,
  Media,
} from "react-bootstrap";
import moment from "moment";
import "./rap.css";

const Movie = (props) => {
  //default state
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });

  //getting a specific movie's information
  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //renders specific movie info once- onfirst render
  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => {
    //identify review by review and user ids
    MovieDataService.deleteReview(reviewId, props.user.id)
      .then((response) => {
        setMovie((prevState) => {
          //put index into splice method to remove that review from list/database
          prevState.reviews.splice(index, 1);
          return {
            ...prevState,
          };
        });
      })
      .catch((e) => {
        //print error message
        console.log(e);
      });
  };

  return (
    <div>
      {/* card to display a specific movie's information */}
      <Container>
        <Row>
          <Col>
            <Image src={movie.poster + "/100px250"} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>
                {props.user && (
                  <Link to={"/movies/" + props.match.params.id + "/review"}>
                   <Button>Add Review</Button> 
                  </Link>
                )}
              </Card.Body>
            </Card>
            <br></br>

            <h2>Reviews</h2>
            <br></br>

            {/* mapping reviews for movie*/}
            <div className="container mt-5 p-4 bg-light rounded shadow">
              {movie.reviews.map((review, index) => {
                return (
                  <Media key={index} className="mb-4 border-bottom pb-3">
                    <Media.Body>
                      {/* username and date posted. date is formatted */}
                      <h5 className="text-primary">
                        {review.name + " reviewed on "}
                        {moment(review.date).format("Do MMMM YYYY")}
                      </h5>
                      <p>{review.review}</p>
                      {props.user && props.user.id === review.user_id && (
                        <Row>
                          <Col>
                            <Link to={{
                                pathname:
                                  "/movies/" +
                                  props.match.params.id +
                                  "/review",
                                state: { currentReview: review },
                              }}>
                              <Button
                                 
                              >
                                Edit
                              </Button>
                            
                             
                            </Link>
                          </Col>
                          <Col>
                            <Button
                              variant="primary"
                              onClick={() => deleteReview(review._id, index)}
                            >
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </Media.Body>
                  </Media>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
