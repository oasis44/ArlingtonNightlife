// Dom7
var $$ = Dom7;

var app = new Framework7({
	// App root element
	root: '#app',
	// App Name
	name: 'My App',
	// App id
	id: 'com.myapp.test',
	// Enable swipe panel
	panel: {
		swipe: 'left',
	},
	// Add default routes
	routes: [{
		path: '/about/',
		url: 'about.html'
	}],
	on: {
		pageInit: function (page) {
			console.log('pageInit');
			  
			Framework7.request.get('/events', function (data) {
				console.log(data);
				var obj = JSON.parse(data);
				console.log(obj[0].type);
			});
		}
	}
});

var template = $$('#template').html();
 
// compile it with Template7
var compiledTemplate = Template7.compile(template);

var mainView = app.views.create('.view-main');
var html = compiledTemplate();
console.log(html);

$$(document.body).on('change', "select[name='eventSelect']", function(e){
	console.log('the real change');
	
	app.smartSelectOpen($('.eventSelect')[0]);
	
	Framework7.request.get('/events', function (data) {
		console.log(data);
	});
});