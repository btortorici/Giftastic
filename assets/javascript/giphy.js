


$(document).ready(function(){
    // array to hold bottons
    var cartoon =
        ["Family Guy", "Flintstones", "Simpsons", "Looney Tunes"];

    // function to make buttons

    function populateButtons(arrayToUse, classToAdd, areaToAddTo){
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++){
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);

            $(areaToAddTo).append(a);
        }
    }

    // function to populate images from api
    $(document).on("click", ".cartoon-button", function(){
        $("#images").empty();

        $(".cartoon-buttons").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = ("https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=DklCagYa3Dh0043femtmnXnX36BPGEEa&limit=10");

        //Ajax call
        $.ajax({
            url:queryURL,
            method: "GET"

        })

        .then(function(response){
            var results = response.data;

            for (var i = 0; i < results.length; i++){
                var cartoonDiv = $("<div class=\"cartoon-item\">");

                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                var cartoonImages = $("<img>");
                cartoonImages.attr("src", still);
                cartoonImages.attr("data-still", still);
                cartoonImages.attr("data-animate", animated);
                cartoonImages.attr("data-state", "still");
                cartoonImages.addClass("cartoon-images");

                cartoonDiv.append(p);
                cartoonDiv.append(cartoonImages);

                $("#images").append(cartoonDiv);
            
            }
        });
    });

    // set state from still to animated when clicking images

    $(document).on("click", ".cartoon-images", function(){
        var state = $(this).attr("data-state");

        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        }
        else {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-cartoon").on("click", function(event){
        event.preventDefault();
        var newCartoon = $("input").eq(0).val();

        if(newCartoon.length > 2) {
            cartoon.push(newCartoon);
        }

        populateButtons(cartoon, "cartoon-button", "#cartoon-buttons");

    });
populateButtons(cartoon, "cartoon-button", "#cartoon-buttons");

}); 