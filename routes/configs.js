const configs = {
    app: {
        port: process.env.PORT || '3000',
        res_url: process.env.URL || 'http://localhost:3000'
    },
    db: {
        url : process.env.MONGODB_URI || 'mongodb://localhost',
        port : process.env.MONGO_PORT || '27017',
        name : process.env.MONGO_DBNAME || 'modelsdb'
    }
};

module.exports = configs;

