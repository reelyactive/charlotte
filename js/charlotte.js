/**
 * Copyright reelyActive 2021
 * We believe in an open Internet of Things
 */


let charlotte = (function() {

  // Internal constants
  const MAX_RSSI = -30;
  const DEFAULT_LAYOUT_NAME = 'cose';
  const DEFAULT_COSE_LAYOUT_OPTIONS = {
      name: "cose",
      animate: false,
      randomize: false,
      idealEdgeLength: function(edge) { return MAX_RSSI - edge.data('rssi'); },
      edgeElasticity: function(edge) { return 32 *
                                             (MAX_RSSI - edge.data('rssi')); },
      initialTemp: 40
  };
  const DEFAULT_GRAPH_STYLE = [
      { selector: "node",
        style: { label: "data(name)", "font-size": "0.6em",
                 "min-zoomed-font-size": "16px" } },
      { selector: "node[image]",
        style: { "background-image": "data(image)", "border-color": "#83b7d0",
                 "background-fit": "cover cover", "border-width": "2px" } },
      { selector: "edge", style: { "curve-style": "haystack",
                                   "line-color": "#ddd", label: "data(name)",
                                   "text-rotation": "autorotate",
                                   color: "#5a5a5a", "font-size": "0.25em",
                                   "min-zoomed-font-size": "12px" } },
      { selector: ".cyDeviceNode",
        style: { "background-color": "#83b7d0", "border-color": "#83b7d0" } },
      { selector: ".cyAnchorNode",
        style: { "background-color": "#0770a2", "border-color": "#0770a2" } },
      { selector: ".cySelectedNode",
        style: { "background-color": "#ff6900", "border-color": "#ff6900" } }
  ];


  // Internal variables
  let cy;
  let layout;
  let options;
  let devicesProperties;


  // Spin a web
  function spin(devices) {
    let deviceSignatures = Object.keys(devices);

    cy.nodes().forEach(function(node) {
      let isPresent = deviceSignatures.includes(node.id());
      if(!isPresent) { cy.remove(node); }
    });

    for(const deviceSignature in devices) {
      addDeviceNode(deviceSignature, devices[deviceSignature]);
    }

    layout.stop();
    layout = cy.elements().makeLayout(options.layout);
    layout.run();
  }


  // Initialise the web
  function init(container, devicesPropertiesMap, layoutName, layoutOptions,
                style) {
    devicesProperties = devicesPropertiesMap || new Map();
    options = {
        container: container,
        layout: layoutOptions || DEFAULT_COSE_LAYOUT_OPTIONS,
        style: style || DEFAULT_GRAPH_STYLE
    };

    cy = cytoscape(options);
    layout = cy.layout({ name: layoutName || DEFAULT_LAYOUT_NAME, cy: cy });
  }


  // Add a device node to the hyperlocal context graph
  function addDeviceNode(deviceSignature, device) {
    let properties = devicesProperties.get(deviceSignature) || {};
    let isExistingNode = (cy.getElementById(deviceSignature).size() > 0);

    if(!isExistingNode) {
      cy.add({ group: "nodes", data: { id: deviceSignature } });
    }

    let node = cy.getElementById(deviceSignature);
    let isAnchor = device.hasOwnProperty('position');
    let nodeClass = isAnchor ? 'cyAnchorNode' : 'cyDeviceNode';
    node.data('name', properties.name || '');
    node.addClass(nodeClass);
    if(properties.imageUrl) { node.data('image', properties.imageUrl); }
    addDeviceEdges(deviceSignature, device);
  }


  // Add device edges to the hyperlocal context graph
  function addDeviceEdges(deviceSignature, device) {
    let edgeSignatures = [];

    if(device.hasOwnProperty('nearest')) {
      device.nearest.forEach(function(entry) {
        let peerSignature = entry.device;
        let edgeSignature = deviceSignature + '@' + peerSignature;
        let edge = cy.getElementById(edgeSignature);
        let isExistingEdge = (edge.size() > 0);
        isExistingNode = (cy.getElementById(peerSignature).size() > 0);
        edgeSignatures.push(edgeSignature);

        if(!isExistingNode) {
          cy.add({ group: "nodes", data: { id: peerSignature } });
        }
        if(!isExistingEdge) {
          cy.add({ group: "edges", data: { id: edgeSignature,
                                           source: deviceSignature,
                                           target: peerSignature,
                                           name: entry.rssi + "dBm",
                                           rssi: entry.rssi } });
        }
        else {
          edge.data({ name: entry.rssi + "dBm", rssi: entry.rssi });
        }
      });
    }

    cy.elements('edge[id^="' + deviceSignature + '@"]').forEach(function(edge) {
      let isPresent = edgeSignatures.includes(edge.id());
      if(!isPresent) { cy.remove(edge); }
    });
  }


  // Expose the following functions and variables
  return {
    spin: spin,
    init: init
  }

}());