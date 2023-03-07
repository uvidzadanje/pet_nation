const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const signToken = (payload, time) => {
    const {id, type} = payload;
    return jwt.sign({ id:id, type: type }, process.env.JWT_SECRET_KEY, {
        expiresIn: time
    });
}

const encodeToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = {
    signToken,
    encodeToken
}