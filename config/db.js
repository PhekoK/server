const mongoose = require('mongoose');

//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_NAME}.fa6ux.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_NAME}.fa6ux.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

//attempt to connect to database
const connection = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
(err) => {
    if(err) {
        console.log('Connection to Mongodb failed: ' + JSON.stringify(err, undefined, 2));
        return;
    }

    //Success
    console.log("Connected To DB");
}
);