"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e2) {
          reject(e2);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e2) {
          reject(e2);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/lazysizes/lazysizes.js
  var require_lazysizes = __commonJS({
    "node_modules/lazysizes/lazysizes.js"(exports, module) {
      (function(window2, factory) {
        var lazySizes2 = factory(window2, window2.document, Date);
        window2.lazySizes = lazySizes2;
        if (typeof module == "object" && module.exports) {
          module.exports = lazySizes2;
        }
      })(
        typeof window != "undefined" ? window : {},
        /**
         * import("./types/global")
         * @typedef { import("./types/lazysizes-config").LazySizesConfigPartial } LazySizesConfigPartial
         */
        function l(window2, document2, Date2) {
          "use strict";
          var lazysizes, lazySizesCfg;
          (function() {
            var prop;
            var lazySizesDefaults = {
              lazyClass: "lazyload",
              loadedClass: "lazyloaded",
              loadingClass: "lazyloading",
              preloadClass: "lazypreload",
              errorClass: "lazyerror",
              //strictClass: 'lazystrict',
              autosizesClass: "lazyautosizes",
              fastLoadedClass: "ls-is-cached",
              iframeLoadMode: 0,
              srcAttr: "data-src",
              srcsetAttr: "data-srcset",
              sizesAttr: "data-sizes",
              //preloadAfterLoad: false,
              minSize: 40,
              customMedia: {},
              init: true,
              expFactor: 1.5,
              hFac: 0.8,
              loadMode: 2,
              loadHidden: true,
              ricTimeout: 0,
              throttleDelay: 125
            };
            lazySizesCfg = window2.lazySizesConfig || window2.lazysizesConfig || {};
            for (prop in lazySizesDefaults) {
              if (!(prop in lazySizesCfg)) {
                lazySizesCfg[prop] = lazySizesDefaults[prop];
              }
            }
          })();
          if (!document2 || !document2.getElementsByClassName) {
            return {
              init: function() {
              },
              /**
               * @type { LazySizesConfigPartial }
               */
              cfg: lazySizesCfg,
              /**
               * @type { true }
               */
              noSupport: true
            };
          }
          var docElem = document2.documentElement;
          var supportPicture = window2.HTMLPictureElement;
          var _addEventListener = "addEventListener";
          var _getAttribute = "getAttribute";
          var addEventListener = window2[_addEventListener].bind(window2);
          var setTimeout2 = window2.setTimeout;
          var requestAnimationFrame = window2.requestAnimationFrame || setTimeout2;
          var requestIdleCallback = window2.requestIdleCallback;
          var regPicture = /^picture$/i;
          var loadEvents = ["load", "error", "lazyincluded", "_lazyloaded"];
          var regClassCache = {};
          var forEach = Array.prototype.forEach;
          var hasClass = function(ele, cls) {
            if (!regClassCache[cls]) {
              regClassCache[cls] = new RegExp("(\\s|^)" + cls + "(\\s|$)");
            }
            return regClassCache[cls].test(ele[_getAttribute]("class") || "") && regClassCache[cls];
          };
          var addClass = function(ele, cls) {
            if (!hasClass(ele, cls)) {
              ele.setAttribute("class", (ele[_getAttribute]("class") || "").trim() + " " + cls);
            }
          };
          var removeClass = function(ele, cls) {
            var reg;
            if (reg = hasClass(ele, cls)) {
              ele.setAttribute("class", (ele[_getAttribute]("class") || "").replace(reg, " "));
            }
          };
          var addRemoveLoadEvents = function(dom, fn, add) {
            var action = add ? _addEventListener : "removeEventListener";
            if (add) {
              addRemoveLoadEvents(dom, fn);
            }
            loadEvents.forEach(function(evt) {
              dom[action](evt, fn);
            });
          };
          var triggerEvent = function(elem, name, detail, noBubbles, noCancelable) {
            var event = document2.createEvent("Event");
            if (!detail) {
              detail = {};
            }
            detail.instance = lazysizes;
            event.initEvent(name, !noBubbles, !noCancelable);
            event.detail = detail;
            elem.dispatchEvent(event);
            return event;
          };
          var updatePolyfill = function(el, full) {
            var polyfill;
            if (!supportPicture && (polyfill = window2.picturefill || lazySizesCfg.pf)) {
              if (full && full.src && !el[_getAttribute]("srcset")) {
                el.setAttribute("srcset", full.src);
              }
              polyfill({ reevaluate: true, elements: [el] });
            } else if (full && full.src) {
              el.src = full.src;
            }
          };
          var getCSS = function(elem, style) {
            return (getComputedStyle(elem, null) || {})[style];
          };
          var getWidth = function(elem, parent, width) {
            width = width || elem.offsetWidth;
            while (width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth) {
              width = parent.offsetWidth;
              parent = parent.parentNode;
            }
            return width;
          };
          var rAF = function() {
            var running, waiting;
            var firstFns = [];
            var secondFns = [];
            var fns = firstFns;
            var run = function() {
              var runFns = fns;
              fns = firstFns.length ? secondFns : firstFns;
              running = true;
              waiting = false;
              while (runFns.length) {
                runFns.shift()();
              }
              running = false;
            };
            var rafBatch = function(fn, queue) {
              if (running && !queue) {
                fn.apply(this, arguments);
              } else {
                fns.push(fn);
                if (!waiting) {
                  waiting = true;
                  (document2.hidden ? setTimeout2 : requestAnimationFrame)(run);
                }
              }
            };
            rafBatch._lsFlush = run;
            return rafBatch;
          }();
          var rAFIt = function(fn, simple) {
            return simple ? function() {
              rAF(fn);
            } : function() {
              var that = this;
              var args = arguments;
              rAF(function() {
                fn.apply(that, args);
              });
            };
          };
          var throttle = function(fn) {
            var running;
            var lastTime = 0;
            var gDelay = lazySizesCfg.throttleDelay;
            var rICTimeout = lazySizesCfg.ricTimeout;
            var run = function() {
              running = false;
              lastTime = Date2.now();
              fn();
            };
            var idleCallback = requestIdleCallback && rICTimeout > 49 ? function() {
              requestIdleCallback(run, { timeout: rICTimeout });
              if (rICTimeout !== lazySizesCfg.ricTimeout) {
                rICTimeout = lazySizesCfg.ricTimeout;
              }
            } : rAFIt(function() {
              setTimeout2(run);
            }, true);
            return function(isPriority) {
              var delay;
              if (isPriority = isPriority === true) {
                rICTimeout = 33;
              }
              if (running) {
                return;
              }
              running = true;
              delay = gDelay - (Date2.now() - lastTime);
              if (delay < 0) {
                delay = 0;
              }
              if (isPriority || delay < 9) {
                idleCallback();
              } else {
                setTimeout2(idleCallback, delay);
              }
            };
          };
          var debounce = function(func) {
            var timeout, timestamp;
            var wait = 99;
            var run = function() {
              timeout = null;
              func();
            };
            var later = function() {
              var last = Date2.now() - timestamp;
              if (last < wait) {
                setTimeout2(later, wait - last);
              } else {
                (requestIdleCallback || run)(run);
              }
            };
            return function() {
              timestamp = Date2.now();
              if (!timeout) {
                timeout = setTimeout2(later, wait);
              }
            };
          };
          var loader = function() {
            var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
            var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
            var regImg = /^img$/i;
            var regIframe = /^iframe$/i;
            var supportScroll = "onscroll" in window2 && !/(gle|ing)bot/.test(navigator.userAgent);
            var shrinkExpand = 0;
            var currentExpand = 0;
            var isLoading = 0;
            var lowRuns = -1;
            var resetPreloading = function(e2) {
              isLoading--;
              if (!e2 || isLoading < 0 || !e2.target) {
                isLoading = 0;
              }
            };
            var isVisible = function(elem) {
              if (isBodyHidden == null) {
                isBodyHidden = getCSS(document2.body, "visibility") == "hidden";
              }
              return isBodyHidden || !(getCSS(elem.parentNode, "visibility") == "hidden" && getCSS(elem, "visibility") == "hidden");
            };
            var isNestedVisible = function(elem, elemExpand) {
              var outerRect;
              var parent = elem;
              var visible = isVisible(elem);
              eLtop -= elemExpand;
              eLbottom += elemExpand;
              eLleft -= elemExpand;
              eLright += elemExpand;
              while (visible && (parent = parent.offsetParent) && parent != document2.body && parent != docElem) {
                visible = (getCSS(parent, "opacity") || 1) > 0;
                if (visible && getCSS(parent, "overflow") != "visible") {
                  outerRect = parent.getBoundingClientRect();
                  visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
                }
              }
              return visible;
            };
            var checkElements = function() {
              var eLlen, i3, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
              var lazyloadElems = lazysizes.elements;
              if ((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
                i3 = 0;
                lowRuns++;
                for (; i3 < eLlen; i3++) {
                  if (!lazyloadElems[i3] || lazyloadElems[i3]._lazyRace) {
                    continue;
                  }
                  if (!supportScroll || lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i3])) {
                    unveilElement(lazyloadElems[i3]);
                    continue;
                  }
                  if (!(elemExpandVal = lazyloadElems[i3][_getAttribute]("data-expand")) || !(elemExpand = elemExpandVal * 1)) {
                    elemExpand = currentExpand;
                  }
                  if (!defaultExpand) {
                    defaultExpand = !lazySizesCfg.expand || lazySizesCfg.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesCfg.expand;
                    lazysizes._defEx = defaultExpand;
                    preloadExpand = defaultExpand * lazySizesCfg.expFactor;
                    hFac = lazySizesCfg.hFac;
                    isBodyHidden = null;
                    if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document2.hidden) {
                      currentExpand = preloadExpand;
                      lowRuns = 0;
                    } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
                      currentExpand = defaultExpand;
                    } else {
                      currentExpand = shrinkExpand;
                    }
                  }
                  if (beforeExpandVal !== elemExpand) {
                    eLvW = innerWidth + elemExpand * hFac;
                    elvH = innerHeight + elemExpand;
                    elemNegativeExpand = elemExpand * -1;
                    beforeExpandVal = elemExpand;
                  }
                  rect = lazyloadElems[i3].getBoundingClientRect();
                  if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesCfg.loadHidden || isVisible(lazyloadElems[i3])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i3], elemExpand))) {
                    unveilElement(lazyloadElems[i3]);
                    loadedSomething = true;
                    if (isLoading > 9) {
                      break;
                    }
                  } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesCfg.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i3][_getAttribute](lazySizesCfg.sizesAttr) != "auto"))) {
                    autoLoadElem = preloadElems[0] || lazyloadElems[i3];
                  }
                }
                if (autoLoadElem && !loadedSomething) {
                  unveilElement(autoLoadElem);
                }
              }
            };
            var throttledCheckElements = throttle(checkElements);
            var switchLoadingClass = function(e2) {
              var elem = e2.target;
              if (elem._lazyCache) {
                delete elem._lazyCache;
                return;
              }
              resetPreloading(e2);
              addClass(elem, lazySizesCfg.loadedClass);
              removeClass(elem, lazySizesCfg.loadingClass);
              addRemoveLoadEvents(elem, rafSwitchLoadingClass);
              triggerEvent(elem, "lazyloaded");
            };
            var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
            var rafSwitchLoadingClass = function(e2) {
              rafedSwitchLoadingClass({ target: e2.target });
            };
            var changeIframeSrc = function(elem, src) {
              var loadMode2 = elem.getAttribute("data-load-mode") || lazySizesCfg.iframeLoadMode;
              if (loadMode2 == 0) {
                elem.contentWindow.location.replace(src);
              } else if (loadMode2 == 1) {
                elem.src = src;
              }
            };
            var handleSources = function(source) {
              var customMedia;
              var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);
              if (customMedia = lazySizesCfg.customMedia[source[_getAttribute]("data-media") || source[_getAttribute]("media")]) {
                source.setAttribute("media", customMedia);
              }
              if (sourceSrcset) {
                source.setAttribute("srcset", sourceSrcset);
              }
            };
            var lazyUnveil = rAFIt(function(elem, detail, isAuto, sizes, isImg) {
              var src, srcset, parent, isPicture, event, firesLoad;
              if (!(event = triggerEvent(elem, "lazybeforeunveil", detail)).defaultPrevented) {
                if (sizes) {
                  if (isAuto) {
                    addClass(elem, lazySizesCfg.autosizesClass);
                  } else {
                    elem.setAttribute("sizes", sizes);
                  }
                }
                srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
                src = elem[_getAttribute](lazySizesCfg.srcAttr);
                if (isImg) {
                  parent = elem.parentNode;
                  isPicture = parent && regPicture.test(parent.nodeName || "");
                }
                firesLoad = detail.firesLoad || "src" in elem && (srcset || src || isPicture);
                event = { target: elem };
                addClass(elem, lazySizesCfg.loadingClass);
                if (firesLoad) {
                  clearTimeout(resetPreloadingTimer);
                  resetPreloadingTimer = setTimeout2(resetPreloading, 2500);
                  addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
                }
                if (isPicture) {
                  forEach.call(parent.getElementsByTagName("source"), handleSources);
                }
                if (srcset) {
                  elem.setAttribute("srcset", srcset);
                } else if (src && !isPicture) {
                  if (regIframe.test(elem.nodeName)) {
                    changeIframeSrc(elem, src);
                  } else {
                    elem.src = src;
                  }
                }
                if (isImg && (srcset || isPicture)) {
                  updatePolyfill(elem, { src });
                }
              }
              if (elem._lazyRace) {
                delete elem._lazyRace;
              }
              removeClass(elem, lazySizesCfg.lazyClass);
              rAF(function() {
                var isLoaded = elem.complete && elem.naturalWidth > 1;
                if (!firesLoad || isLoaded) {
                  if (isLoaded) {
                    addClass(elem, lazySizesCfg.fastLoadedClass);
                  }
                  switchLoadingClass(event);
                  elem._lazyCache = true;
                  setTimeout2(function() {
                    if ("_lazyCache" in elem) {
                      delete elem._lazyCache;
                    }
                  }, 9);
                }
                if (elem.loading == "lazy") {
                  isLoading--;
                }
              }, true);
            });
            var unveilElement = function(elem) {
              if (elem._lazyRace) {
                return;
              }
              var detail;
              var isImg = regImg.test(elem.nodeName);
              var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]("sizes"));
              var isAuto = sizes == "auto";
              if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]("src") || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)) {
                return;
              }
              detail = triggerEvent(elem, "lazyunveilread").detail;
              if (isAuto) {
                autoSizer.updateElem(elem, true, elem.offsetWidth);
              }
              elem._lazyRace = true;
              isLoading++;
              lazyUnveil(elem, detail, isAuto, sizes, isImg);
            };
            var afterScroll = debounce(function() {
              lazySizesCfg.loadMode = 3;
              throttledCheckElements();
            });
            var altLoadmodeScrollListner = function() {
              if (lazySizesCfg.loadMode == 3) {
                lazySizesCfg.loadMode = 2;
              }
              afterScroll();
            };
            var onload = function() {
              if (isCompleted) {
                return;
              }
              if (Date2.now() - started < 999) {
                setTimeout2(onload, 999);
                return;
              }
              isCompleted = true;
              lazySizesCfg.loadMode = 3;
              throttledCheckElements();
              addEventListener("scroll", altLoadmodeScrollListner, true);
            };
            return {
              _: function() {
                started = Date2.now();
                lazysizes.elements = document2.getElementsByClassName(lazySizesCfg.lazyClass);
                preloadElems = document2.getElementsByClassName(lazySizesCfg.lazyClass + " " + lazySizesCfg.preloadClass);
                addEventListener("scroll", throttledCheckElements, true);
                addEventListener("resize", throttledCheckElements, true);
                addEventListener("pageshow", function(e2) {
                  if (e2.persisted) {
                    var loadingElements = document2.querySelectorAll("." + lazySizesCfg.loadingClass);
                    if (loadingElements.length && loadingElements.forEach) {
                      requestAnimationFrame(function() {
                        loadingElements.forEach(function(img) {
                          if (img.complete) {
                            unveilElement(img);
                          }
                        });
                      });
                    }
                  }
                });
                if (window2.MutationObserver) {
                  new MutationObserver(throttledCheckElements).observe(docElem, { childList: true, subtree: true, attributes: true });
                } else {
                  docElem[_addEventListener]("DOMNodeInserted", throttledCheckElements, true);
                  docElem[_addEventListener]("DOMAttrModified", throttledCheckElements, true);
                  setInterval(throttledCheckElements, 999);
                }
                addEventListener("hashchange", throttledCheckElements, true);
                ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(name) {
                  document2[_addEventListener](name, throttledCheckElements, true);
                });
                if (/d$|^c/.test(document2.readyState)) {
                  onload();
                } else {
                  addEventListener("load", onload);
                  document2[_addEventListener]("DOMContentLoaded", throttledCheckElements);
                  setTimeout2(onload, 2e4);
                }
                if (lazysizes.elements.length) {
                  checkElements();
                  rAF._lsFlush();
                } else {
                  throttledCheckElements();
                }
              },
              checkElems: throttledCheckElements,
              unveil: unveilElement,
              _aLSL: altLoadmodeScrollListner
            };
          }();
          var autoSizer = function() {
            var autosizesElems;
            var sizeElement = rAFIt(function(elem, parent, event, width) {
              var sources, i3, len;
              elem._lazysizesWidth = width;
              width += "px";
              elem.setAttribute("sizes", width);
              if (regPicture.test(parent.nodeName || "")) {
                sources = parent.getElementsByTagName("source");
                for (i3 = 0, len = sources.length; i3 < len; i3++) {
                  sources[i3].setAttribute("sizes", width);
                }
              }
              if (!event.detail.dataAttr) {
                updatePolyfill(elem, event.detail);
              }
            });
            var getSizeElement = function(elem, dataAttr, width) {
              var event;
              var parent = elem.parentNode;
              if (parent) {
                width = getWidth(elem, parent, width);
                event = triggerEvent(elem, "lazybeforesizes", { width, dataAttr: !!dataAttr });
                if (!event.defaultPrevented) {
                  width = event.detail.width;
                  if (width && width !== elem._lazysizesWidth) {
                    sizeElement(elem, parent, event, width);
                  }
                }
              }
            };
            var updateElementsSizes = function() {
              var i3;
              var len = autosizesElems.length;
              if (len) {
                i3 = 0;
                for (; i3 < len; i3++) {
                  getSizeElement(autosizesElems[i3]);
                }
              }
            };
            var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
            return {
              _: function() {
                autosizesElems = document2.getElementsByClassName(lazySizesCfg.autosizesClass);
                addEventListener("resize", debouncedUpdateElementsSizes);
              },
              checkElems: debouncedUpdateElementsSizes,
              updateElem: getSizeElement
            };
          }();
          var init = function() {
            if (!init.i && document2.getElementsByClassName) {
              init.i = true;
              autoSizer._();
              loader._();
            }
          };
          setTimeout2(function() {
            if (lazySizesCfg.init) {
              init();
            }
          });
          lazysizes = {
            /**
             * @type { LazySizesConfigPartial }
             */
            cfg: lazySizesCfg,
            autoSizer,
            loader,
            init,
            uP: updatePolyfill,
            aC: addClass,
            rC: removeClass,
            hC: hasClass,
            fire: triggerEvent,
            gW: getWidth,
            rAF
          };
          return lazysizes;
        }
      );
    }
  });

  // node_modules/lazysizes/plugins/native-loading/ls.native-loading.js
  var require_ls_native_loading = __commonJS({
    "node_modules/lazysizes/plugins/native-loading/ls.native-loading.js"(exports, module) {
      (function(window2, factory) {
        var globalInstall = function() {
          factory(window2.lazySizes);
          window2.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window2, window2.document);
        if (typeof module == "object" && module.exports) {
          factory(require_lazysizes());
        } else if (typeof define == "function" && define.amd) {
          define(["lazysizes"], factory);
        } else if (window2.lazySizes) {
          globalInstall();
        } else {
          window2.addEventListener("lazyunveilread", globalInstall, true);
        }
      })(window, function(window2, document2, lazySizes2) {
        "use strict";
        var imgSupport = "loading" in HTMLImageElement.prototype;
        var iframeSupport = "loading" in HTMLIFrameElement.prototype;
        var isConfigSet = false;
        var oldPrematureUnveil = lazySizes2.prematureUnveil;
        var cfg = lazySizes2.cfg;
        var listenerMap = {
          focus: 1,
          mouseover: 1,
          click: 1,
          load: 1,
          transitionend: 1,
          animationend: 1,
          scroll: 1,
          resize: 1
        };
        if (!cfg.nativeLoading) {
          cfg.nativeLoading = {};
        }
        if (!window2.addEventListener || !window2.MutationObserver || !imgSupport && !iframeSupport) {
          return;
        }
        function disableEvents() {
          var loader = lazySizes2.loader;
          var throttledCheckElements = loader.checkElems;
          var removeALSL = function() {
            setTimeout(function() {
              window2.removeEventListener("scroll", loader._aLSL, true);
            }, 1e3);
          };
          var currentListenerMap = typeof cfg.nativeLoading.disableListeners == "object" ? cfg.nativeLoading.disableListeners : listenerMap;
          if (currentListenerMap.scroll) {
            window2.addEventListener("load", removeALSL);
            removeALSL();
            window2.removeEventListener("scroll", throttledCheckElements, true);
          }
          if (currentListenerMap.resize) {
            window2.removeEventListener("resize", throttledCheckElements, true);
          }
          Object.keys(currentListenerMap).forEach(function(name) {
            if (currentListenerMap[name]) {
              document2.removeEventListener(name, throttledCheckElements, true);
            }
          });
        }
        function runConfig() {
          if (isConfigSet) {
            return;
          }
          isConfigSet = true;
          if (imgSupport && iframeSupport && cfg.nativeLoading.disableListeners) {
            if (cfg.nativeLoading.disableListeners === true) {
              cfg.nativeLoading.setLoadingAttribute = true;
            }
            disableEvents();
          }
          if (cfg.nativeLoading.setLoadingAttribute) {
            window2.addEventListener("lazybeforeunveil", function(e2) {
              var element = e2.target;
              if ("loading" in element && !element.getAttribute("loading")) {
                element.setAttribute("loading", "lazy");
              }
            }, true);
          }
        }
        lazySizes2.prematureUnveil = function prematureUnveil(element) {
          if (!isConfigSet) {
            runConfig();
          }
          if ("loading" in element && (cfg.nativeLoading.setLoadingAttribute || element.getAttribute("loading")) && (element.getAttribute("data-sizes") != "auto" || element.offsetWidth)) {
            return true;
          }
          if (oldPrematureUnveil) {
            return oldPrematureUnveil(element);
          }
        };
      });
    }
  });

  // node_modules/clipboard/dist/clipboard.js
  var require_clipboard = __commonJS({
    "node_modules/clipboard/dist/clipboard.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory();
        else if (typeof define === "function" && define.amd)
          define([], factory);
        else if (typeof exports === "object")
          exports["ClipboardJS"] = factory();
        else
          root["ClipboardJS"] = factory();
      })(exports, function() {
        return (
          /******/
          function() {
            var __webpack_modules__ = {
              /***/
              686: (
                /***/
                function(__unused_webpack_module, __webpack_exports__, __webpack_require__2) {
                  "use strict";
                  __webpack_require__2.d(__webpack_exports__, {
                    "default": function() {
                      return (
                        /* binding */
                        clipboard
                      );
                    }
                  });
                  var tiny_emitter = __webpack_require__2(279);
                  var tiny_emitter_default = /* @__PURE__ */ __webpack_require__2.n(tiny_emitter);
                  var listen = __webpack_require__2(370);
                  var listen_default = /* @__PURE__ */ __webpack_require__2.n(listen);
                  var src_select = __webpack_require__2(817);
                  var select_default = /* @__PURE__ */ __webpack_require__2.n(src_select);
                  ;
                  function command(type) {
                    try {
                      return document.execCommand(type);
                    } catch (err) {
                      return false;
                    }
                  }
                  ;
                  var ClipboardActionCut = function ClipboardActionCut2(target) {
                    var selectedText = select_default()(target);
                    command("cut");
                    return selectedText;
                  };
                  var actions_cut = ClipboardActionCut;
                  ;
                  function createFakeElement(value) {
                    var isRTL = document.documentElement.getAttribute("dir") === "rtl";
                    var fakeElement = document.createElement("textarea");
                    fakeElement.style.fontSize = "12pt";
                    fakeElement.style.border = "0";
                    fakeElement.style.padding = "0";
                    fakeElement.style.margin = "0";
                    fakeElement.style.position = "absolute";
                    fakeElement.style[isRTL ? "right" : "left"] = "-9999px";
                    var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                    fakeElement.style.top = "".concat(yPosition, "px");
                    fakeElement.setAttribute("readonly", "");
                    fakeElement.value = value;
                    return fakeElement;
                  }
                  ;
                  var fakeCopyAction = function fakeCopyAction2(value, options) {
                    var fakeElement = createFakeElement(value);
                    options.container.appendChild(fakeElement);
                    var selectedText = select_default()(fakeElement);
                    command("copy");
                    fakeElement.remove();
                    return selectedText;
                  };
                  var ClipboardActionCopy = function ClipboardActionCopy2(target) {
                    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                      container: document.body
                    };
                    var selectedText = "";
                    if (typeof target === "string") {
                      selectedText = fakeCopyAction(target, options);
                    } else if (target instanceof HTMLInputElement && !["text", "search", "url", "tel", "password"].includes(target === null || target === void 0 ? void 0 : target.type)) {
                      selectedText = fakeCopyAction(target.value, options);
                    } else {
                      selectedText = select_default()(target);
                      command("copy");
                    }
                    return selectedText;
                  };
                  var actions_copy = ClipboardActionCopy;
                  ;
                  function _typeof(obj) {
                    "@babel/helpers - typeof";
                    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                      _typeof = function _typeof2(obj2) {
                        return typeof obj2;
                      };
                    } else {
                      _typeof = function _typeof2(obj2) {
                        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                      };
                    }
                    return _typeof(obj);
                  }
                  var ClipboardActionDefault = function ClipboardActionDefault2() {
                    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    var _options$action = options.action, action = _options$action === void 0 ? "copy" : _options$action, container = options.container, target = options.target, text = options.text;
                    if (action !== "copy" && action !== "cut") {
                      throw new Error('Invalid "action" value, use either "copy" or "cut"');
                    }
                    if (target !== void 0) {
                      if (target && _typeof(target) === "object" && target.nodeType === 1) {
                        if (action === "copy" && target.hasAttribute("disabled")) {
                          throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }
                        if (action === "cut" && (target.hasAttribute("readonly") || target.hasAttribute("disabled"))) {
                          throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`);
                        }
                      } else {
                        throw new Error('Invalid "target" value, use a valid Element');
                      }
                    }
                    if (text) {
                      return actions_copy(text, {
                        container
                      });
                    }
                    if (target) {
                      return action === "cut" ? actions_cut(target) : actions_copy(target, {
                        container
                      });
                    }
                  };
                  var actions_default = ClipboardActionDefault;
                  ;
                  function clipboard_typeof(obj) {
                    "@babel/helpers - typeof";
                    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                      clipboard_typeof = function _typeof2(obj2) {
                        return typeof obj2;
                      };
                    } else {
                      clipboard_typeof = function _typeof2(obj2) {
                        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                      };
                    }
                    return clipboard_typeof(obj);
                  }
                  function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                      throw new TypeError("Cannot call a class as a function");
                    }
                  }
                  function _defineProperties(target, props) {
                    for (var i3 = 0; i3 < props.length; i3++) {
                      var descriptor = props[i3];
                      descriptor.enumerable = descriptor.enumerable || false;
                      descriptor.configurable = true;
                      if ("value" in descriptor) descriptor.writable = true;
                      Object.defineProperty(target, descriptor.key, descriptor);
                    }
                  }
                  function _createClass(Constructor, protoProps, staticProps) {
                    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) _defineProperties(Constructor, staticProps);
                    return Constructor;
                  }
                  function _inherits(subClass, superClass) {
                    if (typeof superClass !== "function" && superClass !== null) {
                      throw new TypeError("Super expression must either be null or a function");
                    }
                    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
                    if (superClass) _setPrototypeOf(subClass, superClass);
                  }
                  function _setPrototypeOf(o2, p) {
                    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o3, p2) {
                      o3.__proto__ = p2;
                      return o3;
                    };
                    return _setPrototypeOf(o2, p);
                  }
                  function _createSuper(Derived) {
                    var hasNativeReflectConstruct = _isNativeReflectConstruct();
                    return function _createSuperInternal() {
                      var Super = _getPrototypeOf(Derived), result;
                      if (hasNativeReflectConstruct) {
                        var NewTarget = _getPrototypeOf(this).constructor;
                        result = Reflect.construct(Super, arguments, NewTarget);
                      } else {
                        result = Super.apply(this, arguments);
                      }
                      return _possibleConstructorReturn(this, result);
                    };
                  }
                  function _possibleConstructorReturn(self, call) {
                    if (call && (clipboard_typeof(call) === "object" || typeof call === "function")) {
                      return call;
                    }
                    return _assertThisInitialized(self);
                  }
                  function _assertThisInitialized(self) {
                    if (self === void 0) {
                      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }
                    return self;
                  }
                  function _isNativeReflectConstruct() {
                    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
                    if (Reflect.construct.sham) return false;
                    if (typeof Proxy === "function") return true;
                    try {
                      Date.prototype.toString.call(Reflect.construct(Date, [], function() {
                      }));
                      return true;
                    } catch (e2) {
                      return false;
                    }
                  }
                  function _getPrototypeOf(o2) {
                    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o3) {
                      return o3.__proto__ || Object.getPrototypeOf(o3);
                    };
                    return _getPrototypeOf(o2);
                  }
                  function getAttributeValue(suffix, element) {
                    var attribute = "data-clipboard-".concat(suffix);
                    if (!element.hasAttribute(attribute)) {
                      return;
                    }
                    return element.getAttribute(attribute);
                  }
                  var Clipboard2 = /* @__PURE__ */ function(_Emitter) {
                    _inherits(Clipboard3, _Emitter);
                    var _super = _createSuper(Clipboard3);
                    function Clipboard3(trigger, options) {
                      var _this;
                      _classCallCheck(this, Clipboard3);
                      _this = _super.call(this);
                      _this.resolveOptions(options);
                      _this.listenClick(trigger);
                      return _this;
                    }
                    _createClass(Clipboard3, [{
                      key: "resolveOptions",
                      value: function resolveOptions() {
                        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                        this.action = typeof options.action === "function" ? options.action : this.defaultAction;
                        this.target = typeof options.target === "function" ? options.target : this.defaultTarget;
                        this.text = typeof options.text === "function" ? options.text : this.defaultText;
                        this.container = clipboard_typeof(options.container) === "object" ? options.container : document.body;
                      }
                      /**
                       * Adds a click event listener to the passed trigger.
                       * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
                       */
                    }, {
                      key: "listenClick",
                      value: function listenClick(trigger) {
                        var _this2 = this;
                        this.listener = listen_default()(trigger, "click", function(e2) {
                          return _this2.onClick(e2);
                        });
                      }
                      /**
                       * Defines a new `ClipboardAction` on each click event.
                       * @param {Event} e
                       */
                    }, {
                      key: "onClick",
                      value: function onClick(e2) {
                        var trigger = e2.delegateTarget || e2.currentTarget;
                        var action = this.action(trigger) || "copy";
                        var text = actions_default({
                          action,
                          container: this.container,
                          target: this.target(trigger),
                          text: this.text(trigger)
                        });
                        this.emit(text ? "success" : "error", {
                          action,
                          text,
                          trigger,
                          clearSelection: function clearSelection() {
                            if (trigger) {
                              trigger.focus();
                            }
                            window.getSelection().removeAllRanges();
                          }
                        });
                      }
                      /**
                       * Default `action` lookup function.
                       * @param {Element} trigger
                       */
                    }, {
                      key: "defaultAction",
                      value: function defaultAction(trigger) {
                        return getAttributeValue("action", trigger);
                      }
                      /**
                       * Default `target` lookup function.
                       * @param {Element} trigger
                       */
                    }, {
                      key: "defaultTarget",
                      value: function defaultTarget(trigger) {
                        var selector = getAttributeValue("target", trigger);
                        if (selector) {
                          return document.querySelector(selector);
                        }
                      }
                      /**
                       * Allow fire programmatically a copy action
                       * @param {String|HTMLElement} target
                       * @param {Object} options
                       * @returns Text copied.
                       */
                    }, {
                      key: "defaultText",
                      /**
                       * Default `text` lookup function.
                       * @param {Element} trigger
                       */
                      value: function defaultText(trigger) {
                        return getAttributeValue("text", trigger);
                      }
                      /**
                       * Destroy lifecycle.
                       */
                    }, {
                      key: "destroy",
                      value: function destroy() {
                        this.listener.destroy();
                      }
                    }], [{
                      key: "copy",
                      value: function copy(target) {
                        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                          container: document.body
                        };
                        return actions_copy(target, options);
                      }
                      /**
                       * Allow fire programmatically a cut action
                       * @param {String|HTMLElement} target
                       * @returns Text cutted.
                       */
                    }, {
                      key: "cut",
                      value: function cut(target) {
                        return actions_cut(target);
                      }
                      /**
                       * Returns the support of the given action, or all actions if no action is
                       * given.
                       * @param {String} [action]
                       */
                    }, {
                      key: "isSupported",
                      value: function isSupported() {
                        var action = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["copy", "cut"];
                        var actions = typeof action === "string" ? [action] : action;
                        var support = !!document.queryCommandSupported;
                        actions.forEach(function(action2) {
                          support = support && !!document.queryCommandSupported(action2);
                        });
                        return support;
                      }
                    }]);
                    return Clipboard3;
                  }(tiny_emitter_default());
                  var clipboard = Clipboard2;
                }
              ),
              /***/
              828: (
                /***/
                function(module2) {
                  var DOCUMENT_NODE_TYPE = 9;
                  if (typeof Element !== "undefined" && !Element.prototype.matches) {
                    var proto = Element.prototype;
                    proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
                  }
                  function closest(element, selector) {
                    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
                      if (typeof element.matches === "function" && element.matches(selector)) {
                        return element;
                      }
                      element = element.parentNode;
                    }
                  }
                  module2.exports = closest;
                }
              ),
              /***/
              438: (
                /***/
                function(module2, __unused_webpack_exports, __webpack_require__2) {
                  var closest = __webpack_require__2(828);
                  function _delegate(element, selector, type, callback, useCapture) {
                    var listenerFn = listener.apply(this, arguments);
                    element.addEventListener(type, listenerFn, useCapture);
                    return {
                      destroy: function() {
                        element.removeEventListener(type, listenerFn, useCapture);
                      }
                    };
                  }
                  function delegate(elements, selector, type, callback, useCapture) {
                    if (typeof elements.addEventListener === "function") {
                      return _delegate.apply(null, arguments);
                    }
                    if (typeof type === "function") {
                      return _delegate.bind(null, document).apply(null, arguments);
                    }
                    if (typeof elements === "string") {
                      elements = document.querySelectorAll(elements);
                    }
                    return Array.prototype.map.call(elements, function(element) {
                      return _delegate(element, selector, type, callback, useCapture);
                    });
                  }
                  function listener(element, selector, type, callback) {
                    return function(e2) {
                      e2.delegateTarget = closest(e2.target, selector);
                      if (e2.delegateTarget) {
                        callback.call(element, e2);
                      }
                    };
                  }
                  module2.exports = delegate;
                }
              ),
              /***/
              879: (
                /***/
                function(__unused_webpack_module, exports2) {
                  exports2.node = function(value) {
                    return value !== void 0 && value instanceof HTMLElement && value.nodeType === 1;
                  };
                  exports2.nodeList = function(value) {
                    var type = Object.prototype.toString.call(value);
                    return value !== void 0 && (type === "[object NodeList]" || type === "[object HTMLCollection]") && "length" in value && (value.length === 0 || exports2.node(value[0]));
                  };
                  exports2.string = function(value) {
                    return typeof value === "string" || value instanceof String;
                  };
                  exports2.fn = function(value) {
                    var type = Object.prototype.toString.call(value);
                    return type === "[object Function]";
                  };
                }
              ),
              /***/
              370: (
                /***/
                function(module2, __unused_webpack_exports, __webpack_require__2) {
                  var is = __webpack_require__2(879);
                  var delegate = __webpack_require__2(438);
                  function listen(target, type, callback) {
                    if (!target && !type && !callback) {
                      throw new Error("Missing required arguments");
                    }
                    if (!is.string(type)) {
                      throw new TypeError("Second argument must be a String");
                    }
                    if (!is.fn(callback)) {
                      throw new TypeError("Third argument must be a Function");
                    }
                    if (is.node(target)) {
                      return listenNode(target, type, callback);
                    } else if (is.nodeList(target)) {
                      return listenNodeList(target, type, callback);
                    } else if (is.string(target)) {
                      return listenSelector(target, type, callback);
                    } else {
                      throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
                    }
                  }
                  function listenNode(node, type, callback) {
                    node.addEventListener(type, callback);
                    return {
                      destroy: function() {
                        node.removeEventListener(type, callback);
                      }
                    };
                  }
                  function listenNodeList(nodeList, type, callback) {
                    Array.prototype.forEach.call(nodeList, function(node) {
                      node.addEventListener(type, callback);
                    });
                    return {
                      destroy: function() {
                        Array.prototype.forEach.call(nodeList, function(node) {
                          node.removeEventListener(type, callback);
                        });
                      }
                    };
                  }
                  function listenSelector(selector, type, callback) {
                    return delegate(document.body, selector, type, callback);
                  }
                  module2.exports = listen;
                }
              ),
              /***/
              817: (
                /***/
                function(module2) {
                  function select(element) {
                    var selectedText;
                    if (element.nodeName === "SELECT") {
                      element.focus();
                      selectedText = element.value;
                    } else if (element.nodeName === "INPUT" || element.nodeName === "TEXTAREA") {
                      var isReadOnly = element.hasAttribute("readonly");
                      if (!isReadOnly) {
                        element.setAttribute("readonly", "");
                      }
                      element.select();
                      element.setSelectionRange(0, element.value.length);
                      if (!isReadOnly) {
                        element.removeAttribute("readonly");
                      }
                      selectedText = element.value;
                    } else {
                      if (element.hasAttribute("contenteditable")) {
                        element.focus();
                      }
                      var selection = window.getSelection();
                      var range = document.createRange();
                      range.selectNodeContents(element);
                      selection.removeAllRanges();
                      selection.addRange(range);
                      selectedText = selection.toString();
                    }
                    return selectedText;
                  }
                  module2.exports = select;
                }
              ),
              /***/
              279: (
                /***/
                function(module2) {
                  function E() {
                  }
                  E.prototype = {
                    on: function(name, callback, ctx) {
                      var e2 = this.e || (this.e = {});
                      (e2[name] || (e2[name] = [])).push({
                        fn: callback,
                        ctx
                      });
                      return this;
                    },
                    once: function(name, callback, ctx) {
                      var self = this;
                      function listener() {
                        self.off(name, listener);
                        callback.apply(ctx, arguments);
                      }
                      ;
                      listener._ = callback;
                      return this.on(name, listener, ctx);
                    },
                    emit: function(name) {
                      var data = [].slice.call(arguments, 1);
                      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
                      var i3 = 0;
                      var len = evtArr.length;
                      for (i3; i3 < len; i3++) {
                        evtArr[i3].fn.apply(evtArr[i3].ctx, data);
                      }
                      return this;
                    },
                    off: function(name, callback) {
                      var e2 = this.e || (this.e = {});
                      var evts = e2[name];
                      var liveEvents = [];
                      if (evts && callback) {
                        for (var i3 = 0, len = evts.length; i3 < len; i3++) {
                          if (evts[i3].fn !== callback && evts[i3].fn._ !== callback)
                            liveEvents.push(evts[i3]);
                        }
                      }
                      liveEvents.length ? e2[name] = liveEvents : delete e2[name];
                      return this;
                    }
                  };
                  module2.exports = E;
                  module2.exports.TinyEmitter = E;
                }
              )
              /******/
            };
            var __webpack_module_cache__ = {};
            function __webpack_require__(moduleId) {
              if (__webpack_module_cache__[moduleId]) {
                return __webpack_module_cache__[moduleId].exports;
              }
              var module2 = __webpack_module_cache__[moduleId] = {
                /******/
                // no module.id needed
                /******/
                // no module.loaded needed
                /******/
                exports: {}
                /******/
              };
              __webpack_modules__[moduleId](module2, module2.exports, __webpack_require__);
              return module2.exports;
            }
            !function() {
              __webpack_require__.n = function(module2) {
                var getter = module2 && module2.__esModule ? (
                  /******/
                  function() {
                    return module2["default"];
                  }
                ) : (
                  /******/
                  function() {
                    return module2;
                  }
                );
                __webpack_require__.d(getter, { a: getter });
                return getter;
              };
            }();
            !function() {
              __webpack_require__.d = function(exports2, definition) {
                for (var key in definition) {
                  if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                    Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
                  }
                }
              };
            }();
            !function() {
              __webpack_require__.o = function(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
              };
            }();
            return __webpack_require__(686);
          }().default
        );
      });
    }
  });

  // ns-hugo:/Users/victor/Documents/Github/lematerial/lematerial-website/assets/js/custom.js
  var require_custom = __commonJS({
    "ns-hugo:/Users/victor/Documents/Github/lematerial/lematerial-website/assets/js/custom.js"(exports) {
      var getTheme = () => document.querySelector("html").getAttribute("data-bs-theme");
      var updateLogos = () => {
        const theme = getTheme();
        const logos = {
          hf: {
            light: "assets/images/logo-hf-light.png",
            dark: "assets/images/logo-hf-dark.png"
          },
          entalpic: {
            light: "assets/images/logo-entalpic-light.jpg",
            dark: "assets/images/logo-entalpic-dark.png"
          }
        };
        document.getElementById("hf-logo").src = logos.hf[theme];
        document.getElementById("entalpic-logo").src = logos.entalpic[theme];
      };
      (() => __async(exports, null, function* () {
        document.addEventListener("DOMContentLoaded", () => {
        });
        updateLogos();
      }))();
    }
  });

  // node_modules/quicklink/dist/quicklink.mjs
  function e(e2) {
    return new Promise(function(n2, r2, t2) {
      (t2 = new XMLHttpRequest()).open("GET", e2, t2.withCredentials = true), t2.onload = function() {
        200 === t2.status ? n2() : r2();
      }, t2.send();
    });
  }
  var n;
  var r = (n = document.createElement("link")).relList && n.relList.supports && n.relList.supports("prefetch") ? function(e2) {
    return new Promise(function(n2, r2, t2) {
      (t2 = document.createElement("link")).rel = "prefetch", t2.href = e2, t2.onload = n2, t2.onerror = r2, document.head.appendChild(t2);
    });
  } : e;
  var t = window.requestIdleCallback || function(e2) {
    var n2 = Date.now();
    return setTimeout(function() {
      e2({ didTimeout: false, timeRemaining: function() {
        return Math.max(0, 50 - (Date.now() - n2));
      } });
    }, 1);
  };
  var o = /* @__PURE__ */ new Set();
  var i = /* @__PURE__ */ new Set();
  var c = false;
  function a(e2) {
    if (e2) {
      if (e2.saveData) return new Error("Save-Data is enabled");
      if (/2g/.test(e2.effectiveType)) return new Error("network conditions are poor");
    }
    return true;
  }
  function u(e2) {
    if (e2 || (e2 = {}), window.IntersectionObserver) {
      var n2 = function(e3) {
        e3 = e3 || 1;
        var n3 = [], r3 = 0;
        function t2() {
          r3 < e3 && n3.length > 0 && (n3.shift()(), r3++);
        }
        return [function(e4) {
          n3.push(e4) > 1 || t2();
        }, function() {
          r3--, t2();
        }];
      }(e2.throttle || 1 / 0), r2 = n2[0], a2 = n2[1], u2 = e2.limit || 1 / 0, l = e2.origins || [location.hostname], d = e2.ignores || [], h = e2.delay || 0, p = [], m = e2.timeoutFn || t, w = "function" == typeof e2.hrefFn && e2.hrefFn, g = e2.prerender || false;
      c = e2.prerenderAndPrefetch || false;
      var v = new IntersectionObserver(function(n3) {
        n3.forEach(function(n4) {
          if (n4.isIntersecting) p.push((n4 = n4.target).href), function(e3, n5) {
            n5 ? setTimeout(e3, n5) : e3();
          }(function() {
            -1 !== p.indexOf(n4.href) && (v.unobserve(n4), (c || g) && i.size < 1 ? f(w ? w(n4) : n4.href).catch(function(n5) {
              if (!e2.onError) throw n5;
              e2.onError(n5);
            }) : o.size < u2 && !g && r2(function() {
              s(w ? w(n4) : n4.href, e2.priority).then(a2).catch(function(n5) {
                a2(), e2.onError && e2.onError(n5);
              });
            }));
          }, h);
          else {
            var t2 = p.indexOf((n4 = n4.target).href);
            t2 > -1 && p.splice(t2);
          }
        });
      }, { threshold: e2.threshold || 0 });
      return m(function() {
        (e2.el || document).querySelectorAll("a").forEach(function(e3) {
          l.length && !l.includes(e3.hostname) || function e4(n3, r3) {
            return Array.isArray(r3) ? r3.some(function(r4) {
              return e4(n3, r4);
            }) : (r3.test || r3).call(r3, n3.href, n3);
          }(e3, d) || v.observe(e3);
        });
      }, { timeout: e2.timeout || 2e3 }), function() {
        o.clear(), v.disconnect();
      };
    }
  }
  function s(n2, t2, u2) {
    var s2 = a(navigator.connection);
    return s2 instanceof Error ? Promise.reject(new Error("Cannot prefetch, " + s2.message)) : (i.size > 0 && !c && console.warn("[Warning] You are using both prefetching and prerendering on the same document"), Promise.all([].concat(n2).map(function(n3) {
      if (!o.has(n3)) return o.add(n3), (t2 ? function(n4) {
        return window.fetch ? fetch(n4, { credentials: "include" }) : e(n4);
      } : r)(new URL(n3, location.href).toString());
    })));
  }
  function f(e2, n2) {
    var r2 = a(navigator.connection);
    if (r2 instanceof Error) return Promise.reject(new Error("Cannot prerender, " + r2.message));
    if (!HTMLScriptElement.supports("speculationrules")) return s(e2), Promise.reject(new Error("This browser does not support the speculation rules API. Falling back to prefetch."));
    if (document.querySelector('script[type="speculationrules"]')) return Promise.reject(new Error("Speculation Rules is already defined and cannot be altered."));
    for (var t2 = 0, u2 = [].concat(e2); t2 < u2.length; t2 += 1) {
      var f2 = u2[t2];
      if (window.location.origin !== new URL(f2, window.location.href).origin) return Promise.reject(new Error("Only same origin URLs are allowed: " + f2));
      i.add(f2);
    }
    o.size > 0 && !c && console.warn("[Warning] You are using both prefetching and prerendering on the same document");
    var l = function(e3) {
      var n3 = document.createElement("script");
      n3.type = "speculationrules", n3.text = '{"prerender":[{"source": "list","urls": ["' + Array.from(e3).join('","') + '"]}]}';
      try {
        document.head.appendChild(n3);
      } catch (e4) {
        return e4;
      }
      return true;
    }(i);
    return true === l ? Promise.resolve() : Promise.reject(l);
  }

  // node_modules/@thulite/core/assets/js/core.js
  var import_lazysizes = __toESM(require_lazysizes());
  var import_ls = __toESM(require_ls_native_loading());
  u({
    ignores: [
      /\/api\/?/,
      (uri) => uri.includes(".zip"),
      (uri, elem) => elem.hasAttribute("noprefetch"),
      (uri, elem) => elem.hash && elem.pathname === window.location.pathname
    ]
  });
  import_lazysizes.default.cfg.nativeLoading = {
    setLoadingAttribute: true,
    disableListeners: {
      scroll: true
    }
  };

  // ns-hugo:/Users/victor/Documents/Github/lematerial/lematerial-website/node_modules/@thulite/doks-core/assets/js/clipboard.js
  var import_clipboard = __toESM(require_clipboard());
  (() => {
    "use strict";
    var cb = document.getElementsByClassName("highlight");
    for (var i3 = 0; i3 < cb.length; ++i3) {
      var element = cb[i3];
      element.insertAdjacentHTML("afterbegin", '<div class="copy"><button title="Copy to clipboard" class="btn-copy" aria-label="Clipboard button"><div></div></button></div>');
    }
    var clipboard = new import_clipboard.default(".btn-copy", {
      target: function(trigger) {
        return trigger.parentNode.nextElementSibling;
      }
    });
    clipboard.on("success", function(e2) {
      e2.clearSelection();
    });
    clipboard.on("error", function(e2) {
      console.error("Action:", e2.action);
      console.error("Trigger:", e2.trigger);
    });
  })();

  // ns-hugo:/Users/victor/Documents/Github/lematerial/lematerial-website/node_modules/@thulite/doks-core/assets/js/to-top.js
  var topButton = document.getElementById("toTop");
  if (topButton !== null) {
    topButton.classList.remove("fade");
    window.onscroll = function() {
      scrollFunction();
    };
    topButton.addEventListener("click", topFunction);
  }
  function scrollFunction() {
    if (document.body.scrollTop > 270 || document.documentElement.scrollTop > 270) {
      topButton.classList.add("fade");
    } else {
      topButton.classList.remove("fade");
    }
  }
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // ns-hugo:/Users/victor/Documents/Github/lematerial/lematerial-website/node_modules/@thulite/doks-core/assets/js/tabs.js
  var i2;
  var allTabs = document.querySelectorAll("[data-toggle-tab]");
  var allPanes = document.querySelectorAll("[data-pane]");
  function toggleTabs(event) {
    if (event.target) {
      event.preventDefault();
      var clickedTab = event.currentTarget;
      var targetKey = clickedTab.getAttribute("data-toggle-tab");
    } else {
      var targetKey = event;
    }
    if (window.localStorage) {
      window.localStorage.setItem("configLangPref", targetKey);
    }
    var selectedTabs = document.querySelectorAll("[data-toggle-tab=" + targetKey + "]");
    var selectedPanes = document.querySelectorAll("[data-pane=" + targetKey + "]");
    for (var i3 = 0; i3 < allTabs.length; i3++) {
      allTabs[i3].classList.remove("active");
      allPanes[i3].classList.remove("active");
    }
    for (var i3 = 0; i3 < selectedTabs.length; i3++) {
      selectedTabs[i3].classList.add("active");
      selectedPanes[i3].classList.add("show", "active");
    }
  }
  for (i2 = 0; i2 < allTabs.length; i2++) {
    allTabs[i2].addEventListener("click", toggleTabs);
  }
  if (window.localStorage.getItem("configLangPref")) {
    toggleTabs(window.localStorage.getItem("configLangPref"));
  }

  // <stdin>
  var import_custom = __toESM(require_custom());
})();
/*! Bundled license information:

clipboard/dist/clipboard.js:
  (*!
   * clipboard.js v2.0.11
   * https://clipboardjs.com/
   *
   * Licensed MIT © Zeno Rocha
   *)

@thulite/doks-core/assets/js/clipboard.js:
  (*!
   * clipboard.js for Bootstrap based Thulite sites
   * Copyright 2021-2024 Thulite
   * Licensed under the MIT License
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL2xhenlzaXplcy9sYXp5c2l6ZXMuanMiLCAibm9kZV9tb2R1bGVzL2xhenlzaXplcy9wbHVnaW5zL25hdGl2ZS1sb2FkaW5nL2xzLm5hdGl2ZS1sb2FkaW5nLmpzIiwgIm5vZGVfbW9kdWxlcy9jbGlwYm9hcmQvZGlzdC9jbGlwYm9hcmQuanMiLCAibnMtaHVnbzovVXNlcnMvdmljdG9yL0RvY3VtZW50cy9HaXRodWIvbGVtYXRlcmlhbC9sZW1hdGVyaWFsLXdlYnNpdGUvYXNzZXRzL2pzL2N1c3RvbS5qcyIsICJub2RlX21vZHVsZXMvcXVpY2tsaW5rL2Rpc3QvcXVpY2tsaW5rLm1qcyIsICJub2RlX21vZHVsZXMvQHRodWxpdGUvY29yZS9hc3NldHMvanMvY29yZS5qcyIsICJucy1odWdvOi9Vc2Vycy92aWN0b3IvRG9jdW1lbnRzL0dpdGh1Yi9sZW1hdGVyaWFsL2xlbWF0ZXJpYWwtd2Vic2l0ZS9ub2RlX21vZHVsZXMvQHRodWxpdGUvZG9rcy1jb3JlL2Fzc2V0cy9qcy9jbGlwYm9hcmQuanMiLCAibnMtaHVnbzovVXNlcnMvdmljdG9yL0RvY3VtZW50cy9HaXRodWIvbGVtYXRlcmlhbC9sZW1hdGVyaWFsLXdlYnNpdGUvbm9kZV9tb2R1bGVzL0B0aHVsaXRlL2Rva3MtY29yZS9hc3NldHMvanMvdG8tdG9wLmpzIiwgIm5zLWh1Z286L1VzZXJzL3ZpY3Rvci9Eb2N1bWVudHMvR2l0aHViL2xlbWF0ZXJpYWwvbGVtYXRlcmlhbC13ZWJzaXRlL25vZGVfbW9kdWxlcy9AdGh1bGl0ZS9kb2tzLWNvcmUvYXNzZXRzL2pzL3RhYnMuanMiLCAiPHN0ZGluPiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiKGZ1bmN0aW9uKHdpbmRvdywgZmFjdG9yeSkge1xuXHR2YXIgbGF6eVNpemVzID0gZmFjdG9yeSh3aW5kb3csIHdpbmRvdy5kb2N1bWVudCwgRGF0ZSk7XG5cdHdpbmRvdy5sYXp5U2l6ZXMgPSBsYXp5U2l6ZXM7XG5cdGlmKHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpe1xuXHRcdG1vZHVsZS5leHBvcnRzID0gbGF6eVNpemVzO1xuXHR9XG59KHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgP1xuICAgICAgd2luZG93IDoge30sIFxuLyoqXG4gKiBpbXBvcnQoXCIuL3R5cGVzL2dsb2JhbFwiKVxuICogQHR5cGVkZWYgeyBpbXBvcnQoXCIuL3R5cGVzL2xhenlzaXplcy1jb25maWdcIikuTGF6eVNpemVzQ29uZmlnUGFydGlhbCB9IExhenlTaXplc0NvbmZpZ1BhcnRpYWxcbiAqL1xuZnVuY3Rpb24gbCh3aW5kb3csIGRvY3VtZW50LCBEYXRlKSB7IC8vIFBhc3MgaW4gdGhlIHdpbmRvdyBEYXRlIGZ1bmN0aW9uIGFsc28gZm9yIFNTUiBiZWNhdXNlIHRoZSBEYXRlIGNsYXNzIGNhbiBiZSBsb3N0XG5cdCd1c2Ugc3RyaWN0Jztcblx0Lypqc2hpbnQgZXFudWxsOnRydWUgKi9cblxuXHR2YXIgbGF6eXNpemVzLFxuXHRcdC8qKlxuXHRcdCAqIEB0eXBlIHsgTGF6eVNpemVzQ29uZmlnUGFydGlhbCB9XG5cdFx0ICovXG5cdFx0bGF6eVNpemVzQ2ZnO1xuXG5cdChmdW5jdGlvbigpe1xuXHRcdHZhciBwcm9wO1xuXG5cdFx0dmFyIGxhenlTaXplc0RlZmF1bHRzID0ge1xuXHRcdFx0bGF6eUNsYXNzOiAnbGF6eWxvYWQnLFxuXHRcdFx0bG9hZGVkQ2xhc3M6ICdsYXp5bG9hZGVkJyxcblx0XHRcdGxvYWRpbmdDbGFzczogJ2xhenlsb2FkaW5nJyxcblx0XHRcdHByZWxvYWRDbGFzczogJ2xhenlwcmVsb2FkJyxcblx0XHRcdGVycm9yQ2xhc3M6ICdsYXp5ZXJyb3InLFxuXHRcdFx0Ly9zdHJpY3RDbGFzczogJ2xhenlzdHJpY3QnLFxuXHRcdFx0YXV0b3NpemVzQ2xhc3M6ICdsYXp5YXV0b3NpemVzJyxcblx0XHRcdGZhc3RMb2FkZWRDbGFzczogJ2xzLWlzLWNhY2hlZCcsXG5cdFx0XHRpZnJhbWVMb2FkTW9kZTogMCxcblx0XHRcdHNyY0F0dHI6ICdkYXRhLXNyYycsXG5cdFx0XHRzcmNzZXRBdHRyOiAnZGF0YS1zcmNzZXQnLFxuXHRcdFx0c2l6ZXNBdHRyOiAnZGF0YS1zaXplcycsXG5cdFx0XHQvL3ByZWxvYWRBZnRlckxvYWQ6IGZhbHNlLFxuXHRcdFx0bWluU2l6ZTogNDAsXG5cdFx0XHRjdXN0b21NZWRpYToge30sXG5cdFx0XHRpbml0OiB0cnVlLFxuXHRcdFx0ZXhwRmFjdG9yOiAxLjUsXG5cdFx0XHRoRmFjOiAwLjgsXG5cdFx0XHRsb2FkTW9kZTogMixcblx0XHRcdGxvYWRIaWRkZW46IHRydWUsXG5cdFx0XHRyaWNUaW1lb3V0OiAwLFxuXHRcdFx0dGhyb3R0bGVEZWxheTogMTI1LFxuXHRcdH07XG5cblx0XHRsYXp5U2l6ZXNDZmcgPSB3aW5kb3cubGF6eVNpemVzQ29uZmlnIHx8IHdpbmRvdy5sYXp5c2l6ZXNDb25maWcgfHwge307XG5cblx0XHRmb3IocHJvcCBpbiBsYXp5U2l6ZXNEZWZhdWx0cyl7XG5cdFx0XHRpZighKHByb3AgaW4gbGF6eVNpemVzQ2ZnKSl7XG5cdFx0XHRcdGxhenlTaXplc0NmZ1twcm9wXSA9IGxhenlTaXplc0RlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0fSkoKTtcblxuXHRpZiAoIWRvY3VtZW50IHx8ICFkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGluaXQ6IGZ1bmN0aW9uICgpIHt9LFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBAdHlwZSB7IExhenlTaXplc0NvbmZpZ1BhcnRpYWwgfVxuXHRcdFx0ICovXG5cdFx0XHRjZmc6IGxhenlTaXplc0NmZyxcblx0XHRcdC8qKlxuXHRcdFx0ICogQHR5cGUgeyB0cnVlIH1cblx0XHRcdCAqL1xuXHRcdFx0bm9TdXBwb3J0OiB0cnVlLFxuXHRcdH07XG5cdH1cblxuXHR2YXIgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXHR2YXIgc3VwcG9ydFBpY3R1cmUgPSB3aW5kb3cuSFRNTFBpY3R1cmVFbGVtZW50O1xuXG5cdHZhciBfYWRkRXZlbnRMaXN0ZW5lciA9ICdhZGRFdmVudExpc3RlbmVyJztcblxuXHR2YXIgX2dldEF0dHJpYnV0ZSA9ICdnZXRBdHRyaWJ1dGUnO1xuXG5cdC8qKlxuXHQgKiBVcGRhdGUgdG8gYmluZCB0byB3aW5kb3cgYmVjYXVzZSAndGhpcycgYmVjb21lcyBudWxsIGR1cmluZyBTU1Jcblx0ICogYnVpbGRzLlxuXHQgKi9cblx0dmFyIGFkZEV2ZW50TGlzdGVuZXIgPSB3aW5kb3dbX2FkZEV2ZW50TGlzdGVuZXJdLmJpbmQod2luZG93KTtcblxuXHR2YXIgc2V0VGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0O1xuXG5cdHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHNldFRpbWVvdXQ7XG5cblx0dmFyIHJlcXVlc3RJZGxlQ2FsbGJhY2sgPSB3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjaztcblxuXHR2YXIgcmVnUGljdHVyZSA9IC9ecGljdHVyZSQvaTtcblxuXHR2YXIgbG9hZEV2ZW50cyA9IFsnbG9hZCcsICdlcnJvcicsICdsYXp5aW5jbHVkZWQnLCAnX2xhenlsb2FkZWQnXTtcblxuXHR2YXIgcmVnQ2xhc3NDYWNoZSA9IHt9O1xuXG5cdHZhciBmb3JFYWNoID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2g7XG5cblx0LyoqXG5cdCAqIEBwYXJhbSBlbGUge0VsZW1lbnR9XG5cdCAqIEBwYXJhbSBjbHMge3N0cmluZ31cblx0ICovXG5cdHZhciBoYXNDbGFzcyA9IGZ1bmN0aW9uKGVsZSwgY2xzKSB7XG5cdFx0aWYoIXJlZ0NsYXNzQ2FjaGVbY2xzXSl7XG5cdFx0XHRyZWdDbGFzc0NhY2hlW2Nsc10gPSBuZXcgUmVnRXhwKCcoXFxcXHN8XiknK2NscysnKFxcXFxzfCQpJyk7XG5cdFx0fVxuXHRcdHJldHVybiByZWdDbGFzc0NhY2hlW2Nsc10udGVzdChlbGVbX2dldEF0dHJpYnV0ZV0oJ2NsYXNzJykgfHwgJycpICYmIHJlZ0NsYXNzQ2FjaGVbY2xzXTtcblx0fTtcblxuXHQvKipcblx0ICogQHBhcmFtIGVsZSB7RWxlbWVudH1cblx0ICogQHBhcmFtIGNscyB7c3RyaW5nfVxuXHQgKi9cblx0dmFyIGFkZENsYXNzID0gZnVuY3Rpb24oZWxlLCBjbHMpIHtcblx0XHRpZiAoIWhhc0NsYXNzKGVsZSwgY2xzKSl7XG5cdFx0XHRlbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIChlbGVbX2dldEF0dHJpYnV0ZV0oJ2NsYXNzJykgfHwgJycpLnRyaW0oKSArICcgJyArIGNscyk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0gZWxlIHtFbGVtZW50fVxuXHQgKiBAcGFyYW0gY2xzIHtzdHJpbmd9XG5cdCAqL1xuXHR2YXIgcmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbGUsIGNscykge1xuXHRcdHZhciByZWc7XG5cdFx0aWYgKChyZWcgPSBoYXNDbGFzcyhlbGUsY2xzKSkpIHtcblx0XHRcdGVsZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGVsZVtfZ2V0QXR0cmlidXRlXSgnY2xhc3MnKSB8fCAnJykucmVwbGFjZShyZWcsICcgJykpO1xuXHRcdH1cblx0fTtcblxuXHR2YXIgYWRkUmVtb3ZlTG9hZEV2ZW50cyA9IGZ1bmN0aW9uKGRvbSwgZm4sIGFkZCl7XG5cdFx0dmFyIGFjdGlvbiA9IGFkZCA/IF9hZGRFdmVudExpc3RlbmVyIDogJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuXHRcdGlmKGFkZCl7XG5cdFx0XHRhZGRSZW1vdmVMb2FkRXZlbnRzKGRvbSwgZm4pO1xuXHRcdH1cblx0XHRsb2FkRXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZXZ0KXtcblx0XHRcdGRvbVthY3Rpb25dKGV2dCwgZm4pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0gZWxlbSB7IEVsZW1lbnQgfVxuXHQgKiBAcGFyYW0gbmFtZSB7IHN0cmluZyB9XG5cdCAqIEBwYXJhbSBkZXRhaWwgeyBhbnkgfVxuXHQgKiBAcGFyYW0gbm9CdWJibGVzIHsgYm9vbGVhbiB9XG5cdCAqIEBwYXJhbSBub0NhbmNlbGFibGUgeyBib29sZWFuIH1cblx0ICogQHJldHVybnMgeyBDdXN0b21FdmVudCB9XG5cdCAqL1xuXHR2YXIgdHJpZ2dlckV2ZW50ID0gZnVuY3Rpb24oZWxlbSwgbmFtZSwgZGV0YWlsLCBub0J1YmJsZXMsIG5vQ2FuY2VsYWJsZSl7XG5cdFx0dmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG5cblx0XHRpZighZGV0YWlsKXtcblx0XHRcdGRldGFpbCA9IHt9O1xuXHRcdH1cblxuXHRcdGRldGFpbC5pbnN0YW5jZSA9IGxhenlzaXplcztcblxuXHRcdGV2ZW50LmluaXRFdmVudChuYW1lLCAhbm9CdWJibGVzLCAhbm9DYW5jZWxhYmxlKTtcblxuXHRcdGV2ZW50LmRldGFpbCA9IGRldGFpbDtcblxuXHRcdGVsZW0uZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0cmV0dXJuIGV2ZW50O1xuXHR9O1xuXG5cdHZhciB1cGRhdGVQb2x5ZmlsbCA9IGZ1bmN0aW9uIChlbCwgZnVsbCl7XG5cdFx0dmFyIHBvbHlmaWxsO1xuXHRcdGlmKCAhc3VwcG9ydFBpY3R1cmUgJiYgKCBwb2x5ZmlsbCA9ICh3aW5kb3cucGljdHVyZWZpbGwgfHwgbGF6eVNpemVzQ2ZnLnBmKSApICl7XG5cdFx0XHRpZihmdWxsICYmIGZ1bGwuc3JjICYmICFlbFtfZ2V0QXR0cmlidXRlXSgnc3Jjc2V0Jykpe1xuXHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIGZ1bGwuc3JjKTtcblx0XHRcdH1cblx0XHRcdHBvbHlmaWxsKHtyZWV2YWx1YXRlOiB0cnVlLCBlbGVtZW50czogW2VsXX0pO1xuXHRcdH0gZWxzZSBpZihmdWxsICYmIGZ1bGwuc3JjKXtcblx0XHRcdGVsLnNyYyA9IGZ1bGwuc3JjO1xuXHRcdH1cblx0fTtcblxuXHR2YXIgZ2V0Q1NTID0gZnVuY3Rpb24gKGVsZW0sIHN0eWxlKXtcblx0XHRyZXR1cm4gKGdldENvbXB1dGVkU3R5bGUoZWxlbSwgbnVsbCkgfHwge30pW3N0eWxlXTtcblx0fTtcblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIGVsZW0geyBFbGVtZW50IH1cblx0ICogQHBhcmFtIHBhcmVudCB7IEVsZW1lbnQgfVxuXHQgKiBAcGFyYW0gW3dpZHRoXSB7bnVtYmVyfVxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0dmFyIGdldFdpZHRoID0gZnVuY3Rpb24oZWxlbSwgcGFyZW50LCB3aWR0aCl7XG5cdFx0d2lkdGggPSB3aWR0aCB8fCBlbGVtLm9mZnNldFdpZHRoO1xuXG5cdFx0d2hpbGUod2lkdGggPCBsYXp5U2l6ZXNDZmcubWluU2l6ZSAmJiBwYXJlbnQgJiYgIWVsZW0uX2xhenlzaXplc1dpZHRoKXtcblx0XHRcdHdpZHRoID0gIHBhcmVudC5vZmZzZXRXaWR0aDtcblx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuXHRcdH1cblxuXHRcdHJldHVybiB3aWR0aDtcblx0fTtcblxuXHR2YXIgckFGID0gKGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHJ1bm5pbmcsIHdhaXRpbmc7XG5cdFx0dmFyIGZpcnN0Rm5zID0gW107XG5cdFx0dmFyIHNlY29uZEZucyA9IFtdO1xuXHRcdHZhciBmbnMgPSBmaXJzdEZucztcblxuXHRcdHZhciBydW4gPSBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIHJ1bkZucyA9IGZucztcblxuXHRcdFx0Zm5zID0gZmlyc3RGbnMubGVuZ3RoID8gc2Vjb25kRm5zIDogZmlyc3RGbnM7XG5cblx0XHRcdHJ1bm5pbmcgPSB0cnVlO1xuXHRcdFx0d2FpdGluZyA9IGZhbHNlO1xuXG5cdFx0XHR3aGlsZShydW5GbnMubGVuZ3RoKXtcblx0XHRcdFx0cnVuRm5zLnNoaWZ0KCkoKTtcblx0XHRcdH1cblxuXHRcdFx0cnVubmluZyA9IGZhbHNlO1xuXHRcdH07XG5cblx0XHR2YXIgcmFmQmF0Y2ggPSBmdW5jdGlvbihmbiwgcXVldWUpe1xuXHRcdFx0aWYocnVubmluZyAmJiAhcXVldWUpe1xuXHRcdFx0XHRmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm5zLnB1c2goZm4pO1xuXG5cdFx0XHRcdGlmKCF3YWl0aW5nKXtcblx0XHRcdFx0XHR3YWl0aW5nID0gdHJ1ZTtcblx0XHRcdFx0XHQoZG9jdW1lbnQuaGlkZGVuID8gc2V0VGltZW91dCA6IHJlcXVlc3RBbmltYXRpb25GcmFtZSkocnVuKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyYWZCYXRjaC5fbHNGbHVzaCA9IHJ1bjtcblxuXHRcdHJldHVybiByYWZCYXRjaDtcblx0fSkoKTtcblxuXHR2YXIgckFGSXQgPSBmdW5jdGlvbihmbiwgc2ltcGxlKXtcblx0XHRyZXR1cm4gc2ltcGxlID9cblx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyQUYoZm4pO1xuXHRcdFx0fSA6XG5cdFx0XHRmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cdFx0XHRcdHZhciBhcmdzID0gYXJndW1lbnRzO1xuXHRcdFx0XHRyQUYoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRmbi5hcHBseSh0aGF0LCBhcmdzKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0O1xuXHR9O1xuXG5cdHZhciB0aHJvdHRsZSA9IGZ1bmN0aW9uKGZuKXtcblx0XHR2YXIgcnVubmluZztcblx0XHR2YXIgbGFzdFRpbWUgPSAwO1xuXHRcdHZhciBnRGVsYXkgPSBsYXp5U2l6ZXNDZmcudGhyb3R0bGVEZWxheTtcblx0XHR2YXIgcklDVGltZW91dCA9IGxhenlTaXplc0NmZy5yaWNUaW1lb3V0O1xuXHRcdHZhciBydW4gPSBmdW5jdGlvbigpe1xuXHRcdFx0cnVubmluZyA9IGZhbHNlO1xuXHRcdFx0bGFzdFRpbWUgPSBEYXRlLm5vdygpO1xuXHRcdFx0Zm4oKTtcblx0XHR9O1xuXHRcdHZhciBpZGxlQ2FsbGJhY2sgPSByZXF1ZXN0SWRsZUNhbGxiYWNrICYmIHJJQ1RpbWVvdXQgPiA0OSA/XG5cdFx0XHRmdW5jdGlvbigpe1xuXHRcdFx0XHRyZXF1ZXN0SWRsZUNhbGxiYWNrKHJ1biwge3RpbWVvdXQ6IHJJQ1RpbWVvdXR9KTtcblxuXHRcdFx0XHRpZihySUNUaW1lb3V0ICE9PSBsYXp5U2l6ZXNDZmcucmljVGltZW91dCl7XG5cdFx0XHRcdFx0cklDVGltZW91dCA9IGxhenlTaXplc0NmZy5yaWNUaW1lb3V0O1xuXHRcdFx0XHR9XG5cdFx0XHR9IDpcblx0XHRcdHJBRkl0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHNldFRpbWVvdXQocnVuKTtcblx0XHRcdH0sIHRydWUpXG5cdFx0O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGlzUHJpb3JpdHkpe1xuXHRcdFx0dmFyIGRlbGF5O1xuXG5cdFx0XHRpZigoaXNQcmlvcml0eSA9IGlzUHJpb3JpdHkgPT09IHRydWUpKXtcblx0XHRcdFx0cklDVGltZW91dCA9IDMzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihydW5uaW5nKXtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRydW5uaW5nID0gIHRydWU7XG5cblx0XHRcdGRlbGF5ID0gZ0RlbGF5IC0gKERhdGUubm93KCkgLSBsYXN0VGltZSk7XG5cblx0XHRcdGlmKGRlbGF5IDwgMCl7XG5cdFx0XHRcdGRlbGF5ID0gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYoaXNQcmlvcml0eSB8fCBkZWxheSA8IDkpe1xuXHRcdFx0XHRpZGxlQ2FsbGJhY2soKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoaWRsZUNhbGxiYWNrLCBkZWxheSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblxuXHQvL2Jhc2VkIG9uIGh0dHA6Ly9tb2Rlcm5qYXZhc2NyaXB0LmJsb2dzcG90LmRlLzIwMTMvMDgvYnVpbGRpbmctYmV0dGVyLWRlYm91bmNlLmh0bWxcblx0dmFyIGRlYm91bmNlID0gZnVuY3Rpb24oZnVuYykge1xuXHRcdHZhciB0aW1lb3V0LCB0aW1lc3RhbXA7XG5cdFx0dmFyIHdhaXQgPSA5OTtcblx0XHR2YXIgcnVuID0gZnVuY3Rpb24oKXtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0ZnVuYygpO1xuXHRcdH07XG5cdFx0dmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbGFzdCA9IERhdGUubm93KCkgLSB0aW1lc3RhbXA7XG5cblx0XHRcdGlmIChsYXN0IDwgd2FpdCkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGxhdGVyLCB3YWl0IC0gbGFzdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQocmVxdWVzdElkbGVDYWxsYmFjayB8fCBydW4pKHJ1bik7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG5cblx0XHRcdGlmICghdGltZW91dCkge1xuXHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblxuXHR2YXIgbG9hZGVyID0gKGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHByZWxvYWRFbGVtcywgaXNDb21wbGV0ZWQsIHJlc2V0UHJlbG9hZGluZ1RpbWVyLCBsb2FkTW9kZSwgc3RhcnRlZDtcblxuXHRcdHZhciBlTHZXLCBlbHZILCBlTHRvcCwgZUxsZWZ0LCBlTHJpZ2h0LCBlTGJvdHRvbSwgaXNCb2R5SGlkZGVuO1xuXG5cdFx0dmFyIHJlZ0ltZyA9IC9eaW1nJC9pO1xuXHRcdHZhciByZWdJZnJhbWUgPSAvXmlmcmFtZSQvaTtcblxuXHRcdHZhciBzdXBwb3J0U2Nyb2xsID0gKCdvbnNjcm9sbCcgaW4gd2luZG93KSAmJiAhKC8oZ2xlfGluZylib3QvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpO1xuXG5cdFx0dmFyIHNocmlua0V4cGFuZCA9IDA7XG5cdFx0dmFyIGN1cnJlbnRFeHBhbmQgPSAwO1xuXG5cdFx0dmFyIGlzTG9hZGluZyA9IDA7XG5cdFx0dmFyIGxvd1J1bnMgPSAtMTtcblxuXHRcdHZhciByZXNldFByZWxvYWRpbmcgPSBmdW5jdGlvbihlKXtcblx0XHRcdGlzTG9hZGluZy0tO1xuXHRcdFx0aWYoIWUgfHwgaXNMb2FkaW5nIDwgMCB8fCAhZS50YXJnZXQpe1xuXHRcdFx0XHRpc0xvYWRpbmcgPSAwO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgaXNWaXNpYmxlID0gZnVuY3Rpb24gKGVsZW0pIHtcblx0XHRcdGlmIChpc0JvZHlIaWRkZW4gPT0gbnVsbCkge1xuXHRcdFx0XHRpc0JvZHlIaWRkZW4gPSBnZXRDU1MoZG9jdW1lbnQuYm9keSwgJ3Zpc2liaWxpdHknKSA9PSAnaGlkZGVuJztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGlzQm9keUhpZGRlbiB8fCAhKGdldENTUyhlbGVtLnBhcmVudE5vZGUsICd2aXNpYmlsaXR5JykgPT0gJ2hpZGRlbicgJiYgZ2V0Q1NTKGVsZW0sICd2aXNpYmlsaXR5JykgPT0gJ2hpZGRlbicpO1xuXHRcdH07XG5cblx0XHR2YXIgaXNOZXN0ZWRWaXNpYmxlID0gZnVuY3Rpb24oZWxlbSwgZWxlbUV4cGFuZCl7XG5cdFx0XHR2YXIgb3V0ZXJSZWN0O1xuXHRcdFx0dmFyIHBhcmVudCA9IGVsZW07XG5cdFx0XHR2YXIgdmlzaWJsZSA9IGlzVmlzaWJsZShlbGVtKTtcblxuXHRcdFx0ZUx0b3AgLT0gZWxlbUV4cGFuZDtcblx0XHRcdGVMYm90dG9tICs9IGVsZW1FeHBhbmQ7XG5cdFx0XHRlTGxlZnQgLT0gZWxlbUV4cGFuZDtcblx0XHRcdGVMcmlnaHQgKz0gZWxlbUV4cGFuZDtcblxuXHRcdFx0d2hpbGUodmlzaWJsZSAmJiAocGFyZW50ID0gcGFyZW50Lm9mZnNldFBhcmVudCkgJiYgcGFyZW50ICE9IGRvY3VtZW50LmJvZHkgJiYgcGFyZW50ICE9IGRvY0VsZW0pe1xuXHRcdFx0XHR2aXNpYmxlID0gKChnZXRDU1MocGFyZW50LCAnb3BhY2l0eScpIHx8IDEpID4gMCk7XG5cblx0XHRcdFx0aWYodmlzaWJsZSAmJiBnZXRDU1MocGFyZW50LCAnb3ZlcmZsb3cnKSAhPSAndmlzaWJsZScpe1xuXHRcdFx0XHRcdG91dGVyUmVjdCA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0XHR2aXNpYmxlID0gZUxyaWdodCA+IG91dGVyUmVjdC5sZWZ0ICYmXG5cdFx0XHRcdFx0XHRlTGxlZnQgPCBvdXRlclJlY3QucmlnaHQgJiZcblx0XHRcdFx0XHRcdGVMYm90dG9tID4gb3V0ZXJSZWN0LnRvcCAtIDEgJiZcblx0XHRcdFx0XHRcdGVMdG9wIDwgb3V0ZXJSZWN0LmJvdHRvbSArIDFcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHZpc2libGU7XG5cdFx0fTtcblxuXHRcdHZhciBjaGVja0VsZW1lbnRzID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZUxsZW4sIGksIHJlY3QsIGF1dG9Mb2FkRWxlbSwgbG9hZGVkU29tZXRoaW5nLCBlbGVtRXhwYW5kLCBlbGVtTmVnYXRpdmVFeHBhbmQsIGVsZW1FeHBhbmRWYWwsXG5cdFx0XHRcdGJlZm9yZUV4cGFuZFZhbCwgZGVmYXVsdEV4cGFuZCwgcHJlbG9hZEV4cGFuZCwgaEZhYztcblx0XHRcdHZhciBsYXp5bG9hZEVsZW1zID0gbGF6eXNpemVzLmVsZW1lbnRzO1xuXG5cdFx0XHRpZigobG9hZE1vZGUgPSBsYXp5U2l6ZXNDZmcubG9hZE1vZGUpICYmIGlzTG9hZGluZyA8IDggJiYgKGVMbGVuID0gbGF6eWxvYWRFbGVtcy5sZW5ndGgpKXtcblxuXHRcdFx0XHRpID0gMDtcblxuXHRcdFx0XHRsb3dSdW5zKys7XG5cblx0XHRcdFx0Zm9yKDsgaSA8IGVMbGVuOyBpKyspe1xuXG5cdFx0XHRcdFx0aWYoIWxhenlsb2FkRWxlbXNbaV0gfHwgbGF6eWxvYWRFbGVtc1tpXS5fbGF6eVJhY2Upe2NvbnRpbnVlO31cblxuXHRcdFx0XHRcdGlmKCFzdXBwb3J0U2Nyb2xsIHx8IChsYXp5c2l6ZXMucHJlbWF0dXJlVW52ZWlsICYmIGxhenlzaXplcy5wcmVtYXR1cmVVbnZlaWwobGF6eWxvYWRFbGVtc1tpXSkpKXt1bnZlaWxFbGVtZW50KGxhenlsb2FkRWxlbXNbaV0pO2NvbnRpbnVlO31cblxuXHRcdFx0XHRcdGlmKCEoZWxlbUV4cGFuZFZhbCA9IGxhenlsb2FkRWxlbXNbaV1bX2dldEF0dHJpYnV0ZV0oJ2RhdGEtZXhwYW5kJykpIHx8ICEoZWxlbUV4cGFuZCA9IGVsZW1FeHBhbmRWYWwgKiAxKSl7XG5cdFx0XHRcdFx0XHRlbGVtRXhwYW5kID0gY3VycmVudEV4cGFuZDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoIWRlZmF1bHRFeHBhbmQpIHtcblx0XHRcdFx0XHRcdGRlZmF1bHRFeHBhbmQgPSAoIWxhenlTaXplc0NmZy5leHBhbmQgfHwgbGF6eVNpemVzQ2ZnLmV4cGFuZCA8IDEpID9cblx0XHRcdFx0XHRcdFx0ZG9jRWxlbS5jbGllbnRIZWlnaHQgPiA1MDAgJiYgZG9jRWxlbS5jbGllbnRXaWR0aCA+IDUwMCA/IDUwMCA6IDM3MCA6XG5cdFx0XHRcdFx0XHRcdGxhenlTaXplc0NmZy5leHBhbmQ7XG5cblx0XHRcdFx0XHRcdGxhenlzaXplcy5fZGVmRXggPSBkZWZhdWx0RXhwYW5kO1xuXG5cdFx0XHRcdFx0XHRwcmVsb2FkRXhwYW5kID0gZGVmYXVsdEV4cGFuZCAqIGxhenlTaXplc0NmZy5leHBGYWN0b3I7XG5cdFx0XHRcdFx0XHRoRmFjID0gbGF6eVNpemVzQ2ZnLmhGYWM7XG5cdFx0XHRcdFx0XHRpc0JvZHlIaWRkZW4gPSBudWxsO1xuXG5cdFx0XHRcdFx0XHRpZihjdXJyZW50RXhwYW5kIDwgcHJlbG9hZEV4cGFuZCAmJiBpc0xvYWRpbmcgPCAxICYmIGxvd1J1bnMgPiAyICYmIGxvYWRNb2RlID4gMiAmJiAhZG9jdW1lbnQuaGlkZGVuKXtcblx0XHRcdFx0XHRcdFx0Y3VycmVudEV4cGFuZCA9IHByZWxvYWRFeHBhbmQ7XG5cdFx0XHRcdFx0XHRcdGxvd1J1bnMgPSAwO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmKGxvYWRNb2RlID4gMSAmJiBsb3dSdW5zID4gMSAmJiBpc0xvYWRpbmcgPCA2KXtcblx0XHRcdFx0XHRcdFx0Y3VycmVudEV4cGFuZCA9IGRlZmF1bHRFeHBhbmQ7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50RXhwYW5kID0gc2hyaW5rRXhwYW5kO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKGJlZm9yZUV4cGFuZFZhbCAhPT0gZWxlbUV4cGFuZCl7XG5cdFx0XHRcdFx0XHRlTHZXID0gaW5uZXJXaWR0aCArIChlbGVtRXhwYW5kICogaEZhYyk7XG5cdFx0XHRcdFx0XHRlbHZIID0gaW5uZXJIZWlnaHQgKyBlbGVtRXhwYW5kO1xuXHRcdFx0XHRcdFx0ZWxlbU5lZ2F0aXZlRXhwYW5kID0gZWxlbUV4cGFuZCAqIC0xO1xuXHRcdFx0XHRcdFx0YmVmb3JlRXhwYW5kVmFsID0gZWxlbUV4cGFuZDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZWN0ID0gbGF6eWxvYWRFbGVtc1tpXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdFx0XHRcdGlmICgoZUxib3R0b20gPSByZWN0LmJvdHRvbSkgPj0gZWxlbU5lZ2F0aXZlRXhwYW5kICYmXG5cdFx0XHRcdFx0XHQoZUx0b3AgPSByZWN0LnRvcCkgPD0gZWx2SCAmJlxuXHRcdFx0XHRcdFx0KGVMcmlnaHQgPSByZWN0LnJpZ2h0KSA+PSBlbGVtTmVnYXRpdmVFeHBhbmQgKiBoRmFjICYmXG5cdFx0XHRcdFx0XHQoZUxsZWZ0ID0gcmVjdC5sZWZ0KSA8PSBlTHZXICYmXG5cdFx0XHRcdFx0XHQoZUxib3R0b20gfHwgZUxyaWdodCB8fCBlTGxlZnQgfHwgZUx0b3ApICYmXG5cdFx0XHRcdFx0XHQobGF6eVNpemVzQ2ZnLmxvYWRIaWRkZW4gfHwgaXNWaXNpYmxlKGxhenlsb2FkRWxlbXNbaV0pKSAmJlxuXHRcdFx0XHRcdFx0KChpc0NvbXBsZXRlZCAmJiBpc0xvYWRpbmcgPCAzICYmICFlbGVtRXhwYW5kVmFsICYmIChsb2FkTW9kZSA8IDMgfHwgbG93UnVucyA8IDQpKSB8fCBpc05lc3RlZFZpc2libGUobGF6eWxvYWRFbGVtc1tpXSwgZWxlbUV4cGFuZCkpKXtcblx0XHRcdFx0XHRcdHVudmVpbEVsZW1lbnQobGF6eWxvYWRFbGVtc1tpXSk7XG5cdFx0XHRcdFx0XHRsb2FkZWRTb21ldGhpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0aWYoaXNMb2FkaW5nID4gOSl7YnJlYWs7fVxuXHRcdFx0XHRcdH0gZWxzZSBpZighbG9hZGVkU29tZXRoaW5nICYmIGlzQ29tcGxldGVkICYmICFhdXRvTG9hZEVsZW0gJiZcblx0XHRcdFx0XHRcdGlzTG9hZGluZyA8IDQgJiYgbG93UnVucyA8IDQgJiYgbG9hZE1vZGUgPiAyICYmXG5cdFx0XHRcdFx0XHQocHJlbG9hZEVsZW1zWzBdIHx8IGxhenlTaXplc0NmZy5wcmVsb2FkQWZ0ZXJMb2FkKSAmJlxuXHRcdFx0XHRcdFx0KHByZWxvYWRFbGVtc1swXSB8fCAoIWVsZW1FeHBhbmRWYWwgJiYgKChlTGJvdHRvbSB8fCBlTHJpZ2h0IHx8IGVMbGVmdCB8fCBlTHRvcCkgfHwgbGF6eWxvYWRFbGVtc1tpXVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDZmcuc2l6ZXNBdHRyKSAhPSAnYXV0bycpKSkpe1xuXHRcdFx0XHRcdFx0YXV0b0xvYWRFbGVtID0gcHJlbG9hZEVsZW1zWzBdIHx8IGxhenlsb2FkRWxlbXNbaV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoYXV0b0xvYWRFbGVtICYmICFsb2FkZWRTb21ldGhpbmcpe1xuXHRcdFx0XHRcdHVudmVpbEVsZW1lbnQoYXV0b0xvYWRFbGVtKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyA9IHRocm90dGxlKGNoZWNrRWxlbWVudHMpO1xuXG5cdFx0dmFyIHN3aXRjaExvYWRpbmdDbGFzcyA9IGZ1bmN0aW9uKGUpe1xuXHRcdFx0dmFyIGVsZW0gPSBlLnRhcmdldDtcblxuXHRcdFx0aWYgKGVsZW0uX2xhenlDYWNoZSkge1xuXHRcdFx0XHRkZWxldGUgZWxlbS5fbGF6eUNhY2hlO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHJlc2V0UHJlbG9hZGluZyhlKTtcblx0XHRcdGFkZENsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sb2FkZWRDbGFzcyk7XG5cdFx0XHRyZW1vdmVDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcubG9hZGluZ0NsYXNzKTtcblx0XHRcdGFkZFJlbW92ZUxvYWRFdmVudHMoZWxlbSwgcmFmU3dpdGNoTG9hZGluZ0NsYXNzKTtcblx0XHRcdHRyaWdnZXJFdmVudChlbGVtLCAnbGF6eWxvYWRlZCcpO1xuXHRcdH07XG5cdFx0dmFyIHJhZmVkU3dpdGNoTG9hZGluZ0NsYXNzID0gckFGSXQoc3dpdGNoTG9hZGluZ0NsYXNzKTtcblx0XHR2YXIgcmFmU3dpdGNoTG9hZGluZ0NsYXNzID0gZnVuY3Rpb24oZSl7XG5cdFx0XHRyYWZlZFN3aXRjaExvYWRpbmdDbGFzcyh7dGFyZ2V0OiBlLnRhcmdldH0pO1xuXHRcdH07XG5cblx0XHR2YXIgY2hhbmdlSWZyYW1lU3JjID0gZnVuY3Rpb24oZWxlbSwgc3JjKXtcblx0XHRcdHZhciBsb2FkTW9kZSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWxvYWQtbW9kZScpIHx8IGxhenlTaXplc0NmZy5pZnJhbWVMb2FkTW9kZTtcblxuXHRcdFx0Ly8gbG9hZE1vZGUgY2FuIGJlIGFsc28gYSBzdHJpbmchXG5cdFx0XHRpZiAobG9hZE1vZGUgPT0gMCkge1xuXHRcdFx0XHRlbGVtLmNvbnRlbnRXaW5kb3cubG9jYXRpb24ucmVwbGFjZShzcmMpO1xuXHRcdFx0fSBlbHNlIGlmIChsb2FkTW9kZSA9PSAxKSB7XG5cdFx0XHRcdGVsZW0uc3JjID0gc3JjO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgaGFuZGxlU291cmNlcyA9IGZ1bmN0aW9uKHNvdXJjZSl7XG5cdFx0XHR2YXIgY3VzdG9tTWVkaWE7XG5cblx0XHRcdHZhciBzb3VyY2VTcmNzZXQgPSBzb3VyY2VbX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ2ZnLnNyY3NldEF0dHIpO1xuXG5cdFx0XHRpZiggKGN1c3RvbU1lZGlhID0gbGF6eVNpemVzQ2ZnLmN1c3RvbU1lZGlhW3NvdXJjZVtfZ2V0QXR0cmlidXRlXSgnZGF0YS1tZWRpYScpIHx8IHNvdXJjZVtfZ2V0QXR0cmlidXRlXSgnbWVkaWEnKV0pICl7XG5cdFx0XHRcdHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgY3VzdG9tTWVkaWEpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihzb3VyY2VTcmNzZXQpe1xuXHRcdFx0XHRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzb3VyY2VTcmNzZXQpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgbGF6eVVudmVpbCA9IHJBRkl0KGZ1bmN0aW9uIChlbGVtLCBkZXRhaWwsIGlzQXV0bywgc2l6ZXMsIGlzSW1nKXtcblx0XHRcdHZhciBzcmMsIHNyY3NldCwgcGFyZW50LCBpc1BpY3R1cmUsIGV2ZW50LCBmaXJlc0xvYWQ7XG5cblx0XHRcdGlmKCEoZXZlbnQgPSB0cmlnZ2VyRXZlbnQoZWxlbSwgJ2xhenliZWZvcmV1bnZlaWwnLCBkZXRhaWwpKS5kZWZhdWx0UHJldmVudGVkKXtcblxuXHRcdFx0XHRpZihzaXplcyl7XG5cdFx0XHRcdFx0aWYoaXNBdXRvKXtcblx0XHRcdFx0XHRcdGFkZENsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5hdXRvc2l6ZXNDbGFzcyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCdzaXplcycsIHNpemVzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzcmNzZXQgPSBlbGVtW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zcmNzZXRBdHRyKTtcblx0XHRcdFx0c3JjID0gZWxlbVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDZmcuc3JjQXR0cik7XG5cblx0XHRcdFx0aWYoaXNJbWcpIHtcblx0XHRcdFx0XHRwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0XHRcdFx0aXNQaWN0dXJlID0gcGFyZW50ICYmIHJlZ1BpY3R1cmUudGVzdChwYXJlbnQubm9kZU5hbWUgfHwgJycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZmlyZXNMb2FkID0gZGV0YWlsLmZpcmVzTG9hZCB8fCAoKCdzcmMnIGluIGVsZW0pICYmIChzcmNzZXQgfHwgc3JjIHx8IGlzUGljdHVyZSkpO1xuXG5cdFx0XHRcdGV2ZW50ID0ge3RhcmdldDogZWxlbX07XG5cblx0XHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxvYWRpbmdDbGFzcyk7XG5cblx0XHRcdFx0aWYoZmlyZXNMb2FkKXtcblx0XHRcdFx0XHRjbGVhclRpbWVvdXQocmVzZXRQcmVsb2FkaW5nVGltZXIpO1xuXHRcdFx0XHRcdHJlc2V0UHJlbG9hZGluZ1RpbWVyID0gc2V0VGltZW91dChyZXNldFByZWxvYWRpbmcsIDI1MDApO1xuXHRcdFx0XHRcdGFkZFJlbW92ZUxvYWRFdmVudHMoZWxlbSwgcmFmU3dpdGNoTG9hZGluZ0NsYXNzLCB0cnVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGlzUGljdHVyZSl7XG5cdFx0XHRcdFx0Zm9yRWFjaC5jYWxsKHBhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc291cmNlJyksIGhhbmRsZVNvdXJjZXMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoc3Jjc2V0KXtcblx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSgnc3Jjc2V0Jywgc3Jjc2V0KTtcblx0XHRcdFx0fSBlbHNlIGlmKHNyYyAmJiAhaXNQaWN0dXJlKXtcblx0XHRcdFx0XHRpZihyZWdJZnJhbWUudGVzdChlbGVtLm5vZGVOYW1lKSl7XG5cdFx0XHRcdFx0XHRjaGFuZ2VJZnJhbWVTcmMoZWxlbSwgc3JjKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZWxlbS5zcmMgPSBzcmM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoaXNJbWcgJiYgKHNyY3NldCB8fCBpc1BpY3R1cmUpKXtcblx0XHRcdFx0XHR1cGRhdGVQb2x5ZmlsbChlbGVtLCB7c3JjOiBzcmN9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZihlbGVtLl9sYXp5UmFjZSl7XG5cdFx0XHRcdGRlbGV0ZSBlbGVtLl9sYXp5UmFjZTtcblx0XHRcdH1cblx0XHRcdHJlbW92ZUNsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sYXp5Q2xhc3MpO1xuXG5cdFx0XHRyQUYoZnVuY3Rpb24oKXtcblx0XHRcdFx0Ly8gUGFydCBvZiB0aGlzIGNhbiBiZSByZW1vdmVkIGFzIHNvb24gYXMgdGhpcyBmaXggaXMgb2xkZXI6IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTc3MzEgKDIwMTUpXG5cdFx0XHRcdHZhciBpc0xvYWRlZCA9IGVsZW0uY29tcGxldGUgJiYgZWxlbS5uYXR1cmFsV2lkdGggPiAxO1xuXG5cdFx0XHRcdGlmKCAhZmlyZXNMb2FkIHx8IGlzTG9hZGVkKXtcblx0XHRcdFx0XHRpZiAoaXNMb2FkZWQpIHtcblx0XHRcdFx0XHRcdGFkZENsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5mYXN0TG9hZGVkQ2xhc3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRzd2l0Y2hMb2FkaW5nQ2xhc3MoZXZlbnQpO1xuXHRcdFx0XHRcdGVsZW0uX2xhenlDYWNoZSA9IHRydWU7XG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0aWYgKCdfbGF6eUNhY2hlJyBpbiBlbGVtKSB7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBlbGVtLl9sYXp5Q2FjaGU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSwgOSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGVsZW0ubG9hZGluZyA9PSAnbGF6eScpIHtcblx0XHRcdFx0XHRpc0xvYWRpbmctLTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKipcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBlbGVtIHsgRWxlbWVudCB9XG5cdFx0ICovXG5cdFx0dmFyIHVudmVpbEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbSl7XG5cdFx0XHRpZiAoZWxlbS5fbGF6eVJhY2UpIHtyZXR1cm47fVxuXHRcdFx0dmFyIGRldGFpbDtcblxuXHRcdFx0dmFyIGlzSW1nID0gcmVnSW1nLnRlc3QoZWxlbS5ub2RlTmFtZSk7XG5cblx0XHRcdC8vYWxsb3cgdXNpbmcgc2l6ZXM9XCJhdXRvXCIsIGJ1dCBkb24ndCB1c2UuIGl0J3MgaW52YWxpZC4gVXNlIGRhdGEtc2l6ZXM9XCJhdXRvXCIgb3IgYSB2YWxpZCB2YWx1ZSBmb3Igc2l6ZXMgaW5zdGVhZCAoaS5lLjogc2l6ZXM9XCI4MHZ3XCIpXG5cdFx0XHR2YXIgc2l6ZXMgPSBpc0ltZyAmJiAoZWxlbVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDZmcuc2l6ZXNBdHRyKSB8fCBlbGVtW19nZXRBdHRyaWJ1dGVdKCdzaXplcycpKTtcblx0XHRcdHZhciBpc0F1dG8gPSBzaXplcyA9PSAnYXV0byc7XG5cblx0XHRcdGlmKCAoaXNBdXRvIHx8ICFpc0NvbXBsZXRlZCkgJiYgaXNJbWcgJiYgKGVsZW1bX2dldEF0dHJpYnV0ZV0oJ3NyYycpIHx8IGVsZW0uc3Jjc2V0KSAmJiAhZWxlbS5jb21wbGV0ZSAmJiAhaGFzQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmVycm9yQ2xhc3MpICYmIGhhc0NsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sYXp5Q2xhc3MpKXtyZXR1cm47fVxuXG5cdFx0XHRkZXRhaWwgPSB0cmlnZ2VyRXZlbnQoZWxlbSwgJ2xhenl1bnZlaWxyZWFkJykuZGV0YWlsO1xuXG5cdFx0XHRpZihpc0F1dG8pe1xuXHRcdFx0XHQgYXV0b1NpemVyLnVwZGF0ZUVsZW0oZWxlbSwgdHJ1ZSwgZWxlbS5vZmZzZXRXaWR0aCk7XG5cdFx0XHR9XG5cblx0XHRcdGVsZW0uX2xhenlSYWNlID0gdHJ1ZTtcblx0XHRcdGlzTG9hZGluZysrO1xuXG5cdFx0XHRsYXp5VW52ZWlsKGVsZW0sIGRldGFpbCwgaXNBdXRvLCBzaXplcywgaXNJbWcpO1xuXHRcdH07XG5cblx0XHR2YXIgYWZ0ZXJTY3JvbGwgPSBkZWJvdW5jZShmdW5jdGlvbigpe1xuXHRcdFx0bGF6eVNpemVzQ2ZnLmxvYWRNb2RlID0gMztcblx0XHRcdHRocm90dGxlZENoZWNrRWxlbWVudHMoKTtcblx0XHR9KTtcblxuXHRcdHZhciBhbHRMb2FkbW9kZVNjcm9sbExpc3RuZXIgPSBmdW5jdGlvbigpe1xuXHRcdFx0aWYobGF6eVNpemVzQ2ZnLmxvYWRNb2RlID09IDMpe1xuXHRcdFx0XHRsYXp5U2l6ZXNDZmcubG9hZE1vZGUgPSAyO1xuXHRcdFx0fVxuXHRcdFx0YWZ0ZXJTY3JvbGwoKTtcblx0XHR9O1xuXG5cdFx0dmFyIG9ubG9hZCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRpZihpc0NvbXBsZXRlZCl7cmV0dXJuO31cblx0XHRcdGlmKERhdGUubm93KCkgLSBzdGFydGVkIDwgOTk5KXtcblx0XHRcdFx0c2V0VGltZW91dChvbmxvYWQsIDk5OSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXG5cdFx0XHRpc0NvbXBsZXRlZCA9IHRydWU7XG5cblx0XHRcdGxhenlTaXplc0NmZy5sb2FkTW9kZSA9IDM7XG5cblx0XHRcdHRocm90dGxlZENoZWNrRWxlbWVudHMoKTtcblxuXHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYWx0TG9hZG1vZGVTY3JvbGxMaXN0bmVyLCB0cnVlKTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdF86IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHN0YXJ0ZWQgPSBEYXRlLm5vdygpO1xuXG5cdFx0XHRcdGxhenlzaXplcy5lbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobGF6eVNpemVzQ2ZnLmxhenlDbGFzcyk7XG5cdFx0XHRcdHByZWxvYWRFbGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobGF6eVNpemVzQ2ZnLmxhenlDbGFzcyArICcgJyArIGxhenlTaXplc0NmZy5wcmVsb2FkQ2xhc3MpO1xuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VzaG93JywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRpZiAoZS5wZXJzaXN0ZWQpIHtcblx0XHRcdFx0XHRcdHZhciBsb2FkaW5nRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIGxhenlTaXplc0NmZy5sb2FkaW5nQ2xhc3MpO1xuXG5cdFx0XHRcdFx0XHRpZiAobG9hZGluZ0VsZW1lbnRzLmxlbmd0aCAmJiBsb2FkaW5nRWxlbWVudHMuZm9yRWFjaCkge1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdGxvYWRpbmdFbGVtZW50cy5mb3JFYWNoKCBmdW5jdGlvbiAoaW1nKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaW1nLmNvbXBsZXRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHVudmVpbEVsZW1lbnQoaW1nKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZih3aW5kb3cuTXV0YXRpb25PYnNlcnZlcil7XG5cdFx0XHRcdFx0bmV3IE11dGF0aW9uT2JzZXJ2ZXIoIHRocm90dGxlZENoZWNrRWxlbWVudHMgKS5vYnNlcnZlKCBkb2NFbGVtLCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlLCBhdHRyaWJ1dGVzOiB0cnVlfSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRvY0VsZW1bX2FkZEV2ZW50TGlzdGVuZXJdKCdET01Ob2RlSW5zZXJ0ZWQnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdFx0XHRkb2NFbGVtW19hZGRFdmVudExpc3RlbmVyXSgnRE9NQXR0ck1vZGlmaWVkJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cdFx0XHRcdFx0c2V0SW50ZXJ2YWwodGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgOTk5KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblxuXHRcdFx0XHQvLywgJ2Z1bGxzY3JlZW5jaGFuZ2UnXG5cdFx0XHRcdFsnZm9jdXMnLCAnbW91c2VvdmVyJywgJ2NsaWNrJywgJ2xvYWQnLCAndHJhbnNpdGlvbmVuZCcsICdhbmltYXRpb25lbmQnXS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpe1xuXHRcdFx0XHRcdGRvY3VtZW50W19hZGRFdmVudExpc3RlbmVyXShuYW1lLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYoKC9kJHxeYy8udGVzdChkb2N1bWVudC5yZWFkeVN0YXRlKSkpe1xuXHRcdFx0XHRcdG9ubG9hZCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbmxvYWQpO1xuXHRcdFx0XHRcdGRvY3VtZW50W19hZGRFdmVudExpc3RlbmVyXSgnRE9NQ29udGVudExvYWRlZCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMpO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQob25sb2FkLCAyMDAwMCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihsYXp5c2l6ZXMuZWxlbWVudHMubGVuZ3RoKXtcblx0XHRcdFx0XHRjaGVja0VsZW1lbnRzKCk7XG5cdFx0XHRcdFx0ckFGLl9sc0ZsdXNoKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3R0bGVkQ2hlY2tFbGVtZW50cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y2hlY2tFbGVtczogdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyxcblx0XHRcdHVudmVpbDogdW52ZWlsRWxlbWVudCxcblx0XHRcdF9hTFNMOiBhbHRMb2FkbW9kZVNjcm9sbExpc3RuZXIsXG5cdFx0fTtcblx0fSkoKTtcblxuXG5cdHZhciBhdXRvU2l6ZXIgPSAoZnVuY3Rpb24oKXtcblx0XHR2YXIgYXV0b3NpemVzRWxlbXM7XG5cblx0XHR2YXIgc2l6ZUVsZW1lbnQgPSByQUZJdChmdW5jdGlvbihlbGVtLCBwYXJlbnQsIGV2ZW50LCB3aWR0aCl7XG5cdFx0XHR2YXIgc291cmNlcywgaSwgbGVuO1xuXHRcdFx0ZWxlbS5fbGF6eXNpemVzV2lkdGggPSB3aWR0aDtcblx0XHRcdHdpZHRoICs9ICdweCc7XG5cblx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCdzaXplcycsIHdpZHRoKTtcblxuXHRcdFx0aWYocmVnUGljdHVyZS50ZXN0KHBhcmVudC5ub2RlTmFtZSB8fCAnJykpe1xuXHRcdFx0XHRzb3VyY2VzID0gcGFyZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzb3VyY2UnKTtcblx0XHRcdFx0Zm9yKGkgPSAwLCBsZW4gPSBzb3VyY2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcblx0XHRcdFx0XHRzb3VyY2VzW2ldLnNldEF0dHJpYnV0ZSgnc2l6ZXMnLCB3aWR0aCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYoIWV2ZW50LmRldGFpbC5kYXRhQXR0cil7XG5cdFx0XHRcdHVwZGF0ZVBvbHlmaWxsKGVsZW0sIGV2ZW50LmRldGFpbCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0LyoqXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gZWxlbSB7RWxlbWVudH1cblx0XHQgKiBAcGFyYW0gZGF0YUF0dHJcblx0XHQgKiBAcGFyYW0gW3dpZHRoXSB7IG51bWJlciB9XG5cdFx0ICovXG5cdFx0dmFyIGdldFNpemVFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW0sIGRhdGFBdHRyLCB3aWR0aCl7XG5cdFx0XHR2YXIgZXZlbnQ7XG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXG5cdFx0XHRpZihwYXJlbnQpe1xuXHRcdFx0XHR3aWR0aCA9IGdldFdpZHRoKGVsZW0sIHBhcmVudCwgd2lkdGgpO1xuXHRcdFx0XHRldmVudCA9IHRyaWdnZXJFdmVudChlbGVtLCAnbGF6eWJlZm9yZXNpemVzJywge3dpZHRoOiB3aWR0aCwgZGF0YUF0dHI6ICEhZGF0YUF0dHJ9KTtcblxuXHRcdFx0XHRpZighZXZlbnQuZGVmYXVsdFByZXZlbnRlZCl7XG5cdFx0XHRcdFx0d2lkdGggPSBldmVudC5kZXRhaWwud2lkdGg7XG5cblx0XHRcdFx0XHRpZih3aWR0aCAmJiB3aWR0aCAhPT0gZWxlbS5fbGF6eXNpemVzV2lkdGgpe1xuXHRcdFx0XHRcdFx0c2l6ZUVsZW1lbnQoZWxlbSwgcGFyZW50LCBldmVudCwgd2lkdGgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgdXBkYXRlRWxlbWVudHNTaXplcyA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgaTtcblx0XHRcdHZhciBsZW4gPSBhdXRvc2l6ZXNFbGVtcy5sZW5ndGg7XG5cdFx0XHRpZihsZW4pe1xuXHRcdFx0XHRpID0gMDtcblxuXHRcdFx0XHRmb3IoOyBpIDwgbGVuOyBpKyspe1xuXHRcdFx0XHRcdGdldFNpemVFbGVtZW50KGF1dG9zaXplc0VsZW1zW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgZGVib3VuY2VkVXBkYXRlRWxlbWVudHNTaXplcyA9IGRlYm91bmNlKHVwZGF0ZUVsZW1lbnRzU2l6ZXMpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdF86IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGF1dG9zaXplc0VsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShsYXp5U2l6ZXNDZmcuYXV0b3NpemVzQ2xhc3MpO1xuXHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZWRVcGRhdGVFbGVtZW50c1NpemVzKTtcblx0XHRcdH0sXG5cdFx0XHRjaGVja0VsZW1zOiBkZWJvdW5jZWRVcGRhdGVFbGVtZW50c1NpemVzLFxuXHRcdFx0dXBkYXRlRWxlbTogZ2V0U2l6ZUVsZW1lbnRcblx0XHR9O1xuXHR9KSgpO1xuXG5cdHZhciBpbml0ID0gZnVuY3Rpb24oKXtcblx0XHRpZighaW5pdC5pICYmIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpe1xuXHRcdFx0aW5pdC5pID0gdHJ1ZTtcblx0XHRcdGF1dG9TaXplci5fKCk7XG5cdFx0XHRsb2FkZXIuXygpO1xuXHRcdH1cblx0fTtcblxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0aWYobGF6eVNpemVzQ2ZnLmluaXQpe1xuXHRcdFx0aW5pdCgpO1xuXHRcdH1cblx0fSk7XG5cblx0bGF6eXNpemVzID0ge1xuXHRcdC8qKlxuXHRcdCAqIEB0eXBlIHsgTGF6eVNpemVzQ29uZmlnUGFydGlhbCB9XG5cdFx0ICovXG5cdFx0Y2ZnOiBsYXp5U2l6ZXNDZmcsXG5cdFx0YXV0b1NpemVyOiBhdXRvU2l6ZXIsXG5cdFx0bG9hZGVyOiBsb2FkZXIsXG5cdFx0aW5pdDogaW5pdCxcblx0XHR1UDogdXBkYXRlUG9seWZpbGwsXG5cdFx0YUM6IGFkZENsYXNzLFxuXHRcdHJDOiByZW1vdmVDbGFzcyxcblx0XHRoQzogaGFzQ2xhc3MsXG5cdFx0ZmlyZTogdHJpZ2dlckV2ZW50LFxuXHRcdGdXOiBnZXRXaWR0aCxcblx0XHRyQUY6IHJBRixcblx0fTtcblxuXHRyZXR1cm4gbGF6eXNpemVzO1xufVxuKSk7XG4iLCAiKGZ1bmN0aW9uKHdpbmRvdywgZmFjdG9yeSkge1xuXHR2YXIgZ2xvYmFsSW5zdGFsbCA9IGZ1bmN0aW9uKCl7XG5cdFx0ZmFjdG9yeSh3aW5kb3cubGF6eVNpemVzKTtcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbGF6eXVudmVpbHJlYWQnLCBnbG9iYWxJbnN0YWxsLCB0cnVlKTtcblx0fTtcblxuXHRmYWN0b3J5ID0gZmFjdG9yeS5iaW5kKG51bGwsIHdpbmRvdywgd2luZG93LmRvY3VtZW50KTtcblxuXHRpZih0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKXtcblx0XHRmYWN0b3J5KHJlcXVpcmUoJ2xhenlzaXplcycpKTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2xhenlzaXplcyddLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmKHdpbmRvdy5sYXp5U2l6ZXMpIHtcblx0XHRnbG9iYWxJbnN0YWxsKCk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xhenl1bnZlaWxyZWFkJywgZ2xvYmFsSW5zdGFsbCwgdHJ1ZSk7XG5cdH1cbn0od2luZG93LCBmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCBsYXp5U2l6ZXMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBpbWdTdXBwb3J0ID0gJ2xvYWRpbmcnIGluIEhUTUxJbWFnZUVsZW1lbnQucHJvdG90eXBlO1xuXHR2YXIgaWZyYW1lU3VwcG9ydCA9ICdsb2FkaW5nJyBpbiBIVE1MSUZyYW1lRWxlbWVudC5wcm90b3R5cGU7XG5cdHZhciBpc0NvbmZpZ1NldCA9IGZhbHNlO1xuXHR2YXIgb2xkUHJlbWF0dXJlVW52ZWlsID0gbGF6eVNpemVzLnByZW1hdHVyZVVudmVpbDtcblx0dmFyIGNmZyA9IGxhenlTaXplcy5jZmc7XG5cdHZhciBsaXN0ZW5lck1hcCA9IHtcblx0XHRmb2N1czogMSxcblx0XHRtb3VzZW92ZXI6IDEsXG5cdFx0Y2xpY2s6IDEsXG5cdFx0bG9hZDogMSxcblx0XHR0cmFuc2l0aW9uZW5kOiAxLFxuXHRcdGFuaW1hdGlvbmVuZDogMSxcblx0XHRzY3JvbGw6IDEsXG5cdFx0cmVzaXplOiAxLFxuXHR9O1xuXG5cdGlmICghY2ZnLm5hdGl2ZUxvYWRpbmcpIHtcblx0XHRjZmcubmF0aXZlTG9hZGluZyA9IHt9O1xuXHR9XG5cblx0aWYgKCF3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciB8fCAhd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIgfHwgKCFpbWdTdXBwb3J0ICYmICFpZnJhbWVTdXBwb3J0KSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGZ1bmN0aW9uIGRpc2FibGVFdmVudHMoKSB7XG5cdFx0dmFyIGxvYWRlciA9IGxhenlTaXplcy5sb2FkZXI7XG5cdFx0dmFyIHRocm90dGxlZENoZWNrRWxlbWVudHMgPSBsb2FkZXIuY2hlY2tFbGVtcztcblx0XHR2YXIgcmVtb3ZlQUxTTCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBsb2FkZXIuX2FMU0wsIHRydWUpO1xuXHRcdFx0fSwgMTAwMCk7XG5cdFx0fTtcblx0XHR2YXIgY3VycmVudExpc3RlbmVyTWFwID0gdHlwZW9mIGNmZy5uYXRpdmVMb2FkaW5nLmRpc2FibGVMaXN0ZW5lcnMgPT0gJ29iamVjdCcgP1xuXHRcdFx0Y2ZnLm5hdGl2ZUxvYWRpbmcuZGlzYWJsZUxpc3RlbmVycyA6XG5cdFx0XHRsaXN0ZW5lck1hcDtcblxuXHRcdGlmIChjdXJyZW50TGlzdGVuZXJNYXAuc2Nyb2xsKSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHJlbW92ZUFMU0wpO1xuXHRcdFx0cmVtb3ZlQUxTTCgpO1xuXG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0aWYgKGN1cnJlbnRMaXN0ZW5lck1hcC5yZXNpemUpIHtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHR9XG5cblx0XHRPYmplY3Qua2V5cyhjdXJyZW50TGlzdGVuZXJNYXApLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuXHRcdFx0aWYgKGN1cnJlbnRMaXN0ZW5lck1hcFtuYW1lXSkge1xuXHRcdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gcnVuQ29uZmlnKCkge1xuXHRcdGlmIChpc0NvbmZpZ1NldCkge3JldHVybjt9XG5cdFx0aXNDb25maWdTZXQgPSB0cnVlO1xuXG5cdFx0aWYgKGltZ1N1cHBvcnQgJiYgaWZyYW1lU3VwcG9ydCAmJiBjZmcubmF0aXZlTG9hZGluZy5kaXNhYmxlTGlzdGVuZXJzKSB7XG5cdFx0XHRpZiAoY2ZnLm5hdGl2ZUxvYWRpbmcuZGlzYWJsZUxpc3RlbmVycyA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRjZmcubmF0aXZlTG9hZGluZy5zZXRMb2FkaW5nQXR0cmlidXRlID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0ZGlzYWJsZUV2ZW50cygpO1xuXHRcdH1cblxuXHRcdGlmIChjZmcubmF0aXZlTG9hZGluZy5zZXRMb2FkaW5nQXR0cmlidXRlKSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbGF6eWJlZm9yZXVudmVpbCcsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHR2YXIgZWxlbWVudCA9IGUudGFyZ2V0O1xuXG5cdFx0XHRcdGlmICgnbG9hZGluZycgaW4gZWxlbWVudCAmJiAhZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2xvYWRpbmcnKSkge1xuXHRcdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKCdsb2FkaW5nJywgJ2xhenknKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgdHJ1ZSk7XG5cdFx0fVxuXHR9XG5cblx0bGF6eVNpemVzLnByZW1hdHVyZVVudmVpbCA9IGZ1bmN0aW9uIHByZW1hdHVyZVVudmVpbChlbGVtZW50KSB7XG5cblx0XHRpZiAoIWlzQ29uZmlnU2V0KSB7XG5cdFx0XHRydW5Db25maWcoKTtcblx0XHR9XG5cblx0XHRpZiAoJ2xvYWRpbmcnIGluIGVsZW1lbnQgJiZcblx0XHRcdChjZmcubmF0aXZlTG9hZGluZy5zZXRMb2FkaW5nQXR0cmlidXRlIHx8IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdsb2FkaW5nJykpICYmXG5cdFx0XHQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2l6ZXMnKSAhPSAnYXV0bycgfHwgZWxlbWVudC5vZmZzZXRXaWR0aCkpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGlmIChvbGRQcmVtYXR1cmVVbnZlaWwpIHtcblx0XHRcdHJldHVybiBvbGRQcmVtYXR1cmVVbnZlaWwoZWxlbWVudCk7XG5cdFx0fVxuXHR9O1xuXG59KSk7XG4iLCAiLyohXG4gKiBjbGlwYm9hcmQuanMgdjIuMC4xMVxuICogaHR0cHM6Ly9jbGlwYm9hcmRqcy5jb20vXG4gKlxuICogTGljZW5zZWQgTUlUIFx1MDBBOSBaZW5vIFJvY2hhXG4gKi9cbihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkNsaXBib2FyZEpTXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkNsaXBib2FyZEpTXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKCkgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gNjg2OlxuLyoqKi8gKGZ1bmN0aW9uKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBfX3dlYnBhY2tfZXhwb3J0c19fLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG4vLyBFWFBPUlRTXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuICBcImRlZmF1bHRcIjogZnVuY3Rpb24oKSB7IHJldHVybiAvKiBiaW5kaW5nICovIGNsaXBib2FyZDsgfVxufSk7XG5cbi8vIEVYVEVSTkFMIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvdGlueS1lbWl0dGVyL2luZGV4LmpzXG52YXIgdGlueV9lbWl0dGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNzkpO1xudmFyIHRpbnlfZW1pdHRlcl9kZWZhdWx0ID0gLyojX19QVVJFX18qL19fd2VicGFja19yZXF1aXJlX18ubih0aW55X2VtaXR0ZXIpO1xuLy8gRVhURVJOQUwgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9nb29kLWxpc3RlbmVyL3NyYy9saXN0ZW4uanNcbnZhciBsaXN0ZW4gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3MCk7XG52YXIgbGlzdGVuX2RlZmF1bHQgPSAvKiNfX1BVUkVfXyovX193ZWJwYWNrX3JlcXVpcmVfXy5uKGxpc3Rlbik7XG4vLyBFWFRFUk5BTCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL3NlbGVjdC9zcmMvc2VsZWN0LmpzXG52YXIgc3JjX3NlbGVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oODE3KTtcbnZhciBzZWxlY3RfZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9fX3dlYnBhY2tfcmVxdWlyZV9fLm4oc3JjX3NlbGVjdCk7XG47Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29tbW9uL2NvbW1hbmQuanNcbi8qKlxuICogRXhlY3V0ZXMgYSBnaXZlbiBvcGVyYXRpb24gdHlwZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBjb21tYW5kKHR5cGUpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZXhlY0NvbW1hbmQodHlwZSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2FjdGlvbnMvY3V0LmpzXG5cblxuLyoqXG4gKiBDdXQgYWN0aW9uIHdyYXBwZXIuXG4gKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudH0gdGFyZ2V0XG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxudmFyIENsaXBib2FyZEFjdGlvbkN1dCA9IGZ1bmN0aW9uIENsaXBib2FyZEFjdGlvbkN1dCh0YXJnZXQpIHtcbiAgdmFyIHNlbGVjdGVkVGV4dCA9IHNlbGVjdF9kZWZhdWx0KCkodGFyZ2V0KTtcbiAgY29tbWFuZCgnY3V0Jyk7XG4gIHJldHVybiBzZWxlY3RlZFRleHQ7XG59O1xuXG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIHZhciBhY3Rpb25zX2N1dCA9IChDbGlwYm9hcmRBY3Rpb25DdXQpO1xuOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvbW1vbi9jcmVhdGUtZmFrZS1lbGVtZW50LmpzXG4vKipcbiAqIENyZWF0ZXMgYSBmYWtlIHRleHRhcmVhIGVsZW1lbnQgd2l0aCBhIHZhbHVlLlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRmFrZUVsZW1lbnQodmFsdWUpIHtcbiAgdmFyIGlzUlRMID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGlyJykgPT09ICdydGwnO1xuICB2YXIgZmFrZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpOyAvLyBQcmV2ZW50IHpvb21pbmcgb24gaU9TXG5cbiAgZmFrZUVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSAnMTJwdCc7IC8vIFJlc2V0IGJveCBtb2RlbFxuXG4gIGZha2VFbGVtZW50LnN0eWxlLmJvcmRlciA9ICcwJztcbiAgZmFrZUVsZW1lbnQuc3R5bGUucGFkZGluZyA9ICcwJztcbiAgZmFrZUVsZW1lbnQuc3R5bGUubWFyZ2luID0gJzAnOyAvLyBNb3ZlIGVsZW1lbnQgb3V0IG9mIHNjcmVlbiBob3Jpem9udGFsbHlcblxuICBmYWtlRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gIGZha2VFbGVtZW50LnN0eWxlW2lzUlRMID8gJ3JpZ2h0JyA6ICdsZWZ0J10gPSAnLTk5OTlweCc7IC8vIE1vdmUgZWxlbWVudCB0byB0aGUgc2FtZSBwb3NpdGlvbiB2ZXJ0aWNhbGx5XG5cbiAgdmFyIHlQb3NpdGlvbiA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICBmYWtlRWxlbWVudC5zdHlsZS50b3AgPSBcIlwiLmNvbmNhdCh5UG9zaXRpb24sIFwicHhcIik7XG4gIGZha2VFbGVtZW50LnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAnJyk7XG4gIGZha2VFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gIHJldHVybiBmYWtlRWxlbWVudDtcbn1cbjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9hY3Rpb25zL2NvcHkuanNcblxuXG5cbi8qKlxuICogQ3JlYXRlIGZha2UgY29weSBhY3Rpb24gd3JhcHBlciB1c2luZyBhIGZha2UgZWxlbWVudC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxudmFyIGZha2VDb3B5QWN0aW9uID0gZnVuY3Rpb24gZmFrZUNvcHlBY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcbiAgdmFyIGZha2VFbGVtZW50ID0gY3JlYXRlRmFrZUVsZW1lbnQodmFsdWUpO1xuICBvcHRpb25zLmNvbnRhaW5lci5hcHBlbmRDaGlsZChmYWtlRWxlbWVudCk7XG4gIHZhciBzZWxlY3RlZFRleHQgPSBzZWxlY3RfZGVmYXVsdCgpKGZha2VFbGVtZW50KTtcbiAgY29tbWFuZCgnY29weScpO1xuICBmYWtlRWxlbWVudC5yZW1vdmUoKTtcbiAgcmV0dXJuIHNlbGVjdGVkVGV4dDtcbn07XG4vKipcbiAqIENvcHkgYWN0aW9uIHdyYXBwZXIuXG4gKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudH0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5cblxudmFyIENsaXBib2FyZEFjdGlvbkNvcHkgPSBmdW5jdGlvbiBDbGlwYm9hcmRBY3Rpb25Db3B5KHRhcmdldCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge1xuICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuYm9keVxuICB9O1xuICB2YXIgc2VsZWN0ZWRUZXh0ID0gJyc7XG5cbiAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgc2VsZWN0ZWRUZXh0ID0gZmFrZUNvcHlBY3Rpb24odGFyZ2V0LCBvcHRpb25zKTtcbiAgfSBlbHNlIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmICFbJ3RleHQnLCAnc2VhcmNoJywgJ3VybCcsICd0ZWwnLCAncGFzc3dvcmQnXS5pbmNsdWRlcyh0YXJnZXQgPT09IG51bGwgfHwgdGFyZ2V0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0YXJnZXQudHlwZSkpIHtcbiAgICAvLyBJZiBpbnB1dCB0eXBlIGRvZXNuJ3Qgc3VwcG9ydCBgc2V0U2VsZWN0aW9uUmFuZ2VgLiBTaW11bGF0ZSBpdC4gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hUTUxJbnB1dEVsZW1lbnQvc2V0U2VsZWN0aW9uUmFuZ2VcbiAgICBzZWxlY3RlZFRleHQgPSBmYWtlQ29weUFjdGlvbih0YXJnZXQudmFsdWUsIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHNlbGVjdGVkVGV4dCA9IHNlbGVjdF9kZWZhdWx0KCkodGFyZ2V0KTtcbiAgICBjb21tYW5kKCdjb3B5Jyk7XG4gIH1cblxuICByZXR1cm4gc2VsZWN0ZWRUZXh0O1xufTtcblxuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgYWN0aW9uc19jb3B5ID0gKENsaXBib2FyZEFjdGlvbkNvcHkpO1xuOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2FjdGlvbnMvZGVmYXVsdC5qc1xuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5cblxuLyoqXG4gKiBJbm5lciBmdW5jdGlvbiB3aGljaCBwZXJmb3JtcyBzZWxlY3Rpb24gZnJvbSBlaXRoZXIgYHRleHRgIG9yIGB0YXJnZXRgXG4gKiBwcm9wZXJ0aWVzIGFuZCB0aGVuIGV4ZWN1dGVzIGNvcHkgb3IgY3V0IG9wZXJhdGlvbnMuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5cbnZhciBDbGlwYm9hcmRBY3Rpb25EZWZhdWx0ID0gZnVuY3Rpb24gQ2xpcGJvYXJkQWN0aW9uRGVmYXVsdCgpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAvLyBEZWZpbmVzIGJhc2UgcHJvcGVydGllcyBwYXNzZWQgZnJvbSBjb25zdHJ1Y3Rvci5cbiAgdmFyIF9vcHRpb25zJGFjdGlvbiA9IG9wdGlvbnMuYWN0aW9uLFxuICAgICAgYWN0aW9uID0gX29wdGlvbnMkYWN0aW9uID09PSB2b2lkIDAgPyAnY29weScgOiBfb3B0aW9ucyRhY3Rpb24sXG4gICAgICBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lcixcbiAgICAgIHRhcmdldCA9IG9wdGlvbnMudGFyZ2V0LFxuICAgICAgdGV4dCA9IG9wdGlvbnMudGV4dDsgLy8gU2V0cyB0aGUgYGFjdGlvbmAgdG8gYmUgcGVyZm9ybWVkIHdoaWNoIGNhbiBiZSBlaXRoZXIgJ2NvcHknIG9yICdjdXQnLlxuXG4gIGlmIChhY3Rpb24gIT09ICdjb3B5JyAmJiBhY3Rpb24gIT09ICdjdXQnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFwiYWN0aW9uXCIgdmFsdWUsIHVzZSBlaXRoZXIgXCJjb3B5XCIgb3IgXCJjdXRcIicpO1xuICB9IC8vIFNldHMgdGhlIGB0YXJnZXRgIHByb3BlcnR5IHVzaW5nIGFuIGVsZW1lbnQgdGhhdCB3aWxsIGJlIGhhdmUgaXRzIGNvbnRlbnQgY29waWVkLlxuXG5cbiAgaWYgKHRhcmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHRhcmdldCAmJiBfdHlwZW9mKHRhcmdldCkgPT09ICdvYmplY3QnICYmIHRhcmdldC5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgaWYgKGFjdGlvbiA9PT0gJ2NvcHknICYmIHRhcmdldC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFwidGFyZ2V0XCIgYXR0cmlidXRlLiBQbGVhc2UgdXNlIFwicmVhZG9ubHlcIiBpbnN0ZWFkIG9mIFwiZGlzYWJsZWRcIiBhdHRyaWJ1dGUnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGlvbiA9PT0gJ2N1dCcgJiYgKHRhcmdldC5oYXNBdHRyaWJ1dGUoJ3JlYWRvbmx5JykgfHwgdGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFwidGFyZ2V0XCIgYXR0cmlidXRlLiBZb3UgY2FuXFwndCBjdXQgdGV4dCBmcm9tIGVsZW1lbnRzIHdpdGggXCJyZWFkb25seVwiIG9yIFwiZGlzYWJsZWRcIiBhdHRyaWJ1dGVzJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBcInRhcmdldFwiIHZhbHVlLCB1c2UgYSB2YWxpZCBFbGVtZW50Jyk7XG4gICAgfVxuICB9IC8vIERlZmluZSBzZWxlY3Rpb24gc3RyYXRlZ3kgYmFzZWQgb24gYHRleHRgIHByb3BlcnR5LlxuXG5cbiAgaWYgKHRleHQpIHtcbiAgICByZXR1cm4gYWN0aW9uc19jb3B5KHRleHQsIHtcbiAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyXG4gICAgfSk7XG4gIH0gLy8gRGVmaW5lcyB3aGljaCBzZWxlY3Rpb24gc3RyYXRlZ3kgYmFzZWQgb24gYHRhcmdldGAgcHJvcGVydHkuXG5cblxuICBpZiAodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGFjdGlvbiA9PT0gJ2N1dCcgPyBhY3Rpb25zX2N1dCh0YXJnZXQpIDogYWN0aW9uc19jb3B5KHRhcmdldCwge1xuICAgICAgY29udGFpbmVyOiBjb250YWluZXJcbiAgICB9KTtcbiAgfVxufTtcblxuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgYWN0aW9uc19kZWZhdWx0ID0gKENsaXBib2FyZEFjdGlvbkRlZmF1bHQpO1xuOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NsaXBib2FyZC5qc1xuZnVuY3Rpb24gY2xpcGJvYXJkX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgY2xpcGJvYXJkX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBjbGlwYm9hcmRfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIGNsaXBib2FyZF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKGNsaXBib2FyZF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChEYXRlLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgcmV0dXJuIHRydWU7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5cblxuXG5cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gcmV0cmlldmUgYXR0cmlidXRlIHZhbHVlLlxuICogQHBhcmFtIHtTdHJpbmd9IHN1ZmZpeFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKi9cblxuZnVuY3Rpb24gZ2V0QXR0cmlidXRlVmFsdWUoc3VmZml4LCBlbGVtZW50KSB7XG4gIHZhciBhdHRyaWJ1dGUgPSBcImRhdGEtY2xpcGJvYXJkLVwiLmNvbmNhdChzdWZmaXgpO1xuXG4gIGlmICghZWxlbWVudC5oYXNBdHRyaWJ1dGUoYXR0cmlidXRlKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xufVxuLyoqXG4gKiBCYXNlIGNsYXNzIHdoaWNoIHRha2VzIG9uZSBvciBtb3JlIGVsZW1lbnRzLCBhZGRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGVtLFxuICogYW5kIGluc3RhbnRpYXRlcyBhIG5ldyBgQ2xpcGJvYXJkQWN0aW9uYCBvbiBlYWNoIGNsaWNrLlxuICovXG5cblxudmFyIENsaXBib2FyZCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0VtaXR0ZXIpIHtcbiAgX2luaGVyaXRzKENsaXBib2FyZCwgX0VtaXR0ZXIpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoQ2xpcGJvYXJkKTtcblxuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR8SFRNTENvbGxlY3Rpb258Tm9kZUxpc3R9IHRyaWdnZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICovXG4gIGZ1bmN0aW9uIENsaXBib2FyZCh0cmlnZ2VyLCBvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENsaXBib2FyZCk7XG5cbiAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpO1xuXG4gICAgX3RoaXMucmVzb2x2ZU9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICBfdGhpcy5saXN0ZW5DbGljayh0cmlnZ2VyKTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICAvKipcbiAgICogRGVmaW5lcyBpZiBhdHRyaWJ1dGVzIHdvdWxkIGJlIHJlc29sdmVkIHVzaW5nIGludGVybmFsIHNldHRlciBmdW5jdGlvbnNcbiAgICogb3IgY3VzdG9tIGZ1bmN0aW9ucyB0aGF0IHdlcmUgcGFzc2VkIGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoQ2xpcGJvYXJkLCBbe1xuICAgIGtleTogXCJyZXNvbHZlT3B0aW9uc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNvbHZlT3B0aW9ucygpIHtcbiAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAgIHRoaXMuYWN0aW9uID0gdHlwZW9mIG9wdGlvbnMuYWN0aW9uID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5hY3Rpb24gOiB0aGlzLmRlZmF1bHRBY3Rpb247XG4gICAgICB0aGlzLnRhcmdldCA9IHR5cGVvZiBvcHRpb25zLnRhcmdldCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMudGFyZ2V0IDogdGhpcy5kZWZhdWx0VGFyZ2V0O1xuICAgICAgdGhpcy50ZXh0ID0gdHlwZW9mIG9wdGlvbnMudGV4dCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMudGV4dCA6IHRoaXMuZGVmYXVsdFRleHQ7XG4gICAgICB0aGlzLmNvbnRhaW5lciA9IGNsaXBib2FyZF90eXBlb2Yob3B0aW9ucy5jb250YWluZXIpID09PSAnb2JqZWN0JyA/IG9wdGlvbnMuY29udGFpbmVyIDogZG9jdW1lbnQuYm9keTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBwYXNzZWQgdHJpZ2dlci5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudHxIVE1MQ29sbGVjdGlvbnxOb2RlTGlzdH0gdHJpZ2dlclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwibGlzdGVuQ2xpY2tcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbGlzdGVuQ2xpY2sodHJpZ2dlcikge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHRoaXMubGlzdGVuZXIgPSBsaXN0ZW5fZGVmYXVsdCgpKHRyaWdnZXIsICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiBfdGhpczIub25DbGljayhlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgbmV3IGBDbGlwYm9hcmRBY3Rpb25gIG9uIGVhY2ggY2xpY2sgZXZlbnQuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwib25DbGlja1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNsaWNrKGUpIHtcbiAgICAgIHZhciB0cmlnZ2VyID0gZS5kZWxlZ2F0ZVRhcmdldCB8fCBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgICB2YXIgYWN0aW9uID0gdGhpcy5hY3Rpb24odHJpZ2dlcikgfHwgJ2NvcHknO1xuICAgICAgdmFyIHRleHQgPSBhY3Rpb25zX2RlZmF1bHQoe1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmNvbnRhaW5lcixcbiAgICAgICAgdGFyZ2V0OiB0aGlzLnRhcmdldCh0cmlnZ2VyKSxcbiAgICAgICAgdGV4dDogdGhpcy50ZXh0KHRyaWdnZXIpXG4gICAgICB9KTsgLy8gRmlyZXMgYW4gZXZlbnQgYmFzZWQgb24gdGhlIGNvcHkgb3BlcmF0aW9uIHJlc3VsdC5cblxuICAgICAgdGhpcy5lbWl0KHRleHQgPyAnc3VjY2VzcycgOiAnZXJyb3InLCB7XG4gICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyLFxuICAgICAgICBjbGVhclNlbGVjdGlvbjogZnVuY3Rpb24gY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgICAgICAgIHRyaWdnZXIuZm9jdXMoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGBhY3Rpb25gIGxvb2t1cCBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRyaWdnZXJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImRlZmF1bHRBY3Rpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVmYXVsdEFjdGlvbih0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gZ2V0QXR0cmlidXRlVmFsdWUoJ2FjdGlvbicsIHRyaWdnZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGB0YXJnZXRgIGxvb2t1cCBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRyaWdnZXJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImRlZmF1bHRUYXJnZXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVmYXVsdFRhcmdldCh0cmlnZ2VyKSB7XG4gICAgICB2YXIgc2VsZWN0b3IgPSBnZXRBdHRyaWJ1dGVWYWx1ZSgndGFyZ2V0JywgdHJpZ2dlcik7XG5cbiAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsbG93IGZpcmUgcHJvZ3JhbW1hdGljYWxseSBhIGNvcHkgYWN0aW9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR9IHRhcmdldFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybnMgVGV4dCBjb3BpZWQuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJkZWZhdWx0VGV4dFwiLFxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBgdGV4dGAgbG9va3VwIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdHJpZ2dlclxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWZhdWx0VGV4dCh0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gZ2V0QXR0cmlidXRlVmFsdWUoJ3RleHQnLCB0cmlnZ2VyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVzdHJveSBsaWZlY3ljbGUuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJkZXN0cm95XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJjb3B5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvcHkodGFyZ2V0KSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge1xuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmJvZHlcbiAgICAgIH07XG4gICAgICByZXR1cm4gYWN0aW9uc19jb3B5KHRhcmdldCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsbG93IGZpcmUgcHJvZ3JhbW1hdGljYWxseSBhIGN1dCBhY3Rpb25cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudH0gdGFyZ2V0XG4gICAgICogQHJldHVybnMgVGV4dCBjdXR0ZWQuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJjdXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3V0KHRhcmdldCkge1xuICAgICAgcmV0dXJuIGFjdGlvbnNfY3V0KHRhcmdldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHN1cHBvcnQgb2YgdGhlIGdpdmVuIGFjdGlvbiwgb3IgYWxsIGFjdGlvbnMgaWYgbm8gYWN0aW9uIGlzXG4gICAgICogZ2l2ZW4uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFthY3Rpb25dXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJpc1N1cHBvcnRlZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc1N1cHBvcnRlZCgpIHtcbiAgICAgIHZhciBhY3Rpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFsnY29weScsICdjdXQnXTtcbiAgICAgIHZhciBhY3Rpb25zID0gdHlwZW9mIGFjdGlvbiA9PT0gJ3N0cmluZycgPyBbYWN0aW9uXSA6IGFjdGlvbjtcbiAgICAgIHZhciBzdXBwb3J0ID0gISFkb2N1bWVudC5xdWVyeUNvbW1hbmRTdXBwb3J0ZWQ7XG4gICAgICBhY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICBzdXBwb3J0ID0gc3VwcG9ydCAmJiAhIWRvY3VtZW50LnF1ZXJ5Q29tbWFuZFN1cHBvcnRlZChhY3Rpb24pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gc3VwcG9ydDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ2xpcGJvYXJkO1xufSgodGlueV9lbWl0dGVyX2RlZmF1bHQoKSkpO1xuXG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIHZhciBjbGlwYm9hcmQgPSAoQ2xpcGJvYXJkKTtcblxuLyoqKi8gfSksXG5cbi8qKiovIDgyODpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUpIHtcblxudmFyIERPQ1VNRU5UX05PREVfVFlQRSA9IDk7XG5cbi8qKlxuICogQSBwb2x5ZmlsbCBmb3IgRWxlbWVudC5tYXRjaGVzKClcbiAqL1xuaWYgKHR5cGVvZiBFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiAhRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xuICAgIHZhciBwcm90byA9IEVsZW1lbnQucHJvdG90eXBlO1xuXG4gICAgcHJvdG8ubWF0Y2hlcyA9IHByb3RvLm1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgICAgICAgICBwcm90by5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvdG8ubXNNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvdG8ub01hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgICAgICAgICBwcm90by53ZWJraXRNYXRjaGVzU2VsZWN0b3I7XG59XG5cbi8qKlxuICogRmluZHMgdGhlIGNsb3Nlc3QgcGFyZW50IHRoYXQgbWF0Y2hlcyBhIHNlbGVjdG9yLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gY2xvc2VzdCAoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICB3aGlsZSAoZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVUeXBlICE9PSBET0NVTUVOVF9OT0RFX1RZUEUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50Lm1hdGNoZXMgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgICAgIGVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9zZXN0O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyA0Mzg6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBfX3VudXNlZF93ZWJwYWNrX2V4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGNsb3Nlc3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgyOCk7XG5cbi8qKlxuICogRGVsZWdhdGVzIGV2ZW50IHRvIGEgc2VsZWN0b3IuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHBhcmFtIHtCb29sZWFufSB1c2VDYXB0dXJlXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIF9kZWxlZ2F0ZShlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcbiAgICB2YXIgbGlzdGVuZXJGbiA9IGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lckZuLCB1c2VDYXB0dXJlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBEZWxlZ2F0ZXMgZXZlbnQgdG8gYSBzZWxlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR8U3RyaW5nfEFycmF5fSBbZWxlbWVudHNdXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHBhcmFtIHtCb29sZWFufSB1c2VDYXB0dXJlXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGRlbGVnYXRlKGVsZW1lbnRzLCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcbiAgICAvLyBIYW5kbGUgdGhlIHJlZ3VsYXIgRWxlbWVudCB1c2FnZVxuICAgIGlmICh0eXBlb2YgZWxlbWVudHMuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gX2RlbGVnYXRlLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIEVsZW1lbnQtbGVzcyB1c2FnZSwgaXQgZGVmYXVsdHMgdG8gZ2xvYmFsIGRlbGVnYXRpb25cbiAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gVXNlIGBkb2N1bWVudGAgYXMgdGhlIGZpcnN0IHBhcmFtZXRlciwgdGhlbiBhcHBseSBhcmd1bWVudHNcbiAgICAgICAgLy8gVGhpcyBpcyBhIHNob3J0IHdheSB0byAudW5zaGlmdCBgYXJndW1lbnRzYCB3aXRob3V0IHJ1bm5pbmcgaW50byBkZW9wdGltaXphdGlvbnNcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZS5iaW5kKG51bGwsIGRvY3VtZW50KS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBTZWxlY3Rvci1iYXNlZCB1c2FnZVxuICAgIGlmICh0eXBlb2YgZWxlbWVudHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIEFycmF5LWxpa2UgYmFzZWQgdXNhZ2VcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gX2RlbGVnYXRlKGVsZW1lbnQsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogRmluZHMgY2xvc2VzdCBtYXRjaCBhbmQgaW52b2tlcyBjYWxsYmFjay5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gbGlzdGVuZXIoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5kZWxlZ2F0ZVRhcmdldCA9IGNsb3Nlc3QoZS50YXJnZXQsIHNlbGVjdG9yKTtcblxuICAgICAgICBpZiAoZS5kZWxlZ2F0ZVRhcmdldCkge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChlbGVtZW50LCBlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWxlZ2F0ZTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gODc5OlxuLyoqKi8gKGZ1bmN0aW9uKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBleHBvcnRzKSB7XG5cbi8qKlxuICogQ2hlY2sgaWYgYXJndW1lbnQgaXMgYSBIVE1MIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnRzLm5vZGUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICYmIHZhbHVlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAgICAgJiYgdmFsdWUubm9kZVR5cGUgPT09IDE7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGFyZ3VtZW50IGlzIGEgbGlzdCBvZiBIVE1MIGVsZW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0cy5ub2RlTGlzdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuXG4gICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgJiYgKHR5cGUgPT09ICdbb2JqZWN0IE5vZGVMaXN0XScgfHwgdHlwZSA9PT0gJ1tvYmplY3QgSFRNTENvbGxlY3Rpb25dJylcbiAgICAgICAgJiYgKCdsZW5ndGgnIGluIHZhbHVlKVxuICAgICAgICAmJiAodmFsdWUubGVuZ3RoID09PSAwIHx8IGV4cG9ydHMubm9kZSh2YWx1ZVswXSkpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBhcmd1bWVudCBpcyBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydHMuc3RyaW5nID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJ1xuICAgICAgICB8fCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZztcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYXJndW1lbnQgaXMgYSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydHMuZm4gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcblxuICAgIHJldHVybiB0eXBlID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gMzcwOlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBpcyA9IF9fd2VicGFja19yZXF1aXJlX18oODc5KTtcbnZhciBkZWxlZ2F0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oNDM4KTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgYWxsIHBhcmFtcyBhbmQgY2FsbHMgdGhlIHJpZ2h0XG4gKiBsaXN0ZW5lciBmdW5jdGlvbiBiYXNlZCBvbiBpdHMgdGFyZ2V0IHR5cGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR8SFRNTENvbGxlY3Rpb258Tm9kZUxpc3R9IHRhcmdldFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGxpc3Rlbih0YXJnZXQsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0YXJnZXQgJiYgIXR5cGUgJiYgIWNhbGxiYWNrKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyByZXF1aXJlZCBhcmd1bWVudHMnKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzLnN0cmluZyh0eXBlKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTZWNvbmQgYXJndW1lbnQgbXVzdCBiZSBhIFN0cmluZycpO1xuICAgIH1cblxuICAgIGlmICghaXMuZm4oY2FsbGJhY2spKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoaXJkIGFyZ3VtZW50IG11c3QgYmUgYSBGdW5jdGlvbicpO1xuICAgIH1cblxuICAgIGlmIChpcy5ub2RlKHRhcmdldCkpIHtcbiAgICAgICAgcmV0dXJuIGxpc3Rlbk5vZGUodGFyZ2V0LCB0eXBlLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzLm5vZGVMaXN0KHRhcmdldCkpIHtcbiAgICAgICAgcmV0dXJuIGxpc3Rlbk5vZGVMaXN0KHRhcmdldCwgdHlwZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIGlmIChpcy5zdHJpbmcodGFyZ2V0KSkge1xuICAgICAgICByZXR1cm4gbGlzdGVuU2VsZWN0b3IodGFyZ2V0LCB0eXBlLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgU3RyaW5nLCBIVE1MRWxlbWVudCwgSFRNTENvbGxlY3Rpb24sIG9yIE5vZGVMaXN0Jyk7XG4gICAgfVxufVxuXG4vKipcbiAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgdG8gYSBIVE1MIGVsZW1lbnRcbiAqIGFuZCByZXR1cm5zIGEgcmVtb3ZlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ob2RlKG5vZGUsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gYSBsaXN0IG9mIEhUTUwgZWxlbWVudHNcbiAqIGFuZCByZXR1cm5zIGEgcmVtb3ZlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Tm9kZUxpc3R8SFRNTENvbGxlY3Rpb259IG5vZGVMaXN0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gbGlzdGVuTm9kZUxpc3Qobm9kZUxpc3QsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChub2RlTGlzdCwgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2spO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5vZGVMaXN0LCBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byBhIHNlbGVjdG9yXG4gKiBhbmQgcmV0dXJucyBhIHJlbW92ZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBsaXN0ZW5TZWxlY3RvcihzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gZGVsZWdhdGUoZG9jdW1lbnQuYm9keSwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0ZW47XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIDgxNzpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUpIHtcblxuZnVuY3Rpb24gc2VsZWN0KGVsZW1lbnQpIHtcbiAgICB2YXIgc2VsZWN0ZWRUZXh0O1xuXG4gICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICBzZWxlY3RlZFRleHQgPSBlbGVtZW50LnZhbHVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSU5QVVQnIHx8IGVsZW1lbnQubm9kZU5hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgdmFyIGlzUmVhZE9ubHkgPSBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgncmVhZG9ubHknKTtcblxuICAgICAgICBpZiAoIWlzUmVhZE9ubHkpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdyZWFkb25seScsICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuc2VsZWN0KCk7XG4gICAgICAgIGVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgZWxlbWVudC52YWx1ZS5sZW5ndGgpO1xuXG4gICAgICAgIGlmICghaXNSZWFkT25seSkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3JlYWRvbmx5Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxlY3RlZFRleHQgPSBlbGVtZW50LnZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnKSkge1xuICAgICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcblxuICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoZWxlbWVudCk7XG4gICAgICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgc2VsZWN0aW9uLmFkZFJhbmdlKHJhbmdlKTtcblxuICAgICAgICBzZWxlY3RlZFRleHQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZWN0ZWRUZXh0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbGVjdDtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gMjc5OlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSkge1xuXG5mdW5jdGlvbiBFICgpIHtcbiAgLy8gS2VlcCB0aGlzIGVtcHR5IHNvIGl0J3MgZWFzaWVyIHRvIGluaGVyaXQgZnJvbVxuICAvLyAodmlhIGh0dHBzOi8vZ2l0aHViLmNvbS9saXBzbWFjayBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvaXNzdWVzLzMpXG59XG5cbkUucHJvdG90eXBlID0ge1xuICBvbjogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgZSA9IHRoaXMuZSB8fCAodGhpcy5lID0ge30pO1xuXG4gICAgKGVbbmFtZV0gfHwgKGVbbmFtZV0gPSBbXSkpLnB1c2goe1xuICAgICAgZm46IGNhbGxiYWNrLFxuICAgICAgY3R4OiBjdHhcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9uY2U6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGxpc3RlbmVyICgpIHtcbiAgICAgIHNlbGYub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIuXyA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMub24obmFtZSwgbGlzdGVuZXIsIGN0eCk7XG4gIH0sXG5cbiAgZW1pdDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZGF0YSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICB2YXIgZXZ0QXJyID0gKCh0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KSlbbmFtZV0gfHwgW10pLnNsaWNlKCk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsZW4gPSBldnRBcnIubGVuZ3RoO1xuXG4gICAgZm9yIChpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGV2dEFycltpXS5mbi5hcHBseShldnRBcnJbaV0uY3R4LCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvZmY6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG4gICAgdmFyIGV2dHMgPSBlW25hbWVdO1xuICAgIHZhciBsaXZlRXZlbnRzID0gW107XG5cbiAgICBpZiAoZXZ0cyAmJiBjYWxsYmFjaykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV2dHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGV2dHNbaV0uZm4gIT09IGNhbGxiYWNrICYmIGV2dHNbaV0uZm4uXyAhPT0gY2FsbGJhY2spXG4gICAgICAgICAgbGl2ZUV2ZW50cy5wdXNoKGV2dHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBldmVudCBmcm9tIHF1ZXVlIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtcbiAgICAvLyBTdWdnZXN0ZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2xhemRcbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvY29tbWl0L2M2ZWJmYWE5YmM5NzNiMzNkMTEwYTg0YTMwNzc0MmI3Y2Y5NGM5NTMjY29tbWl0Y29tbWVudC01MDI0OTEwXG5cbiAgICAobGl2ZUV2ZW50cy5sZW5ndGgpXG4gICAgICA/IGVbbmFtZV0gPSBsaXZlRXZlbnRzXG4gICAgICA6IGRlbGV0ZSBlW25hbWVdO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRTtcbm1vZHVsZS5leHBvcnRzLlRpbnlFbWl0dGVyID0gRTtcblxuXG4vKioqLyB9KVxuXG4vKioqKioqLyBcdH0pO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0ICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gXHRcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gXHRcdFx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovIFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuLyoqKioqKi8gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG4vKioqKioqLyBcdFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBtb2R1bGUgZXhwb3J0cyBtdXN0IGJlIHJldHVybmVkIGZyb20gcnVudGltZSBzbyBlbnRyeSBpbmxpbmluZyBpcyBkaXNhYmxlZFxuLyoqKioqKi8gXHQvLyBzdGFydHVwXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyg2ODYpO1xuLyoqKioqKi8gfSkoKVxuLmRlZmF1bHQ7XG59KTsiLCAiLy8gUHV0IHlvdXIgY3VzdG9tIEpTIGNvZGUgaGVyZVxuY29uc3QgZ2V0VGhlbWUgPSAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJykuZ2V0QXR0cmlidXRlKCdkYXRhLWJzLXRoZW1lJyk7XG5cbmNvbnN0IHVwZGF0ZUxvZ29zID0gKCkgPT4ge1xuICAgIGNvbnN0IHRoZW1lID0gZ2V0VGhlbWUoKTtcbiAgICBjb25zdCBsb2dvcyA9IHtcbiAgICAgICAgaGY6IHtcbiAgICAgICAgICAgIGxpZ2h0OiAnYXNzZXRzL2ltYWdlcy9sb2dvLWhmLWxpZ2h0LnBuZycsXG4gICAgICAgICAgICBkYXJrOiAnYXNzZXRzL2ltYWdlcy9sb2dvLWhmLWRhcmsucG5nJ1xuICAgICAgICB9LFxuICAgICAgICBlbnRhbHBpYzoge1xuICAgICAgICAgICAgbGlnaHQ6ICdhc3NldHMvaW1hZ2VzL2xvZ28tZW50YWxwaWMtbGlnaHQuanBnJyxcbiAgICAgICAgICAgIGRhcms6ICdhc3NldHMvaW1hZ2VzL2xvZ28tZW50YWxwaWMtZGFyay5wbmcnXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZi1sb2dvJykuc3JjID0gbG9nb3MuaGZbdGhlbWVdO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbnRhbHBpYy1sb2dvJykuc3JjID0gbG9nb3MuZW50YWxwaWNbdGhlbWVdO1xufTtcblxuKGFzeW5jICgpID0+IHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge30pO1xuICAgIHVwZGF0ZUxvZ29zKCk7XG59KSgpO1xuXG4iLCAiZnVuY3Rpb24gZShlKXtyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24obixyLHQpeyh0PW5ldyBYTUxIdHRwUmVxdWVzdCkub3BlbihcIkdFVFwiLGUsdC53aXRoQ3JlZGVudGlhbHM9ITApLHQub25sb2FkPWZ1bmN0aW9uKCl7MjAwPT09dC5zdGF0dXM/bigpOnIoKX0sdC5zZW5kKCl9KX12YXIgbixyPShuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpKS5yZWxMaXN0JiZuLnJlbExpc3Quc3VwcG9ydHMmJm4ucmVsTGlzdC5zdXBwb3J0cyhcInByZWZldGNoXCIpP2Z1bmN0aW9uKGUpe3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihuLHIsdCl7KHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIikpLnJlbD1cInByZWZldGNoXCIsdC5ocmVmPWUsdC5vbmxvYWQ9bix0Lm9uZXJyb3I9cixkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHQpfSl9OmUsdD13aW5kb3cucmVxdWVzdElkbGVDYWxsYmFja3x8ZnVuY3Rpb24oZSl7dmFyIG49RGF0ZS5ub3coKTtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe2Uoe2RpZFRpbWVvdXQ6ITEsdGltZVJlbWFpbmluZzpmdW5jdGlvbigpe3JldHVybiBNYXRoLm1heCgwLDUwLShEYXRlLm5vdygpLW4pKX19KX0sMSl9LG89bmV3IFNldCxpPW5ldyBTZXQsYz0hMTtmdW5jdGlvbiBhKGUpe2lmKGUpe2lmKGUuc2F2ZURhdGEpcmV0dXJuIG5ldyBFcnJvcihcIlNhdmUtRGF0YSBpcyBlbmFibGVkXCIpO2lmKC8yZy8udGVzdChlLmVmZmVjdGl2ZVR5cGUpKXJldHVybiBuZXcgRXJyb3IoXCJuZXR3b3JrIGNvbmRpdGlvbnMgYXJlIHBvb3JcIil9cmV0dXJuITB9ZnVuY3Rpb24gdShlKXtpZihlfHwoZT17fSksd2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyKXt2YXIgbj1mdW5jdGlvbihlKXtlPWV8fDE7dmFyIG49W10scj0wO2Z1bmN0aW9uIHQoKXtyPGUmJm4ubGVuZ3RoPjAmJihuLnNoaWZ0KCkoKSxyKyspfXJldHVybltmdW5jdGlvbihlKXtuLnB1c2goZSk+MXx8dCgpfSxmdW5jdGlvbigpe3ItLSx0KCl9XX0oZS50aHJvdHRsZXx8MS8wKSxyPW5bMF0sYT1uWzFdLHU9ZS5saW1pdHx8MS8wLGw9ZS5vcmlnaW5zfHxbbG9jYXRpb24uaG9zdG5hbWVdLGQ9ZS5pZ25vcmVzfHxbXSxoPWUuZGVsYXl8fDAscD1bXSxtPWUudGltZW91dEZufHx0LHc9XCJmdW5jdGlvblwiPT10eXBlb2YgZS5ocmVmRm4mJmUuaHJlZkZuLGc9ZS5wcmVyZW5kZXJ8fCExO2M9ZS5wcmVyZW5kZXJBbmRQcmVmZXRjaHx8ITE7dmFyIHY9bmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG4pe24uZm9yRWFjaChmdW5jdGlvbihuKXtpZihuLmlzSW50ZXJzZWN0aW5nKXAucHVzaCgobj1uLnRhcmdldCkuaHJlZiksZnVuY3Rpb24oZSxuKXtuP3NldFRpbWVvdXQoZSxuKTplKCl9KGZ1bmN0aW9uKCl7LTEhPT1wLmluZGV4T2Yobi5ocmVmKSYmKHYudW5vYnNlcnZlKG4pLChjfHxnKSYmaS5zaXplPDE/Zih3P3cobik6bi5ocmVmKS5jYXRjaChmdW5jdGlvbihuKXtpZighZS5vbkVycm9yKXRocm93IG47ZS5vbkVycm9yKG4pfSk6by5zaXplPHUmJiFnJiZyKGZ1bmN0aW9uKCl7cyh3P3cobik6bi5ocmVmLGUucHJpb3JpdHkpLnRoZW4oYSkuY2F0Y2goZnVuY3Rpb24obil7YSgpLGUub25FcnJvciYmZS5vbkVycm9yKG4pfSl9KSl9LGgpO2Vsc2V7dmFyIHQ9cC5pbmRleE9mKChuPW4udGFyZ2V0KS5ocmVmKTt0Pi0xJiZwLnNwbGljZSh0KX19KX0se3RocmVzaG9sZDplLnRocmVzaG9sZHx8MH0pO3JldHVybiBtKGZ1bmN0aW9uKCl7KGUuZWx8fGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKFwiYVwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2wubGVuZ3RoJiYhbC5pbmNsdWRlcyhlLmhvc3RuYW1lKXx8ZnVuY3Rpb24gZShuLHIpe3JldHVybiBBcnJheS5pc0FycmF5KHIpP3Iuc29tZShmdW5jdGlvbihyKXtyZXR1cm4gZShuLHIpfSk6KHIudGVzdHx8cikuY2FsbChyLG4uaHJlZixuKX0oZSxkKXx8di5vYnNlcnZlKGUpfSl9LHt0aW1lb3V0OmUudGltZW91dHx8MmUzfSksZnVuY3Rpb24oKXtvLmNsZWFyKCksdi5kaXNjb25uZWN0KCl9fX1mdW5jdGlvbiBzKG4sdCx1KXt2YXIgcz1hKG5hdmlnYXRvci5jb25uZWN0aW9uKTtyZXR1cm4gcyBpbnN0YW5jZW9mIEVycm9yP1Byb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkNhbm5vdCBwcmVmZXRjaCwgXCIrcy5tZXNzYWdlKSk6KGkuc2l6ZT4wJiYhYyYmY29uc29sZS53YXJuKFwiW1dhcm5pbmddIFlvdSBhcmUgdXNpbmcgYm90aCBwcmVmZXRjaGluZyBhbmQgcHJlcmVuZGVyaW5nIG9uIHRoZSBzYW1lIGRvY3VtZW50XCIpLFByb21pc2UuYWxsKFtdLmNvbmNhdChuKS5tYXAoZnVuY3Rpb24obil7aWYoIW8uaGFzKG4pKXJldHVybiBvLmFkZChuKSwodD9mdW5jdGlvbihuKXtyZXR1cm4gd2luZG93LmZldGNoP2ZldGNoKG4se2NyZWRlbnRpYWxzOlwiaW5jbHVkZVwifSk6ZShuKX06cikobmV3IFVSTChuLGxvY2F0aW9uLmhyZWYpLnRvU3RyaW5nKCkpfSkpKX1mdW5jdGlvbiBmKGUsbil7dmFyIHI9YShuYXZpZ2F0b3IuY29ubmVjdGlvbik7aWYociBpbnN0YW5jZW9mIEVycm9yKXJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJDYW5ub3QgcHJlcmVuZGVyLCBcIityLm1lc3NhZ2UpKTtpZighSFRNTFNjcmlwdEVsZW1lbnQuc3VwcG9ydHMoXCJzcGVjdWxhdGlvbnJ1bGVzXCIpKXJldHVybiBzKGUpLFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlRoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBzcGVjdWxhdGlvbiBydWxlcyBBUEkuIEZhbGxpbmcgYmFjayB0byBwcmVmZXRjaC5cIikpO2lmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdFt0eXBlPVwic3BlY3VsYXRpb25ydWxlc1wiXScpKXJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJTcGVjdWxhdGlvbiBSdWxlcyBpcyBhbHJlYWR5IGRlZmluZWQgYW5kIGNhbm5vdCBiZSBhbHRlcmVkLlwiKSk7Zm9yKHZhciB0PTAsdT1bXS5jb25jYXQoZSk7dDx1Lmxlbmd0aDt0Kz0xKXt2YXIgZj11W3RdO2lmKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4hPT1uZXcgVVJMKGYsd2luZG93LmxvY2F0aW9uLmhyZWYpLm9yaWdpbilyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiT25seSBzYW1lIG9yaWdpbiBVUkxzIGFyZSBhbGxvd2VkOiBcIitmKSk7aS5hZGQoZil9by5zaXplPjAmJiFjJiZjb25zb2xlLndhcm4oXCJbV2FybmluZ10gWW91IGFyZSB1c2luZyBib3RoIHByZWZldGNoaW5nIGFuZCBwcmVyZW5kZXJpbmcgb24gdGhlIHNhbWUgZG9jdW1lbnRcIik7dmFyIGw9ZnVuY3Rpb24oZSl7dmFyIG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtuLnR5cGU9XCJzcGVjdWxhdGlvbnJ1bGVzXCIsbi50ZXh0PSd7XCJwcmVyZW5kZXJcIjpbe1wic291cmNlXCI6IFwibGlzdFwiLFwidXJsc1wiOiBbXCInK0FycmF5LmZyb20oZSkuam9pbignXCIsXCInKSsnXCJdfV19Jzt0cnl7ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChuKX1jYXRjaChlKXtyZXR1cm4gZX1yZXR1cm4hMH0oaSk7cmV0dXJuITA9PT1sP1Byb21pc2UucmVzb2x2ZSgpOlByb21pc2UucmVqZWN0KGwpfWV4cG9ydHt1IGFzIGxpc3RlbixzIGFzIHByZWZldGNoLGYgYXMgcHJlcmVuZGVyfTtcbiIsICIvLyBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lTGFicy9xdWlja2xpbmtcclxuaW1wb3J0IHsgbGlzdGVuIH0gZnJvbSAncXVpY2tsaW5rL2Rpc3QvcXVpY2tsaW5rLm1qcyc7XHJcbmxpc3Rlbih7XHJcbiAgICBpZ25vcmVzOiBbXHJcbiAgICAgICAgL1xcL2FwaVxcLz8vLFxyXG4gICAgICAgIHVyaSA9PiB1cmkuaW5jbHVkZXMoJy56aXAnKSxcclxuICAgICAgICAodXJpLCBlbGVtKSA9PiBlbGVtLmhhc0F0dHJpYnV0ZSgnbm9wcmVmZXRjaCcpLFxyXG4gICAgICAgICh1cmksIGVsZW0pID0+IGVsZW0uaGFzaCAmJiBlbGVtLnBhdGhuYW1lID09PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXHJcbiAgICBdXHJcbn0pO1xyXG5cclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FGYXJrYXMvbGF6eXNpemVzL3RyZWUvZ2gtcGFnZXMvcGx1Z2lucy9uYXRpdmUtbG9hZGluZ1xyXG5pbXBvcnQgbGF6eVNpemVzIGZyb20gJ2xhenlzaXplcyc7XHJcbmltcG9ydCAnbGF6eXNpemVzL3BsdWdpbnMvbmF0aXZlLWxvYWRpbmcvbHMubmF0aXZlLWxvYWRpbmcnO1xyXG5cclxubGF6eVNpemVzLmNmZy5uYXRpdmVMb2FkaW5nID0ge1xyXG4gICAgc2V0TG9hZGluZ0F0dHJpYnV0ZTogdHJ1ZSxcclxuICAgIGRpc2FibGVMaXN0ZW5lcnM6IHtcclxuICAgICAgICBzY3JvbGw6IHRydWVcclxuICAgIH1cclxufTtcclxuIiwgIi8qIVxyXG4gKiBjbGlwYm9hcmQuanMgZm9yIEJvb3RzdHJhcCBiYXNlZCBUaHVsaXRlIHNpdGVzXHJcbiAqIENvcHlyaWdodCAyMDIxLTIwMjQgVGh1bGl0ZVxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQgQ2xpcGJvYXJkIGZyb20gJ2NsaXBib2FyZCc7XHJcblxyXG4oKCkgPT4ge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBjYiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hpZ2hsaWdodCcpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2IubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IGNiW2ldO1xyXG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgJzxkaXYgY2xhc3M9XCJjb3B5XCI+PGJ1dHRvbiB0aXRsZT1cIkNvcHkgdG8gY2xpcGJvYXJkXCIgY2xhc3M9XCJidG4tY29weVwiIGFyaWEtbGFiZWw9XCJDbGlwYm9hcmQgYnV0dG9uXCI+PGRpdj48L2Rpdj48L2J1dHRvbj48L2Rpdj4nKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2xpcGJvYXJkID0gbmV3IENsaXBib2FyZCgnLmJ0bi1jb3B5Jywge1xyXG4gICAgICAgIHRhcmdldDogZnVuY3Rpb24gKHRyaWdnZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRyaWdnZXIucGFyZW50Tm9kZS5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY2xpcGJvYXJkLm9uKCdzdWNjZXNzJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvKlxyXG4gICAgICBjb25zb2xlLmluZm8oJ0FjdGlvbjonLCBlLmFjdGlvbik7XHJcbiAgICAgIGNvbnNvbGUuaW5mbygnVGV4dDonLCBlLnRleHQpO1xyXG4gICAgICBjb25zb2xlLmluZm8oJ1RyaWdnZXI6JywgZS50cmlnZ2VyKTtcclxuICAgICAgKi9cclxuXHJcbiAgICAgICAgZS5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2xpcGJvYXJkLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignQWN0aW9uOicsIGUuYWN0aW9uKTtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdUcmlnZ2VyOicsIGUudHJpZ2dlcik7XHJcbiAgICB9KTtcclxufSkoKTtcclxuIiwgImNvbnN0IHRvcEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b1RvcCcpO1xyXG5cclxuaWYgKHRvcEJ1dHRvbiAhPT0gbnVsbCkge1xyXG4gICAgdG9wQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhZGUnKTtcclxuICAgIHdpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzY3JvbGxGdW5jdGlvbigpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0b3BCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b3BGdW5jdGlvbik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNjcm9sbEZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID4gMjcwIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPiAyNzApIHtcclxuICAgICAgICB0b3BCdXR0b24uY2xhc3NMaXN0LmFkZCgnZmFkZScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0b3BCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnZmFkZScpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0b3BGdW5jdGlvbigpIHtcclxuICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwO1xyXG59XHJcbiIsICIvLyBCYXNlZCBvbjogaHR0cHM6Ly9naXRodWIuY29tL2dvaHVnb2lvL2h1Z29Eb2NzL2Jsb2IvbWFzdGVyL192ZW5kb3IvZ2l0aHViLmNvbS9nb2h1Z29pby9nb2h1Z29pb1RoZW1lL2Fzc2V0cy9qcy90YWJzLmpzXHJcblxyXG4vKipcclxuICogU2NyaXB0cyB3aGljaCBtYW5hZ2VzIENvZGUgVG9nZ2xlIHRhYnMuXHJcbiAqL1xyXG52YXIgaTtcclxuLy8gc3RvcmUgdGFicyB2YXJpYWJsZVxyXG52YXIgYWxsVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvZ2dsZS10YWJdJyk7XHJcbnZhciBhbGxQYW5lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBhbmVdJyk7XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVUYWJzKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgY2xpY2tlZFRhYiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgdmFyIHRhcmdldEtleSA9IGNsaWNrZWRUYWIuZ2V0QXR0cmlidXRlKCdkYXRhLXRvZ2dsZS10YWInKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHRhcmdldEtleSA9IGV2ZW50O1xyXG4gICAgfVxyXG4gICAgLy8gV2Ugc3RvcmUgdGhlIGNvbmZpZyBsYW5ndWFnZSBzZWxlY3RlZCBpbiB1c2VycycgbG9jYWxTdG9yYWdlXHJcbiAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29uZmlnTGFuZ1ByZWYnLCB0YXJnZXRLZXkpO1xyXG4gICAgfVxyXG4gICAgdmFyIHNlbGVjdGVkVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvZ2dsZS10YWI9JyArIHRhcmdldEtleSArICddJyk7XHJcbiAgICB2YXIgc2VsZWN0ZWRQYW5lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBhbmU9JyArIHRhcmdldEtleSArICddJyk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxUYWJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYWxsVGFic1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICBhbGxQYW5lc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdGVkVGFicy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHNlbGVjdGVkVGFic1tpXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBzZWxlY3RlZFBhbmVzW2ldLmNsYXNzTGlzdC5hZGQoJ3Nob3cnLCAnYWN0aXZlJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZvciAoaSA9IDA7IGkgPCBhbGxUYWJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBhbGxUYWJzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlVGFicyk7XHJcbn1cclxuLy8gVXBvbiBwYWdlIGxvYWQsIGlmIHVzZXIgaGFzIGEgcHJlZmVycmVkIGxhbmd1YWdlIGluIGl0cyBsb2NhbFN0b3JhZ2UsIHRhYnMgYXJlIHNldCB0byBpdC5cclxuaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29uZmlnTGFuZ1ByZWYnKSkge1xyXG4gICAgdG9nZ2xlVGFicyh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NvbmZpZ0xhbmdQcmVmJykpO1xyXG59XHJcbiIsICIvLyBhcHAuanMgZm9yIGNvbmNhdGVuYXRpb24gb2Ygc21hbGxlciBsaWJyYXJpZXMgdG8gcmVkdWNlIEhUVFAgcmVxdWVzdHNcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gaW1wb3J0IGNvcmUuanNcclxuaW1wb3J0ICdAdGh1bGl0ZS9jb3JlL2Fzc2V0cy9qcy9jb3JlLmpzJztcclxuXHJcbi8vIEltcG9ydCBjbGlwYm9hcmQuanNcclxuaW1wb3J0ICdqcy9jbGlwYm9hcmQuanMnO1xyXG5cclxuLy8gSW1wb3J0IHRvLXRvcC5qc1xyXG5pbXBvcnQgJ2pzL3RvLXRvcC5qcyc7XHJcblxyXG4vLyBJbXBvcnQgdGFicy5qc1xyXG5pbXBvcnQgJ2pzL3RhYnMuanMnO1xyXG5cclxuLy8gSW1wb3J0IGN1c3RvbS5qc1xyXG5pbXBvcnQgJ2pzL2N1c3RvbS5qcyc7XHJcblxyXG4vKlxyXG5pbXBvcnQgKiBhcyBwYXJhbXMgZnJvbSAnQHBhcmFtcyc7XHJcblxyXG5pZiAocGFyYW1zLmVudiA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gIGNvbnNvbGUubG9nKCdIdWdvIGRldmVsb3BtZW50IGVudmlyb25tZW50JylcclxufSBlbHNlIHtcclxuICBjb25zb2xlLmxvZygnSHVnbyBwcm9kdWN0aW9uIGVudmlyb25tZW50Jylc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QUFpQixzQkFBc0IsWUFBWSxHQUFHO0FBQ2xGLFFBQUksZ0JBQWdCLFNBQVMsaUJBQWlCLGdCQUFnQixZQUFZLEdBQUc7QUFFN0UsYUFBU0EsS0FBSSxHQUFHQSxLQUFJLFFBQVEsUUFBUUEsTUFBSztBQUNyQyxjQUFRQSxFQUFDLEVBQUUsVUFBVSxPQUFPLFFBQVE7QUFDcEMsZUFBU0EsRUFBQyxFQUFFLFVBQVUsT0FBTyxRQUFRO0FBQUEsSUFDekM7QUFFQSxhQUFTQSxLQUFJLEdBQUdBLEtBQUksYUFBYSxRQUFRQSxNQUFLO0FBQzFDLG1CQUFhQSxFQUFDLEVBQUUsVUFBVSxJQUFJLFFBQVE7QUFDdEMsb0JBQWNBLEVBQUMsRUFBRSxVQUFVLElBQUksUUFBUSxRQUFRO0FBQUEsSUFDbkQ7QUFBQSxFQUNKO0FBRUEsT0FBS0EsS0FBSSxHQUFHQSxLQUFJLFFBQVEsUUFBUUEsTUFBSztBQUNqQyxZQUFRQSxFQUFDLEVBQUUsaUJBQWlCLFNBQVMsVUFBVTtBQUFBLEVBQ25EO0FBRUEsTUFBSSxPQUFPLGFBQWEsUUFBUSxnQkFBZ0IsR0FBRztBQUMvQyxlQUFXLE9BQU8sYUFBYSxRQUFRLGdCQUFnQixDQUFDO0FBQUEsRUFDNUQ7OztBQzFCQSxzQkFBTzsiLAogICJuYW1lcyI6IFsid2luZG93IiwgImxhenlTaXplcyIsICJkb2N1bWVudCIsICJEYXRlIiwgInNldFRpbWVvdXQiLCAiZSIsICJpIiwgImxvYWRNb2RlIiwgIndpbmRvdyIsICJkb2N1bWVudCIsICJsYXp5U2l6ZXMiLCAiZSIsICJfX3dlYnBhY2tfcmVxdWlyZV9fIiwgIkNsaXBib2FyZEFjdGlvbkN1dCIsICJmYWtlQ29weUFjdGlvbiIsICJDbGlwYm9hcmRBY3Rpb25Db3B5IiwgIl90eXBlb2YiLCAib2JqIiwgIkNsaXBib2FyZEFjdGlvbkRlZmF1bHQiLCAiaSIsICJvIiwgIl9zZXRQcm90b3R5cGVPZiIsICJwIiwgImUiLCAiX2dldFByb3RvdHlwZU9mIiwgIkNsaXBib2FyZCIsICJhY3Rpb24iLCAibW9kdWxlIiwgImV4cG9ydHMiLCAiZSIsICJuIiwgInIiLCAidCIsICJhIiwgInUiLCAicyIsICJmIiwgImxhenlTaXplcyIsICJpIiwgIkNsaXBib2FyZCIsICJlIiwgImkiXQp9Cg==
