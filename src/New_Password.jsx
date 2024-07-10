import React, { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

const New_Password = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    new_password: '',
    confirm_password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      console.log(token)
      const response = await fetch('https://u60lddpew4.execute-api.ap-south-1.amazonaws.com/production/updatepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          new_password: formData.new_password,
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        alert('Password has been reset successfully');
        console.log(response)
        console.log(result)
        setTimeout(() => {
          navigate('/'); // Redirect to login page
        }, 3000);
      } else {
        console.log(response)
        console.log(result)
        alert(result.message);
      }
    } catch (error) {
      setLoading(false);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='profile-container'>
      <div className='profile' style={{ alignItems: 'center', height: '500px', width: '500px' }}>
        <div style={{ marginTop: '20px' }}>Reset Password</div>
        <div style={{ fontSize: '18px', marginTop: '20px' }}>
          Please enter your new password below.
        </div>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }} onSubmit={handleSubmit}>
          <input
            id="new_password"
            name="new_password"
            type="password"
            value={formData.new_password}
            onChange={handleChange}
            required
            style={{
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              justifyItems: 'center',
              borderRadius: '0',
              width: '100%',
              padding: '8px',
              color: 'whitesmoke',
              outline: 'none',
              fontSize: '1.5rem',
              backgroundColor: 'transparent',
              borderBottom: '1px solid gray',
            }}
            placeholder="New password"
          />
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
            style={{
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              justifyItems: 'center',
              borderRadius: '0',
              width: '100%',
              padding: '8px',
              color: 'whitesmoke',
              outline: 'none',
              fontSize: '1.5rem',
              backgroundColor: 'transparent',
              borderBottom: '1px solid gray',
              marginTop: '20px',
            }}
            placeholder="Confirm new password"
          />
          <button
            type="submit"
            style={{
              position: 'relative',
              borderRadius: '0.375rem',
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
              width: '100px',
              marginTop: '20px',
              marginBottom: '5px',
            }}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default New_Password;
