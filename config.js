import convict from "convict";


const config = convict({
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 8080,
        env: 'PORT'
    },
})

config.validate({allowed: 'strict'});

export default config;