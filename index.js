const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
var morgan = require('morgan')
const path = require("path")


const filmRouter = require('./routes/film')
const authRouter = require('./routes/auth')
const revueRouter = require('./routes/revue')
const favorisRouter = require('./routes/favoris')


const port = process.env.PORT || 3004;
const db_local = 'mongodb://localhost:27017/movies'
const db_hosted = 'mongodb+srv://salah:salah@cluster0.glozs.mongodb.net/test'

app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());

app.use("/films", filmRouter)
app.use("/auth", authRouter)
app.use(revueRouter)
app.use(favorisRouter)
app.use("/",express.static(path.join("angular")))

mongoose.connect(db_hosted, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"angular","index.html"))
})

app.listen(port, () => {
    console.log('app running on port ' + port);
})
