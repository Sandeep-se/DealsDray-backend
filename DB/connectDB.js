const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect("mongodb://localhost:27017/deals", {useNewUrlParser: true,useUnifiedTopology: true})

    mongoose.connection.on('error', console.error.bind(console, 'connection error'));
    mongoose.connection.once('open', () => console.log('MongoDB connected'));
};

module.exports = connectDB;