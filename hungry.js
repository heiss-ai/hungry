var address;
var current;
var latLng
var link;
var list;
var listSize;
var map;
var marker
var price;
var restName;
var terms;

function getFuud() {
    terms = document.getElementById("where").value;
    price = parseInt(document.getElementById("rng").value) + 1;
    window.location.href = "hungry/map.html?city=" + terms + "&price=" + price;
}

function getParam() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function setPage() {
    location = getParam()["city"];
    price = getParam()["price"];

    $.ajax({
      url: 'https://tdix80xtal.execute-api.us-east-2.amazonaws.com/sand/hungry',
      type: 'post',
      data: {
          location: location,
          price: price
      },
      headers: {
        'x-api-key': 'pfs9Eba0pZ2KV9QyWPRnH5BnDWT0XvYU4RmVEBrO',
        'Content-Type': '=application/json'
      },
      dataType: 'json',
      success: function (data) {
        console.log(data);
        list = JSON.parse(data);
        listSize = list.businesses.length;

        shuffle();
      }
  });
}

function shuffle() {
    var num = Math.floor(Math.random() * Math.floor(listSize));
    current = list.businesses[num];

    link = current.url;
    restName = current.name;
    address = current.location.display_address;
    latLng = {lat: current.coordinates.latitude, lng: current.coordinates.longitude};

    document.getElementById("name").innerHTML = restName;
    document.getElementById("street").innerHTML = address;

    initMap();
}

function openLink() {
    window.open(link);
}

var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: latLng,
          zoom: 13,
          mapTypeControl: false, 
          zoomControl: true,
          streetViewControl: false,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });

        marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: ''
          });
}

var rng = document.getElementById("rng");
var ro = document.getElementById("rngOutput");
var myRange = ["$","$$","$$$","$$$$"];

function updateRange(){
   ro.textContent = myRange[parseInt(rng.value, 10)];
};

window.addEventListener("DOMContentLoaded", updateRange);
rng.addEventListener("input", updateRange);
