const express = require('express');
const router = express.Router();

const {userLogin, getMain, createUser, getUser} = require('../controllers/user');

router.get('/', getMain);
router.post('/', createUser);
router.post('/u', userLogin);
router.get('/u/:id', getUser);

module.exports = router;
