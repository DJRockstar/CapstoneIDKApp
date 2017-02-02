   $('document').ready(function(){
   	$body = $("body");
	$(document).on({
	    ajaxStart: function() { $body.addClass("loading");    },
	    ajaxStop: function() { $body.removeClass("loading"); }    
	});
    if (navigator.geolocation){ //When user "Allows" to share the location
        navigator.geolocation.getCurrentPosition(function(position){
        $('.js-input-form').on('keypress', function(){
			$('select').prop('disabled',true);
		});
         var latlon = position.coords.latitude + "," + position.coords.longitude;
            var map;
            var service;
            var usersLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

            map = new google.maps.Map(document.getElementById('map'), {
              center: usersLocation,
              zoom: 15
            });
        $('.js-input-form').on('submit',function(e){
        	$('select').prop('disabled',false);
        	$('.js-input').remove();
			$('div.js-query').remove();
			$('div.zero_results').remove();
			$('.js-search-form').prop("disabled", true);
			$('div.idk-image').hide();
        	e.preventDefault();   

            var request = {
              query: $('.searchPlace').val(),
              location: usersLocation,
              radius: '500',
              openNow: true
            };

            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, function(results, status) {
             if (status == google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                console.log(results[i]);
                if(results[i].rating>4 || results[i].opening_hours.open_now){
					var result = "<div class='js-input'>" + "<strong>" + results[i].name + "</strong>" + " " +"<img class='img-icon' src =" + results[i].icon + ">" + "<br>" + 'Rating: ' + results[i].rating + "<br>" +"Address: " + "<a href='http://maps.google.com/maps?q=" +results[i].formatted_address + "'class='place_address'>" + results[i].formatted_address + "</a>"+ "</div>";
					$('body').append(result);
					if(results[i].types[0]==="meal_delivery"){
			          var result = "<div class='js-query'>" + "<strong>" + results[i].name + "</strong>" + " " + "<img class='img-icon' src=" + results[i].icon + ">" + "<br>" + 'Rating: ' + results[i].rating + "<br>" +"Address: " + "<a href='http://maps.google.com/maps?q=" +results[i].formatted_address + "'class='place_address'>" + results[i].formatted_address + "</a>"+ "<p> Home Delivery is Available </p>"  + "</div>";
			          $('body').append(result);
		       		 }
				  }
           	   }
          	 }
           });
        });
        
          $('.js-search-form button').on('click',function(e){
        	$('select').prop('disabled',false);
        	$('.js-input').remove();
    			$('div.js-query').remove();
    			$('div.zero_results').remove();
    			$('.js-search-form').prop("disabled", true);
    			$('div.idk-image').hide();
        	e.preventDefault();   

            var request = {
              query: $('.js-query option:selected').text(),
              location: usersLocation,
              radius: '500',
      		    maxPriceLevel: 3
            };
            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, function(results, status) {
             if (status == google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                console.log(results[i]);
                if(results[i].rating>$('.js-rating option[value]:selected').val()){
				  var result = "<div class='js-query'>" + "<strong>" + results[i].name + "</strong>" + " " + "<img class='img-icon' src=" + results[i].icon + ">" + "<br>" + 'Rating: ' + results[i].rating + "<br>" +"Address: " + "<a href='http://maps.google.com/maps?q=" +results[i].formatted_address + "'class='place_address'>" + results[i].formatted_address + "</a>"+ "</div>";
				  $('body').append(result);
		        }	
		        if(results[i].rating>$('.js-rating option[value]:selected').val() && results[i].types[0]==="meal_delivery"){
		          var result = "<div class='js-query'>" + "<strong>" + results[i].name + "</strong>" + " " + "<img class='img-icon' src=" + results[i].icon + ">" + "<br>" + 'Rating: ' + results[i].rating + "<br>" +"Address: " + "<a href='http://maps.google.com/maps?q=" +results[i].formatted_address + "'class='place_address'>" + results[i].formatted_address + "</a>"+ '<p class="homeDelivery"> Home Delivery is Available </p>'  + "</div>";
		          $('body').append(result);
		        }
               }
        	  }
          });
       });
    }); 
  }
});



















