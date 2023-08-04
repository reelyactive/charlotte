/**
 * Copyright reelyActive 2021-2023
 * We believe in an open Internet of Things
 */


// Constant definitions
const STATUS_OK = 200;
const DEMO_SEARCH_PARAMETER = 'demo';
const DEFAULT_CONTEXT_URL = 'http://localhost:3001/context/';
const HLC_MIN_HEIGHT_PX = 480;
const HLC_UNUSABLE_HEIGHT_PX = 120;
const SIGNATURE_SEPARATOR = '/';

// DOM elements
let connectIcon = document.querySelector('#connectIcon');
let demoalert = document.querySelector('#demoalert');
let target = document.getElementById('cy');

// Other variables
let devicePropertiesMap = new Map();

// Initialise based on URL search parameters, if any
let searchParams = new URLSearchParams(location.search);
let isDemo = searchParams.has(DEMO_SEARCH_PARAMETER);

setContainerHeight();
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
  if(isDemo) {
    let response = starling.getContext('/context');
    charlotte.spin(response.devices || {}, target);
    updateDevicePropertiesMap(response.devices || {});
  }
  else {
    getContext(DEFAULT_CONTEXT_URL, (status, response) => {
      if(status === STATUS_OK) {
        let devices = JSON.parse(response).devices || {};
        charlotte.spin(devices, target);
        updateDevicePropertiesMap(devices);
      }
      else {
        demoalert.hidden = false;
      }
    });
  }
}


// Update the devicePropertiesMap
function updateDevicePropertiesMap(devices) {
  for(const deviceSignature in devices) {
    if(!devicePropertiesMap.has(deviceSignature)) {
      let device = devices[deviceSignature];
      let deviceUrl = device.url;

      if(!deviceUrl && device.hasOwnProperty('statid')) {
        deviceUrl = device.statid.uri;
      }

      if(deviceUrl) {
        cormorant.retrieveStory(deviceUrl, {}, (story) => {
          let imageUrl = cuttlefishStory.determineImageUrl(story);
          let title;

          if(!deviceUrl.includes('sniffypedia.org')) {
            title = cuttlefishStory.determineTitle(story);
          }

          if(imageUrl || title) {
            let deviceProperties = {};
            if(imageUrl) { deviceProperties.imageUrl = imageUrl }
            if(title) { deviceProperties.title = title }
            devicePropertiesMap.set(deviceSignature, deviceProperties);
          }
        });
      }
    }
  }
}


// GET the context
function getContext(url, callback) {
  let httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function() {
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
      return callback(httpRequest.status, httpRequest.responseText);
    }
  };
  httpRequest.open('GET', url);
  httpRequest.setRequestHeader('Accept', 'application/json');
  httpRequest.send();
}