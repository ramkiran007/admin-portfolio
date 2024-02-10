import React, { useState } from 'react';
import './App.css';
import Portfolio from './Portfolio';

function App() {
    const [view, setView] = useState('login');
    const [token, setToken] = useState(null);  // Initialize token as null
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
      setLoading(true);
      fetch('http://localhost:3001/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password })
      })

      .then(data => {
        setLoading(false);
        if(data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          setUsername('');   // Clearing username
          setPassword('');   // Clearing password
          alert('Logged in successfully');
          setView('portfolio');  // Set view to portfolio after successful login
        } else {
          alert('Invalid login credentials.');
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Error logging in:', error);
      });
  };
  

    const handleRegister = () => {
        setLoading(true);
        fetch('http://localhost:3001/api/admin/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            setLoading(false);
            if(data.success) {
                alert('Registration successful!');
                setView('login');
                setUsername('');
                setPassword('');
            } else {
                alert('Registration failed.');
            }
        })
        .catch(error => {
            setLoading(false);
            console.error('Error registering:', error);
        });
    };

    if (token) {
        return (
            <Portfolio 
                token={token}
                onLogout={() => {
                    localStorage.removeItem('token');
                    setToken(null);
                }}
            />
        );
    }

    return (
      <div className="form-container card">
      {loading && <div>Loading...</div>}

      {view === 'login' && !loading && (
          <div className="card-body">
              <h2>Admin Login</h2>
              <label htmlFor="login-username">Username</label>
              <input 
                  id="login-username"
                  type="text" 
                  placeholder="Username" 
                  className="form-control mb-2" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)}
              />
              <label htmlFor="login-password">Password</label>
              <input 
                  id="login-password"
                  type="password" 
                  placeholder="Password" 
                  className="form-control mb-2"
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
              />
              <button onClick={handleLogin} className="btn btn-primary">Login</button>
              <button onClick={() => {
                  localStorage.removeItem('token');
                  setView('register');
              }} className="btn btn-secondary mt-2">
                  Go to Register
              </button>
          </div>
      )}

      {view === 'register' && !loading && (
          <div className="card-body">
              <h2>Admin Registration</h2>
              <label htmlFor="register-username">Username</label>
              <input 
                  id="register-username"
                  type="text" 
                  placeholder="Username" 
                  className="form-control mb-2"
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
              />
              <label htmlFor="register-password">Password</label>
              <input 
                  id="register-password"
                  type="password" 
                  placeholder="Password" 
                  className="form-control mb-2"
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
              />
              <button onClick={handleRegister} className="btn btn-primary">Register</button>
              <button onClick={() => {
                  localStorage.removeItem('token');
                  setView('login');
              }} className="btn btn-secondary mt-2">
                  Go to Login
              </button>
          </div>
      )}
  </div>
    );
}

export default App;
