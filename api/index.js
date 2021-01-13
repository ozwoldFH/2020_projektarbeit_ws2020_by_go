
import express from "express";
import data from "../src/testData.json";

const router = express.Router();

router.get("/test", (req, res) => {
    res.send({ jsonPreview: data.jsonPreview });
});

export default router;