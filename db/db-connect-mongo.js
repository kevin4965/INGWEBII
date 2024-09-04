const mongoose = require('mongoose');

const getConection = async () => {

    try {

        const url = 'mongodb://admin-mongo-iud:17h0QAhpJ1uaUQVW@ac-8rz6enz-shard-00-00.o6ov3xl.mongodb.net:27017,ac-8rz6enz-shard-00-01.o6ov3xl.mongodb.net:27017,ac-8rz6enz-shard-00-02.o6ov3xl.mongodb.net:27017/bd-inventarios?ssl=true&replicaSet=atlas-qxqq7s-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'

        await mongoose.connect(url);
        console.log('conexión exitosa');

    } catch (error) {
        console.log(error);
        
    }
    
}

module.exports = {
    getConection
}

