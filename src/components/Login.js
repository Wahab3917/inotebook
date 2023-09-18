import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  const host = 'http://localhost:5000'; 
  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      props.showAlert("Logged in successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }

  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  return (
    <>
    
      <div className="container">
        <form className='row g-3' onSubmit={handleSubmit}>
          <div className="col-md-12">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" name='email' id="email" onChange={onChange} value={credentials.email}/>
          </div>
          <div className="col-md-12">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' id="password" onChange={onChange} value={credentials.password}/>
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    
    </>
  )
}

export default Login

