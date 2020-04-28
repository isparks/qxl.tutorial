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
      "qx.Interface": {},
      "qx.core.Object": {},
      "qx.core.AssertionError": {},
      "qx.lang.Object": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * @ignore(qx.test.i.*)
   */
  qx.Class.define("qx.test.Interface", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        qx.Interface.define("qx.test.i.ICar", {
          members: {
            startEngine: function startEngine() {
              return true;
            }
          },
          properties: {
            color: {}
          }
        });
      },
      tearDown: function tearDown() {
        qx.Class.undefine("qx.test.i.ICar");
      },
      testClassImplements: function testClassImplements() {
        // test correct implementations
        qx.Class.define("qx.test.i.Audi", {
          extend: Object,
          construct: function construct() {},
          implement: [qx.test.i.ICar],
          members: {
            startEngine: function startEngine() {
              return "start";
            }
          },
          statics: {
            honk: function honk() {
              return "honk";
            }
          },
          properties: {
            color: {}
          }
        });
        var audi = new qx.test.i.Audi("audi");
        this.assertTrue(qx.Interface.classImplements(qx.test.i.Audi, qx.test.i.ICar));
        qx.Class.undefine("qx.test.i.Audi");
      },
      testEverythingImplemented: function testEverythingImplemented() {
        qx.Class.define("qx.test.i.Bmw1", {
          extend: Object,
          construct: function construct() {},
          members: {
            startEngine: function startEngine() {
              return "start";
            }
          },
          statics: {
            honk: function honk() {
              return "honk";
            }
          },
          properties: {
            color: {}
          }
        });
        this.assertTrue(qx.Interface.classImplements(qx.test.i.Bmw1, qx.test.i.ICar));
        qx.Class.undefine("qx.test.i.Bmw1");
      },
      testMissingMembers: function testMissingMembers() {
        qx.Class.define("qx.test.i.Bmw2", {
          extend: Object,
          construct: function construct() {},
          statics: {
            honk: function honk() {
              return "honk";
            }
          },
          properties: {
            color: {}
          }
        });
        this.assertFalse(qx.Interface.classImplements(qx.test.i.Bmw2, qx.test.i.ICar));
        qx.Class.undefine("qx.test.i.Bmw2");
      },
      testMissingStatics: function testMissingStatics() {
        // (ie it does implement all necessary)
        qx.Class.define("qx.test.i.Bmw3", {
          extend: Object,
          construct: function construct() {},
          members: {
            startEngine: function startEngine() {
              return "start";
            }
          },
          properties: {
            color: {}
          }
        });
        this.assertTrue(qx.Interface.classImplements(qx.test.i.Bmw3, qx.test.i.ICar));
        qx.Class.undefine("qx.test.i.Bmw3");
      },
      testMissingProperties: function testMissingProperties() {
        qx.Class.define("qx.test.i.Bmw4", {
          extend: Object,
          construct: function construct() {},
          members: {
            startEngine: function startEngine() {
              return "start";
            }
          },
          statics: {
            honk: function honk() {
              return "honk";
            }
          }
        });
        this.assertFalse(qx.Interface.classImplements(qx.test.i.Bmw4, qx.test.i.ICar));
        qx.Class.undefine("qx.test.i.Bmw4");
      },
      testWithDebug: function testWithDebug() {
        if (this.isDebugOn()) {
          this.assertException(function () {
            var i = new qx.test.i.ICar();
          }, Error); // nothing defined

          this.assertException(function () {
            qx.Class.define("qx.test.i.Audi1", {
              extend: Object,
              construct: function construct() {},
              implement: [qx.test.i.ICar]
            });
          }, Error, new RegExp('Implementation of method .* is missing')); // members not defined

          this.assertException(function () {
            qx.Class.define("qx.test.i.Audi2", {
              extend: Object,
              construct: function construct() {},
              implement: [qx.test.i.ICar],
              statics: {
                honk: function honk() {
                  return "honk";
                }
              },
              properties: {
                color: {}
              }
            });
          }, Error, 'Implementation of method "startEngine" is missing'); // property not defined

          this.assertException(function () {
            qx.Class.define("qx.test.i.Audi4", {
              extend: Object,
              construct: function construct() {},
              implement: [qx.test.i.ICar],
              members: {
                startEngine: function startEngine() {
                  return "start";
                }
              },
              statics: {
                honk: function honk() {
                  return "honk";
                }
              }
            });
          }, Error, new RegExp("property .* not supported"));
        }
      },
      testAssertions: function testAssertions() {
        qx.Interface.define("qx.test.i.IComplex", {
          members: {
            add: function add(a) {
              this.assertArgumentsCount(arguments, 1, 1);
              this.assertInterface(a.constructor, qx.test.i.IComplex);
            },
            setReal: function setReal(r) {
              this.assertArgumentsCount(arguments, 1, 1);
              this.assertType(r, "number");
            },
            abs: function abs() {
              this.assert(arguments[0] == undefined);
            }
          }
        });
        qx.Class.define("qx.test.i.Complex", {
          extend: qx.core.Object,
          implement: qx.test.i.IComplex,
          construct: function construct(real, imag) {
            this._real = real;
            this._imag = imag;
          },
          members: {
            add: function add(a) {
              this._real += a._real;
              this._imag += a._imag;
            },
            setReal: function setReal(r) {
              this._real = r;
            },
            abs: function abs() {
              return Math.sqrt(this._real * this._real + (this._imag + this._imag));
            },
            toString: function toString() {
              return this._real + "+" + this._imag + "i";
            }
          }
        });
        var a = new qx.test.i.Complex(1, 1);
        var b = new qx.test.i.Complex(2, -3.4); // valid usage

        a.add(b);
        a.setReal(20);
        a.abs(); // invalid usage

        if (this.isDebugOn()) {
          this.assertException(function () {
            a.add(b, b);
          }, qx.core.AssertionError, null, "a");
          this.assertException(function () {
            a.setReal();
          }, qx.core.AssertionError, null, "b");
          this.assertException(function () {
            a.setReal(1, 2);
          }, qx.core.AssertionError, null, "c");
          this.assertException(function () {
            a.setReal("Juhu");
          }, qx.core.AssertionError, null, "d");
          this.assertException(function () {
            a.abs({});
          }, qx.core.AssertionError, null, "e");
          this.assertException(function () {
            a.add("Juhu");
          }, qx.core.AssertionError, null, "f");
        }

        ;
      },
      testProperties: function testProperties() {
        qx.Interface.define("qx.test.i.IProperties1", {
          properties: {
            value: {}
          }
        });
        qx.Class.define("qx.test.i.Properties1", {
          extend: qx.core.Object,
          implement: [qx.test.i.IProperties1],
          properties: {
            value: {
              check: "Integer"
            }
          }
        });

        if (this.isDebugOn()) {
          this.assertException(function () {
            qx.Class.define("qx.test.i.Properties2", {
              extend: qx.core.Object,
              implement: [qx.test.i.IProperties1],
              members: {
                getValue: function getValue() {},
                setValue: function setValue(value) {}
              }
            });
          });
        }

        ;
        qx.Interface.define("qx.test.i.IProperties2", {
          members: {
            getValue: function getValue() {},
            setValue: function setValue(value) {}
          }
        });
        qx.Class.define("qx.test.i.Properties3", {
          extend: qx.core.Object,
          implement: [qx.test.i.IProperties2],
          properties: {
            value: {
              check: "Integer"
            }
          }
        });
        qx.Class.define("qx.test.i.Properties4", {
          extend: qx.core.Object,
          implement: [qx.test.i.IProperties2],
          members: {
            getValue: function getValue() {},
            setValue: function setValue(value) {}
          }
        });
      },
      testEvents: function testEvents() {
        qx.Interface.define("qx.test.i.IEvents1", {
          events: {
            "change": "qx.event.type.Event"
          }
        });
        qx.Class.define("qx.test.i.Event1", {
          extend: qx.core.Object,
          implement: [qx.test.i.IEvents1],
          events: {
            change: "qx.event.type.Event"
          }
        });

        if (this.isDebugOn()) {
          this.assertException(function () {
            qx.Class.define("qx.test.i.Event2", {
              extend: qx.core.Object,
              implement: [qx.test.i.IEvents1]
            });
          });
        }

        ;
      },
      testIncludes: function testIncludes() {
        qx.Interface.define("qx.test.i.IMember", {
          members: {
            sayJuhu: function sayJuhu() {
              return true;
            }
          }
        });
        qx.Interface.define("qx.test.i.IProperties", {
          properties: {
            "color": {},
            "name": {}
          }
        });
        qx.Interface.define("qx.test.i.IAll", {
          extend: [qx.test.i.IMember, qx.test.i.IProperties]
        });
        qx.Interface.define("qx.test.i.IOther", {
          members: {
            bar: function bar() {
              return true;
            }
          }
        });
        var classDef = {
          extend: Object,
          implement: qx.test.i.IAll,
          members: {
            sayJuhu: function sayJuhu() {}
          },
          statics: {
            sayHello: function sayHello() {
              return true;
            }
          },
          properties: {
            "color": {},
            "name": {}
          }
        }; // all implemented

        var def = qx.lang.Object.clone(classDef);
        qx.Class.define("qx.test.i.Implement1", def);
        this.assertTrue(qx.Class.implementsInterface(qx.test.i.Implement1, qx.test.i.IAll), "implements IAll");
        this.assertTrue(qx.Class.implementsInterface(qx.test.i.Implement1, qx.test.i.IMember), "implements IMember");
        this.assertTrue(qx.Class.implementsInterface(qx.test.i.Implement1, qx.test.i.IProperties), "implements IProperties");
        this.assertFalse(qx.Class.implementsInterface(qx.test.i.Implement1, qx.test.i.IOther), "not implements IOther"); // no members

        var def = qx.lang.Object.clone(classDef);
        delete def.members;

        if (this.isDebugOn()) {
          this.assertException(function () {
            qx.Class.define("qx.test.i.Implement2", def);
          }, Error, "Implementation of method", "No members defined.");
        }

        ; // no properties

        var def = qx.lang.Object.clone(classDef);
        delete def.properties;

        if (this.isDebugOn()) {
          this.assertException(function () {
            qx.Class.define("qx.test.i.Implement4", def);
          }, Error, new RegExp("property .* is not supported"), "No properties defined.");
        }

        ;
      },

      /**
       * abstract classes may define an interface and implement it only partially
       * sub classes must implement the missing methods
       */
      testAbstractClass: function testAbstractClass() {
        qx.Interface.define("qx.test.i.IJuhu", {
          members: {
            sayJuhu: function sayJuhu() {},
            sayKinners: function sayKinners() {}
          }
        }); // should not raise an exception

        qx.Class.define("qx.test.i.AbstractJuhu1", {
          extend: qx.core.Object,
          implement: qx.test.i.IJuhu,
          type: "abstract"
        }); // should not raise an exception

        qx.Class.define("qx.test.i.AbstractJuhu2", {
          extend: qx.core.Object,
          implement: qx.test.i.IJuhu,
          type: "abstract",
          members: {
            sayJuhu: function sayJuhu() {
              return "Juhu";
            }
          }
        }); // should raise an exception

        if (this.isDebugOn()) {
          this.assertException(function () {
            qx.Class.define("qx.test.i.Juhu1", {
              extend: qx.test.i.AbstractJuhu1,
              members: {
                sayJuhu: function sayJuhu() {
                  return "Juhu";
                }
              }
            });
          }, Error, '.*Implementation of method "sayKinners" is missing in class "qx.test.i.Juhu1" required by interface "qx.test.i.IJuhu"');
        }

        ;
        qx.Class.define("qx.test.i.Juhu1", {
          extend: qx.test.i.AbstractJuhu2,
          members: {
            sayKinners: function sayKinners() {
              return "Kinners";
            }
          }
        });
      },
      testGeneratedIsMethods: function testGeneratedIsMethods() {
        qx.Interface.define("qx.test.i.IIs", {
          members: {
            isProp: function isProp() {}
          }
        });
        qx.Class.define("qx.test.i.Is", {
          extend: qx.core.Object,
          implement: qx.test.i.IIs,
          properties: {
            prop: {
              check: "Boolean",
              init: true
            }
          }
        });
      }
    }
  });
  qx.test.Interface.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Interface.js.map?dt=1588104139129