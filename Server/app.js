const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const route = require("./route/route");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(cookieParser());
app.use(helmet({ contentSecurityPolicy: false }));

route(app);

module.exports = app;