// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'ch.edu.ge.demof7', // App bundle ID
  name: 'DemoF7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      // Demo products for Catalog section
      products: [
        {
          id: '1',
          title: 'Apple iPhone 8',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          id: '2',
          title: 'Apple iPhone 8 Plus',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          id: '3',
          title: 'Apple iPhone X',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
      ]
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
});



// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});

// Initialize Sketchpad
var el = document.getElementById('sketchpad');
var pad = new Sketchpad(el, {
    line: {
        color: '#f44335',
        size: 5
    }
});
function downloadPng() {
  var data = pad.canvas.toDataURL("image/png");
  $('#imageSketch').attr("src", data);
}
// resize
window.onresize = function (e) {
  pad.resize(el.offsetWidth);
}

//calendar


// prep some variables
var title = 'My Event Title';
var loc = 'My Event Location';
var notes = 'My interesting Event notes.';
var startDate = new Date();
var endDate = new Date();

// function
function onSuccess(msg) {
  alert('Calendar success: ' + JSON.stringify(msg));
}
function onError(msg) {
  alert('Calendar error: ' + JSON.stringify(msg));
}
function createCalendar() {
  var options = window.plugins.calendar.getCreateCalendarOptions();
  options.calendarName = "MyCordovaCalendar";
  options.calendarColor = "#FF0000"; // red
  window.plugins.calendar.createCalendar(options, onSuccess, onError);
}
function openCalendar() {
  // today + 3 days
  var d = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
  window.plugins.calendar.openCalendar(d, onSuccess, onError);
}
function createCalendarEventInteractively() {
  window.plugins.calendar.createEventInteractively(title, loc, notes, startDate, endDate, onSuccess, onError);
}
function createCalendarEvent() {
  window.plugins.calendar.createEvent(title, loc, notes, startDate, endDate, onSuccess, onError);
}
