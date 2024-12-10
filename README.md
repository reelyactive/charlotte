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
let digitalTwins = new Map(); // Or use cormorant.digitalTwins (see below)
let devices = new Map();      // Or use beaver.devices (see below)
let options = {};             // See Options section below
charlotte.init(target, { digitalTwins: digitalTwins });
charlotte.on('tap', (nodeId) => { /* Handle tap of node in graph */ });

charlotte.spin(devices, target, options);
```

Open the _index.html_ file in a web browser for __charlotte__ to render the web of devices as a fCoSE graph.


Developing web apps with beaver, cormorant & charlotte
------------------------------------------------------

Developing web apps using the [Pareto Anywhere](https://www.reelyactive.com/pareto/anywhere/) APIs is straightforward with [beaver](https://github.com/reelyactive/beaver), [cormorant](https://github.com/reelyactive/cormorant/) and __charlotte__.

Include in an _index.html_ file the viewport, __charlotte.js__ script and dependencies:

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
    <script src="js/cormorant.js"></script>
    <script src="js/beaver.js"></script>
    <script src="js/charlotte.js"></script>
    <script src="js/app.js"></script>
  </body>
</html>
```

Include in a _js/app.js_ the code to poll the hyperlocal context, retrieve any digital twins, and spin the web of devices:

```javascript
let target = document.getElementById('cy');

charlotte.init(target, { digitalTwins: cormorant.digitalTwins });
charlotte.on('tap', (nodeId) => { /* Handle tap of node in graph */ });

charlotte.spin(beaver.devices, target, {});
```


Options
-------

__charlotte__ supports the following options for the spin function:

    {
      filters: { minRSSI: -100 }
    }

For instance, to spin the web of devices with signal strength (RSSI) > 70 dBm, use the following options:

```javascript
charlotte.spin(devices, target, { filters: { minRSSI: -70 } });
```

![charlotte logo](https://reelyactive.github.io/charlotte/images/charlotte-bubble.png)


What's in a name?
-----------------

In the classic children's story [Charlotte's Web](https://en.wikipedia.org/wiki/Charlotte's_Web), Charlotte is a barn spider who communicates human-readable information through the webs she spins.  Her webs ultimately influence decisions that change the life of "some pig" for the better.

While in the story, Charlotte spins _words_ into her webs, in her client-side habitat, __charlotte.js__ will spin _graphs_ that allow humans to visualise real-time physical and semantic relationships between people, places and things.  Her "humble" hope is that the webs she spins in your browser will positively influence data-based decision-making, so that you don't have to rely on your spidey senses alone!

As in the story, __charlotte.js__ can't do it all by herself.  She uses [Cytoscape.js](https://js.cytoscape.org/) to help her with the graphs themselves, while her unlikely client-side barnyard companions—[beaver](), [cormorant]() and the "radiant" [cuttlefish]()—collect and prepare the source data.

Speaking of barnyard companions, __charlotte.js__ is actually our second barn-themed mascot after barnowl.  Hay, isn't that "terrific"!


Acknowledgements
----------------

__charlotte__ uses [Cytoscape.js](https://js.cytoscape.org/) which was created at the University of Toronto and published in Oxford Bioinformatics ([2016](https://academic.oup.com/bioinformatics/article/32/2/309/1744007), [2023](https://academic.oup.com/bioinformatics/article/39/1/btad031/6988031)), and the [cytoscape.js-fcose](https://github.com/iVis-at-Bilkent/cytoscape.js-fcose) fCoSE layout algorithm extension developed by the [iVis Lab](https://cs.bilkent.edu.tr/~ivis/) at Bilkent University.  We extend our thanks to the developers of these open source projects.


Modular Architecture
--------------------

__charlotte.js__ is easily combined with the following complementary client-side modules:
- [beaver.js](https://github.com/reelyactive/beaver)
- [cormorant.js](https://github.com/reelyactive/cormorant)
- [cuttlefish.js](https://github.com/reelyactive/cuttlefish)

Learn more about the [reelyActive Open Source Software packages](https://reelyactive.github.io/diy/oss-packages/), all of which are bundled together as [Pareto Anywhere](https://github.com/reelyactive/pareto-anywhere) open source IoT middleware.


Contributing
------------

Discover [how to contribute](CONTRIBUTING.md) to this open source project which upholds a standard [code of conduct](CODE_OF_CONDUCT.md).


Security
--------

Consult our [security policy](SECURITY.md) for best practices using this open source software and to report vulnerabilities.


License
-------

MIT License

Copyright (c) 2021-2024 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
