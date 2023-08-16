charlotte
=========

__charlotte__ spins a [hyperlocal context](https://www.reelyactive.com/context/) graph and digital twins into a web visualisation using Cytoscape.js.

![Overview of charlotte.js](https://reelyactive.github.io/charlotte/images/overview.png)

__charlotte__ is lightweight client-side JavaScript that runs in the browser.  See a live demo using the code in this repository at: [reelyactive.github.io/charlotte/?demo=default](https://reelyactive.github.io/charlotte/?demo=default)


Hello charlotte!
----------------

Include in an _index.html_ file the viewport, __charlotte.js__ script and Cytoscape dependencies:

```html
<html>
  <head></head>
  <body>
    <div id="cy-container">
      <div id="cy" class="w-100 h-100"></div>
    </div>
    <script src="js/cytoscape.min.js"></script>
    <script src="js/layout-base.js"></script>
    <script src="js/cose-base.js"></script>
    <script src="js/cytoscape-fcose.js"></script>
    <script src="js/charlotte.js"></script>
    <script src="js/app.js"></script>
  </body>
</html>
```

Include in a _js/app.js_ the code to initialise and spin the web of devices:

```javascript
let target = document.getElementById('cy');
let digitalTwins = new Map(); // See cormorant.js
let devices = { /* ex: from Pareto Anywhere /context API */ };

charlotte.init(target, { digitalTwins: digitalTwins });
charlotte.on('tap', (nodeId) => { /* Handle tap of node in graph */ });

charlotte.spin(devices, target, {});
```

Open the _index.html_ file in a web browser for __charlotte__ to render the web of devices as a fCoSE graph.


Acknowledgements
----------------

__charlotte__ uses [Cytoscape.js](https://js.cytoscape.org/) which was created at the University of Toronto and published in Oxford Bioinformatics ([2016](https://academic.oup.com/bioinformatics/article/32/2/309/1744007), [2023](https://academic.oup.com/bioinformatics/article/39/1/btad031/6988031)), and the [cytoscape.js-fcose](https://github.com/iVis-at-Bilkent/cytoscape.js-fcose) fCoSE layout algorithm extension developed by the [iVis Lab](https://cs.bilkent.edu.tr/~ivis/) at Bilkent University.  We extend our thanks to the developers of these open source projects.


Contributing
------------

Discover [how to contribute](CONTRIBUTING.md) to this open source project which upholds a standard [code of conduct](CODE_OF_CONDUCT.md).


Security
--------

Consult our [security policy](SECURITY.md) for best practices using this open source software and to report vulnerabilities.

[![Known Vulnerabilities](https://snyk.io/test/github/reelyactive/charlotte/badge.svg)](https://snyk.io/test/github/reelyactive/charlotte)


License
-------

MIT License

Copyright (c) 2021-2023 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
