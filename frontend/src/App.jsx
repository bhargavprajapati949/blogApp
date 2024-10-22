import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import AddPost from './pages/AddPost';
import Auth from './pages/Auth';
import { getUserData } from './service/auth.service';

const App = () => {
    const [user, setUser] = useState(null);

    const fetchUserInfo = async () => {
        const authToken = document.cookie.split('authToken=')[1];
        if (authToken) {
            try {
                const userInfo = await getUserData();
                setUser(userInfo);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const isLoggedIn = () => !!user;

    const setLoggedInAndUpdateUserData = () => {
        fetchUserInfo();
    };

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn()} setLoggedInAndUpdateUserData={setLoggedInAndUpdateUserData} user={user} />
            <Routes>
                <Route path="/" element={<PostList user={user}/>} />
                <Route path="/posts/:id" element={<PostDetail isLoggedIn={isLoggedIn()} user={user}/>} />
                <Route path="/add-post" element={user?.role === 'admin' ? <AddPost /> : <Navigate to="/" />} />
                <Route path="/login" element={<Auth isRegister={false} setLoggedInAndUpdateUserData={setLoggedInAndUpdateUserData}/>} />
                <Route path="/register" element={<Auth isRegister={true} setLoggedInAndUpdateUserData={setLoggedInAndUpdateUserData}/>} />
            </Routes>
        </Router>
    );
};

export default App;
