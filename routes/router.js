const router = require('express').Router();
const userController = require('../controllers/userController');

router
.get('/', userController.getUsers)
.get('/:id', userController.getUserById)
.post('/', userController.createNewUser)
.put('/:id', userController.updateUser)
.delete('/:id', userController.deleteUserById);

module.exports = router;