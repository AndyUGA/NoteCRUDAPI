
var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {


	app.get('/', (req, res) => {
		var indexLoc = __dirname + "/index.html";
		console.log(indexLoc);
		res.sendFile(indexLoc);

	});


	//Get all notes
	app.get('/notes/all', (req, res) => {

		var coll = db.collection("notes");
		coll.find({}).toArray(function (err, result) {
			if(err) {
				res.send({ 'error': ' An error has occurred'});
			} else {
				console.log(result);
				res.send(JSON.stringify(result, null, "\n"));
				//res.send(result);
			}
		});
	});


	//Get Note based on id
	app.get('/notes/:id', (req, res) => {
		const id = req.params.id;


		const details = {'_id': new ObjectID(id) };
		db.collection('notes').findOne(details, (err, item) => {
			if(err) {
				res.send({ 'error': ' An error has occurred'});
			} else {
				res.send(item);
			}
		});
	});

	//Delete Note
	app.delete('/notes/delete/:id', (req, res) => {
		const id = req.params.id;


		const details = {'_id': new ObjectID(id) };
		db.collection('notes').remove(details, (err, item) => {
			if(err) {
				res.send({ 'error': ' An error has occurred'});
			} else {
				res.send('Note ' + id + ' has been deleted!');
			}
		});
	});

	//Update existing note 
	app.put('/notes/:id', (req, res) => {
		const id = req.params.id;
		const note = {  contents: req.body.contents,title: req.body.title };

		const details = {'_id': new ObjectID(id) };
		db.collection('notes').update(details, note, (err, item) => {
			if(err) {
				res.send({ 'error': ' An error has occurred'});
			} else {
				res.send(item);
			}
		});
	});



	//Create note
	app.post('/notes', (req,res) => {

		const note = {  contents: req.body.contents,title: req.body.title };
		db.collection('notes').insert(note, (err, result) => {
			if(err) {
				res.send({'error': 'An error has occurred'});
			} else {
				res.send(result.ops[0]);
			}
		});



	});

	

};