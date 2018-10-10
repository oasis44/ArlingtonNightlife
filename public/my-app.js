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
			path: '/',
			async: function (routeTo, routeFrom, resolve, reject) {
				resolve({
				  componentUrl: './main.html'
				})
			}
		},
		{
			path: '/about/',
			url: 'about.html'
		},
		{
			path: '/venues/:venueId',
			async: function (routeTo, routeFrom, resolve, reject) {
				resolve({
				  componentUrl: './venue-details.html'
				})
			}
		}
	]
});

// Add Right/Main View
mainView = app.views.create('.view-main', {
	url: '/'
});