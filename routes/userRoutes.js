const express = require('express');
const router = express.Router();


const { authenticateAndAuthorize } = require('../middleware/auth.middlewares');
const {validateUserData} = require('../middleware/validation.middleware')
const { getAllUser, deleteOneUser, updateOneUser, createUser, loginUser } = require('../controllers/user.controller');


router.post('/create', validateUserData, createUser);
router.post('/login', loginUser);
router.get('/getAll', authenticateAndAuthorize('admin'), getAllUser);
router.delete('/:id',authenticateAndAuthorize('admin'), deleteOneUser);
router.put('/:id',validateUserData,authenticateAndAuthorize('admin'), updateOneUser);

module.exports = router;
