//import config, { nodeEnv, logTest } from './config.js';
//logTest('This is a test message');

import config from "./config.js";
import express from "express";
import apiRouter from "./api/index.js";

const server = express();

server.set("view engine", "ejs");

server.get("/", (req, res) => {
    res.send("Hello Express");
});

server.use("/api", apiRouter);
server.use(express.static("public"));

server.listen(config.port, () => {
    console.info("Server listening to port ", config.port);
});



