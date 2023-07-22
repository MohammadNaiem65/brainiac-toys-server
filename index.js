const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

// ! App initialization and middleware
const app = express();
app.use(cors());
app.use(express.json());

// * Handling server

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@brainiactoys.eaha3r6.mongodb.net/?retryWrites=true&w=majority`;

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

// * Handling routes
app.get('/', (req, res) => {
	res.send('Welcome to Brainiac Toys');
});

// Listening request
app.listen(port, () => {
	console.log(`The app is running at port ${port}`);
});
