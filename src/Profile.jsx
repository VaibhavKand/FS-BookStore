import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setImage, setAddress, setContact  } from './Features/authSlice';
const Profile = () => {
  const { auth, name, email, contact, address, image } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name, email, contact, address, image });
  const dispatch = useDispatch()
  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch(
      "https://u60lddpew4.execute-api.ap-south-1.amazonaws.com/production/update-profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
    .then((res) => {
      if (res.ok) {
        return res.json(); // Parse JSON response
      } else {
        throw new Error(`Request failed with status ${res.status}`);
      }
    })
    .then((data) => {
      console.log(data); // Log the response data for debugging
      alert("Data Updated Successfully");
      // Assuming formData includes contact and address
      dispatch(setContact(formData.contact));
      dispatch(setAddress(formData.address));
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors, e.g., display error message
      alert("Failed to update data. Please try again later.");
    });
  };
  

  return (
    <div className='profile-container'>
      <div className='profile'>
        Profile
        <img className='profile-image' src={image} alt=""/>
        <div className='profile-info'>
          <form onSubmit={handleSubmit}>
            <label
              style={{
                position: "relative",
                justifyContent: 'center',
                borderRadius: "0",
                display: "block",
                width: "100%",
                padding: "8px",
                color: "white",
                outline: "none",
                fontSize: "2rem",
                backgroundColor: "transparent",
              }}
            >{name}</label>
            <label
              style={{
                position: "relative",
                justifyContent: 'center',
                borderColor: "#EF4444",
                borderRadius: "0",
                display: "block",
                width: "70%",
                padding: "8px",
                color: "white",
                outline: "none",
                fontSize: "1rem",
                backgroundColor: "transparent",
              }}
            >{email}</label>
            <input
              id="contact"
              name="contact"
              type="text"
              autoComplete="contact"
              value={formData.contact}
              onChange={handleChange}
              style={{
                position: "relative",
                borderRadius: "15px",
                display: "block",
                width: "100%",
                padding: "8px",
                color: "whitesmoke",
                outline: "none",
                fontSize: "1rem",
                backgroundColor: "transparent",
                border:"solid 1px grey",
                marginBottom:"10px"
              }}
              placeholder={contact ? contact : "Add Contact"}
            />
            <textarea
              id="address"
              name="address"
              type="text"
              autoComplete="address"
              value={formData.address}
              onChange={handleChange}
              style={{
                position: "relative",
                borderRadius: "15px",
                display: "block",
                width: "100%",
                height:"150px",
                padding: "8px",
                color: "whitesmoke",
                outline: "none",
                fontSize: "1rem",
                backgroundColor: "transparent",
                border:"solid 1px grey"
              }}
              placeholder={address ? address : "Add Address"}
            />
            <button
              type="submit"
              style={{
                position: "relative",
                borderRadius: "0.375rem",
                left: "70px",
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
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
