import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../service/post.service';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSavePost = async (status) => {
        try {
            await createPost({title, content, status});
            alert('Post saved successfully!');
            navigate('/'); // Redirect to Post List Page
        } catch (error) {
            console.error('Error saving post:', error);
            alert('Failed to save post. Please try again.');
        }
    };

    const handleDiscard = () => {
        setTitle('');
        setContent('');
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <h2>Create a New Post</h2>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                    className="form-control"
                    id="content"
                    rows="5"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="mt-3">
                <button className="btn btn-secondary mr-2" onClick={handleDiscard}>Discard</button>
                <button className="btn btn-warning mr-2" onClick={() => handleSavePost('Draft')}>Save as Draft</button>
                <button className="btn btn-success" onClick={() => handleSavePost('Published')}>Publish</button>
            </div>
        </div>
    );
};

export default AddPost;
