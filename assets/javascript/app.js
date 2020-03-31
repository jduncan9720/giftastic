//Create a variable array to hold default buttons initially then added buttons
var animals = ["Falcon", "Chicken", "Tiger", "Snake", "Sugar Glider"];

function renderButtons(){
    //deletes the buttons before loading old and new buttons or it would duplicate.
    $("#buttons-view").empty()
    //loops through the array of animals
    for (var i = 0; i < animals.length; i++) {
        //this code is all jquery needs to generate a button
        var a = $("<button>");
        //adds a class of animal to our button
        a.addClass("animal");
        //adds a data-attribute
        a.attr("data-name", animals[i]);
        //provided the initial button text
        a.text(animals[i]);
        //adds the button to the buttons-view dive
        $("#buttons-view").append(a);
    }
}
renderButtons();

function displayAnimalGif() {
    var animal = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=Kq0p36UhODAnuZDZa2VYKZ2XwlC6XzHw&limit=10";

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        console.log(response);

    var gifDiv = $("<div class='animal'>")

    var rating = response.Rated;

    var displayRating = $("<p>").text("Rating: " + rating);

    gifDiv.append(displayRating);

        

    });
};
