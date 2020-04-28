(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (d_wagner)
  
  ************************************************************************ */
  qx.Class.define("qx.test.dev.unit.TestCase", {
    extend: qx.dev.unit.TestCase,
    members: {
      testSkip: function testSkip() {
        this.skip();
        this.fail("Executed code after calling skip()!");
      },
      testResumeHandler: function testResumeHandler() {
        this.__do(this.resumeHandler(function (param) {
          this.assertEquals(param, "foo");
          return "bar";
        }, this));

        this.wait();
      },
      __do: function __do(callback) {
        window.setTimeout(this.__doSuccess.bind(this, callback), 0);
      },
      __doSuccess: function __doSuccess(callback) {
        var result = callback("foo");
        this.assertEquals(result, "bar");
      }
    }
  });
  qx.test.dev.unit.TestCase.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TestCase.js.map?dt=1588104144360