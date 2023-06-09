const validatelogin = (req, res, next) => {
const emailValidation = /\S+@\S+\.\S+/;
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    if (!emailValidation.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
        next();
  };

module.exports = {
    validatelogin,
};