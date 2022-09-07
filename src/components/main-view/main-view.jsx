import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { NavBar } from '../nav-bar/nav-bar';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../user-view/user-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss'
import { setMovies, setUserData, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

 class MainView extends React.Component {

  getMovies(token) {
    axios.get('https://fredsflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => { 
     this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  getUser(token) {
    const username = localStorage.getItem("user");
    
    axios
      .get(`https://fredsflix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onLoggedIn(authData) {
    this.props.setUser(
      authData.user.Username
      );
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username); 
    this.componentDidMount();
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
    
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }
  
     
  render() {
    
    let { movies, user } = this.props;
    
    return (   
      <Router>
       <NavBar user={user}  />
        <Row className="main-view justify-content-md-center">
           
         <Route exact path="/" render={() => {
   /* If there is no user, the LoginView is rendered.*/
    if (!user) return (   
      <Col md={6}>
        <LoginView user={user} onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    ) 
    if (movies.length > 0)
           return <MoviesList movies={movies} user={user}/>
           }}
          />
        
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col lg={8} md={8}>
              <RegistrationView />
            </Col>
          }} />
          
          <Route exact path="/movies/:movieId" render={({ match, history }) => {
             if (!user) return (   
              <Col md={6}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
             )
              if (movies.length > 0) { 
                return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>

              } else {
                <div>Loading...</div>
              }
              
          }} />
          <Route exact path="/directors/:name" render={({ match, history }) => {
              if (!user) return (   
                <Col md={6}>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
               )
               if (movies.length > 0) {
                  return <Col md={8}>
                            <DirectorView movies={movies.filter(m => m.Director.Name === match.params.name)} director={movies.find(m => m.Director.Name === match.params.name).Director}
                            onBackClick={() => history.goBack()} />
                         </Col>
                  } else {
                    <div>Loading...</div>
                  }
            }} />

        <Route exact path="/genres/:name" render={({ match, history }) => {
               if (!user) return (   
                <Col md={6}>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
               )
               if (movies.length > 0) {
                  return <Col md={8}>
                        <GenreView movies={movies.filter(m => m.Genre.Name === match.params.name)} genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                        onBackClick={() => history.goBack()} />
                        </Col>
          }}
          } />

        <Route path={`/users/:user`} render={({ match, history }) => {
        return <Col>
            <ProfileView  movies={movies} user={user} onBackClick={() => history.goBack()}/>
        </Col>

        }} />

         </Row>
       
      </Router>
     

    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, UserData: state.UserData, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUserData, setUser })(MainView);