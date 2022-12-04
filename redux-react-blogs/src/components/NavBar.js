import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { fetchBlogs, searchBlog } from '../redux/blogs/blogsActions';
import { userClearInfo } from '../redux/users/usersActions';

function NavBar() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const location = useLocation();
    const navigate = useNavigate();
    const searchHandler = (e) => {
        e.preventDefault();
        if (search.trim() === '') {
            dispatch(fetchBlogs());
            return;
        }
        dispatch(searchBlog(search));
        if (location.pathname !== '/') {
            navigate('/');
        }
    }


    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Blogs App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            {Object.keys(user).length === 0 ? (
                             <>
                             <li className="nav-item">
                             <NavLink className="nav-link" to={'/register'}>Register</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/login'}>login</NavLink>
                            </li></>
                            ) : null}
                            {
                                Object.keys(user).length !== 0 ? (<li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {user.name}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><button className="dropdown-item" onClick={() => dispatch(userClearInfo())}>Logout</button></li>

                                    </ul>
                                </li>) : null
                            }

                        </ul>
                        <form className="d-flex" role="search" onSubmit={searchHandler}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar