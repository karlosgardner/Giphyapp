// Global variables
var buttons = ['Nas', 'Jayz', 'Nicki Minaj', 'Remy Ma'];


// ==================================================================
// ==================================================================


// Create buttons
var addButtons = function(){

	// Looping through the array buttons
	buttons.map(function(e){


		// Creating buttons
		var button = $("<button>");
			button.html(e);
			button.attr('data-name', e);


	// Adding buttons to the DOM
	$('.buttonsContainer').append(button);
	});

};


// Adding buttons when page loads
addButtons();

// ==================================================================
// ==================================================================


// Making a call to the Server
var runAjax = function(link){

	// Reseting the images and add new ones
	$('.images').empty();


	// Ajax Call to the server
	$.ajax({ url: link, method: "GET"})
	.done(function(response){

		// Adding images dynamically to the DOM
		for(var i = 0; i < response.data.length; i++){
			var image = $("<img>");

			// adding attributes to the images
			image.attr({
				src:response.data[i].images.fixed_height.url,
				"data-animate":response.data[i].images.fixed_height.url,
				"data-still": response.data[i].images.fixed_height_still.url,
				"data-name": 'still'
			});


			// adding the images to the DOM
			$('.images').append(image);

		}


	});
};



// ==================================================================
// ==================================================================




// Grabbing the user val, and add buttons (validation)
$('#search').on('click', function(){
	// Deleting the existing arrays in the DOM
	$('.buttonsContainer').empty();

	// Grabbing the user input
	var userVal = $("#rapper-value").val().replace(' ', '+');

	// Only add to the buttons, when input not empty
	if(userVal !== ''){
		buttons.push(userVal);
		var link = "http://api.giphy.com/v1/gifs/search?q=" + userVal + "&api_key=dc6zaTOxFJmzC";

		// Making a call to the Giphy Server
		runAjax(link);
	}

	// Reseting the input
	$("#rapper-value").val('');

	addButtons();

});

// ==================================================================
// ==================================================================


// Making a call to the server when any buttons trigerred
$('.buttonsContainer').on('click', 'button', function(){

	// Grabbing the buttan attribute name
	var buttonVal = $(this).attr('data-name');
		link = "http://api.giphy.com/v1/gifs/search?q=" + buttonVal + "&api_key=dc6zaTOxFJmzC";

	// Making a call to the server
	runAjax(link);
});


// ==================================================================
// ==================================================================



// When click any images in the DOM
$('.images').on('click', 'img', function(){

	// Pausing and Playing images back and forth
	if($(this).attr('data-name') === 'still'){
		$(this).attr('src', $(this).attr('data-still'));
		$(this).attr('data-name', 'animate');
	}

	else{
		$(this).attr('src', $(this).attr('data-animate'));
		$(this).attr('data-name', 'still');
	}
});


// ==================================================================
// ==================================================================
