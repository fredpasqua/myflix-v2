import React from 'react';
import propTypes from 'prop-types';
import './movie-view.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from 'axios';
import { FcFilmReel } from "react-icons/fc";

export class MovieView extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <Row>
          <Col>
            <h1 className="page_title">
              <FcFilmReel />
              {movie.Title}
              <FcFilmReel />
            </h1>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="movie-poster">
              <img src={movie.ImagePath} />
            </div>
          </Col>
          <Col Col md={6}>
            <div className="movie-info">
              <div className="movie-director">
                <span className="label">Director: </span>
                <span className="value">
                  <Link to={`/directors/${movie.Director.Name}`}>
                    {movie.Director.Name}
                  </Link>
                </span>
              </div>
              <div className="movie-genre">
                <span className="label">Genre: </span>
                <span className="value">
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    {movie.Genre.Name}
                  </Link>
                </span>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
          <Button
            variant="info"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Row>
      </div>
    );
  }
}



// MovieView.propTypes = {
//     ImagePath: propTypes.string.isRequired,
//     Title: propTypes.string.isRequired,
//     Description: propTypes.string.isRequired,
//     Genre: propTypes.string.isRequired,
//     Director: propTypes.string.isRequired
// }
