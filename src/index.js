const express = require('express');
const talkers = require('./talkers');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
    const { getAllTalkers } = talkers;
    const allTalkers = await getAllTalkers();
    if (allTalkers) {
    res.status(200).json(allTalkers);
    } else {
    res.status(200).json([]);
    }
});
