import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter, userData } = state;
  
  return { visibilityFilter, userData };

};

function MoviesList(props) {
  const { movies, visibilityFilter} = props;
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
      <MovieCard setMovies={this.props?.setMovies} movie={m} favorites={props.user.FavoriteMovies}  /> 
     
    </Col>
  ))}
</>;
}

export default connect(mapStateToProps)(MoviesList);