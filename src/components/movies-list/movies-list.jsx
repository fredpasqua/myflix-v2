import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

function MoviesList({ movies, visibilityFilter, user, setMovies }) {
 
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

  return <>
  <Col md={12} style={{ margin: '1em' }}>
    <VisibilityFilterInput visibilityFilter={visibilityFilter} />
  </Col>
  {filteredMovies.map(m => (
    <Col md={4} key={m._id}>
      <MovieCard setMovies={setMovies} movie={m} favorites={user.FavoriteMovies}  /> 
     
    </Col>
  ))}
</>;
}


const mapStateToProps = state => {
  const { visibilityFilter, userData } = state;
  
  return { visibilityFilter, userData };

};

export default connect(mapStateToProps)(MoviesList);