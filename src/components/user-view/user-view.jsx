import React from "react";

import { connect } from "react-redux";
import axios from "axios";
import { Button, Container, Row, Col, Card, CardGroup } from "react-bootstrap";
import "./user-view.scss";
import { UserUpdate } from "./update-user";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMoviesIDs: [],
      movies: [],
      hover: false,
    };
  }
  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getMovies(accessToken);
    this.getUser(accessToken);
  }
  componentDidUpdate() {}
  getMovies(token) {
    axios
      .get("https://fredsflix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getUser = (token) => {
    const username = localStorage.getItem("user");

    axios
      .get(`https://fredsflix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMoviesIDs: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  onRemoveFavorite = (e, id) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(
        `https://fredsflix.herokuapp.com/users/${Username}/movies/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleMouseIn() {
    this.setState({ hover: true });
  }

  handleMouseOut() {
    this.setState({ hover: false });
  }

  render() {
    const { movies, FavoriteMoviesIDs, Birthday } = this.state;
    const tooltipStyle = {
      display: this.state.hover ? "block" : "none",
      color: "red",
    };

    const { user } = this.props;
    if (!user || !movies) {
      return <p>No soup for you</p>;
    }

    return (
      <Container>
        <Row className="profile-view mt-7 mb-7" style={{ minWidth: "400px" }}>
          <Col>
            <CardGroup>
              <Card
                bg="light"
                key=""
                text="info"
                className="user-profile mb-2"
                border="info"
              >
                <Card.Header as="h2">My Profile Page</Card.Header>
                <div className="user-info">
                  <div className="user-name">
                    <span className="label">Name: </span>
                    <span className="value">{user?.Username}</span>
                  </div>
                  <div className="user-email">
                    <span className="label">Email: </span>
                    <span className="value">{user?.Email}</span>
                  </div>
                  <div className="user-birthday">
                    <span className="label">Birthday: </span>
                    <span className="value">
                      {" "}
                      {new Date(Birthday).toUTCString().slice(8, 11)}{" "}
                      {new Date(Birthday).toUTCString().slice(5, 7)}{" "}
                      {new Date(Birthday).toUTCString().slice(12, 16)}
                    </span>
                  </div>
                </div>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <CardGroup>
              <Card bg="light" key="" text="info" border="info">
                <Card.Header as="h2">My Favorite Movies</Card.Header>
                <Col>
                  <Card className="card-body">
                    <Card.Body>
                      {FavoriteMoviesIDs?.length === 0 && (
                        <div className="text-center">No favorite movies</div>
                      )}
                      <Row className="favorite-movies-container">
                        {FavoriteMoviesIDs?.length > 0 &&
                          movies?.map((movie) => {
                            if (
                              movie._id ===
                              FavoriteMoviesIDs?.find(
                                (fav) => fav === movie._id
                              )
                            ) {
                              return (
                                <Col md={4}>
                                  <Card
                                    className="favorite-movie"
                                    key={movie._id}
                                    onMouseOver={this.handleMouseIn.bind(this)}
                                    onMouseOut={this.handleMouseOut.bind(this)}
                                  >
                                    <Button
                                      variant="light"
                                      value={movie?._id}
                                      onClick={(e) =>
                                        this.onRemoveFavorite(e, movie._id)
                                      }
                                    >
                                      {" "}
                                      <Card.Img
                                        className="favorite-movie-image"
                                        variant="top"
                                        src={movie?.ImagePath}
                                      />{" "}
                                      <div style={tooltipStyle}>
                                        Click to Delete
                                      </div>
                                    </Button>{" "}
                                  </Card>
                                </Col>
                              );
                            }
                          })}
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        <UserUpdate user={this.state} />
      </Container>
    );
  }
}
let mapStateToProps = (state) => {
  return { movies: state.movies, UserData: state.UserData, user: state.user };
};
export default connect(mapStateToProps, null)(ProfileView);
