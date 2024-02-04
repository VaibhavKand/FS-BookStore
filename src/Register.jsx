import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuth } from './Features/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
  });
  const [isValidEmail, setIsValidEmail] = useState(true);

  const styles = {
    container: {
      position:'absolute',
      top:'0px',
      left:'0px',
      minHeight: '100vh',
      width: '1519px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px',
      
    },
    formContainer: {
      width: '500px',
      height:'500px',
      display: 'flex',
      position:'relative',
      justifyContent:'left',
      flexDirection: 'column',
      gap: '1rem',
      backgroundColor:'#070202cb'
    },
    title: {
      marginTop: '1.5rem',
      textAlign: 'center',
      fontSize: '2.5rem',
      fontWeight: '600',
      color: 'whitesmoke',
      fontFamily: 'Poppins, sans-serif',
    },
    title_1:{
      marginTop: '1.5rem',
      textAlign: 'center',
      fontSize: '1.8rem',
      fontWeight: '600',
      color: 'whitesmoke',
      fontFamily: 'Poppins, sans-serif',
    },
    input: {
      width: '450px',
      padding: '0.75rem',
      borderWidth: '1px',
      borderColor: '#CBD5E0',
      borderRadius: '0.375rem',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      fontFamily: 'inherit',
      fontSize: '0.875rem',
      '&:focus': {
        borderColor: '#2563EB',
      },
    },
    errorMessage: {
      marginTop: '0.25rem',
      color: '#DC2626',
      fontSize: '0.875rem',
    },
    button: {
      marginTop:'2rem',
      position:'relative',
      left:'680px',
      width: '10%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0.5rem',
      fontSize: '1rem',
      fontWeight: '500',
      borderRadius: '0.375rem',
      color: '#fff',
      backgroundColor: '#2563EB',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        backgroundColor: '#34D399',
      },
    },
    link: {
      position: 'relative',
      top: '20px',
      left: '0px',
      fontWeight: '500',
      color: 'whitesmoke',
      '&:hover': {
        color: '#34D399',
      },
    },
    footer: {
      position: 'absolute',
      left: '0px',
      top: '700px',
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://nd59tyg671.execute-api.ap-south-1.amazonaws.com/test/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 410) {
            alert('Email id already Registered');
            navigate('/register');
          }
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((res) => {
        if (res.statusCode === 400) {
          alert('Email id already Registered');
          navigate('/register')
        } else {
          console.log(res);
          navigate('/')
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    navigate('/login');
  };

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValidEmail(emailRegex.test(e.target.value));
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='register-bg' >
      <div className='register-container'>
        <div className='register-header'>
          <h1 className='sign-up' >Sign Up</h1>
          <h2 className='sign-up-1' >Create New Account</h2>
        </div>
        <form className='register-form' onSubmit={handleSubmit}>
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  position:'relative',
                  left:'75px',
                  borderRadius: '0',
                  display: 'block',
                  width: '70%',
                  padding: '8px',
                  color: 'whitesmoke',
                  outline: 'none',
                  fontSize: '0.875rem',
                  backgroundColor:'transparent',
                  borderBottom:'1px solid gray'
                }}
                placeholder="Name"
              />
              <input
                id="contact"
                name="contact"
                type="contact"
                autoComplete="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                style={{
                  position:'relative',
                  left:'75px',
                  borderRadius: '0',
                  display: 'block',
                  width: '70%',
                  padding: '8px',
                  color: 'whitesmoke',
                  outline: 'none',
                  fontSize: '0.875rem',
                  backgroundColor:'transparent',
                  borderBottom:'1px solid gray'
                }}
                placeholder="Contact"
              />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  position:'relative',
                  left:'75px',
                  borderColor: isValidEmail ? '#CBD5E0' : '#EF4444',
                  borderRadius: '0',
                  display: 'block',
                  width: '70%',
                  padding: '8px',
                  color: 'whitesmoke',
                  outline: 'none',
                  fontSize: '0.875rem',
                  backgroundColor:'transparent',
                  borderBottom:'1px solid gray'
                }}
                placeholder="Email address"
              />
              {!isValidEmail && (
                <p style={styles.errorMessage}>Please enter a valid email address.</p>
              )}
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  position:'relative',
                  left:'75px',
                  borderRadius: '0',
                  display: 'block',
                  width: '70%',
                  padding: '8px',
                  color: 'whitesmoke',
                  outline: 'none',
                  fontSize: '0.875rem',
                  backgroundColor:'transparent',
                  borderBottom:'1px solid gray'
                }}
                placeholder="Password"
              />
          <button type="submit"
          style={{
            position:'relative',
            borderRadius: '0.375rem',
            left:'220px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            borderWidth: '1px',
            borderStyle: 'solid',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#FFFFFF',
            backgroundColor: '#2563EB',
            outline: 'none',
            width:'100px',
            marginTop:'20px',
            marginBottom:'5px'
          }}>
            Sign up
          </button>
          <a href="/" >
            Already have an Account? Click here
          </a>
        </form>
      </div>
    </div>
  );
};

export default Register;


