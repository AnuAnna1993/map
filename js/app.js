 
var map;
 function initMap() {
    map=new google.maps.Map(document.getElementById("map"),{
        center:{lat: 8.4875,lng:76.9486},
        zoom:10,
    });
 
var markers=[];
var locations= [
    {
        title:'Kovalam Beach',
        location:{lat:8.402074, lng: 76.978426}
    },{
        title:'Padmanabhapuram Palace',
        location:{lat:8.2507,lng:77.3267}
    },{
        title:'Vizhinjam Lighthouse',
        location:{lat:8.383072,lng:76.979742}
    },{
        title:'Kowdiar Palace',
        location:{lat:8.5240,lng:76.9632}
    },{
        title:'Shankumugham Beach',
        location:{lat: 8.4784, lng: 76.9119}
    }
];
var largeInfowindow= new google.maps.InfoWindow();
var ViewModel=function(){
var self=this;
self.title=ko.observableArray();
self.location=ko.observableArray(); 
self.locationList=ko.observableArray(locations);
};
var viewModel=new ViewModel
ko.applyBindings(viewModel);
var bound= new google.maps.LatLngBounds();
//for initialising the markers
for (i=0;i<locations.length;i++){
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
    map.fitBounds(bound);
    }
    //code for wikipedia ajax request.
        var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
        // var wikiTimeoutRequest = setTimeout(function() {
        // alert("failed to load wikipedia resources");
        // }, 8000);
        $.ajax({
            url: wikiURL,
            dataType: "jsonp"
            }).done(function(response) {
                var articleStr = response[1];
                var URL = 'http://en.wikipedia.org/wiki/' + articleStr;
                // Use streetview service to get the closest streetview image within
                // 50 meters of the markers position
               
                infowindow.setContent('<div>' + marker.title + '</div><br><a href ="' + URL + '">' + URL + '</a><hr><div id="pano"></div>');
                // Open the infowindow on the correct marker.
                infowindow.open(map, marker);
                console.log(URL);
                // clearTimeout(wikiTimeoutRequest);

                // error handling for jsonp requests with fail method.
            }).fail(function (jqXHR, textStatus) {
                    alert("failed to load wikipedia resources");
                    });
}
    
function toggleBounce(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        marker.setAnimation(google.maps.Animation.null);
    }, 1400);

};

}