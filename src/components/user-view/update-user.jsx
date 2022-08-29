import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import {Row, Col, Button, Container, Form, Card, CardGroup} from 'react-bootstrap';
import axios from 'axios';
import Link from 'react-router-dom';
import './update-user.scss';

export function UserUpdate({user}) {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
    const [ password, setPassword ] = useState('');
    //Declare hook for each input
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ emailErr, setEmailErr ] = useState('');
   
    useEffect(() => {
      if (user) {
       setUsername(user.Username)
       setEmail(user.Email)
       setBirthday(user.Birthday)
      }
    }, [user]);
  

    const validate = () => {
      let isReq = true;
        if(!username){
          setUsernameErr('Username Required');
          isReq = false;
        } else if(username.length < 5) {
          setUsernameErr('Username must be 5 characters long.'); 
          isReq = false;
        }
        if(!email) {
          setEmailErr('Email is required');
          isReq = false;
        } else if(email.indexOf('@') === -1) {
          setEmailErr('Please enter a valid email');
          isReq = false;
        }
        return isReq; 
  };  


    const handleSubmit = (e) => {
    e.preventDefault(); 
    let isReq;
    isReq = validate();
    const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
     
      if(isReq) {
        axios.put(`https://fredsflix.herokuapp.com/users/${user}`,  {
          Username: username, 
          Email: email, 
          Birthday: birthday
        },{
          headers: { Authorization: `Bearer ${token}`}
      }
       )
        
        .then(response => {
          console.log({
            Username: response.data.Username,
            Password: response.data.Password,
            Email: response.data.Email,
            Birthday: response.data.Birthday,
          
        });
          alert('User info successfully updated, please log back in');
          localStorage.setItem('user', response.data.Username);
          window.open('/myflix-v2', '_self'); 
        })
        .catch(response => {
          alert('unable to UPDATE');
        });
      };
    };

    const handleRemoveUser = (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      alert('Are you sure you want to remove your account?')
      
      axios.delete(`https://fredsflix.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}})

      .then(response =>  { 
        alert("Your account has been removed, please register to use FredsFlix again");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      window.open('/myflix-v2', '_self');
    })
      .catch(response => {
        alert('unable to remove user');
      });
      };
  
  
  
  
  
  return (
    <Row className="mt-5">
     
      <Col md={12}>
      <CardGroup>
        <Card border="light" style={{ width: '18rem' }}> 
      <Card.Body className="register_container">
        <Form>
          <h3>Update User Information</h3>
          <p></p>
          <Form.Group controlId="formUsername" className="reg-form-inputs">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
            {usernameErr && <p style={{color: "red"}} className="font-italic">{usernameErr}</p>}
         </Form.Group>
        
         <Form.Group controlId="Email" className="reg-form-inputs">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
            {emailErr && <p style={{color: "red"}} className="font-italic">{emailErr}</p>}
         </Form.Group>
         
         <Form.Group controlId="formBirthday" className="reg-form-inputs">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="date" name="birthday" onChange={e => setBirthday(e.target.value)} />
         </Form.Group>
         <div className = "userInfoButtons">
          <Button variant="info" type="submit" onClick={handleSubmit}>Upate User Info</Button>
          <Button variant="info" className='removeUser' type="submit" onClick={handleRemoveUser}>Remove Your Account</Button>
          </div>
          <p></p>
      </Form>
      </Card.Body>
      </Card>
      </CardGroup> 
     </Col>
    </Row>
  );
};

// RegistrationView.propTypes = {
//   register: PropTypes.shape({
//     Username: PropTypes.string.isRequired, 
//     Password: PropTypes.string.isRequired,
//     Email: PropTypes.string.isRequired
//   }),
// };