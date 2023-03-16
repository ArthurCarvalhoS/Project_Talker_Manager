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

const writeNewTalker = async (newTalker) => {
    try {
        const talkers = await getAllTalkers();
        const allTalkers = JSON.stringify([...talkers, { ...newTalker }]);
    await fs.writeFile(join(__dirname, PATH), allTalkers);
} catch (err) {
        console.error(`Erro na escrita do arquivo: ${err.message}`);
    }
};

module.exports = {
  getAllTalkers,
  getTalkerByID,
  writeNewTalker,
};