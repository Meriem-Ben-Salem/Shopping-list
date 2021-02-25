const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//path
const path = require ('path');

const items = require('./routes/api/items');

const app = express();


// BodyParser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

/*const mongooseArgs = {
    useNewParser: true,

}*/

// connect to Mongo
mongoose
    //.connect(db, mongooseArgs)
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    });
}



// Use routes
app.use('/api/items', items);







