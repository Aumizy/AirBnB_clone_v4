$(document).ready(init);

function init() {
  const selectedAmenities = {};
  $(".amenities .popover input").change(function () {
    if ($(this).is(":checked")) {
      selectedAmenities[$(this).attr("data-name")] = $(this).attr("data-id");
    } else if ($(this).is(":not(:checked)")) {
      delete selectedAmenities[$(this).attr("data-name")];
    }
    const names = Object.keys(selectedAmenities);
    $(".amenities h4").text(names.sort().join(", "));
  });

  checkAPIStatus();
  searchPlaces();
}

function checkAPIStatus() {
  const url = "http://localhost:5001/api/v1/status/";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "OK") {
        $("#api_status").addClass("available");
      } else {
        $("#api_status").removeClass("available");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      $("#api_status").removeClass("available");
    });
}


function searchPlaces() {
    $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      $('SECTION.places').append(data.map(place => {
        return `<article>
                  <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">${place.price_by_night}</div>
                  </div>
                  <div class="information">
                    <div class="max_guest">${place.max_guest} Guests</div>
                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                  </div>
                  <div class="description">
                    ${place.description}
                  </div>
                </article>`
      }));
    }
  });
}

