const jwt = require('jsonwebtoken');
const secret = 'zznaman@223';
function setUser(id, user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}

function getUser(id) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    }
    catch (error) {
        return null;
    }
    
}

module.exports = {
    setUser,
    getUser,
}