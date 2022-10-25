import React from "react";
import "./director-view.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { CardGroup, Card } from "react-bootstrap";
import { GiDirectorChair } from "react-icons/gi";
import { Link } from "react-router-dom";
export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick, movies } = this.props;
    console.log({ movies });

    if (movies)
      return (
        <>
          <Row>
            <Col>
              <h1 className="page_title">
                <GiDirectorChair />
                {director.Name}
                <GiDirectorChair />
              </h1>
            </Col>
          </Row>

          <Row>
            <Col>
              {" "}
              <p className="birth">Born in {director.Birth}</p>
              <p className="title">{director.Bio}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="directedBy">Films Directed By: {director.Name}</h4>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <CardGroup className="favPoster">
                {movies.map((movie) => (
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">
                      <Card.Img
                        className="fav-poster"
                        variant="top"
                        src={movie.ImagePath}
                      ></Card.Img>
                    </Button>
                  </Link>
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
