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

// Initialise based on URL search parameters, if any
let searchParams = new URLSearchParams(location.search);
let isDemo = searchParams.has(DEMO_SEARCH_PARAMETER);

setContainerHeight();

// Initialise charlotte and handle node taps
charlotte.init(target, { digitalTwins: cormorant.digitalTwins });
charlotte.on('tap', (nodeId) => { console.log(nodeId, 'tapped'); });

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
    let devices = response.devices || {};
    for(const deviceSignature in devices) {
      let device = devices[deviceSignature];
      cormorant.retrieveDigitalTwin(deviceSignature, device, null,
                                    (digitalTwin, isRetrievedFromMemory) => {
        if(digitalTwin && !isRetrievedFromMemory) {
          charlotte.updateDigitalTwin(deviceSignature, digitalTwin);
        }
      });
    }
    charlotte.spin(devices, target, {});
  }
  else {
    getContext(DEFAULT_CONTEXT_URL, (status, response) => {
      if(status === STATUS_OK) {
        let devices = JSON.parse(response).devices || {};
        for(const deviceSignature in devices) {
          let device = devices[deviceSignature];
          cormorant.retrieveDigitalTwin(deviceSignature, device, null,
                                        (digitalTwin, isRetrievedFromMemory) => {
            if(digitalTwin && !isRetrievedFromMemory) {
              charlotte.updateDigitalTwin(deviceSignature, digitalTwin);
            }
          });
        }
        charlotte.spin(devices, target, {});
      }
      else {
        demoalert.hidden = false;
      }
    });
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