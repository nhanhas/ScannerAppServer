var request = require('request');

module.exports = function(app) {

	// api ---------------------------------------------------------------------


	//Test Drive Connection
	app.post('/api/testconnection', function (req, res) {

		//TODO . estao a vir 2 chamadas aqui e  estoira
		userLogin(req.body, function (result) {
				 return res.json(result);
			 }) // return all todos in JSON format
	});


	// get all todos
	app.get('/api/todos', function (req, res) {

		res.json([{result: 'todos'}]); // return all todos in JSON format


	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function (req, res) {

		res.json([{result: 'todos'}]); // return all todos in JSON format


	});


	//Drive FX
	function userLogin(body, callback){

		var serviceWS = body.backendUrl + '/REST/UserLoginWS/userLoginCompany';

		// Build the post string from an object
		var post_data =
			"userCode=" + body.username +
			"&password=" + body.password +
			"&applicationType=" + body.appId +
			"&company=";

		request.post({
			url:   serviceWS,
			form:  post_data,
			headers: {  'Content-Type' : 'application/json',
				'Connection': 'keep-alive'}

		}, function(error, response, body){
			if(body){

				var result = JSON.parse(body);
				var cookieHeader = response.headers['set-cookie'][0].split(';')[0];

				callback({result: result, cookieHeader: cookieHeader}); // return all todos in JSON format
			}
			callback({error: 'connection error'}); // return all todos in JSON format


		});
	};

	// application -------------------------------------------------------------
	app.get('*', function (req, res) {
		res.sendfile('./www/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
}