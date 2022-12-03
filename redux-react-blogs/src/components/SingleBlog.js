import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteBlog } from '../redux/blogs/blogsActions';

function SingleBlog({ id, title, content, image }) {
    const dispatch = useDispatch();
    const formHandler = (e) => {
        e.preventDefault();
        dispatch(deleteBlog(id));
    }
    return (
        <div className="card col-3 m-2" style={{ width: '18rem' }}>
            <img src={image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
                <form onSubmit={formHandler}>
                    <button className="btn btn-danger" type='submit'>Delete</button>
                </form>
            </div>
        </div>
    )
}

export default SingleBlog