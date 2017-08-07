$(document).ready(function() {
	"use strict";

  //Needed for CORS Plugin
  $.ajax({
      crossOrigin: true,
  });
  //'&callback=?' used for CORS in Chrome but works across browsers with Plugin
	// $.getJSON("data.json +'&callback=?'", function(list) {
	$.getJSON("data.json", function(list) {
		//Retrive JSON array list -- Use "window" to create global var
    window.objList = list;
    // console.log(objList);
    var tbody = $("<tbody><tbody>");

		//Iterare across each JSON oject
		$.each(objList, function(i){
			//Create seperate row data for each object
			var obj = objList[i];
			var trow = $("<tr></tr>");
			//Create object for each prototype
      var protoObj = {};
      // console.log(obj);
			protoObj.name = obj.name;
      protoObj.description = obj.description;

      //Append Lat/Long to clickable link
			var link = $('<a class="button is-danger" target="blank"> Open in Google Maps</a>');
			var googleMaps = "https://www.google.com/maps?q=";
			googleMaps += obj.location[0] + "," + obj.location[1];
			// add link to anchor tag
			link.attr("href", googleMaps);
			// attach link to prototype
      protoObj.location = link;

      //Add data to rows.
			$.each(protoObj, function(content){
				var tdata = $("<td></td>");
				tdata.append(protoObj[content]);
        tdata.appendTo(trow);
			});
			//Append entire itteration into table rows
			tbody.append(trow);
		//Callback closure
		});
		//Build body
    $("thead").after(tbody);

    setMarkers(objList);
  });
  //Build markers and infoWindow
  function setMarkers(){
    for (var i = 0; i < objList.length; i++){
      var marks = objList[i];
      //Build infoWindow text -- Will have to add Angular to $.compile contentString
      var contentString =
             '<div id="content">'+
             '</div>'+
             '<h1 id="Heading">'+ marks.name +'</h1>'+
             '<div id="body">'+
             '<p>'+ marks.description +'</p>'+
             '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      //Build Markers
      var marker = new google.maps.Marker({
        position: {lat: marks.location[0], lng: marks.location[1]},
        map: map,
        title: marks.name
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i){
        return function(){
          // infowindow.setContent();
        infowindow.open(map, marker);
        }
      })(marker, i));

    }

  }

});

// Bonus

// Using the current location, get directions for the user to get to the location
// Display the distance to each location from users current location on the row in the table
// Sort the top spots based on distance from users current location
