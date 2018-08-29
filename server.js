const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/public' ));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));

app.get('/blah', function (req, res) { 
	res.send('yooo');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));