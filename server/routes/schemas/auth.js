export const createUserSchema = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        name: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'string', enum: ['admin', 'user'] },
    },
    required: ['username', 'name', 'password', 'role'],
    additionalProperties: false
};

export const loginSchema = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        password: { type: 'string' },
    },
    required: ['username', 'password'],
    additionalProperties: false
};