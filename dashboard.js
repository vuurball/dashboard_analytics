var analytics = new Firebase('https://olgabdb-f2ace.firebaseio.com/');


$(document).on('ready', function () {
  var $totalVisitors = $('#total-visitors');
  analytics.child('totalVisitors').on('value', function (snapshot) {
    $totalVisitors.text(snapshot.val());
  });
});


var $activeVisitors = $('#active-visitors');
var activeVisitors = analytics.child('activeVisitors');
activeVisitors.on('child_added', function (snapshot) {
  var n = snapshot.name();
  var v = snapshot.val();
  var arriveDate = new Date(v.arrivedAt);
  $activeVisitors.prepend(
	'<tr id="active-visitor' + n + '">'+
      '<td>' + v.path + '</td>'+
      '<td>' + v.userAgent + '</td>'+
      '<td>' + arriveDate.getHours() +':' + arriveDate.getMinutes() +':'+ arriveDate.getSeconds()+'</td>  '+ 
    '</tr>'
  );
});

var $pastVisitors = $('#past-visitors');
var pastVisitors = analytics.child('pastVisitors');
pastVisitors.on('child_added', function (snapshot) {
  var n = snapshot.name();
  var v = snapshot.val();
  var arriveDate = new Date(v.arrivedAt);
  var leftDate = new Date(v.leftAt);
  $pastVisitors.prepend(
  	'<tr id="past-visitor' + n + '">'+
      '<td>' + v.path + '</td>'+
      '<td>' + v.userAgent + '</td>'+
      '<td>' + arriveDate.getHours() +':' + arriveDate.getMinutes() +':'+ arriveDate.getSeconds()+'</td>  '+ 
      '<td>' + leftDate.getHours() +':' + leftDate.getMinutes() +':'+ leftDate.getSeconds()+'</td>  '+ 
      '<td>' + ((v.leftAt - v.arrivedAt) / 1000) +'</td>  '+ 
    '</tr>'
  );
});

activeVisitors.on('child_removed', function (snapshot) {
  $('#active-visitor' + snapshot.name()).remove(); 
});


pastVisitors.on('child_removed', function (snapshot) {
    $('#past-visitor' + snapshot.name()).remove(); 
});