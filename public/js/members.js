
$(document).ready(function () {
  /* global moment */

  // When user clicks add-btn
  $('#post-submit').on('click', function (event) {
    event.preventDefault()

    // Make a newpost object
    var newpost = {
      user_id: $('#user').val().trim(),
      text: $('#post-box').val().trim(),
      created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    console.log(newpost)

    // Send an AJAX POST-request with jQuery
    $.post('/api/new', newpost)
    // On success, run the following code
      .then(function () {
        var row = $('<div>')
        row.addClass('post')

        row.append('<p>' + newpost.user_id + ' posted: </p>')
        row.append('<p>' + newpost.text + '</p>')
        row.append('<p>At ' + moment(newpost.created_at).format('h:mma on dddd') + '</p>')

        $('#post-area').prepend(row)
      })

    // Empty each input box by replacing the value with an empty string
    $('#user').val('')
    $('#post-box').val('')
  })

  // When the page loads, grab all of our posts
  $.get('/api/all', function (data) {
    if (data.length !== 0) {
      for (var i = 0; i < data.length; i++) {
        var row = $('<div>')
        row.addClass('text')

        row.append('<p>' + data[i].user_id + ' posted.. </p>')
        row.append('<p>' + data[i].text + '</p>')
        row.append('<p>At ' + moment(data[i].created_at).format('h:mma on dddd') + '</p>')

        $('#post-area').prepend(row)
      }
    }
  })
})

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then(function (data) {
    $('.member-name').text(data.email)
  })
})
