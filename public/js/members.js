$(document).ready(function() {
  console.log($(".text").find("button"));
  // /* global moment */
  // when user click show most liked
  $("#most-liked").on("click", function(event) {
    event.preventDefault();
    console.log("See Most Likes button clicked");
  });
  $(document).on("click", ".likeBtn", function(event) {
    event.preventDefault();
    console.log("id =" + $(this).data("id"));
    const likedPostId = $(this).data("id");
    $.post(`/api/post/${likedPostId}/like`, likedPostId);
    // console.log('testing')
  });

  // When user clicks add-btn
  $("#post-submit").on("click", function(event) {
    event.preventDefault();

    // Make a newpost object
    const newpost = {
      user_id: $("#user")
        .val()
        .trim(),
      text: $("#post-box")
        .val()
        .trim(),
      created_at: moment().format("YYYY-MM-DD HH:mm:ss")
    };

    console.log(newpost);

    // Send an AJAX POST-request with jQuery
    $.post("/api/new", newpost)
      // On success, run the following code
      .then(function() {
        const row = $("<div>");
        row.addClass("post");

        row.append("<p>" + newpost.user_id + " posted: </p>");
        row.append("<p>" + newpost.text + "</p>");
        row.append(
          "<p>At " + moment(newpost.created_at).format("h:mma on dddd") + "</p>"
        );
        // add like button to new post
        // row.append('<button class="likeBtn"><img src="../pictures/like.jpg" alt="Like" height="40px" width="40px"></img></button>')
        row.append("<hr>");
        row.append("<br>");

        $("#post-area").prepend(row);
      });

    // Empty each input box by replacing the value with an empty string
    $("#user").val("");
    $("#post-box").val("");
  });

  // When the page loads, grab all of our posts
  $.get("/api/all", function(data) {
    if (data.length !== 0) {
      for (let i = 0; i < data.length; i++) {
        const row = $("<div>");
        row.addClass("text");
        // eslint-disable-next-line prefer-const
        let [postDate, postTime] = data[i].createdAt.split("T");
        // postTime = postTime.split(".")[0];
        // eslint-disable-next-line prettier/prettier
            const cleanTime= `${postDate} ${postTime}`

        console.log(cleanTime);
        row.append("<p>" + data[i].user_id + " posted.. </p>");
        row.append("<p>" + data[i].text + "</p>");
        /* row.append(
          "<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>"
        ); */

        // like button added to posts
        row.append(
          "<p>At " +
            moment(cleanTime, "YYYY-MM-DD hh:mm:ss").format("h:mma on dddd") +
            "</p>"
        );
        row.append(
          `<button class="likeBtn" data-id="${data[i].id}"><img src="../pictures/like.jpg" alt="Like" height="40px" width="40px" class="imgCount"/></button>`
        );
        row.append("<hr>");
        row.append("<br>");

        $("#post-area").prepend(row);
      }
    }
  });

  // load posts with highest rating first
  /* $.get("/api/likes", function(data) {
    if (data.length !== 0) {
      for (let i = 0; i < data.length; i++) {
        const row = $("<div>");
        row.addClass("text");

        row.append("<p>" + data[i].user_id + " posted.. </p>");
        row.append("<p>" + data[i].text + "</p>");
        row.append(
          "<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>"
        );
        // like button added to posts
        row.append(
          `<button class="likeBtn" data-id="${data[i].id}"><img src="../pictures/like.jpg" alt="Like" height="40px" width="40px" class="imgCount"/></button>`
        );
        row.append("<hr>");
        row.append("<br>");

        $("#post-area").prepend(row);
      }
    }
  }); */
});

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
});
