const express = require('express');

const talkers = require('../talkers');

const router = express.Router();

router.get('/talker', async (_req, res) => {
    const { getAllTalkers } = talkers;
    const allTalkers = await getAllTalkers();
    if (allTalkers) {
    res.status(200).json(allTalkers);
    } else {
    res.status(200).json([]);
    }
});