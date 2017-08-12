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
    var tbody = $("<tbody></tbody>");

		//Iterare across each JSON oject & create var obj = objList[i] via function(i, obj)
		$.each(objList, function(i, obj) {
      var trow = $('<tr></tr>');
			//Create object for each prototype
      var protoObj = {};
			protoObj.name = obj.name;
      protoObj.description = obj.description;

      //Append Lat/Long to clickable link
			var link = $('<a class="button is-danger" target="blank"> Open in Google Maps</a>');
			var googleMaps = "https://www.google.com/maps?q=" + obj.location[0] + "," + obj.location[1];
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

      //Create select Options
      var $option = $('<option></option>');
      $option.text(obj.noun);
      $option.val(obj.location);
      $('#destination').append($option);

		//Callback closure
    });
    //Build body
    $("thead").after(tbody);

    setMarkers(objList);
  });
  //Google Maps Build markers and infoWindow
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
        title: marks.name,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });
      google.maps.event.addListener(marker, 'click', (function(marker, i){
        return function(){
          // infowindow.setContent();
        infowindow.open(map, marker);
        console.log("clicked");
        }
      })(marker, i));
    }
  }

});

// Bonus

// Using the current location, get directions for the user to get to the location
// Display the distance to each location from users current location on the row in the table
// Sort the top spots based on distance from users current location

      // ------Unused Code------//
      // Populate the select element with the data found in the protoLatLng array.
      // var selectDiv = document.getElementById("destination");
      // //Add options to select
      // window.protoLatLng = {};
      // $.each(protoLatLng, function(){
      //     var option = $("<option></option>");
      //     var optionDiv = $('#des-options');
      //     option.append(protoLatLng.name);
      //     option.attr("value", protoLatLng.location);
      //     $('#des-options').append(option.join(''));
      //     option.appendTo(optionDiv);
      //   });

      // faster method of iterating than the above
      // var arr = protoLatLng;
      // var insert = [];
      // var i = 0;
      // $.each(arr, function(count, content){
      //   insert[i++] = '<option>';
      //   insert[i++] = protoLatLng.name;
      //   insert[i++] = content;
      //   insert[i++] = '</option>';
      //   insert.attr("value", protoLatLng.location);
      // });
      // insert.attr("value", protoLatLng.location);
      // $('#destination').append(insert.join(''));



