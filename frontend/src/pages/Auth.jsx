import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../service/auth.service';

const Auth = ({ isRegister, setLoggedInAndUpdateUserData }) => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    useEffect(() => {
        setUsername('');
        setName('');
        setPassword('');
        setRole('user');
    }, [isRegister])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await registerUser(username, name, password, role);
                console.log('User registered successfully');
            } else {
                await loginUser(username, password)
            }
            // Checking auth token exist of not in case there is some issue in setting cookie
            const authToken = document.cookie.split('authToken=')[1];
            if (authToken) {
                setLoggedInAndUpdateUserData();
                navigate('/');
            }
            else{
                throw new Error(`Failed to ${isRegister ? "Register" : "Login"}`);
            }
        } catch (error) {
            if(isRegister){
                console.error('Error during registration:', error);
                alert('Failed to register. Please try again.');
            }
            else{
                console.error('Error during login:', error);
                alert('Failed to login. Please try again.');
            }
            
        }
    };

    return (
        <div className="container mt-5">
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                {isRegister && (
                    <>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <select
                                className="form-control"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </>
                )}
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    {isRegister ? 'Register' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Auth;