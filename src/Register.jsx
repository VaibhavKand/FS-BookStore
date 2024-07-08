import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { setAuth, setName, setMail, setImage,setAddress, setContact } from './Features/authSlice';
import { useDispatch } from 'react-redux';
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    address:"",
    image:""
  });
  const [isValidEmail, setIsValidEmail] = useState(true);
  
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
  const styles = {
    container: {
      position: "absolute",
      top: "0px",
      left: "0px",
      minHeight: "100vh",
      width: "1519px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px",
    },
    formContainer: {
      width: "500px",
      height: "500px",
      display: "flex",
      position: "relative",
      justifyContent: "left",
      flexDirection: "column",
      gap: "1rem",
      backgroundColor: "#070202cb",
    },
    title: {
      marginTop: "1.5rem",
      textAlign: "center",
      fontSize: "2.5rem",
      fontWeight: "600",
      color: "whitesmoke",
      fontFamily: "Poppins, sans-serif",
    },
    title_1: {
      marginTop: "1.5rem",
      textAlign: "center",
      fontSize: "1.8rem",
      fontWeight: "600",
      color: "whitesmoke",
      fontFamily: "Poppins, sans-serif",
    },
    input: {
      width: "450px",
      padding: "0.75rem",
      borderWidth: "1px",
      borderColor: "#CBD5E0",
      borderRadius: "0.375rem",
      outline: "none",
      transition: "border-color 0.3s ease",
      fontFamily: "inherit",
      fontSize: "0.875rem",
      "&:focus": {
        borderColor: "#2563EB",
      },
    },
    errorMessage: {
      marginTop: "0.25rem",
      color: "#DC2626",
      fontSize: "0.875rem",
    },
    button: {
      marginTop: "2rem",
      position: "relative",
      left: "680px",
      width: "10%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0.5rem",
      fontSize: "1rem",
      fontWeight: "500",
      borderRadius: "0.375rem",
      color: "#fff",
      backgroundColor: "#2563EB",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#34D399",
      },
    },
    link: {
      position: "relative",
      top: "20px",
      left: "0px",
      fontWeight: "500",
      color: "whitesmoke",
      "&:hover": {
        color: "#34D399",
      },
    },
    footer: {
      position: "absolute",
      left: "0px",
      top: "700px",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      "https://u60lddpew4.execute-api.ap-south-1.amazonaws.com/production/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          if (response.status === 410) {
            alert("Email id already Registered");
            navigate("/register");
          }
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        if (res.statusCode === 400) {
          alert("Email id already Registered");
          navigate("/register");
        } else {
          console.log(res);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    navigate("/");
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValidEmail(emailRegex.test(e.target.value));
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-bg">
      <div className="register-container">
        <div className="register-header">
          <h1 className="sign-up">Sign Up</h1>
          <h2 className="sign-up-1">Create New Account</h2>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            id="name"
            name="name"
            type="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              position: "relative",
              left: "75px",
              borderRadius: "0",
              display: "block",
              width: "70%",
              padding: "8px",
              color: "whitesmoke",
              outline: "none",
              fontSize: "0.875rem",
              backgroundColor: "transparent",
              borderBottom: "1px solid gray",
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
              position: "relative",
              left: "75px",
              borderRadius: "0",
              display: "block",
              width: "70%",
              padding: "8px",
              color: "whitesmoke",
              outline: "none",
              fontSize: "0.875rem",
              backgroundColor: "transparent",
              borderBottom: "1px solid gray",
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
              position: "relative",
              left: "75px",
              borderColor: isValidEmail ? "#CBD5E0" : "#EF4444",
              borderRadius: "0",
              display: "block",
              width: "70%",
              padding: "8px",
              color: "whitesmoke",
              outline: "none",
              fontSize: "0.875rem",
              backgroundColor: "transparent",
              borderBottom: "1px solid gray",
            }}
            placeholder="Email address"
          />
          {!isValidEmail && (
            <p style={styles.errorMessage}>
              Please enter a valid email address.
            </p>
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
              position: "relative",
              left: "75px",
              borderRadius: "0",
              display: "block",
              width: "70%",
              padding: "8px",
              color: "whitesmoke",
              outline: "none",
              fontSize: "0.875rem",
              backgroundColor: "transparent",
              borderBottom: "1px solid gray",
            }}
            placeholder="Password"
          />
          <button
            type="submit"
            style={{
              position: "relative",
              borderRadius: "0.375rem",
              left: "220px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0.5rem 1rem",
              borderWidth: "1px",
              borderStyle: "solid",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#FFFFFF",
              backgroundColor: "#2563EB",
              outline: "none",
              width: "100px",
              marginTop: "20px",
              marginBottom: "5px",
            }}
          >
            Sign up
          </button>
          <div style={{position:"relative",display: "flex",justifyContent: "center",
              alignItems: "center",}}>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </div>
          <a href="/">Already have an Account? Click here</a>
        </form>
      </div>
    </div>
  );
};

export default Register;
