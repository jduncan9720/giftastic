//Create a variable array to hold default buttons initially then added buttons
var animals = ["Falcon", "Chicken", "Tiger", "Snake", "Sugar_Glider"];


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

//We need to click on an image and have it pull the gifs from giphy.

function displayAnimalGif() {
    var animal = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=Kq0p36UhODAnuZDZa2VYKZ2XwlC6XzHw&limit=10";

    $.ajax({ url: queryUrl, method: "GET" }).then(function(response) {
        console.log(response);

        var gifDiv = $("<div class='gifStore'>")

        var rating = response.data[0].rating;
        var displayRating = $("<p>").text("Rating: " + rating);
        gifDiv.append(displayRating);
    
        var gifs = response.data[0].images.downsized.url;
        var displaygifs = $("<img>").attr("src", gifs);
        gifDiv.append(displaygifs);
        
        $("#gifsView").prepend(gifDiv)
        
        console.log(gifs)

    });
};

$("#add-animal").on("click", function(event) {
    event.preventDefault();
    var addChar = $("#animal-input").val().trim();
    animals.push(addChar);
    renderButtons();
});

$(document).on("click", ".animal", displayAnimalGif);
//$(document).on("click", ".gifStore", displayAnimalGif);
