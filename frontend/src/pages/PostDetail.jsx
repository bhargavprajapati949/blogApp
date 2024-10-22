import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, addCommentToPost, changePostStatus, getCommentsByPostId } from '../service/post.service';

const PostDetail = ({ isLoggedIn, user }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchPostById(id)
            .then(({ status, post }) => {
                if (status === 404 || !post) {
                    setError(true);
                } else {
                    setPost(post);
                    getCommentsByPostId(id)
                        .then(commentsData => setComments(commentsData))
                        .catch(error => console.error('Error fetching comments:', error));
                }
            })
            .catch(error => {
                console.error('Error fetching post details:', error);
                setError(true);
            });
    }, [id]);

    const handlePublishPost = async () => {
        try {
            await changePostStatus(id, 'Published');
            alert('Post published successfully!');
            setPost({ ...post, status: 'Published' });
        } catch (error) {
            console.error('Error publishing post:', error);
            alert('Failed to publish post. Please try again.');
        }
    };

    const handleAddComment = async () => {
        if (!commentText.trim()) return;

        try {
            await addCommentToPost(id, commentText);
            setComments([...comments, { comment: commentText, author_name: user.name, createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ') }]);
            setCommentText('');
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Failed to add comment. Please try again.');
        }
    };

    if (error) {
        return (
            <div className="container mt-5">
                <h2>Post not found</h2>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Back to Post List</button>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            {post && (
                <>
                    <h2>{post.title}</h2>
                    <p>Author: {post.author_name}</p>
                    <p>Created at: {new Date(post.createdAt.replace(' ', 'T') + 'Z').toLocaleString()}</p>
                    <p>{post.content}</p>
                    {post.status === 'Draft' && (user?.role === 'admin' || user?.id === post.author) && (
                        <button className="btn btn-success" onClick={handlePublishPost}>Publish Post</button>
                    )}
                    <h4 className="mt-4">Comments</h4>
                    <ul className="list-group">
                        {comments?.map((comment, index) => (
                            <li key={index} className="list-group-item">
                                <strong>{comment.author_name}:</strong> {comment.comment}
                                <br />
                                <small className="text-muted">Commented on: {new Date(comment.createdAt.replace(' ', 'T') + 'Z').toLocaleString()}</small>
                            </li>
                        ))}
                    </ul>
                    {isLoggedIn && (
                        <div className="mt-4">
                            <h5>Add a Comment</h5>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            ></textarea>
                            <button className="btn btn-primary mt-2" onClick={handleAddComment}>Add Comment</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PostDetail;