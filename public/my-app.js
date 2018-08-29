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
  routes: [
    {
      path: '/about/',
      url: 'about.html',
    },
  ]
});

var mainView = app.views.create('.view-main');

$$(document.body).on('change', "select[name='eventSelect']", function(e){
	console.log('the real change');
	
	Framework7.request.get('/blah', function (data) {
		console.log(data);
	});
	
/*
	Framework7.request.get('temp.html', function (data) {
		console.log(data);
	});
*/
});