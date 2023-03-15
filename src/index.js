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

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const { getTalkerByID } = talkers;
  const idTalker = await getTalkerByID(Number(id));
  if (!idTalker) {
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } else {
  res.status(200).json(idTalker);
  }
});
