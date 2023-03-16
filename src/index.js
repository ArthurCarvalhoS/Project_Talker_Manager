const express = require('express');
const talkers = require('./talkers');
const logged = require('./logged.json');
const { validatelogin } = require('./middlewares/validateLogin');
const {
  validateAuth, 
  validateName, 
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate, 
} = require('./middlewares/validateTalker');

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
// https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
const rand = () => {
  const random = Math.random(0).toString(36).substring(2);
  return random;
};
const randomToken = (l) => (rand() + rand()).substring(0, l);

  app.post('/login', validatelogin, (req, res) => {
    const login = { ...req.body };
    const idToken = randomToken(16);
    logged.push(login);
    res.status(200).json({ token: idToken });
});

app.post('/talker', 
validateAuth,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  const { name, age, talk } = req.body;

  const talker = await talkers.getAllTalkers();
  const newTalker = {
    name,
    age,
    id: talker.length + 1,
    talk,
  };
  await talkers.writeNewTalker(newTalker);
  res.status(201).json(newTalker);
});
