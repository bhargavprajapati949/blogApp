import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../service/post.service';
import { Link, useNavigate } from 'react-router-dom';

const PostList = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts()
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, [user]);

    const handleCreatePost = () => {
        navigate('/add-post');
    };

    return (
        <div className="container mt-5">
            <h2>All Posts</h2>
            {user?.role === 'admin' && (
                <button className="btn btn-primary mb-4" onClick={handleCreatePost}>Create Post</button>
            )}
            <div className="row">
                {posts?.map(post => <PostListItem key={post.id} post={post}/>)}
            </div>
        </div>
    );
};

const PostListItem = ({ post }) => {
    return (
        <div className="col-md-6 mb-4">
            <Link to={`/posts/${post.id}`} className="text-decoration-none text-dark">
                <div className="card h-100 clickable-card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">
                            {post.title} {post.status === 'Draft' && <span className="badge badge-warning ml-2 text-dark">Draft</span>
                            }
                        </h5>
                        <p className="card-text">Author: {post.author_name}</p>
                        <p className="card-text">Created at: {new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PostList;
