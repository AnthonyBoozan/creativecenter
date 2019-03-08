var timeconverter = function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
  var time = date + ' ' + month + ' ' + year + ' ' + (hour % 12) + ':' + min;
  if(hour > 12){
    time = time + ' PM';
  }
  else{
    time = time + ' AM'
  }

  return time;
}
