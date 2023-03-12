module.exports = {
    port: process.env.PORT || 8003,
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/v-ecommerce',
    env: process.env.NODE_ENV || 'development',
};