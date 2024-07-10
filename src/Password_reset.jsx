import React from 'react'
import { useState } from 'react';
const Password_reset = () => {
    const [formData, setFormData] = useState({
        email: "",
      });
    const handleSubmit = (e) =>{
        e.preventDefault();
        fetch('https://u60lddpew4.execute-api.ap-south-1.amazonaws.com/production/resetpassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
          .then((res) => res.json() 
        )
      .then((res) => {
        console.log(res);
        if (res.statusCode === 200){
          alert("Password reset sent to email")
        }
        if (res.statusCode === 400){
          alert("No Account with entered email address")
        }
      })
          .catch((error) => console.error('Error:', error));

    }
    const [isValidEmail, setIsValidEmail] = useState(true);
    const handleChange = (e) => {
        if (e.target.name === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          setIsValidEmail(emailRegex.test(e.target.value));
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
  
  return (
    <div className='profile-container'>
        <div className='profile' style={{alignItems:'center', height:'500px', width:'500px'}}>
            <div style={{ marginTop:'20px'}}>Reset Password</div>
            <div style={{fontSize:'18px', marginTop:'20px'}}>An link to reset password will be <br/> sent to the following email address.</div>
        <form style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'20px'}} onSubmit={handleSubmit}>
            <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              display: "flex",
              position: "relative",
              alignItems:'center',
              justifyItems:'center',
              borderColor: isValidEmail ? "#CBD5E0" : "#EF4444",
              borderRadius: "0",
              width: "100%",
              padding: "8px",
              color: "whitesmoke",
              outline: "none",
              fontSize: "1.5rem",
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
          <button
            type="submit"
            style={{
              position: "relative",
              borderRadius: "0.375rem",
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
            Send Link
          </button>
        </form>
        </div>
    </div>
  )
}

export default Password_reset
