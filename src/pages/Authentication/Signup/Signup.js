import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from '../../../config/firebase';
import {Input } from 'antd';

import { useAuthContext } from '../../Context/AuthContext'
const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }

export default function Signup() {
  const [state, setState] = useState(initialState)
  const { dispatch } = useAuthContext()
  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSignup = (e) => {
    e.preventDefault()
    const { email, password, } = state
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        addUserDoc(user)
        window.notify("user SignUp successfuly", "success")
      })
      .catch((error) => {
        window.notify("something want worng", "error")
        // ..
      });
    setState(initialState)
  }

  const addUserDoc = async (user) => {
    const { firstName, lastName, password } = state
    console.log(firstName, lastName, password);
    console.log(user);
    try {
      await setDoc(doc(firestore, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        Password: password,
        uid: user.uid
      });
      dispatch({ type: "LOGIN" })
      console.log("add user in firestore");
    }
    catch (err) {
      console.error(err)
      console.log("something wants wrong");
    }


  }

  return (
    

    <section className="vh-100" style={{ backgroundcolor: 'rgb(238,238,238)' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderradius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                    <form className="mx-1 mx-md-4">

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="firstName">First Name</label>
                          <input type="text" id="firstName" name='firstName' className="form-control" value={state.firstName} onChange={handleChange} />
                          <label className="form-label" for="lastName">Last Name</label>
                          <input type="text" id="lastName" name='lastName' className="form-control"  value={state.lastName} onChange={handleChange}/>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="email">Your Email</label>
                          <input type="email" id="email" name='email' className="form-control"  value={state.email} onChange={handleChange}/>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="password">Password</label>
                          {/* <input type="password" id="password" name='password' className="form-control" value={state.password} onChange={handleChange}/> */}
                          <Input.Password  name='password' id='password' className='p-2' value={state.password} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="confirmPassword">Confirm password</label>
                          {/* <input type="password" id="confirmPassword" name='confirmPassword' className="form-control" value={state.confirmPassword} onChange={handleChange} /> */}
                          <Input.Password  name='confirmPassword' id='confirmPassword' className='p-2' value={state.confirmPassword} onChange={handleChange} />
                        </div>
                      </div>

                     <br />
                      <div>Already have an account? <Link to='/auth/signin'>Sign in here</Link> </div>

                      <div className="d-flex justify-content-center mx-4 my-3 mb-lg-4" >
                        <button type="button" className="btn btn-primary btn-lg" onClick={handleSignup}>Register</button>
                      </div>

                    </form>

                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2 ">

                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample image" />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
