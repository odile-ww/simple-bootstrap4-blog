$(function() {
  //load the content in Favorite books section from the json file, using Mustache
  $.getJSON("books.json", function(data) {
    var template = $("#bookstpl").html();
    var html = Mustache.to_html(template, data);
    $("#books-wrap").html(html);

    //Setup the Cycle plugin to create a carousel
  $("#books-wrap").cycle ({
      fx: "fade",
      pause: 1,
      next: "#next-btn",
      prev: "#prev-btn"
    });
  });

  //get random quote from Forismatic API
  var quote;
  var author;
  function getQuote() {
    $.ajax({
      url: "http://api.forismatic.com/api/1.0/",
      dataType: "jsonp",
      jsonp: "jsonp",
      data: {
        method: "getQuote",
        format: "jsonp",
        lang: "en"        
      },
      success: function(resp) {
        console.log(resp);
        quote = resp.quoteText;
        author = resp.quoteAuthor;
        $("#quote").text(quote);
        if (author) {
          $("#author").text(author);
        } else {
          $("#author").text("Unknown");
        }
      }
    });
  }
  getQuote();
   // change quote
  $("#new-quote").on("click", function() {
    getQuote();
  });
});