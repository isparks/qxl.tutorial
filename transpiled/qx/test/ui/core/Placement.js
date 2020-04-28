(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.ui.core.Widget": {},
      "qx.ui.core.MPlacement": {},
      "qx.ui.popup.Popup": {},
      "qx.ui.menu.Menu": {}
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.core.Placement", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __nogo: null,
      setUp: function setUp() {
        this.__nogo = new qx.ui.core.Widget().set({
          backgroundColor: "red",
          width: 100,
          height: 300
        });
        this.getRoot().add(this.__nogo, {
          left: 150
        }); // set the always visible element

        qx.ui.core.MPlacement.setVisibleElement(this.__nogo);
      },
      tearDown: function tearDown() {
        qx.test.ui.core.Placement.prototype.tearDown.base.call(this);
        qx.ui.core.MPlacement.setVisibleElement(null);

        this.__nogo.destroy();
      },
      __testAlwaysVisibleElement: function __testAlwaysVisibleElement(w) {
        // force an addition to the dom!
        w.show();
        w.hide(); // modify the placed widget

        w.setWidth(100);
        w.setVisibility("visible"); // render the widgets

        this.flush(); // move and flush

        w.moveTo(100, 0);
        this.flush(); // the right position of the widget should be left of the nogo

        var bounds = w.getBounds();
        var right = bounds.left + bounds.width;
        this.assertEquals(150, right);
        this.assertEquals(50, bounds.left);
      },
      testVisibleWithPopoup: function testVisibleWithPopoup() {
        var w = new qx.ui.popup.Popup();

        this.__testAlwaysVisibleElement(w);

        w.destroy();
      },
      testVisibleWithMenu: function testVisibleWithMenu() {
        var w = new qx.ui.menu.Menu();

        this.__testAlwaysVisibleElement(w);

        w.destroy();
      },
      __testAlwaysVisibleElementTooBig: function __testAlwaysVisibleElementTooBig(w) {
        // force an addition to the dom!
        w.show();
        w.hide(); // modify the placed widget

        w.setWidth(200);
        w.setVisibility("visible"); // render the widgets

        this.flush(); // move and flush

        w.moveTo(100, 0);
        this.flush(); // The widget should be moved to the left border of the screen and still
        // overlap the visible item

        var bounds = w.getBounds();
        var right = bounds.left + bounds.width;
        this.assertEquals(200, right);
        this.assertEquals(0, bounds.left);
      },
      testVisibleWithPopoupTooBig: function testVisibleWithPopoupTooBig() {
        var w = new qx.ui.popup.Popup();

        this.__testAlwaysVisibleElementTooBig(w);

        w.destroy();
      },
      testVisibleWithMenuTooBig: function testVisibleWithMenuTooBig() {
        var w = new qx.ui.menu.Menu();

        this.__testAlwaysVisibleElementTooBig(w);

        w.destroy();
      },
      __testAlwaysVisibleElementAbove: function __testAlwaysVisibleElementAbove(w) {
        // force an addition to the dom!
        w.show();
        w.hide();

        this.__nogo.setLayoutProperties({
          top: 100
        }); // modify the placed widget


        w.setWidth(100);
        w.setVisibility("visible"); // render the widgets

        this.flush(); // move and flush

        w.moveTo(100, 0);
        this.flush(); // Positions should be as set

        var bounds = w.getBounds();
        var right = bounds.left + bounds.width;
        this.assertEquals(200, right);
        this.assertEquals(100, bounds.left);
      },
      testVisibleWithPopoupAbove: function testVisibleWithPopoupAbove() {
        var w = new qx.ui.popup.Popup();

        this.__testAlwaysVisibleElementAbove(w);

        w.destroy();
      },
      testVisibleWithMenuAbove: function testVisibleWithMenuAbove() {
        var w = new qx.ui.menu.Menu();

        this.__testAlwaysVisibleElementAbove(w);

        w.destroy();
      },
      __testAlwaysVisibleElementBelow: function __testAlwaysVisibleElementBelow(w) {
        // force an addition to the dom!
        w.show();
        w.hide(); // modify the placed widget

        w.setWidth(100);
        w.setVisibility("visible"); // render the widgets

        this.flush(); // move and flush

        w.moveTo(100, 400);
        this.flush(); // Positions should be as set

        var bounds = w.getBounds();
        var right = bounds.left + bounds.width;
        this.assertEquals(200, right);
        this.assertEquals(100, bounds.left);
      },
      testVisibleWithPopoupBelow: function testVisibleWithPopoupBelow() {
        var w = new qx.ui.popup.Popup();

        this.__testAlwaysVisibleElementBelow(w);

        w.destroy();
      },
      testVisibleWithMenuBelow: function testVisibleWithMenuBelow() {
        var w = new qx.ui.menu.Menu();

        this.__testAlwaysVisibleElementBelow(w);

        w.destroy();
      }
    }
  });
  qx.test.ui.core.Placement.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Placement.js.map?dt=1588102579067