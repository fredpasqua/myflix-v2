import React from "react";
import "./director-view.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { CardGroup, Card } from "react-bootstrap";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick, movies } = this.props;
    console.log({ movies });

    if (movies)
      return (
        <>
          <Row>
            <Col>
              <h1 className="page_title">Director Info</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              {" "}
              <h2>{director.Name}</h2>
              <p>Born in {director.Birth}</p>
              <p className="title">{director.Bio}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="page_title2">Movies by {director.Name}</h2>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <CardGroup className="dirMovies">
                {movies.map((movie) => (
                  <Card.Img
                    className="fav-poster"
                    variant="top"
                    src={movie.ImagePath}
                  />
                ))}
              </CardGroup>
            </Col>
          </Row>
          <Row className="button">
            <Button
              variant="info"
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
          </Row>
        </>
      );
  }
}
