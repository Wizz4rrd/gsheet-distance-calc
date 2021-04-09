/**
* Get the distance between 2 different addresses.
* @param {string} origin_address The origin/start address as string Eg. "102 Petty France, London, SW1H 9AJ".
* @param {string} destination_address The destination/end address as string Eg. "10 Whitechapel High Street, London, E1 8QS".
* @param {string} travel_mode The mode of travel as string. Default: DRIVING. Options: BICYCLING, TRANSIT, WALKING.
* @param {string} return_type The return type as string. Default: MILES. Options: KILOMETERS, MINUTES, HOURS, STEPS.
* @return the distance between 2 different addresses.
* @customfunction
*/
function GOOGLEDISTANCE(origin_address,destination_address,travel_mode,return_type) {
  Utilities.sleep(1000);
  
  var travelMode = "";
  
  switch(travel_mode) {
    case "BICYCLING":
    case "bicycling":
      travelMode = Maps.DirectionFinder.Mode.BICYCLING;
      break;
    case "DRIVING":
    case "driving":
      travelMode = Maps.DirectionFinder.Mode.DRIVING;
      break;
    case "TRANSIT":
    case "transit":
      travelMode = Maps.DirectionFinder.Mode.TRANSIT;
      break;
    case "WALKING":
    case "walking":
      travelMode = Maps.DirectionFinder.Mode.WALKING;
      break;
    default:
      // Default to driving
      travelMode = Maps.DirectionFinder.Mode.DRIVING;
      //return "Error: Wrong travel mode";
  }

  // var auth = Maps.setAuthentication(clientId, signingKey);
  
  var directions = Maps.newDirectionFinder()
  .setRegion('UK')
  .setLanguage('en-GB')
  .setOrigin(origin_address)
  .setDestination(destination_address)
  .setMode(travelMode)
  .getDirections();

  if (directions.status !== "OK") 
    return "Error: " + directions.status;
  
  var route = directions.routes[0].legs[0];
  var time = route.duration.value;
  var distance = route.distance.value;
  
  var steps = route.steps.map(function(step) {
      return step.html_instructions.replace(/<[^>]+>/g, "");
  }).join("\n");
  
  switch(return_type) {
    case "MILES":
    case "miles":
      return distance * 0.000621371;
      break;
    case "KILOMETERS":
    case "kilometers":
      return distance / 1000;
      break;
    case "MINUTES":
    case "minutes":
      return time / 60;
      break;
    case "HOURS":
    case "hours":
      return time / 60 / 60;
      break;
    case "STEPS":
    case "steps":
      return steps;
      break;
    default:
      // Default to miles
      return distance * 0.000621371;
      //return "Error: Wrong return type";
  }

}