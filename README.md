charlotte
=========

__charlotte__ spins a [hyperlocal context](https://www.reelyactive.com/context/) graph into a web visualisation using Cytoscape.js.

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
let devicePropertiesMap = new Map();
let devices = { /* ex: from Pareto Anywhere /context API */ };

charlotte.init(document.getElementById('cy'), devicePropertiesMap);
charlotte.spin(devices);
```

Open the _index.html_ file in a web browser for __charlotte__ to render the web of devices as a fCoSE graph.


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
