import convict from "convict";


const config = convict({
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 80,
        env: 'PORT'
    },
    jwtSecret: {
        doc: 'JWT Secret Key',
        format: String,
        default: 'supersecretkey',
        env: 'JWT_SECRET'
    },
    jwtExpiry: {
        doc: 'JWT Token Expiry Time in seconds',
        format: Number,
        default: 3600,
        env: 'TOKEN_EXPIRY'
    }
})

config.validate({allowed: 'strict'});

export default config;

