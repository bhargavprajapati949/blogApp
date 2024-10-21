export const postSchema = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        content: { type: 'string' },
        status: { type: 'string', enum: ['Draft', 'Published'] }
    },
    required: ['title', 'content', 'status'],
    additionalProperties: false
};

export const changeStatusSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        status: { type: 'string', enum: ['Draft', 'Published'] }
    },
    required: ['id', 'status'],
    additionalProperties: false
};

export const commentSchema = {
    type: 'object',
    properties: {
        comment: { type: 'string' }
    },
    required: ['comment'],
    additionalProperties: false
};