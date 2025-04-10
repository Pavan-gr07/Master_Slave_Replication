const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://192.168.100.153:27017,192.168.100.197:27017/mydb?replicaSet=rs0';


const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            replicaSet: 'rs0',
            readPreference: 'primary',
            retryWrites: true,
            w: 'majority'
        });
        console.log('MongoDB connected to replica set');
    } catch (err) {
        console.error('MongoDB connection error', err);
        process.exit(1);
    }
};

module.exports = connectDB;
