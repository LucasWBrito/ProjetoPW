const {User} = require('../models/index');
const path = require('path');
const bcrypt = require('bcrypt');

const getMain = async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
};

const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({where: {username: req.body.username}});
    if (user === undefined) return res.status(404).json({message: 'Usuario não existe'});
    if (bcrypt.compare(req.body.password, user.password)) {
      res.status(200).json({message: 'Login efetuado com sucesso', url: `${user.id}`});
    } else {
      res.status(400).json({message: 'Senha Invalida'});
    }
  } catch (err) {
    console.log(err);
    res.json({message: err.message});
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.json({error: err.message});
  }
};

const createUser = async (req, res) => {
  try {
    await User.create({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
    });
    res.json({message: 'Usuario criado com sucesso'});
  } catch (err) {
    console.error(err);
    res.json({message: err.message});
  }
};

module.exports = {getMain, userLogin, createUser, getUser};
