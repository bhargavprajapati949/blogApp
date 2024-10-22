const API_URL = 'http://localhost:8080/api';

export const fetchPosts = async () => {
    try {
        const response = await fetch(`${API_URL}/posts`, {
            credentials: 'include'
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const fetchPostById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            credentials: 'include'
        });
        if (!response.ok) {
            return { status: response.status, data: null };
        }
        const data = await response.json();
        return { status: response.status, post: data };
    } catch (error) {
        console.error('Error fetching post by ID:', error);
        throw error;
    }
};

export const createPost = async (post) => {
    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post),
            credentials: 'include'
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

export const changePostStatus = async (id, status) => {
    try {
        const response = await fetch(`${API_URL}/posts/change-post-status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ id, status })
        });
        if (!response.ok) {
            throw new Error('Error changing post status');
        }
        return await response.json();
    } catch (error) {
        console.error('Error changing post status:', error);
        throw error;
    }
};

export const getCommentsByPostId = async (postId) => {
    try {
        const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Error fetching comments');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

export const addCommentToPost = async (postId, comment) => {
    try {
        const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment }),
            credentials: 'include'
        });
        return await response.json();
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};

