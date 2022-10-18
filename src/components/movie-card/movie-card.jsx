import React from 'react';
import './movie-card.scss';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export class MovieCard extends React.Component {
  state = { favs: [] };

  getUserFavs() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .get(`https://fredsflix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          favs: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRemoveFavorite = (e, id) => {
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
        console.log(id);
        const favs = this.state.favs.filter((m) => m !== id);
        this.setState({ favs });
        console.log(this.state.favs);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  addFavorite = (e, id) => {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .post(
        `https://fredsflix.herokuapp.com/users/${Username}/movies/${id}`,
        { key: "value" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({ favs: [...this.state.favs, id] });
      })
      .catch(function (error) {});
  };

  isFav(favorites, movie) {
    if (this.state.favs.includes(movie._id)) {
      return (
        <button
          className="heart"
          value={movie._id}
          onClick={(e) => this.onRemoveFavorite(e, movie._id)}
        >
          <MdFavorite />
        </button>
      );
    } else {
      return (
        <button
          className="heart"
          value={movie._id}
          onClick={(e) => this.addFavorite(e, movie._id)}
        >
          <MdFavoriteBorder />
        </button>
      );
    }
  }

  componentDidMount() {
    this.getUserFavs();
  }

  render() {
    const { favorites, movie } = this.props;

    if (movie)
      return (
        <Card className="card">
          <Card.Img
            className="card_image"
            variant="top"
            src={movie.ImagePath}
          />
          <Card.Body>
            <Card.Title className="card_title">{movie.Title}</Card.Title>
            {/* <Card.Text className='movie_description'>{movie.Description}</Card.Text> */}

            <div className="footer">
              <Card.Text> {this.isFav(favorites, movie)} </Card.Text>
              <Link to={`/movies/${movie._id}`}>
                <Button variant="link">View Details</Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      );
    else return "Loading...";
  }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string
    }).isRequired
  };


  

  