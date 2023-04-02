function validateAuth(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
    next();
}

function validateName(req, res, next) {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
}

function validateAge(req, res, next) {
    const { age } = req.body;
    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    // https://www.w3schools.com/jsref/jsref_isinteger.asp#:~:text=The%20Number.,Otherwise%20it%20returns%20false%20.
    if (!Number.isInteger(age) || age < 18) { 
       return res.status(400).json({ 
            message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
        });
    }
    next();
}

function validateTalk(req, res, next) {
    const { talk } = req.body;
    if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    next();
}

function validateWatchedAt(req, res, next) {
    const { watchedAt, rate } = req.body.talk;
    const date = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!date.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (rate === 0) {
    return res.status(400).json({ 
        message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
    }
    
    next();
}

function validateRate(req, res, next) {
    const { rate } = req.body.talk;
    if (!rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    if (!Number.isInteger(rate) || !(rate >= 1 && rate <= 5)) { 
           return res.status(400).json({
               message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
            });
        }
    
    next();
}

function validateRateQuery(req, res, next) {
    const { rate } = req.query;
    if (!rate) {
        return next();
    }
    const number = Number(rate);
    if (!Number.isInteger(number) || !(rate >= 1 && rate <= 5)) { 
           return res.status(400).json({
               message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
            });
        }
    
    next();
}

function validateDateQuery(req, res, next) {
    const { date } = req.query;
    if (!date) {
        return next();
    }
    const validDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (!validDate.test(date)) {
    return res.status(400).json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
    }    
    next();
}

module.exports = {
    validateAuth,
    validateName,
    validateAge,
    validateTalk,
    validateWatchedAt,
    validateRate,
    validateRateQuery,
    validateDateQuery,
};