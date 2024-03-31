const mongoose = require('mongoose');

const Connection = async (username = 'muzammil1', password = 'muzammil1') => {
    const URL = `mongodb+srv://${username}:${password}@google-docs.4uiix8m.mongodb.net/?retryWrites=true&w=majority&appName=google-docs`;
    try {
        await mongoose.connect(URL);
        console.log('Database connected successfully');
    } catch (error) {   
        console.log('Error while connecting with the database ', error);
    }
}

module.exports = Connection;
