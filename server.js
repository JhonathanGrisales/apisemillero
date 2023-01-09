const express = require("express");
const cors = require('cors');
const { download } = require("./model");

const app = express();
app.use(cors());

app.get("/", download);

app.listen(3000, () => console.log("Conection  is ok in port 3000."));
