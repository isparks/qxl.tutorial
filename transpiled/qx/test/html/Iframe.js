(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.html.Root": {},
      "qx.html.Iframe": {},
      "qx.util.ResourceManager": {},
      "qx.bom.Iframe": {},
      "qx.html.Element": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  /* ************************************************************************
  
  
  ************************************************************************ */

  /**
   *
   * @asset(qx/static/blank.html)
   */
  qx.Class.define("qx.test.html.Iframe", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMock,
    members: {
      __doc: null,
      __frame: null,
      __origin: null,
      __destSource: null,
      __alredyRun: false,
      setUp: function setUp() {
        var helper = document.createElement("div");
        document.body.appendChild(helper);
        this.__doc = new qx.html.Root(helper);

        this.__doc.setAttribute("id", "doc");

        var frame = this.__frame = new qx.html.Iframe();

        this.__doc.add(frame); // Source in parent directory is not of same origin
        // when using file protocol – use non-existing file
        // in same directory instead


        if (window.location.protocol === "file:") {
          this.__destSource = "blank.html";
        } else {
          this.__destSource = qx.util.ResourceManager.getInstance().toUri("qx/static/blank.html");
        }
      },
      "test: set source to URL with same origin": function testSetSourceToURLWithSameOrigin() {
        var frame = this.__frame;
        var source = this.__destSource;
        frame.addListener("load", function () {
          this.resume(function () {
            var element = frame.getDomElement();
            var currentUrl = qx.bom.Iframe.queryCurrentUrl(element) || element.src;
            var source = frame.getSource();
            var blank = "\/blank.html$";

            var msg = function msg(actual) {
              return "Must be " + currentUrl + ", but was " + actual;
            }; // BOM


            this.assertString(currentUrl);
            this.assertMatch(currentUrl, blank, msg(currentUrl)); // HTML

            this.assertString(source);
            this.assertMatch(source, blank, msg(source));
          });
        }, this);
        frame.setSource(source);
        qx.html.Element.flush();
        this.wait();
      },
      "test: update source on navigate": function testUpdateSourceOnNavigate() {
        var frame = this.__frame; // As soon as the original frame has loaded,
        // fake user-action and browse

        var source = this.__destSource;
        frame.addListenerOnce("load", function () {
          qx.html.Element.flush();
          qx.bom.Iframe.setSource(frame.getDomElement(), source);
        });
        qx.html.Element.flush(); // Give changed frame some time to load

        this.wait(500, function () {
          this.assertMatch(frame.getSource(), "\/blank.html$");
        }, this);
      },
      "test: skip setting source if frame is already on URL": function testSkipSettingSourceIfFrameIsAlreadyOnURL() {
        var frame = this.__frame; // As soon as the original frame has loaded,
        // fake user-action and browse

        var source = this.__destSource;
        frame.addListenerOnce("load", function () {
          qx.bom.Iframe.setSource(frame.getDomElement(), source);
        });
        qx.html.Element.flush();
        var origSetSource;
        frame.addListener("load", function () {
          origSetSource = qx.bom.Iframe.setSource;

          qx.bom.Iframe.setSource = function () {
            throw "setSource";
          };

          try {
            var url = qx.bom.Iframe.queryCurrentUrl(frame.getDomElement());
            frame.setSource(url);
            qx.html.Element.flush();
            this.resume();
          } catch (e) {
            this.resume(function () {
              this.fail("Setting same URL must be skipped");
            });
          }

          qx.bom.Iframe.setSource = origSetSource;
        }, this);
        this.wait();
      },
      "test: set null source if frame is cross-origin": function testSetNullSourceIfFrameIsCrossOrigin() {
        var frame = this.__frame;

        if (this.__alredyRun) {
          this.skip("This test can only run once. Reload to run again.");
        } // On cross origin


        frame.addListener("load", function () {
          this.resume(function () {
            var elem = frame.getDomElement();
            this.spy(qx.bom.Iframe, "setSource");
            frame.setSource(null);
            this.assertCalledWith(qx.bom.Iframe.setSource, elem, null);
          });
        }, this);
        frame.setSource("http://example.com");
        this.__alredyRun = true;
        this.wait();
      },
      tearDown: function tearDown() {
        qx.html.Element.flush();
        var div = document.getElementById("doc");
        document.body.removeChild(div);
        this.getSandbox().restore();

        this.__frame.dispose();

        this.__frame = null;
      }
    }
  });
  qx.test.html.Iframe.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Iframe.js.map?dt=1588104145297