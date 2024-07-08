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
          .then((res) => res.json())
      .then((res) => {
        console.log(res);
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
