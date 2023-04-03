const fs = require('fs').promises;
const { join } = require('path');

const PATH = '/talker.json';
const readTalkerFile = async () => {
    try {
        const contentFile = await fs.readFile(join(__dirname, PATH), 'utf-8');
        return JSON.parse(contentFile);
    } catch (err) {
        return null;
    }
};

const getAllTalkers = async () => {
    const talkers = await readTalkerFile();
    return talkers;
};

const getTalkerByID = async (id) => {
    const talkers = await readTalkerFile();
    return talkers.find((t) => t.id === id);
};

const getRateById = async (id) => {
    const talkers = await readTalkerFile();
    return talkers.find((t) => t.id === id);
};

const getTalkerByNameRate = async (name, rate) => {
    const talkers = await readTalkerFile();
    const talkerName = talkers.filter((t) => t.name.includes(name));
    if (!name) {
        return talkers.filter((t) => t.talk.rate === Number(rate));
    }
    if (!rate) {
        return talkerName;
    }
    return talkerName.filter((t) => t.talk.rate === Number(rate));
};

const getTalkerByRateDate = async (rate, date) => {
    const talkers = await readTalkerFile();
    const talkerRate = talkers.filter((t) => t.talk.rate === Number(rate));
    if (!date) {
        return talkerRate;
    }
    if (!rate) {
        return talkers.filter((t) => t.talk.watchedAt === date);
    }
    return talkerRate.filter((t) => t.talk.watchedAt === date);
};

const getTalkerByDateName = async (date, name) => {
    const talkers = await readTalkerFile();
    const talkerName = talkers.filter((t) => t.name.includes(name));
    if (!name) {
        return talkers.filter((t) => t.talk.watchedAt === date);
    }
    if (!date) {
        return talkerName;
    }
    return talkerName.filter((t) => t.talk.watchedAt === date);
};
const getTalkerByNameRateAndDate = async (name, rate, date) => {
    const talkers = await readTalkerFile();
    const talkerName = talkers.filter((t) => t.name.includes(name));
    const talkerNameRate = talkerName.filter((t) => t.talk.rate === Number(rate));
    const allTalkers = talkerNameRate.filter((t) => t.talk.watchedAt === date);
    if (!date) {
        return getTalkerByNameRate(name, rate);
    }
    if (!rate) {
        return getTalkerByDateName(date, name);
    }
    if (!name) {
        return getTalkerByRateDate(rate, date);
    }
    return allTalkers;
};

const writeNewTalker = async (newTalker) => {
    try {
        const talkers = await getAllTalkers();
        const allTalkers = JSON.stringify([...talkers, { ...newTalker }]);
    await fs.writeFile(join(__dirname, PATH), allTalkers);
} catch (err) {
        console.error(`Erro na escrita do arquivo: ${err.message}`);
    }
};

const updateTalker = async (id, updatingTalker) => {
    const talkers = await getAllTalkers();
    const updated = { id, ...updatingTalker };
    const updatedTalker = talkers.reduce((list, currentTalker) => {
        if (currentTalker.id === updated.id) return [...list, updated];
        return [...list, currentTalker];
    }, []);

    const updatedData = JSON.stringify(updatedTalker);
    try {
        await fs.writeFile(join(__dirname, PATH), updatedData);
        return updated;
    } catch (error) {
        console.error(`Erro na escrita do arquivo: ${error.message}`);
    }
};

const updateTalkerRate = async (id, rate) => {
    const talkers = await getAllTalkers();
    const index = talkers.findIndex((t) => t.id === Number(id));
    talkers[index].talk.rate = rate;
    const updatedData = JSON.stringify(talkers);
    try {
        await fs.writeFile(join(__dirname, PATH), updatedData);
        const teste = await getAllTalkers();
        console.log(teste);
    } catch (error) {
        console.error(`Erro na escrita do arquivo: ${error.message}`);
    }
};

const deleteTalker = async (id) => {
    const talkers = await getAllTalkers();
    const filteringTalker = talkers.filter((t) => t.id !== Number(id));
    const deletedTalker = JSON.stringify(filteringTalker);
    try {
    await fs.writeFile(join(__dirname, PATH), deletedTalker);
    } catch (error) {
        console.error(`Erro na escrita do arquivo: ${error.message}`);
    }
};

module.exports = {
  getAllTalkers,
  getTalkerByID,
  getRateById,
  getTalkerByNameRateAndDate,
  writeNewTalker,
  updateTalker,
  updateTalkerRate,
  deleteTalker,
};