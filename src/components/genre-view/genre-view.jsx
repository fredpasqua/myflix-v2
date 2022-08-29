import React from 'react';

import './genre-view.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import icon from './masks.png'
import { CardGroup, Card} from 'react-bootstrap';

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick, movies } = this.props;
    
    return (
       
    <>
            <Row className="justify-content-center">
                 <Col> <div><img className='image' src={icon} alt='icon' /></div></Col> 
                 <Col>  <h2>{genre.Name}</h2>
                 <p>{genre.Description}</p>
                 </Col>
                 </Row>   
                
               
 

    <Row> 
        <Col><p className='page_title2'>{genre.Name} Movies</p></Col>
    </Row>
    <Row>
         <Col md={12}>
                <CardGroup className="genreMovies">
                    {movies.map(movie => (
                     
                            <Card.Img 
                                className="fav-poster"
                                variant="top"
                                src={movie.ImagePath} />
                       
                            ))}
                </CardGroup>
            </Col>
    </Row>

    
    <Row className="button">
    <Button  variant="info" onClick={() => { onBackClick(); }}>Back</Button>
    </Row>         
    </>
        )
    }
    
}