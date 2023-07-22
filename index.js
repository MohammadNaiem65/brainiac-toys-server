const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

// ! App initialization and middleware
const app = express();
app.use(cors());
app.use(express.json());

// * Handling routes
app.get('/', (req, res) => {
	res.send('Welcome to Brainiac Toys');
});

// Listening request
app.listen(port, () => {
	console.log(`The app is running at port ${port}`);
});
