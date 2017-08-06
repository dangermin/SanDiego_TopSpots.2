        //  var myCenter = new google.maps.LatLng(32.7151174, -117.1664042);
         function loadMap(){
          console.log("loaded");
            // var mapProp = {
            //    center: {lat: -34.397, lng: 150.644},
            //    zoom:12,
            //    mapTypeId: google.maps.MapTypeId.roadmap
            // };

            var map = new google.maps.Map(document.getElementById('map-canvas'),{
              center: {lat: -34.397, lng: 150.644},
              zoom:12,
              // mapTypeId: google.maps.MapTypeId.roadmap
            });

            var marker = new google.maps.Marker({
               position: myCenter,
               title:'Click to zoom'
            });

            // marker.setMap(map);

            // //Zoom to 7 when clicked on marker
            // google.maps.event.addListener(marker,'click',function() {
            //    map.setZoom(17);
            //    map.setCenter(marker.getPosition());
            // });
            // var infowindow = new google.maps.InfoWindow({
            //    content:"AddressInfo"
            // });
            // //MouseOver listeners
            // google.maps.event.addListener(marker, 'mouseover', function() {
            //    infowindow.open(map,marker);
            // });
            // google.maps.event.addListener(marker, 'mouseout', function() {
            //    infowindow.close(map,marker);
            // });
  // Automatically center the map fitting all markers on the screen
  // map.fitBounds(bounds);

}
