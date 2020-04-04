//Create a variable array to hold default buttons initially then added buttons
var games = ["The Witcher 3", "Cyberpunk 2077", "Titanfall 2", "Breath of the Wild", "God of War", "The Last of Us", "Doom 2016"];


function renderButtons(){
    //deletes the buttons before loading old and new buttons or it would duplicate.
    $("#buttons-view").empty()
    //loops through the array of games
    for (var i = 0; i < games.length; i++) {
        //this code is all jquery needs to generate a button
        var a = $("<button>");
        //adds a class of game to our button
        a.addClass("game");
        //adds a data-attribute
        a.attr("data-name", games[i]);
        //provided the initial button text
        a.text(games[i]);
        //adds the button to the buttons-view dive
        $("#buttons-view").append(a);
        
    }
}
renderButtons();

//We need to click on an image and have it pull the gifs from giphy.

function displaygameGif() {
    $("#gifsView").empty();
    var game = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=Kq0p36UhODAnuZDZa2VYKZ2XwlC6XzHw&limit=10";
   
    $.ajax({ url: queryUrl, method: "GET" }).then(function(response) {
        console.log(response);
        
        for (i = 0; i < response.data.length; i++) {

            var gifDiv = $("<div class='gifStore'>");

            var gifs = response.data[i].images.fixed_height_still.url;
            var animateGifs = response.data[i].images.fixed_height_downsampled.url;
            var displayGifs = $("<img>").attr("src", gifs);
            displayGifs.attr("still-image", gifs);
            displayGifs.attr("looping-image", animateGifs);
            displayGifs.attr("state", "still");
            gifDiv.append(displayGifs);

            var rating = response.data[i].rating;
            var displayRating = $("<p>").text("Rating: " + rating);
            gifDiv.append(displayRating);
    
            $("#gifsView").prepend(gifDiv);
        }

    });
};

$("#add-game").on("click", function(event) {
    event.preventDefault();
    var addChar = $("#game-input").val().trim();
    games.push(addChar);
    renderButtons();
});

$(document).on("click", ".game", displaygameGif);

$(document).on("click", "img", function(){
    var state = $(this).attr("state");

    if(state === "still"){
         var animatedUrl = $(this).attr("looping-image");
        $(this).attr("src", animatedUrl);
        $(this).attr("state", "animate");
    } else {
        var stillUrl = $(this).attr("still-image");
        $(this).attr("src", stillUrl);
        $(this).attr("state", "still");
    }
});