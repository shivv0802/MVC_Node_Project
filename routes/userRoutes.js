const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser
} = require('../controllers/userController');


router.post('/', createUser);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

module.exports = router;
