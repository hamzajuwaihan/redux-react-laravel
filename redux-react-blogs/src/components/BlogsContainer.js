import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addBlog, fetchBlogs } from '../redux/blogs/blogsActions';
import SingleBlog from './SingleBlog';

function BlogsContainer() {
    const blogs = useSelector(state => state.blogs);
    const dispatch = useDispatch();
    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');
    let [image, setImage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogs.blogs.slice(indexOfFirstPost, indexOfLastPost);
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(blogs.blogs.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    // end pagination
    const closeButton = useRef(null);
    const addBlogHandler = (e) => {
        e.preventDefault();
        dispatch(addBlog({ title, content, image }));
        setTitle('');
        setContent('');
        setImage('');
        closeButton.current.click();
    }

    useEffect(() => {
        dispatch(fetchBlogs());
    }, []);
    return blogs.loading ? (
        <div className='text-center container'><h2>Loading</h2></div>
    ) : blogs.error ? (
        <h2>{blogs.error}</h2>
    ) : (
        <div>
            <div className='container mt-5'>
                <div className='row'>
                    <h2 className=' col-9' >All Blogs</h2>
                    <button type="button" className="btn btn-success col-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add blog
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add new blog</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form onSubmit={addBlogHandler}>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="content" className="form-label">Content</label>
                                            <textarea className="form-control" id="content" rows="3" name="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="image" className="form-label">Image</label>
                                            <input type="text" className="form-control" id="image" name="image" value={image} onChange={(e) => setImage(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" ref={closeButton} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button className="btn btn-primary" type="submit">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    {/* {blogs &&
                        blogs.blogs &&
                        blogs.blogs.map(blog => <SingleBlog title={blog.title} id={blog.id} content={blog.content} image={blog.image} key={blog.id} />)}
                    {blogs &&
                        blogs.blogs.length === 0 &&
                        <h2 className='text-center'>Sorry, No Blogs Yet!</h2>} */}
                    {
                        currentPosts.length > 0 ? currentPosts.map((blog) => {
                            return (
                                <SingleBlog title={blog.title} id={blog.id} content={blog.content} image={blog.image} key={blog.id} />
                            )
                        }) : null
                    }
                    <ul className="pagination justify-content-center" style={{ marginBottom: '30px' }}>
                        {pageNumbers.map((number) => (
                            <li key={number} className="page-item">
                                <button onClick={() => paginate(number)} className="page-link">
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default BlogsContainer