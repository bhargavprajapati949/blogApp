import { createPost, changePostStatus, getPosts, getPostById } from '../repositories/postRepository.js';
import { addComment } from '../repositories/commentRepository.js';

export const getAllPosts = (req, res) => {
    try {
        const posts = getPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

export const getPost = (req, res) => {
    const { id } = req.params;
    try {
        const post = getPostById(id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
    }
};

export const addPost = (req, res) => {
    const { title, content, status } = req.body;
    try {
        createPost(title, content, status);
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
};

export const changeStatus = (req, res) => {
    const { id, status } = req.body;
    try {
        const post = getPostById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        changePostStatus(id, status);
        res.status(200).json({ message: 'Post status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating post status', error });
    }
};

export const addCommentToPost = (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    try {
        const post = getPostById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        addComment(id, comment, req.user.username);
        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
};