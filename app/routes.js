
module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		res.json([{result: 'todos'}]); // return all todos in JSON format


	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		res.json([{result: 'todos'}]); // return all todos in JSON format


	});


	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./www/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};