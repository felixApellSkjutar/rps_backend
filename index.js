const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const bodyParser = require('body-parser');



// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());

const morgan = require('morgan');
app.use(morgan('dev'));

const api = require("./routes/api.js");

app.use("/", api);

app.listen((PORT), () => console.log("Server is running"));