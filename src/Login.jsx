import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google";
import { useSelector, useDispatch } from 'react-redux';
import { setAuth, setName, setMail, setAddress, setContact, setImage } from './Features/authSlice';
  
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    checkbox: false,
  });
  const [isValidEmail, setIsValidEmail] = useState(true);
  const defaultimage = "https://fs-book-store.s3.ap-south-1.amazonaws.com/static_images/user_icon.jpg"
  const responseMessage = (response) => {
    const token = response.credential;
  fetch('https://u60lddpew4.execute-api.ap-south-1.amazonaws.com/production/google-auth-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        const body = JSON.parse(data.body);
        console.log(body);
        dispatch(setAuth());
        dispatch(setName(body.user_info.Item?body.user_info.Item.name:body.user_info.name));
        dispatch(setMail(body.user_info.Item?body.user_info.Item.email:body.user_info.email));
        dispatch(setImage(body.user_info.Item?body.user_info.Item.image:body.user_info.image))
        dispatch(setContact(body.user_info.Item?body.user_info.Item.contact:formData.contact))
        dispatch(setAddress(body.user_info.Item?body.user_info.Item.address:formData.address))
        navigate(body.redirect_url)
      }
    })
    .catch((error) => console.error('Error:', error));
};
const errorMessage = (error) => {
    console.log(error);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://u60lddpew4.execute-api.ap-south-1.amazonaws.com/production/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 404) {
          console.log('Failure:', response);
        }
        return response.json();
      })
      .then((res) => {
        if (res.statusCode === 200) {
          const { name, email, contact, address, image } = JSON.parse(res.body);
          dispatch(setAuth());
          dispatch(setName(name));
          dispatch(setMail(email));
          dispatch(setImage(image?image:defaultimage))
          dispatch(setContact(contact))
          dispatch(setAddress(address))
          navigate('/bookstore');
        } else {
          console.log('Failed:', res);
          alert('Incorrect Email or Password');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValidEmail(emailRegex.test(e.target.value));
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'remember-me') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        checkbox: !prevFormData.checkbox, 
      }));
    }
  };

  return (
    <div className='login-bg' style={{left: '0vw', top: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center',  overflowX: 'hidden', overflowY:'hidden' }}>
      <div style={{  display: 'flex', flexDirection: 'row', gap: '24px', color:'#1a1a1a' }}>
        <div className='login-container'>
        <h1 className='sign-in'>Sign in</h1>
        <h2 className='sign-in-1' >Login into your account</h2>
        <form onSubmit={handleSubmit} className='sign-in-form'>
          <div >
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
              <p style={{ marginTop: '0.25rem', color: '#EF4444', fontSize: '0.875rem' }}>Please enter a valid email address.</p>
            )}
          </div>

          <div style={{ borderRadius: '0.375rem', boxShadow: '0 0.25rem 0.375rem rgba(0, 0, 0, 0.05)' }}>
            <label htmlFor="password" style={{ display: 'none' }}>
              Password
            </label>
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
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={formData.checkbox}
                onChange={handleChange}
                style={{
                  height: '1rem',
                  width: '1rem',
                  color: '#2563EB',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderRadius: '0.25rem',
                  marginTop:'10px'
                }}
              />
              <label htmlFor="remember-me" style={{ marginLeft: '10px', fontSize: '0.875rem', color: 'whitesmoke', marginTop:'10px' }}>
                Remember me
              </label>
            </div>

            <div style={{ fontSize: '0.875rem' }}>
              <a href='/password_reset' style={{ fontWeight: '500', color: 'whitesmoke', textDecoration: 'none', position:'relative', top:'10px' }}>
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            style={{
              position:'relative',
              borderRadius: '0.375rem',
              left:'175px',
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
              marginBottom:'20px'
            }}
          >
            Sign in
          </button>
          <div style={{display:'flex',justifyContent:'center'}}>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </div>
        <a href="/register" style={{ marginTop: '10px' }}>New User? Click here</a>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
