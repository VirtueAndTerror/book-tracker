const jwt = require('jsonwebtoken');

const middlewareObj = {
	auth(req, res, next) {
		const token = req.header('x-auth-token');
		if (!token) return res.status(401).send('Access denied. No token provided');

		try {
			const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
			req.user = decoded;

			next();
		} catch (ex) {
			res.status(400).send('Invalid token');
		}
	},
	admin(req, res, next) {
		if (!req.user.isAdmin) return res.status(403).send('Access denied');

		next();
	},
};

module.exports = middlewareObj;
