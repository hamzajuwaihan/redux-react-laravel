
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import { Provider } from 'react-redux'
import store from './redux/store';
import BlogsContainer from './components/BlogsContainer';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Provider store={store}>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <BlogsContainer />
        } />
        <Route path="/register" element={
          <Register />
        } />
        <Route path="/login" element={
          <Login />
        } />
        <Route path="*" element={
          <h1>404 Not Found</h1>
        } />

      </Routes>
    </Provider>
  );
}

export default App;
