import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../redux/users/usersActions';

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const inputHandler = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    const formHandler = (e) => {
        e.preventDefault();
        dispatch(userRegister(userData));
        setUserData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        navigate('/');

    }
    return user.loading ? (
        <h1>Hold on till we register you!</h1>
    ) : (<div className='container'>
        <h1 className='text-center mt-3'>Register</h1>
        <form className='mt-3' onSubmit={formHandler}>
            {user.error && <div className='alert alert-danger'>{user.error}</div>}
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name='name' value={userData.name} onChange={inputHandler} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' value={userData.email} onChange={inputHandler} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' value={userData.password} onChange={inputHandler} />
            </div>
            <div className="mb-3">
                <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="confirm_password" name='password_confirmation' value={userData.password_confirmation} onChange={inputHandler} />
            </div>
            <div className='row g-0'>
                <button type="submit" className="btn btn-primary col-12">Submit</button>
            </div>
        </form>

    </div>)
}

export default Register