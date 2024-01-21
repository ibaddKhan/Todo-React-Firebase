import React from 'react';
import { Link } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseconfig";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  function createAccount(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Optimize your Workflow using our Todo Task Keeper. You can access your tasks and update them from anywhere, anytime.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={createAccount} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" onChange={e => setEmail(e.target.value)} placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" onChange={e => setPass(e.target.value)} placeholder="password" className="input input-bordered" required />
              <label className="label">
                <Link to='Signup'>
                  <span className="label-text-alt link link-hover">Don't have an Account?</span>
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type='submit' className="btn btn-primary">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
