var map;
 function initMap() {
 	map=new google.maps.Map(document.getElementById("map"),{
 		center:{lat: 8.4875,lng:76.9486},
 		zoom:13,
 	});
 }
var markers=[];
var locations= [
	{
		title:'Kovalam beach',
		location:{lat:8.402074, lng: 76.978426}
	},{
		title:'Padmanabhapuram Palace',
		location:{lat:8.250743,lng:76.9486}
	},{
		title:'Vizhinjam Lighthouse',
		location:{lat: 31.1545,lng:29.8462}

	},{
		title:'Napier Museum',
		location:{lat:8.5241391,lng:76.9366376}
	},{
		title:'Veli Tourist Village',
		location:{lat: 8.5241391, lng: 76.9366376}
	}
];
var largeInfowindow= new google.maps.InfoWindow();

var bound= new google.maps.LatLngBounds();
//for initialising the markers
for (i=0;i<=locations.length;i++){
	//to get the markers from their array
	var position = locations[i].location;
	var title = locations[i].title;
	
var marker=new google.maps.Marker({
	map:map,
	title:title,
	position:position,
	animation:google.maps.Animation.DROP,
});
	markers.push(marker);
	//create onclick event to open infoWindow
	marker.addListener('click',function(){
	populateInfoWindow(this,largeInfowindow)
});
bound.extend(marker.position);
	}
	function populateInfoWindow(marker, infowindow) {
	// Check to make sure the infowindow is not already opened on this marker.
	if (infowindow.marker != marker) {
	// Clear the infowindow content to give the streetview time to load.
	infowindow.setContent('');
	infowindow.marker = marker;
	// Make sure the marker property is cleared if the infowindow is closed.
	infowindow.addListener('closeclick', function() {
		infowindow.marker = null;
	});
	map.fitBounds(bounds);
    }
}
    