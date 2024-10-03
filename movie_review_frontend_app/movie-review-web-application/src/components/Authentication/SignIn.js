// src/components/SignIn.js
import React, { useState } from 'react';
import './css/sign-in.css'; // Adjust the path if necessary

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic
        console.log('Username:', username);
        console.log('Password:', password);
        // You can send a POST request here
    };

    return (
        <div className="d-flex align-items-center py-4 bg-body-tertiary">

            <main className="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                      
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            name="uname"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                          <label htmlFor="floatingInput" id='label'>Enter Username</label>
                    </div>

            <br></br>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            name="pwd"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword" id='label'>Enter Password</label>
                    </div>

                    <div className="form-check text-start my-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="remember-me"
                            id="flexCheckDefault"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-body-secondary">New User?</p>
                </form>

                <a className="btn btn-primary w-100 py-2" href="/register">Create New Account!</a>
            </main>
        </div>
    );
};

export default SignIn;








// import React from 'react';

// const SignIn = () => {
//   return (
//     <div>
//       <h1>Sign In</h1>
//       {/* Your sign-in form goes here */}
//     </div>
//   );
// };

// export default SignIn;
