const config = require('config.json');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

// users hardcoded for simplicity, store in a db for production applications
// const users = [
//     { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
//     { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
// ];

module.exports = {
    authenticate,
    getAll,
    getById
};

async function authenticate({ username, password }) {
    
    const user = (await User.findOne({username: username, password: password}).exec())._doc;

    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}


async function getAll() {
    return User.find().map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = (await User.findOne({id: parseInt(id)}).exec())._doc;
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}