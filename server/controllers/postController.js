import { createPost, changePostStatus, getPosts, getPostById } from '../repositories/postRepository.js';
import { addComment, getCommentsByPostId as getCommentsByPostIdRepo } from '../repositories/commentRepository.js';

export const getAllPosts = (req, res) => {
    try {
        let includeDraft = false;
        let userId;
        if(req?.user?.role == 'admin'){
            includeDraft = true;
            userId = req.user.id;
        }
        const posts = getPosts(includeDraft, userId);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

export const getPost = (req, res) => {
    const { id } = req.params;
    let userId;
    if(req.user){
        userId = req?.user?.id;
    }
    try {
        const post = getPostById(id, userId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
    }
};

export const createPostController = (req, res) => {
    const { title, content, status } = req.body;
    const author = req.user.id;
    try {
        createPost(title, content, status, author);
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
};

export const changeStatus = (req, res) => {
    const { id, status } = req.body;
    const currentUser = req.user;

    try {
        const post = getPostById(id, currentUser.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        changePostStatus(id, status);
        res.status(200).json({ message: 'Post status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating post status', error });
    }
};

export const getCommentsByPostId = (req, res) => {
    const { id } = req.params;

    try {
        const comments = getCommentsByPostIdRepo(id);
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments by postId:', error);
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};

export const addCommentToPost = (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    const userId = req?.user?.id;
    let isAdmin = false;
    if(userId && req.user.role === 'admin'){
        isAdmin = true;
    }

    try {
        const post = isAdmin ? getPostById(id, userId) : getPostById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        addComment(id, comment, userId);
        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
};

