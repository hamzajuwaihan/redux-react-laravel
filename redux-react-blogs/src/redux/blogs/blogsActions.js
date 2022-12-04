import axios from 'axios';
import { FETCH_BLOGS_REQUEST, FETCH_BLOGS_FAILURE, FETCH_BLOGS_SUCCESS, DELETE_BLOG_REQUEST, DELETE_BLOG_SUCCESS, DELETE_BLOG_FAILURE, ADD_BLOG_REQUEST, ADD_BLOG_SUCCESS, ADD_BLOG_FAILURE, SEARCH_BLOG_REQUEST, UPDATE_BLOG_REQUEST } from "./blogsType";


// ? FETCH BLOGS ACTIONS SECTION
export const fetchBlogs = () => {
    return (dispatch) => {
        dispatch(fetchBlogsRequest());
        axios.get('http://127.0.0.1:8000/api/blogs')
            .then(response => {
                const blogs = response.data;
                dispatch(fetchBlogsSuccess(blogs));

            })
            .catch(error => {
                dispatch(fetchBlogsFailure(error.message));
            })
    }
}


export function fetchBlogsRequest() {
    return {
        type: FETCH_BLOGS_REQUEST
    }
}

export function fetchBlogsSuccess(blogs) {
    return {
        type: FETCH_BLOGS_SUCCESS,
        payload: blogs
    }
}

export function fetchBlogsFailure(error) {
    return {
        type: FETCH_BLOGS_FAILURE,
        payload: error
    }
}

// ? END OF FETCH BLOGS ACTIONS SECTION


// ! DELETE BLOG ACTIONS SECTION
export function deleteBlogRequest() {
    return {
        type: DELETE_BLOG_REQUEST
    }
}

export function deleteBlogSuccess(blogs) {
    return {
        type: DELETE_BLOG_SUCCESS,
        payload: blogs
    }
}
export function deleteBlogFailure(error) {
    return {
        type: DELETE_BLOG_FAILURE,
        payload: error
    }
}
export const deleteBlog = (id) => {
    return (dispatch) => {
        dispatch(deleteBlogRequest());
        axios.delete(`http://127.0.0.1:8000/api/blogs/${id}`).then(response => {
            dispatch(deleteBlogSuccess(id));
        }).catch(error => {
            dispatch(deleteBlogFailure(error.message));
        }
        )
    }
}

// ! END OF DELETE BLOG ACTIONS SECTION

// * ADD BLOG ACTIONS SECTION
export function addBlogRequest() {
    return {
        type: ADD_BLOG_REQUEST
    }
}

export function addBlogSuccess(blog) {
    return {
        type: ADD_BLOG_SUCCESS,
        payload: blog
    }
}
export function addBlogFailure(error) {
    return {
        type: ADD_BLOG_FAILURE,
        payload: error
    }
}

export const addBlog = (blog) => {
    return (dispatch) => {
        dispatch(addBlogRequest());
        axios.post('http://127.0.0.1:8000/api/blogs', blog).then(response => {
            dispatch(addBlogSuccess(response.data));
            console.log(response.data);
        }).catch(error => {
            dispatch(addBlogFailure(error.message));
        }
        )
    }
}

// * END OF ADD BLOG ACTIONS SECTION


// * SEARCH BLOG ACTIONS SECTION
export function searchBlogRequest() {
    return {
        type: SEARCH_BLOG_REQUEST
    }
}

export const searchBlog = (search) => {
    return (dispatch) => {
        dispatch(searchBlogRequest());
        axios.get(`http://127.0.0.1:8000/api/blogs/search/${search}`)
            .then(response => {
                const blogs = response.data;
                dispatch(fetchBlogsSuccess(blogs));
            })
            .catch(error => {
                dispatch(fetchBlogsFailure(error.message));
            })
    }
}

// * END OF SEARCH BLOG ACTIONS SECTION

// * UPDATE BLOG ACTIONS SECTION
export function updateBlogRequest() {
    return {
        type: UPDATE_BLOG_REQUEST
    }
}

export const updateBlog = (blog) => {
    return (dispatch) => {
        dispatch(updateBlogRequest());
        axios.put(`http://127.0.0.1:8000/api/blogs/${blog.id}`, blog).then(response => {
            dispatch(fetchBlogs());
            console.log(response.data);
        }).catch(error => {
            dispatch(fetchBlogsFailure(error.message));
        })

    }
}