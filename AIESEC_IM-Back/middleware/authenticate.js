const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).send({ message: 'Please authenticate.' });
    }
}

module.exports = authenticate;