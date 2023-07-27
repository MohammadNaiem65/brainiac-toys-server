const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

// ! App initialization and middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
	res.setHeader(
		'Content-Security-Policy',
		"default-src 'self'; img-src 'self' data:"
	);
	return next();
});

// * Handling server
// const uri = process.env.MONGODB_URI;
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		// Connect the client to the server
		await client.connect();

		// Get the collections
		const toyCollection = client.db('brainiac').collection('toys');

		// * Handling routes
		// toys routes
		app.get('/', (req, res) => {
			res.send('Welcome to Brainiac Toys REST Api');
		});

		app.get('/toys', async (req, res) => {
			const toys = await toyCollection.find().toArray();
			res.send(toys);
		});

		app.get('/toy/:id', async (req, res) => {
			const id = new ObjectId(req.params.id);
			const toy = await toyCollection.findOne(
				{ _id: id },
				{ projection: { _id: 0 } }
			);
			res.send(toy);
		});
		
		app.get('/top-toys', async (req, res) => {
			const result = await toyCollection
				.find()
				.sort({ rating: -1 })
				.limit(8)
				.toArray();
			res.send(result);
		});

		// Send a ping to confirm a successful connection
		await client.db('admin').command({ ping: 1 });
		console.log(
			'Pinged your deployment. You successfully connected to MongoDB!'
		);
	} catch (err) {
		console.log(err);
	}
}
run().catch(console.dir);

// Listening request
app.listen(port, () => {
	console.log(`The app is running at port ${port}`);
});
