var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Person = require('./Person.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/create', (req, res) => {
	var newPerson = new Person ({
		name: req.body.name,
		age: req.body.age,
	});

	newPerson.save( (err) => { 
		if (err) {
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		}
		else {
		    res.render('created', {person : newPerson});
		}
	}); 

});

app.use('/all', (req, res) => {
	Person.find((err, allPeople) => {
		if (err) {
			res.type('html').status(500);
			res.send('Error: ' + err);
		}
		else if (allPeople.length == 0) {
			res.type('html').status(200);
			res.send('There are no people');
		}
		else {
			res.render('showAll', {people: allPeople});
		}
	});
});

app.use('/person', (req, res) => {
	const searchName = req.query.name;
	Person.findOne({name: searchName}, (err, person) => {
		if (err) {
			res.type('html').status(500);
			res.send('Error: ' + err);
		}
		else if (!person) {
			res.type('html').status(200);
			res.send('No person named ' + searchName);
		}
		else {
			res.render('personInfo', {person: person});
		}
	});
});

app.use('/update', (req, res) => {
	const updateName = req.body.username;
	Person.findOne({name: updateName}, (err, person) => {
		if (err) {
			res.type('html').status(500);
			res.send('Error: ' + err);
		}
		else if (!person) {
			res.type('html').status(200);
			res.send('No person named ' + updateName);
		}
		else {
			person.age = req.body.age;
			person.save((err) => {
				if (err) {
					res.type('html').status(500);
					res.send('Error: ' + err)
				}
				else {
					res.render('updated', {person: person});
				}
			})
		}
	})
})

app.use('/public', express.static('public'));

app.use('/', (req, res) => { res.redirect('/public/index.html'); } );

app.listen(3000,  () => {
	console.log('Listening on port 3000');
});