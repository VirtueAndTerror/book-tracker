const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/user-route');
const bookRoute = require('./routes/book-route');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api/auth', userRoute);
app.use('/', bookRoute);

// DATABASE CONNECTION SETTINGS
mongoose
	.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Successfuly connected to MongoDB'))
	.catch(() => {
		throw new Error('Failed attempt to connect to database');
	});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server is up and running on port ${port} yaay :)`);
});

module.exports = app;
