(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MDragDropScrolling": {
        "require": true
      },
      "qx.core.Init": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Mustafa Sak (msak)
  
  ************************************************************************ */

  /**
   * Provides scrolling ability during drag session to the widget.
   */
  qx.Class.define("qx.ui.core.DragDropScrolling", {
    extend: qx.core.Object,
    include: [qx.ui.core.MDragDropScrolling],
    construct: function construct(widget) {
      qx.core.Object.constructor.call(this);
      this._widget = widget;
    },
    members: {
      _widget: null,

      /**
       * Returns the root widget whose children will have scroll on drag session
       * behavior. Widget was set on constructor or will be application root by
       * default.
       *
       * @return {qx.ui.core.Widget} The root widget whose children will have
       * scroll on drag session
       */
      _getWidget: function _getWidget() {
        return this._widget || qx.core.Init.getApplication().getRoot();
      }
    }
  });
  qx.ui.core.DragDropScrolling.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DragDropScrolling.js.map?dt=1588102587239