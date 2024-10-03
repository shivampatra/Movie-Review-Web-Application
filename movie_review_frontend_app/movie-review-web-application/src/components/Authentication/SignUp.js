// src/components/SignUp.js
import React, { useState } from 'react';
import './css/sign_up.css'; 
// import { useState } from 'react';
const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [contact,setContact] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        // You can handle form submission here
        console.log('Username:', username);
        console.log('Password:', password);
        
        // You can use fetch or axios to send a POST request here
        // Example: fetch('/submit', { method: 'POST', body: JSON.stringify({ username, password }) });
    };

    return (

 
       
        <div className="box">
                 <h1>Register Yourself !</h1> 
            <form onSubmit={handleSubmit}>
            
                <br />
             <input
                    type="text"
                    placeholder="Enter a UserName"
                    id="uname"
                    name="uname"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br /><br />
                <input
                    type="password"
                    placeholder="Enter a Password"
                    id="pwd"
                    name="pwd"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> 
                <br /><br />
             <input
                    type="email"
                    placeholder='Enter your Mail'
                    id='mail'
                    name='mail'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
<br></br>
<br></br>
                <input
                    type="number"
                    placeholder='Enter your Number'
                    id='num'
                    name='num'
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    />
<br></br>
<br></br>  
                <button type="submit" className='button'>Create</button>
            </form>
            <br></br>
            <br></br>
            <h3>Already Registered ! <a href='/login'> Login....</a> </h3>
                
                {/* <a href="/login" style={{color:'#7695FF',textDecorationLine:'none',border:'2px solid #7695FF',borderRadius:'5px',padding:'5px',backgroundColor:'#CDC1FF'}}> login here</a> */}
            </div>
   
    );
};

export default SignUp;
