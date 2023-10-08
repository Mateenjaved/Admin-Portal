import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../config/firebase';
import {Input } from 'antd';
const initialState = { email: "", password: "" }
export default function Signin() {
  const [state, setState] = useState(initialState)
  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSignin = e => {
    e.preventDefault()
    const { email, password } = state
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 


        window.notify("user Signin successfuly", "success")
        // ...
      })
      .catch((error) => {
        window.notify("something want worng", "error")

      });
    setState(initialState)


  }

  return (


    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal fs-3 mb-0 me-3">Sign in Here</p>

              </div>

              <div className="divider d-flex align-items-center my-4"></div>

              <div className="form-outline mb-4">
                <label className="form-label" for="email">Email address</label>
                <input type="email" id="email" name='email' className="form-control form-control-lg"
                  placeholder="Enter a valid email address" value={state.email} onChange={handleChange} />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" for="password">Password</label>
                {/* <input type="password" id="password" name='password' className="form-control form-control-lg"
                  placeholder="Enter password" value={state.password} onChange={handleChange} /> */}
                <Input.Password placeholder="Enter Password" name='password' id='password' className='p-2' value={state.password} onChange={handleChange} />
                
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="button" className="btn btn-primary btn-lg"
                  style={{ paddingleft: '2.5rem', paddingright: '2.5rem' }} onClick={handleSignin}>Login</button>
                {/* <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to='/auth/signup'>SignUp here</Link></p> */}
              </div>

            </form>
          </div>
        </div>
      </div>
      <div
        className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2023. All rights reserved.
        </div>
        <div className='text-white'>
          Developed By Mateen Javed.
        </div>
      </div>
    </section>
  )
}
