import moment from 'moment';

function formatDate(datestring) {
  var date = moment(datestring),
      now = moment();

  if (now.diff(date, "days") > 1) {

    return date.format("Do MMMM YYYY, h:mm:ss a");

  } else if (now.diff(date, "minutes") > 60) {

    var diffHours = now.diff(date, "hours");
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

  } else if (now.diff(date, "seconds") > 60) {

    var diffMinutes = now.diff(date, "minutes");
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;

  } else {
    return "Just now!";
  }
}

export default formatDate;