const express = require("express");
const router = require("./routes");
const cors = require("./cors");
const app = express();

const stage = process.env.STAGE || 'dev'
 
app.disable('x-powered-by')
app.use(express.json())
app.use(cors)
app.use(`/${stage}/app`, router)

module.exports = app;