$(document).ready(function() {
	"use strict";

  //Needed for CORS Plugin
  $.ajax({
      crossOrigin: true,
  });
  //'&callback=?' used for CORS in Chrome but works across browsers with Plugin
	// $.getJSON("data.json +'&callback=?'", function(list) {
	$.getJSON("data.json", function(list) {
		//Retrive JSON array list
		var objList = list;
		var tbody = $("<tbody><tbody>")

		//Iterare across each JSON oject
		$.each(objList, function(i){
			//Create seperate row data for each object
			var obj = objList[i];
			var trow = $("<tr></tr>");

			//Create object for each prototype
      var protoObj = {};
      // protoObj.num = obj.length;
      // console.log(objList.length);
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
      // console.log(link);

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
	});
});

// Bonus

// Once you have completed the tasks and your tests have been submitted, push yourself farther by attempting the following bonus items:
// Display a map, and using the google api, place a pin in the location of each top spot
// When a users hoovers over the pin display a tool tip with the description
// Using the current location, get directions for the user to get to the location
// Display the distance to each location from users current location on the row in the table
// Sort the top spots based on distance from users current location
