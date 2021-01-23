//import config, { nodeEnv, logTest } from './config.js';
//logTest('This is a test message');

import config from "./config.js";
import express from "express";
import apiRouter from "./api/index.js";
import apiFacebook from "./api/facebook.js";
import sassMiddleware from "node-sass-middleware";
import path from "path";

const server = express();

// hacky code just to use __dirname -> not available in ES module
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(sassMiddleware({
    src: path.join(__dirname, "sass"),
    dest: path.join(__dirname, "public")
}));


server.set("view engine", "ejs");

server.get("/", (req, res) => {
    res.render("index", {
        content: "...",
    });
});

server.use("/api", apiRouter);
server.use("/facebook", apiFacebook);
server.use(express.static("public"));

// json
//server.use(express.json());

server.listen(config.port, () => {
    console.info("Server listening to port ", config.port);
});



