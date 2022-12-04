
import { FETCH_BLOGS_REQUEST, FETCH_BLOGS_FAILURE, FETCH_BLOGS_SUCCESS, DELETE_BLOG_REQUEST, DELETE_BLOG_SUCCESS, DELETE_BLOG_FAILURE, ADD_BLOG_REQUEST, ADD_BLOG_SUCCESS, ADD_BLOG_FAILURE, SEARCH_BLOG_REQUEST, UPDATE_BLOG_REQUEST } from "./blogsType";

const initialState = {
    loading: false,
    blogs: [],
    error: ''
}

const blogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BLOGS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_BLOGS_SUCCESS:
            return {
                loading: false,
                blogs: action.payload,
                error: ''
            }
        case FETCH_BLOGS_FAILURE:
            return {
                loading: false,
                blogs: [],
                error: action.payload
            }
        case DELETE_BLOG_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: state.blogs.filter(blog => blog.id !== action.payload)
            }
        case DELETE_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADD_BLOG_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADD_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: [...state.blogs, action.payload]
            }
        case ADD_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SEARCH_BLOG_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_BLOG_REQUEST:
            return {
                ...state,
                loading: true
            }


        default: return state
    }
}

export default blogsReducer;