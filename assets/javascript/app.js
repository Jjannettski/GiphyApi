 
//Global array that holds all the stock and user inputs
 var topics = ["cats", "dogs", "birds"];


//Function tht creates the buttons and appends them to the page

function createButtons(){

$(".gif-buttons").empty();


//For loop that actually creates the buttons
for (var i = 0; i < topics.length; i++) {


  var topicsButtons = $("<button>");
  var pText = topics [i]
  topicsButtons.append(pText);
  topicsButtons.attr("data-animal", topics[i]);
  $(".gif-buttons").append(topicsButtons);
  
}
}


//On click of the submit button, push the user input into the topics array, then create the buttons again.
 $("#save-name").on("click", function(event){

  event.preventDefault();

  var gif = $("#your-name").val().trim();
  topics.push(gif);

  createButtons();

  });

//Initiates the ajax call
 function ajaxCallFunction () {

      var animal = $(this).attr("data-animal");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";


      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
       
        console.log(response);


        var results = response.data;

        $("#gifs-appear-here").empty();


//Authorizes the results to be printed to the page
       for (var i = 0; i < results.length; i++) {

        var animalDiv = $("<div>");
        var p = $("<p>").text("Rating:" + results[i].rating);

      

        var animalImage = $("<img>");

        //animalImage.attr("src", results[i].images.fixed_height_small_still.url);
        animalImage.attr("src", results[i].images.fixed_height_small.url);
        animalImage.attr("data-still", results[i].images.fixed_height_small_still.url);
        animalImage.attr("data-animate",results[i].images.fixed_height_small.url);
        animalImage.attr("data-state", "still");
        animalImage.addClass("gif");
        animalDiv.append(p);
        animalDiv.append(animalImage);
        $("#gifs-appear-here").prepend(animalDiv);




       }


      });
    }

//On button click, execute the ajax call.
$(document).on("click", "button", ajaxCallFunction)

 createButtons();


// conditionals to play and pause gifs
$(".gif").on("click", function() {


var state = $(this).attr("data-state");

if (state === "still"){
  $(this).attr("src", $(this).attr("data-animate"));
  $(this).attr("data-state", "animate");
}else {
  $(this).attr("src", $(this).attr("data-still"));
  $(this).attr("data-state", "still");
}


});