/**
 * Copyright reelyActive 2021
 * We believe in an open Internet of Things
 */


// Constant definitions
const DEFAULT_CONTEXT_URL = 'http://localhost:3001/context/';
const HLC_MIN_HEIGHT_PX = 480;
const HLC_UNUSABLE_HEIGHT_PX = 120;

// Other variables
let devicePropertiesMap = new Map();


setContainerHeight();
charlotte.init(document.getElementById('cy'), devicePropertiesMap);
poll();
setInterval(poll, 5000);


// Set the height of the graph container
function setContainerHeight() {
  let container = document.getElementById('cy-container');
  let height = Math.max(window.innerHeight - HLC_UNUSABLE_HEIGHT_PX,
                        HLC_MIN_HEIGHT_PX) + 'px';
  container.setAttribute('style', 'height:' + height);
}


// Poll the context
function poll() {
  getContext(DEFAULT_CONTEXT_URL, function(status, response) {
    charlotte.spin(response.devices || {});
  });
}


// GET the context
function getContext(url, callback) {
  let httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function() {
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
      return callback(httpRequest.status,
                      JSON.parse(httpRequest.responseText));
    }
  };
  httpRequest.open('GET', url);
  httpRequest.setRequestHeader('Accept', 'application/json');
  httpRequest.send();
}