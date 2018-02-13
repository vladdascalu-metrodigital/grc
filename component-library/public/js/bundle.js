(function () {
'use strict';

if(typeof global === "undefined" && typeof window !== "undefined") {
	window.global = window;
}

<<<<<<< HEAD
var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function installCustomElements(window, polyfill) {var
    document = window.document,
    Object = window.Object;
  var htmlClass = (function (info) {
    var
      catchClass = /^[A-Z]+[a-z]/,
      filterBy = function (re) {
        var arr = [], tag;
        for (tag in register) {
          if (re.test(tag)) arr.push(tag);
        }
        return arr;
      },
      add = function (Class, tag) {
        tag = tag.toLowerCase();
        if (!(tag in register)) {
          register[Class] = (register[Class] || []).concat(tag);
          register[tag] = (register[tag.toUpperCase()] = Class);
        }
      },
      register = (Object.create || Object)(null),
      htmlClass = {},
      i, section, tags, Class;
    for (section in info) {
      for (Class in info[section]) {
        tags = info[section][Class];
        register[Class] = tags;
        for (i = 0; i < tags.length; i++) {
          register[tags[i].toLowerCase()] =
          register[tags[i].toUpperCase()] = Class;
        }
      }
    }
    htmlClass.get = function get(tagOrClass) {
      return typeof tagOrClass === 'string' ?
        (register[tagOrClass] || (catchClass.test(tagOrClass) ? [] : '')) :
        filterBy(tagOrClass);
    };
    htmlClass.set = function set(tag, Class) {
      return catchClass.test(tag) ?
        add(tag, Class) :
        add(Class, tag), htmlClass;
    };
    return htmlClass;
  }({
    "collections": {
      "HTMLAllCollection": [
        "all"
      ],
      "HTMLCollection": [
        "forms"
      ],
      "HTMLFormControlsCollection": [
        "elements"
      ],
      "HTMLOptionsCollection": [
        "options"
      ]
    },
    "elements": {
      "Element": [
        "element"
      ],
      "HTMLAnchorElement": [
        "a"
      ],
      "HTMLAppletElement": [
        "applet"
      ],
      "HTMLAreaElement": [
        "area"
      ],
      "HTMLAttachmentElement": [
        "attachment"
      ],
      "HTMLAudioElement": [
        "audio"
      ],
      "HTMLBRElement": [
        "br"
      ],
      "HTMLBaseElement": [
        "base"
      ],
      "HTMLBodyElement": [
        "body"
      ],
      "HTMLButtonElement": [
        "button"
      ],
      "HTMLCanvasElement": [
        "canvas"
      ],
      "HTMLContentElement": [
        "content"
      ],
      "HTMLDListElement": [
        "dl"
      ],
      "HTMLDataElement": [
        "data"
      ],
      "HTMLDataListElement": [
        "datalist"
      ],
      "HTMLDetailsElement": [
        "details"
      ],
      "HTMLDialogElement": [
        "dialog"
      ],
      "HTMLDirectoryElement": [
        "dir"
      ],
      "HTMLDivElement": [
        "div"
      ],
      "HTMLDocument": [
        "document"
      ],
      "HTMLElement": [
        "element",
        "abbr",
        "address",
        "article",
        "aside",
        "b",
        "bdi",
        "bdo",
        "cite",
        "code",
        "command",
        "dd",
        "dfn",
        "dt",
        "em",
        "figcaption",
        "figure",
        "footer",
        "header",
        "i",
        "kbd",
        "mark",
        "nav",
        "noscript",
        "rp",
        "rt",
        "ruby",
        "s",
        "samp",
        "section",
        "small",
        "strong",
        "sub",
        "summary",
        "sup",
        "u",
        "var",
        "wbr"
      ],
      "HTMLEmbedElement": [
        "embed"
      ],
      "HTMLFieldSetElement": [
        "fieldset"
      ],
      "HTMLFontElement": [
        "font"
      ],
      "HTMLFormElement": [
        "form"
      ],
      "HTMLFrameElement": [
        "frame"
      ],
      "HTMLFrameSetElement": [
        "frameset"
      ],
      "HTMLHRElement": [
        "hr"
      ],
      "HTMLHeadElement": [
        "head"
      ],
      "HTMLHeadingElement": [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6"
      ],
      "HTMLHtmlElement": [
        "html"
      ],
      "HTMLIFrameElement": [
        "iframe"
      ],
      "HTMLImageElement": [
        "img"
      ],
      "HTMLInputElement": [
        "input"
      ],
      "HTMLKeygenElement": [
        "keygen"
      ],
      "HTMLLIElement": [
        "li"
      ],
      "HTMLLabelElement": [
        "label"
      ],
      "HTMLLegendElement": [
        "legend"
      ],
      "HTMLLinkElement": [
        "link"
      ],
      "HTMLMapElement": [
        "map"
      ],
      "HTMLMarqueeElement": [
        "marquee"
      ],
      "HTMLMediaElement": [
        "media"
      ],
      "HTMLMenuElement": [
        "menu"
      ],
      "HTMLMenuItemElement": [
        "menuitem"
      ],
      "HTMLMetaElement": [
        "meta"
      ],
      "HTMLMeterElement": [
        "meter"
      ],
      "HTMLModElement": [
        "del",
        "ins"
      ],
      "HTMLOListElement": [
        "ol"
      ],
      "HTMLObjectElement": [
        "object"
      ],
      "HTMLOptGroupElement": [
        "optgroup"
      ],
      "HTMLOptionElement": [
        "option"
      ],
      "HTMLOutputElement": [
        "output"
      ],
      "HTMLParagraphElement": [
        "p"
      ],
      "HTMLParamElement": [
        "param"
      ],
      "HTMLPictureElement": [
        "picture"
      ],
      "HTMLPreElement": [
        "pre"
      ],
      "HTMLProgressElement": [
        "progress"
      ],
      "HTMLQuoteElement": [
        "blockquote",
        "q",
        "quote"
      ],
      "HTMLScriptElement": [
        "script"
      ],
      "HTMLSelectElement": [
        "select"
      ],
      "HTMLShadowElement": [
        "shadow"
      ],
      "HTMLSlotElement": [
        "slot"
      ],
      "HTMLSourceElement": [
        "source"
      ],
      "HTMLSpanElement": [
        "span"
      ],
      "HTMLStyleElement": [
        "style"
      ],
      "HTMLTableCaptionElement": [
        "caption"
      ],
      "HTMLTableCellElement": [
        "td",
        "th"
      ],
      "HTMLTableColElement": [
        "col",
        "colgroup"
      ],
      "HTMLTableElement": [
        "table"
      ],
      "HTMLTableRowElement": [
        "tr"
      ],
      "HTMLTableSectionElement": [
        "thead",
        "tbody",
        "tfoot"
      ],
      "HTMLTemplateElement": [
        "template"
      ],
      "HTMLTextAreaElement": [
        "textarea"
      ],
      "HTMLTimeElement": [
        "time"
      ],
      "HTMLTitleElement": [
        "title"
      ],
      "HTMLTrackElement": [
        "track"
      ],
      "HTMLUListElement": [
        "ul"
      ],
      "HTMLUnknownElement": [
        "unknown",
        "vhgroupv",
        "vkeygen"
      ],
      "HTMLVideoElement": [
        "video"
      ]
    },
    "nodes": {
      "Attr": [
        "node"
      ],
      "Audio": [
        "audio"
      ],
      "CDATASection": [
        "node"
      ],
      "CharacterData": [
        "node"
      ],
      "Comment": [
        "#comment"
      ],
      "Document": [
        "#document"
      ],
      "DocumentFragment": [
        "#document-fragment"
      ],
      "DocumentType": [
        "node"
      ],
      "HTMLDocument": [
        "#document"
      ],
      "Image": [
        "img"
      ],
      "Option": [
        "option"
      ],
      "ProcessingInstruction": [
        "node"
      ],
      "ShadowRoot": [
        "#shadow-root"
      ],
      "Text": [
        "#text"
      ],
      "XMLDocument": [
        "xml"
      ]
    }
  }));
  if (typeof polyfill !== 'object') polyfill = {type: polyfill || 'auto'};
  var
    REGISTER_ELEMENT = 'registerElement',
    EXPANDO_UID = '__' + REGISTER_ELEMENT + (window.Math.random() * 10e4 >> 0),
    ADD_EVENT_LISTENER = 'addEventListener',
    ATTACHED = 'attached',
    CALLBACK = 'Callback',
    DETACHED = 'detached',
    EXTENDS = 'extends',
    ATTRIBUTE_CHANGED_CALLBACK = 'attributeChanged' + CALLBACK,
    ATTACHED_CALLBACK = ATTACHED + CALLBACK,
    CONNECTED_CALLBACK = 'connected' + CALLBACK,
    DISCONNECTED_CALLBACK = 'disconnected' + CALLBACK,
    CREATED_CALLBACK = 'created' + CALLBACK,
    DETACHED_CALLBACK = DETACHED + CALLBACK,
    ADDITION = 'ADDITION',
    MODIFICATION = 'MODIFICATION',
    REMOVAL = 'REMOVAL',
    DOM_ATTR_MODIFIED = 'DOMAttrModified',
    DOM_CONTENT_LOADED = 'DOMContentLoaded',
    DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified',
    PREFIX_TAG = '<',
    PREFIX_IS = '=',
    validName = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
    invalidNames = [
      'ANNOTATION-XML',
      'COLOR-PROFILE',
      'FONT-FACE',
      'FONT-FACE-SRC',
      'FONT-FACE-URI',
      'FONT-FACE-FORMAT',
      'FONT-FACE-NAME',
      'MISSING-GLYPH'
    ],
    types = [],
    protos = [],
    query = '',
    documentElement = document.documentElement,
    indexOf = types.indexOf || function (v) {
      for(var i = this.length; i-- && this[i] !== v;){}
      return i;
    },
    OP = Object.prototype,
    hOP = OP.hasOwnProperty,
    iPO = OP.isPrototypeOf,
    defineProperty = Object.defineProperty,
    empty = [],
    gOPD = Object.getOwnPropertyDescriptor,
    gOPN = Object.getOwnPropertyNames,
    gPO = Object.getPrototypeOf,
    sPO = Object.setPrototypeOf,
    hasProto = !!Object.__proto__,
    fixGetClass = false,
    DRECEV1 = '__dreCEv1',
    customElements = window.customElements,
    usableCustomElements = !/^force/.test(polyfill.type) && !!(
      customElements &&
      customElements.define &&
      customElements.get &&
      customElements.whenDefined
    ),
    Dict = Object.create || Object,
    Map = window.Map || function Map() {
      var K = [], V = [], i;
      return {
        get: function (k) {
          return V[indexOf.call(K, k)];
        },
        set: function (k, v) {
          i = indexOf.call(K, k);
          if (i < 0) V[K.push(k) - 1] = v;
          else V[i] = v;
        }
      };
    },
    Promise = window.Promise || function (fn) {
      var
        notify = [],
        done = false,
        p = {
          'catch': function () {
            return p;
          },
          'then': function (cb) {
            notify.push(cb);
            if (done) setTimeout(resolve, 1);
            return p;
          }
        };
      function resolve(value) {
        done = true;
        while (notify.length) notify.shift()(value);
      }
      fn(resolve);
      return p;
    },
    justCreated = false,
    constructors = Dict(null),
    waitingList = Dict(null),
    nodeNames = new Map(),
    secondArgument = function (is) {
      return is.toLowerCase();
    },
    create = Object.create || function Bridge(proto) {
      return proto ? (Bridge.prototype = proto, new Bridge()) : this;
    },
    setPrototype = sPO || (
      hasProto ?
        function (o, p) {
          o.__proto__ = p;
          return o;
        } : (
      (gOPN && gOPD) ?
        (function(){
          function setProperties(o, p) {
            for (var
              key,
              names = gOPN(p),
              i = 0, length = names.length;
              i < length; i++
            ) {
              key = names[i];
              if (!hOP.call(o, key)) {
                defineProperty(o, key, gOPD(p, key));
              }
            }
          }
          return function (o, p) {
            do {
              setProperties(o, p);
            } while ((p = gPO(p)) && !iPO.call(p, o));
            return o;
          };
        }()) :
        function (o, p) {
          for (var key in p) {
            o[key] = p[key];
          }
          return o;
        }
    )),
    MutationObserver = window.MutationObserver ||
                       window.WebKitMutationObserver,
    HTMLElementPrototype = (
      window.HTMLElement ||
      window.Element ||
      window.Node
    ).prototype,
    IE8 = !iPO.call(HTMLElementPrototype, documentElement),
    safeProperty = IE8 ? function (o, k, d) {
      o[k] = d.value;
      return o;
    } : defineProperty,
    isValidNode = IE8 ?
      function (node) {
        return node.nodeType === 1;
      } :
      function (node) {
        return iPO.call(HTMLElementPrototype, node);
      },
    targets = IE8 && [],
    attachShadow = HTMLElementPrototype.attachShadow,
    cloneNode = HTMLElementPrototype.cloneNode,
    dispatchEvent = HTMLElementPrototype.dispatchEvent,
    getAttribute = HTMLElementPrototype.getAttribute,
    hasAttribute = HTMLElementPrototype.hasAttribute,
    removeAttribute = HTMLElementPrototype.removeAttribute,
    setAttribute = HTMLElementPrototype.setAttribute,
    createElement = document.createElement,
    patchedCreateElement = createElement,
    attributesObserver = MutationObserver && {
      attributes: true,
      characterData: true,
      attributeOldValue: true
    },
    DOMAttrModified = MutationObserver || function(e) {
      doesNotSupportDOMAttrModified = false;
      documentElement.removeEventListener(
        DOM_ATTR_MODIFIED,
        DOMAttrModified
      );
    },
    asapQueue,
    asapTimer = 0,
    V0 = REGISTER_ELEMENT in document &&
         !/^force-all/.test(polyfill.type),
    setListener = true,
    justSetup = false,
    doesNotSupportDOMAttrModified = true,
    dropDomContentLoaded = true,
    notFromInnerHTMLHelper = true,
    onSubtreeModified,
    callDOMAttrModified,
    getAttributesMirror,
    observer,
    observe,
    patchIfNotAlready,
    patch;
  if (!V0) {
    if (sPO || hasProto) {
        patchIfNotAlready = function (node, proto) {
          if (!iPO.call(proto, node)) {
            setupNode(node, proto);
          }
        };
        patch = setupNode;
    } else {
        patchIfNotAlready = function (node, proto) {
          if (!node[EXPANDO_UID]) {
            node[EXPANDO_UID] = Object(true);
            setupNode(node, proto);
          }
        };
        patch = patchIfNotAlready;
    }
    if (IE8) {
      doesNotSupportDOMAttrModified = false;
      (function (){
        var
          descriptor = gOPD(HTMLElementPrototype, ADD_EVENT_LISTENER),
          addEventListener = descriptor.value,
          patchedRemoveAttribute = function (name) {
            var e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
            e.attrName = name;
            e.prevValue = getAttribute.call(this, name);
            e.newValue = null;
            e[REMOVAL] = e.attrChange = 2;
            removeAttribute.call(this, name);
            dispatchEvent.call(this, e);
          },
          patchedSetAttribute = function (name, value) {
            var
              had = hasAttribute.call(this, name),
              old = had && getAttribute.call(this, name),
              e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
            setAttribute.call(this, name, value);
            e.attrName = name;
            e.prevValue = had ? old : null;
            e.newValue = value;
            if (had) {
              e[MODIFICATION] = e.attrChange = 1;
            } else {
              e[ADDITION] = e.attrChange = 0;
            }
            dispatchEvent.call(this, e);
          },
          onPropertyChange = function (e) {
            var
              node = e.currentTarget,
              superSecret = node[EXPANDO_UID],
              propertyName = e.propertyName,
              event;
            if (superSecret.hasOwnProperty(propertyName)) {
              superSecret = superSecret[propertyName];
              event = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
              event.attrName = superSecret.name;
              event.prevValue = superSecret.value || null;
              event.newValue = (superSecret.value = node[propertyName] || null);
              if (event.prevValue == null) {
                event[ADDITION] = event.attrChange = 0;
              } else {
                event[MODIFICATION] = event.attrChange = 1;
              }
              dispatchEvent.call(node, event);
            }
          };
        descriptor.value = function (type, handler, capture) {
          if (
            type === DOM_ATTR_MODIFIED &&
            this[ATTRIBUTE_CHANGED_CALLBACK] &&
            this.setAttribute !== patchedSetAttribute
          ) {
            this[EXPANDO_UID] = {
              className: {
                name: 'class',
                value: this.className
              }
            };
            this.setAttribute = patchedSetAttribute;
            this.removeAttribute = patchedRemoveAttribute;
            addEventListener.call(this, 'propertychange', onPropertyChange);
          }
          addEventListener.call(this, type, handler, capture);
        };
        defineProperty(HTMLElementPrototype, ADD_EVENT_LISTENER, descriptor);
      }());
    } else if (!MutationObserver) {
      documentElement[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, DOMAttrModified);
      documentElement.setAttribute(EXPANDO_UID, 1);
      documentElement.removeAttribute(EXPANDO_UID);
      if (doesNotSupportDOMAttrModified) {
        onSubtreeModified = function (e) {
          var
            node = this,
            oldAttributes,
            newAttributes,
            key;
          if (node === e.target) {
            oldAttributes = node[EXPANDO_UID];
            node[EXPANDO_UID] = (newAttributes = getAttributesMirror(node));
            for (key in newAttributes) {
              if (!(key in oldAttributes)) {
                return callDOMAttrModified(
                  0,
                  node,
                  key,
                  oldAttributes[key],
                  newAttributes[key],
                  ADDITION
                );
              } else if (newAttributes[key] !== oldAttributes[key]) {
                return callDOMAttrModified(
                  1,
                  node,
                  key,
                  oldAttributes[key],
                  newAttributes[key],
                  MODIFICATION
                );
              }
            }
            for (key in oldAttributes) {
              if (!(key in newAttributes)) {
                return callDOMAttrModified(
                  2,
                  node,
                  key,
                  oldAttributes[key],
                  newAttributes[key],
                  REMOVAL
                );
              }
            }
          }
        };
        callDOMAttrModified = function (
          attrChange,
          currentTarget,
          attrName,
          prevValue,
          newValue,
          action
        ) {
          var e = {
            attrChange: attrChange,
            currentTarget: currentTarget,
            attrName: attrName,
            prevValue: prevValue,
            newValue: newValue
          };
          e[action] = attrChange;
          onDOMAttrModified(e);
        };
        getAttributesMirror = function (node) {
          for (var
            attr, name,
            result = {},
            attributes = node.attributes,
            i = 0, length = attributes.length;
            i < length; i++
          ) {
            attr = attributes[i];
            name = attr.name;
            if (name !== 'setAttribute') {
              result[name] = attr.value;
            }
          }
          return result;
        };
      }
    }
    document[REGISTER_ELEMENT] = function registerElement(type, options) {
      upperType = type.toUpperCase();
      if (setListener) {
        setListener = false;
        if (MutationObserver) {
          observer = (function(attached, detached){
            function checkEmAll(list, callback) {
              for (var i = 0, length = list.length; i < length; callback(list[i++])){}
            }
            return new MutationObserver(function (records) {
              for (var
                current, node, newValue,
                i = 0, length = records.length; i < length; i++
              ) {
                current = records[i];
                if (current.type === 'childList') {
                  checkEmAll(current.addedNodes, attached);
                  checkEmAll(current.removedNodes, detached);
                } else {
                  node = current.target;
                  if (notFromInnerHTMLHelper &&
                      node[ATTRIBUTE_CHANGED_CALLBACK] &&
                      current.attributeName !== 'style') {
                    newValue = getAttribute.call(node, current.attributeName);
                    if (newValue !== current.oldValue) {
                      node[ATTRIBUTE_CHANGED_CALLBACK](
                        current.attributeName,
                        current.oldValue,
                        newValue
                      );
                    }
                  }
                }
              }
            });
          }(executeAction(ATTACHED), executeAction(DETACHED)));
          observe = function (node) {
            observer.observe(
              node,
              {
                childList: true,
                subtree: true
              }
            );
            return node;
          };
          observe(document);
          if (attachShadow) {
            HTMLElementPrototype.attachShadow = function () {
              return observe(attachShadow.apply(this, arguments));
            };
          }
        } else {
          asapQueue = [];
          document[ADD_EVENT_LISTENER]('DOMNodeInserted', onDOMNode(ATTACHED));
          document[ADD_EVENT_LISTENER]('DOMNodeRemoved', onDOMNode(DETACHED));
        }
        document[ADD_EVENT_LISTENER](DOM_CONTENT_LOADED, onReadyStateChange);
        document[ADD_EVENT_LISTENER]('readystatechange', onReadyStateChange);
        HTMLElementPrototype.cloneNode = function (deep) {
          var
            node = cloneNode.call(this, !!deep),
            i = getTypeIndex(node);
          if (-1 < i) patch(node, protos[i]);
          if (deep && query.length) loopAndSetup(node.querySelectorAll(query));
          return node;
        };
      }
      if (justSetup) return (justSetup = false);
      if (-2 < (
        indexOf.call(types, PREFIX_IS + upperType) +
        indexOf.call(types, PREFIX_TAG + upperType)
      )) {
        throwTypeError(type);
      }
      if (!validName.test(upperType) || -1 < indexOf.call(invalidNames, upperType)) {
        throw new Error('The type ' + type + ' is invalid');
      }
      var
        constructor = function () {
          return extending ?
            document.createElement(nodeName, upperType) :
            document.createElement(nodeName);
        },
        opt = options || OP,
        extending = hOP.call(opt, EXTENDS),
        nodeName = extending ? options[EXTENDS].toUpperCase() : upperType,
        upperType,
        i;
      if (extending && -1 < (
        indexOf.call(types, PREFIX_TAG + nodeName)
      )) {
        throwTypeError(nodeName);
      }
      i = types.push((extending ? PREFIX_IS : PREFIX_TAG) + upperType) - 1;
      query = query.concat(
        query.length ? ',' : '',
        extending ? nodeName + '[is="' + type.toLowerCase() + '"]' : nodeName
      );
      constructor.prototype = (
        protos[i] = hOP.call(opt, 'prototype') ?
          opt.prototype :
          create(HTMLElementPrototype)
      );
      if (query.length) loopAndVerify(
        document.querySelectorAll(query),
        ATTACHED
      );
      return constructor;
    };
    document.createElement = (patchedCreateElement = function (localName, typeExtension) {
      var
        is = getIs(typeExtension),
        node = is ?
          createElement.call(document, localName, secondArgument(is)) :
          createElement.call(document, localName),
        name = '' + localName,
        i = indexOf.call(
          types,
          (is ? PREFIX_IS : PREFIX_TAG) +
          (is || name).toUpperCase()
        ),
        setup = -1 < i;
      if (is) {
        node.setAttribute('is', is = is.toLowerCase());
        if (setup) {
          setup = isInQSA(name.toUpperCase(), is);
        }
      }
      notFromInnerHTMLHelper = !document.createElement.innerHTMLHelper;
      if (setup) patch(node, protos[i]);
      return node;
    });
  }
  function ASAP() {
    var queue = asapQueue.splice(0, asapQueue.length);
    asapTimer = 0;
    while (queue.length) {
      queue.shift().call(
        null, queue.shift()
      );
    }
  }
  function loopAndVerify(list, action) {
    for (var i = 0, length = list.length; i < length; i++) {
      verifyAndSetupAndAction(list[i], action);
    }
  }
  function loopAndSetup(list) {
    for (var i = 0, length = list.length, node; i < length; i++) {
      node = list[i];
      patch(node, protos[getTypeIndex(node)]);
    }
  }
  function executeAction(action) {
    return function (node) {
      if (isValidNode(node)) {
        verifyAndSetupAndAction(node, action);
        if (query.length) loopAndVerify(
          node.querySelectorAll(query),
          action
        );
      }
    };
  }
  function getTypeIndex(target) {
    var
      is = getAttribute.call(target, 'is'),
      nodeName = target.nodeName.toUpperCase(),
      i = indexOf.call(
        types,
        is ?
            PREFIX_IS + is.toUpperCase() :
            PREFIX_TAG + nodeName
      );
    return is && -1 < i && !isInQSA(nodeName, is) ? -1 : i;
  }
  function isInQSA(name, type) {
    return -1 < query.indexOf(name + '[is="' + type + '"]');
  }
  function onDOMAttrModified(e) {
    var
      node = e.currentTarget,
      attrChange = e.attrChange,
      attrName = e.attrName,
      target = e.target,
      addition = e[ADDITION] || 2,
      removal = e[REMOVAL] || 3;
    if (notFromInnerHTMLHelper &&
        (!target || target === node) &&
        node[ATTRIBUTE_CHANGED_CALLBACK] &&
        attrName !== 'style' && (
          e.prevValue !== e.newValue ||
          e.newValue === '' && (
            attrChange === addition ||
            attrChange === removal
          )
    )) {
      node[ATTRIBUTE_CHANGED_CALLBACK](
        attrName,
        attrChange === addition ? null : e.prevValue,
        attrChange === removal ? null : e.newValue
      );
    }
  }
  function onDOMNode(action) {
    var executor = executeAction(action);
    return function (e) {
      asapQueue.push(executor, e.target);
      if (asapTimer) clearTimeout(asapTimer);
      asapTimer = setTimeout(ASAP, 1);
    };
  }
  function onReadyStateChange(e) {
    if (dropDomContentLoaded) {
      dropDomContentLoaded = false;
      e.currentTarget.removeEventListener(DOM_CONTENT_LOADED, onReadyStateChange);
    }
    if (query.length) loopAndVerify(
      (e.target || document).querySelectorAll(query),
      e.detail === DETACHED ? DETACHED : ATTACHED
    );
    if (IE8) purge();
  }
  function patchedSetAttribute(name, value) {
    var self = this;
    setAttribute.call(self, name, value);
    onSubtreeModified.call(self, {target: self});
  }
  function setupNode(node, proto) {
    setPrototype(node, proto);
    if (observer) {
      observer.observe(node, attributesObserver);
    } else {
      if (doesNotSupportDOMAttrModified) {
        node.setAttribute = patchedSetAttribute;
        node[EXPANDO_UID] = getAttributesMirror(node);
        node[ADD_EVENT_LISTENER](DOM_SUBTREE_MODIFIED, onSubtreeModified);
      }
      node[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, onDOMAttrModified);
    }
    if (node[CREATED_CALLBACK] && notFromInnerHTMLHelper) {
      node.created = true;
      node[CREATED_CALLBACK]();
      node.created = false;
    }
  }
  function purge() {
    for (var
      node,
      i = 0,
      length = targets.length;
      i < length; i++
    ) {
      node = targets[i];
      if (!documentElement.contains(node)) {
        length--;
        targets.splice(i--, 1);
        verifyAndSetupAndAction(node, DETACHED);
      }
    }
  }
  function throwTypeError(type) {
    throw new Error('A ' + type + ' type is already registered');
  }
  function verifyAndSetupAndAction(node, action) {
    var
      fn,
      i = getTypeIndex(node),
      counterAction;
    if (-1 < i) {
      patchIfNotAlready(node, protos[i]);
      i = 0;
      if (action === ATTACHED && !node[ATTACHED]) {
        node[DETACHED] = false;
        node[ATTACHED] = true;
        counterAction = 'connected';
        i = 1;
        if (IE8 && indexOf.call(targets, node) < 0) {
          targets.push(node);
        }
      } else if (action === DETACHED && !node[DETACHED]) {
        node[ATTACHED] = false;
        node[DETACHED] = true;
        counterAction = 'disconnected';
        i = 1;
      }
      if (i && (fn = (
        node[action + CALLBACK] ||
        node[counterAction + CALLBACK]
      ))) fn.call(node);
    }
  }
  function CustomElementRegistry() {}
  CustomElementRegistry.prototype = {
    constructor: CustomElementRegistry,
    define: usableCustomElements ?
      function (name, Class, options) {
        if (options) {
          CERDefine(name, Class, options);
        } else {
          var NAME = name.toUpperCase();
          constructors[NAME] = {
            constructor: Class,
            create: [NAME]
          };
          nodeNames.set(Class, NAME);
          customElements.define(name, Class);
        }
      } :
      CERDefine,
    get: usableCustomElements ?
      function (name) {
        return customElements.get(name) || get(name);
      } :
      get,
    whenDefined: usableCustomElements ?
      function (name) {
        return Promise.race([
          customElements.whenDefined(name),
          whenDefined(name)
        ]);
      } :
      whenDefined
  };
  function CERDefine(name, Class, options) {
    var
      is = options && options[EXTENDS] || '',
      CProto = Class.prototype,
      proto = create(CProto),
      attributes = Class.observedAttributes || empty,
      definition = {prototype: proto};
    safeProperty(proto, CREATED_CALLBACK, {
        value: function () {
          if (justCreated) justCreated = false;
          else if (!this[DRECEV1]) {
            this[DRECEV1] = true;
            new Class(this);
            if (CProto[CREATED_CALLBACK])
              CProto[CREATED_CALLBACK].call(this);
            var info = constructors[nodeNames.get(Class)];
            if (!usableCustomElements || info.create.length > 1) {
              notifyAttributes(this);
            }
          }
      }
    });
    safeProperty(proto, ATTRIBUTE_CHANGED_CALLBACK, {
      value: function (name) {
        if (-1 < indexOf.call(attributes, name))
          CProto[ATTRIBUTE_CHANGED_CALLBACK].apply(this, arguments);
      }
    });
    if (CProto[CONNECTED_CALLBACK]) {
      safeProperty(proto, ATTACHED_CALLBACK, {
        value: CProto[CONNECTED_CALLBACK]
      });
    }
    if (CProto[DISCONNECTED_CALLBACK]) {
      safeProperty(proto, DETACHED_CALLBACK, {
        value: CProto[DISCONNECTED_CALLBACK]
      });
    }
    if (is) definition[EXTENDS] = is;
    name = name.toUpperCase();
    constructors[name] = {
      constructor: Class,
      create: is ? [is, secondArgument(name)] : [name]
    };
    nodeNames.set(Class, name);
    document[REGISTER_ELEMENT](name.toLowerCase(), definition);
    whenDefined(name);
    waitingList[name].r();
  }
  function get(name) {
    var info = constructors[name.toUpperCase()];
    return info && info.constructor;
  }
  function getIs(options) {
    return typeof options === 'string' ?
        options : (options && options.is || '');
  }
  function notifyAttributes(self) {
    var
      callback = self[ATTRIBUTE_CHANGED_CALLBACK],
      attributes = callback ? self.attributes : empty,
      i = attributes.length,
      attribute;
    while (i--) {
      attribute =  attributes[i];
      callback.call(
        self,
        attribute.name || attribute.nodeName,
        null,
        attribute.value || attribute.nodeValue
      );
    }
  }
  function whenDefined(name) {
    name = name.toUpperCase();
    if (!(name in waitingList)) {
      waitingList[name] = {};
      waitingList[name].p = new Promise(function (resolve) {
        waitingList[name].r = resolve;
      });
    }
    return waitingList[name].p;
  }
  function polyfillV1() {
    if (customElements) delete window.customElements;
    defineProperty(window, 'customElements', {
      configurable: true,
      value: new CustomElementRegistry()
    });
    defineProperty(window, 'CustomElementRegistry', {
      configurable: true,
      value: CustomElementRegistry
    });
    for (var
      patchClass = function (name) {
        var Class = window[name];
        if (Class) {
          window[name] = function CustomElementsV1(self) {
            var info, isNative;
            if (!self) self = this;
            if (!self[DRECEV1]) {
              justCreated = true;
              info = constructors[nodeNames.get(self.constructor)];
              isNative = usableCustomElements && info.create.length === 1;
              self = isNative ?
                Reflect.construct(Class, empty, info.constructor) :
                document.createElement.apply(document, info.create);
              self[DRECEV1] = true;
              justCreated = false;
              if (!isNative) notifyAttributes(self);
            }
            return self;
          };
          window[name].prototype = Class.prototype;
          try {
            Class.prototype.constructor = window[name];
          } catch(WebKit) {
            defineProperty(Class, DRECEV1, {value: window[name]});
          }
        }
      },
      Classes = htmlClass.get(/^HTML[A-Z]*[a-z]/),
      i = Classes.length;
      i--;
      patchClass(Classes[i])
    ) {}
    (document.createElement = function (name, options) {
      var is = getIs(options);
      return is ?
        patchedCreateElement.call(this, name, secondArgument(is)) :
        patchedCreateElement.call(this, name);
    });
    if (!V0) {
      justSetup = true;
      document[REGISTER_ELEMENT]('');
    }
  }
  if (!customElements || /^force/.test(polyfill.type)) polyfillV1();
  else if(!polyfill.noBuiltIn) {
    try {
      (function (DRE, options, name) {
        options[EXTENDS] = 'a';
        DRE.prototype = create(HTMLAnchorElement.prototype);
        DRE.prototype.constructor = DRE;
        window.customElements.define(name, DRE, options);
        if (
          getAttribute.call(document.createElement('a', {is: name}), 'is') !== name ||
          (usableCustomElements && getAttribute.call(new DRE(), 'is') !== name)
        ) {
          throw options;
        }
      }(
        function DRE() {
          return Reflect.construct(HTMLAnchorElement, [], DRE);
        },
        {},
        'document-register-element-a'
      ));
    } catch(o_O) {
      polyfillV1();
    }
  }
  if(!polyfill.noBuiltIn) {
    try {
      createElement.call(document, 'a', 'a');
    } catch(FireFox) {
      secondArgument = function (is) {
        return {is: is.toLowerCase()};
      };
    }
  }
}
installCustomElements(commonjsGlobal);

class MrcDatetime extends HTMLElement {
    connectedCallback() {
        const utcTimestamp = this.textContent;
        if (utcTimestamp) {
            this.textContent = new Date(Date.parse(utcTimestamp)).toLocaleString();
        }
    }
}
customElements.define('mrc-datetime', MrcDatetime);

class MrcNumber extends HTMLElement {
    connectedCallback() {
        const number = this.textContent;
        if (!number) return;
        const options = {};
        const currency = this.getAttribute('data-currency');
        if (currency) {
            options.style = 'currency';
            options.currency = currency;
        }
        this.textContent = new Intl.NumberFormat(undefined, options).format(number);
    }
}
=======
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

(function (e, t) {
  function Ht() {
    var e = wt.splice(0, wt.length);Et = 0;while (e.length) {
      e.shift().call(null, e.shift());
    }
  }function Bt(e, t) {
    for (var n = 0, r = e.length; n < r; n++) {
      Jt(e[n], t);
    }
  }function jt(e) {
    for (var t = 0, n = e.length, r; t < n; t++) {
      r = e[t], Pt(r, A[It(r)]);
    }
  }function Ft(e) {
    return function (t) {
      ut(t) && (Jt(t, e), O.length && Bt(t.querySelectorAll(O), e));
    };
  }function It(e) {
    var t = ht.call(e, "is"),
        n = e.nodeName.toUpperCase(),
        r = _.call(L, t ? N + t.toUpperCase() : T + n);return t && -1 < r && !qt(n, t) ? -1 : r;
  }function qt(e, t) {
    return -1 < O.indexOf(e + '[is="' + t + '"]');
  }function Rt(e) {
    var t = e.currentTarget,
        n = e.attrChange,
        r = e.attrName,
        i = e.target,
        s = e[y] || 2,
        o = e[w] || 3;kt && (!i || i === t) && t[h] && r !== "style" && (e.prevValue !== e.newValue || e.newValue === "" && (n === s || n === o)) && t[h](r, n === s ? null : e.prevValue, n === o ? null : e.newValue);
  }function Ut(e) {
    var t = Ft(e);return function (e) {
      wt.push(t, e.target), Et && clearTimeout(Et), Et = setTimeout(Ht, 1);
    };
  }function zt(e) {
    Ct && (Ct = !1, e.currentTarget.removeEventListener(S, zt)), O.length && Bt((e.target || n).querySelectorAll(O), e.detail === l ? l : a), st && Vt();
  }function Wt(e, t) {
    var n = this;vt.call(n, e, t), Lt.call(n, { target: n });
  }function Xt(e, t) {
    nt(e, t), Mt ? Mt.observe(e, yt) : (Nt && (e.setAttribute = Wt, e[o] = Ot(e), e[u](x, Lt)), e[u](E, Rt)), e[m] && kt && (e.created = !0, e[m](), e.created = !1);
  }function Vt() {
    for (var e, t = 0, n = at.length; t < n; t++) {
      e = at[t], M.contains(e) || (n--, at.splice(t--, 1), Jt(e, l));
    }
  }function $t(e) {
    throw new Error("A " + e + " type is already registered");
  }function Jt(e, t) {
    var n,
        r = It(e),
        i;-1 < r && (Dt(e, A[r]), r = 0, t === a && !e[a] ? (e[l] = !1, e[a] = !0, i = "connected", r = 1, st && _.call(at, e) < 0 && at.push(e)) : t === l && !e[l] && (e[a] = !1, e[l] = !0, i = "disconnected", r = 1), r && (n = e[t + f] || e[i + f]) && n.call(e));
  }function Kt() {}function Qt(e, t, r) {
    var i = r && r[c] || "",
        o = t.prototype,
        u = tt(o),
        a = t.observedAttributes || j,
        f = { prototype: u };ot(u, m, { value: function value() {
        if (Q) Q = !1;else if (!this[W]) {
          this[W] = !0, new t(this), o[m] && o[m].call(this);var e = G[Z.get(t)];(!V || e.create.length > 1) && Zt(this);
        }
      } }), ot(u, h, { value: function value(e) {
        -1 < _.call(a, e) && o[h].apply(this, arguments);
      } }), o[d] && ot(u, p, { value: o[d] }), o[v] && ot(u, g, { value: o[v] }), i && (f[c] = i), e = e.toUpperCase(), G[e] = { constructor: t, create: i ? [i, et(e)] : [e] }, Z.set(t, e), n[s](e.toLowerCase(), f), en(e), Y[e].r();
  }function Gt(e) {
    var t = G[e.toUpperCase()];return t && t.constructor;
  }function Yt(e) {
    return typeof e == "string" ? e : e && e.is || "";
  }function Zt(e) {
    var t = e[h],
        n = t ? e.attributes : j,
        r = n.length,
        i;while (r--) {
      i = n[r], t.call(e, i.name || i.nodeName, null, i.value || i.nodeValue);
    }
  }function en(e) {
    return e = e.toUpperCase(), e in Y || (Y[e] = {}, Y[e].p = new K(function (t) {
      Y[e].r = t;
    })), Y[e].p;
  }function tn() {
    X && delete e.customElements, B(e, "customElements", { configurable: !0, value: new Kt() }), B(e, "CustomElementRegistry", { configurable: !0, value: Kt });for (var t = function t(_t2) {
      var r = e[_t2];if (r) {
        e[_t2] = function (t) {
          var i, s;return t || (t = this), t[W] || (Q = !0, i = G[Z.get(t.constructor)], s = V && i.create.length === 1, t = s ? Reflect.construct(r, j, i.constructor) : n.createElement.apply(n, i.create), t[W] = !0, Q = !1, s || Zt(t)), t;
        }, e[_t2].prototype = r.prototype;try {
          r.prototype.constructor = e[_t2];
        } catch (i) {
          B(r, W, { value: e[_t2] });
        }
      }
    }, r = i.get(/^HTML[A-Z]*[a-z]/), o = r.length; o--; t(r[o])) {}n.createElement = function (e, t) {
      var n = Yt(t);return n ? gt.call(this, e, et(n)) : gt.call(this, e);
    }, St || (Tt = !0, n[s](""));
  }var n = e.document,
      r = e.Object,
      i = function (e) {
    var t = /^[A-Z]+[a-z]/,
        n = function n(e) {
      var t = [],
          n;for (n in s) {
        e.test(n) && t.push(n);
      }return t;
    },
        i = function i(e, t) {
      t = t.toLowerCase(), t in s || (s[e] = (s[e] || []).concat(t), s[t] = s[t.toUpperCase()] = e);
    },
        s = (r.create || r)(null),
        o = {},
        u,
        a,
        f,
        l;for (a in e) {
      for (l in e[a]) {
        f = e[a][l], s[l] = f;for (u = 0; u < f.length; u++) {
          s[f[u].toLowerCase()] = s[f[u].toUpperCase()] = l;
        }
      }
    }return o.get = function (r) {
      return typeof r == "string" ? s[r] || (t.test(r) ? [] : "") : n(r);
    }, o.set = function (n, r) {
      return t.test(n) ? i(n, r) : i(r, n), o;
    }, o;
  }({ collections: { HTMLAllCollection: ["all"], HTMLCollection: ["forms"], HTMLFormControlsCollection: ["elements"], HTMLOptionsCollection: ["options"] }, elements: { Element: ["element"], HTMLAnchorElement: ["a"], HTMLAppletElement: ["applet"], HTMLAreaElement: ["area"], HTMLAttachmentElement: ["attachment"], HTMLAudioElement: ["audio"], HTMLBRElement: ["br"], HTMLBaseElement: ["base"], HTMLBodyElement: ["body"], HTMLButtonElement: ["button"], HTMLCanvasElement: ["canvas"], HTMLContentElement: ["content"], HTMLDListElement: ["dl"], HTMLDataElement: ["data"], HTMLDataListElement: ["datalist"], HTMLDetailsElement: ["details"], HTMLDialogElement: ["dialog"], HTMLDirectoryElement: ["dir"], HTMLDivElement: ["div"], HTMLDocument: ["document"], HTMLElement: ["element", "abbr", "address", "article", "aside", "b", "bdi", "bdo", "cite", "code", "command", "dd", "dfn", "dt", "em", "figcaption", "figure", "footer", "header", "i", "kbd", "mark", "nav", "noscript", "rp", "rt", "ruby", "s", "samp", "section", "small", "strong", "sub", "summary", "sup", "u", "var", "wbr"], HTMLEmbedElement: ["embed"], HTMLFieldSetElement: ["fieldset"], HTMLFontElement: ["font"], HTMLFormElement: ["form"], HTMLFrameElement: ["frame"], HTMLFrameSetElement: ["frameset"], HTMLHRElement: ["hr"], HTMLHeadElement: ["head"], HTMLHeadingElement: ["h1", "h2", "h3", "h4", "h5", "h6"], HTMLHtmlElement: ["html"], HTMLIFrameElement: ["iframe"], HTMLImageElement: ["img"], HTMLInputElement: ["input"], HTMLKeygenElement: ["keygen"], HTMLLIElement: ["li"], HTMLLabelElement: ["label"], HTMLLegendElement: ["legend"], HTMLLinkElement: ["link"], HTMLMapElement: ["map"], HTMLMarqueeElement: ["marquee"], HTMLMediaElement: ["media"], HTMLMenuElement: ["menu"], HTMLMenuItemElement: ["menuitem"], HTMLMetaElement: ["meta"], HTMLMeterElement: ["meter"], HTMLModElement: ["del", "ins"], HTMLOListElement: ["ol"], HTMLObjectElement: ["object"], HTMLOptGroupElement: ["optgroup"], HTMLOptionElement: ["option"], HTMLOutputElement: ["output"], HTMLParagraphElement: ["p"], HTMLParamElement: ["param"], HTMLPictureElement: ["picture"], HTMLPreElement: ["pre"], HTMLProgressElement: ["progress"], HTMLQuoteElement: ["blockquote", "q", "quote"], HTMLScriptElement: ["script"], HTMLSelectElement: ["select"], HTMLShadowElement: ["shadow"], HTMLSlotElement: ["slot"], HTMLSourceElement: ["source"], HTMLSpanElement: ["span"], HTMLStyleElement: ["style"], HTMLTableCaptionElement: ["caption"], HTMLTableCellElement: ["td", "th"], HTMLTableColElement: ["col", "colgroup"], HTMLTableElement: ["table"], HTMLTableRowElement: ["tr"], HTMLTableSectionElement: ["thead", "tbody", "tfoot"], HTMLTemplateElement: ["template"], HTMLTextAreaElement: ["textarea"], HTMLTimeElement: ["time"], HTMLTitleElement: ["title"], HTMLTrackElement: ["track"], HTMLUListElement: ["ul"], HTMLUnknownElement: ["unknown", "vhgroupv", "vkeygen"], HTMLVideoElement: ["video"] }, nodes: { Attr: ["node"], Audio: ["audio"], CDATASection: ["node"], CharacterData: ["node"], Comment: ["#comment"], Document: ["#document"], DocumentFragment: ["#document-fragment"], DocumentType: ["node"], HTMLDocument: ["#document"], Image: ["img"], Option: ["option"], ProcessingInstruction: ["node"], ShadowRoot: ["#shadow-root"], Text: ["#text"], XMLDocument: ["xml"] } });(typeof t === "undefined" ? "undefined" : _typeof(t)) != "object" && (t = { type: t || "auto" });var s = "registerElement",
      o = "__" + s + (e.Math.random() * 1e5 >> 0),
      u = "addEventListener",
      a = "attached",
      f = "Callback",
      l = "detached",
      c = "extends",
      h = "attributeChanged" + f,
      p = a + f,
      d = "connected" + f,
      v = "disconnected" + f,
      m = "created" + f,
      g = l + f,
      y = "ADDITION",
      b = "MODIFICATION",
      w = "REMOVAL",
      E = "DOMAttrModified",
      S = "DOMContentLoaded",
      x = "DOMSubtreeModified",
      T = "<",
      N = "=",
      C = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
      k = ["ANNOTATION-XML", "COLOR-PROFILE", "FONT-FACE", "FONT-FACE-SRC", "FONT-FACE-URI", "FONT-FACE-FORMAT", "FONT-FACE-NAME", "MISSING-GLYPH"],
      L = [],
      A = [],
      O = "",
      M = n.documentElement,
      _ = L.indexOf || function (e) {
    for (var t = this.length; t-- && this[t] !== e;) {}return t;
  },
      D = r.prototype,
      P = D.hasOwnProperty,
      H = D.isPrototypeOf,
      B = r.defineProperty,
      j = [],
      F = r.getOwnPropertyDescriptor,
      I = r.getOwnPropertyNames,
      q = r.getPrototypeOf,
      R = r.setPrototypeOf,
      U = !!r.__proto__,
      z = !1,
      W = "__dreCEv1",
      X = e.customElements,
      V = !/^force/.test(t.type) && !!(X && X.define && X.get && X.whenDefined),
      $ = r.create || r,
      J = e.Map || function () {
    var t = [],
        n = [],
        r;return { get: function get$$1(e) {
        return n[_.call(t, e)];
      }, set: function set$$1(e, i) {
        r = _.call(t, e), r < 0 ? n[t.push(e) - 1] = i : n[r] = i;
      } };
  },
      K = e.Promise || function (e) {
    function i(e) {
      n = !0;while (t.length) {
        t.shift()(e);
      }
    }var t = [],
        n = !1,
        r = { "catch": function _catch() {
        return r;
      }, then: function then(e) {
        return t.push(e), n && setTimeout(i, 1), r;
      } };return e(i), r;
  },
      Q = !1,
      G = $(null),
      Y = $(null),
      Z = new J(),
      et = function et(e) {
    return e.toLowerCase();
  },
      tt = r.create || function sn(e) {
    return e ? (sn.prototype = e, new sn()) : this;
  },
      nt = R || (U ? function (e, t) {
    return e.__proto__ = t, e;
  } : I && F ? function () {
    function e(e, t) {
      for (var n, r = I(t), i = 0, s = r.length; i < s; i++) {
        n = r[i], P.call(e, n) || B(e, n, F(t, n));
      }
    }return function (t, n) {
      do {
        e(t, n);
      } while ((n = q(n)) && !H.call(n, t));return t;
    };
  }() : function (e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }),
      rt = e.MutationObserver || e.WebKitMutationObserver,
      it = (e.HTMLElement || e.Element || e.Node).prototype,
      st = !H.call(it, M),
      ot = st ? function (e, t, n) {
    return e[t] = n.value, e;
  } : B,
      ut = st ? function (e) {
    return e.nodeType === 1;
  } : function (e) {
    return H.call(it, e);
  },
      at = st && [],
      ft = it.attachShadow,
      lt = it.cloneNode,
      ct = it.dispatchEvent,
      ht = it.getAttribute,
      pt = it.hasAttribute,
      dt = it.removeAttribute,
      vt = it.setAttribute,
      mt = n.createElement,
      gt = mt,
      yt = rt && { attributes: !0, characterData: !0, attributeOldValue: !0 },
      bt = rt || function (e) {
    Nt = !1, M.removeEventListener(E, bt);
  },
      wt,
      Et = 0,
      St = s in n && !/^force-all/.test(t.type),
      xt = !0,
      Tt = !1,
      Nt = !0,
      Ct = !0,
      kt = !0,
      Lt,
      At,
      Ot,
      Mt,
      _t,
      Dt,
      Pt;St || (R || U ? (Dt = function Dt(e, t) {
    H.call(t, e) || Xt(e, t);
  }, Pt = Xt) : (Dt = function Dt(e, t) {
    e[o] || (e[o] = r(!0), Xt(e, t));
  }, Pt = Dt), st ? (Nt = !1, function () {
    var e = F(it, u),
        t = e.value,
        n = function n(e) {
      var t = new CustomEvent(E, { bubbles: !0 });t.attrName = e, t.prevValue = ht.call(this, e), t.newValue = null, t[w] = t.attrChange = 2, dt.call(this, e), ct.call(this, t);
    },
        r = function r(e, t) {
      var n = pt.call(this, e),
          r = n && ht.call(this, e),
          i = new CustomEvent(E, { bubbles: !0 });vt.call(this, e, t), i.attrName = e, i.prevValue = n ? r : null, i.newValue = t, n ? i[b] = i.attrChange = 1 : i[y] = i.attrChange = 0, ct.call(this, i);
    },
        i = function i(e) {
      var t = e.currentTarget,
          n = t[o],
          r = e.propertyName,
          i;n.hasOwnProperty(r) && (n = n[r], i = new CustomEvent(E, { bubbles: !0 }), i.attrName = n.name, i.prevValue = n.value || null, i.newValue = n.value = t[r] || null, i.prevValue == null ? i[y] = i.attrChange = 0 : i[b] = i.attrChange = 1, ct.call(t, i));
    };e.value = function (e, s, u) {
      e === E && this[h] && this.setAttribute !== r && (this[o] = { className: { name: "class", value: this.className } }, this.setAttribute = r, this.removeAttribute = n, t.call(this, "propertychange", i)), t.call(this, e, s, u);
    }, B(it, u, e);
  }()) : rt || (M[u](E, bt), M.setAttribute(o, 1), M.removeAttribute(o), Nt && (Lt = function Lt(e) {
    var t = this,
        n,
        r,
        i;if (t === e.target) {
      n = t[o], t[o] = r = Ot(t);for (i in r) {
        if (!(i in n)) return At(0, t, i, n[i], r[i], y);if (r[i] !== n[i]) return At(1, t, i, n[i], r[i], b);
      }for (i in n) {
        if (!(i in r)) return At(2, t, i, n[i], r[i], w);
      }
    }
  }, At = function At(e, t, n, r, i, s) {
    var o = { attrChange: e, currentTarget: t, attrName: n, prevValue: r, newValue: i };o[s] = e, Rt(o);
  }, Ot = function Ot(e) {
    for (var t, n, r = {}, i = e.attributes, s = 0, o = i.length; s < o; s++) {
      t = i[s], n = t.name, n !== "setAttribute" && (r[n] = t.value);
    }return r;
  })), n[s] = function (t, r) {
    p = t.toUpperCase(), xt && (xt = !1, rt ? (Mt = function (e, t) {
      function n(e, t) {
        for (var n = 0, r = e.length; n < r; t(e[n++])) {}
      }return new rt(function (r) {
        for (var i, s, o, u = 0, a = r.length; u < a; u++) {
          i = r[u], i.type === "childList" ? (n(i.addedNodes, e), n(i.removedNodes, t)) : (s = i.target, kt && s[h] && i.attributeName !== "style" && (o = ht.call(s, i.attributeName), o !== i.oldValue && s[h](i.attributeName, i.oldValue, o)));
        }
      });
    }(Ft(a), Ft(l)), _t = function _t(e) {
      return Mt.observe(e, { childList: !0, subtree: !0 }), e;
    }, _t(n), ft && (it.attachShadow = function () {
      return _t(ft.apply(this, arguments));
    })) : (wt = [], n[u]("DOMNodeInserted", Ut(a)), n[u]("DOMNodeRemoved", Ut(l))), n[u](S, zt), n[u]("readystatechange", zt), it.cloneNode = function (e) {
      var t = lt.call(this, !!e),
          n = It(t);return -1 < n && Pt(t, A[n]), e && O.length && jt(t.querySelectorAll(O)), t;
    });if (Tt) return Tt = !1;-2 < _.call(L, N + p) + _.call(L, T + p) && $t(t);if (!C.test(p) || -1 < _.call(k, p)) throw new Error("The type " + t + " is invalid");var i = function i() {
      return o ? n.createElement(f, p) : n.createElement(f);
    },
        s = r || D,
        o = P.call(s, c),
        f = o ? r[c].toUpperCase() : p,
        p,
        d;return o && -1 < _.call(L, T + f) && $t(f), d = L.push((o ? N : T) + p) - 1, O = O.concat(O.length ? "," : "", o ? f + '[is="' + t.toLowerCase() + '"]' : f), i.prototype = A[d] = P.call(s, "prototype") ? s.prototype : tt(it), O.length && Bt(n.querySelectorAll(O), a), i;
  }, n.createElement = gt = function gt(e, t) {
    var r = Yt(t),
        i = r ? mt.call(n, e, et(r)) : mt.call(n, e),
        s = "" + e,
        o = _.call(L, (r ? N : T) + (r || s).toUpperCase()),
        u = -1 < o;return r && (i.setAttribute("is", r = r.toLowerCase()), u && (u = qt(s.toUpperCase(), r))), kt = !n.createElement.innerHTMLHelper, u && Pt(i, A[o]), i;
  }), Kt.prototype = { constructor: Kt, define: V ? function (e, t, n) {
      if (n) Qt(e, t, n);else {
        var r = e.toUpperCase();G[r] = { constructor: t, create: [r] }, Z.set(t, r), X.define(e, t);
      }
    } : Qt, get: V ? function (e) {
      return X.get(e) || Gt(e);
    } : Gt, whenDefined: V ? function (e) {
      return K.race([X.whenDefined(e), en(e)]);
    } : en };if (!X || /^force/.test(t.type)) tn();else if (!t.noBuiltIn) try {
    (function (t, r, i) {
      r[c] = "a", t.prototype = tt(HTMLAnchorElement.prototype), t.prototype.constructor = t, e.customElements.define(i, t, r);if (ht.call(n.createElement("a", { is: i }), "is") !== i || V && ht.call(new t(), "is") !== i) throw r;
    })(function on() {
      return Reflect.construct(HTMLAnchorElement, [], on);
    }, {}, "document-register-element-a");
  } catch (nn) {
    tn();
  }if (!t.noBuiltIn) try {
    mt.call(n, "a", "a");
  } catch (rn) {
    et = function et(e) {
      return { is: e.toLowerCase() };
    };
  }
})(window);

var MrcDatetime = function (_HTMLElement) {
    inherits(MrcDatetime, _HTMLElement);
    function MrcDatetime() {
        classCallCheck(this, MrcDatetime);
        return possibleConstructorReturn(this, (MrcDatetime.__proto__ || Object.getPrototypeOf(MrcDatetime)).apply(this, arguments));
    }
    createClass(MrcDatetime, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            var utcTimestamp = this.textContent;
            if (utcTimestamp) {
                this.textContent = new Date(Date.parse(utcTimestamp)).toLocaleString();
            }
        }
    }]);
    return MrcDatetime;
}(HTMLElement);
customElements.define('mrc-datetime', MrcDatetime);

var MrcNumber = function (_HTMLElement) {
    inherits(MrcNumber, _HTMLElement);
    function MrcNumber() {
        classCallCheck(this, MrcNumber);
        return possibleConstructorReturn(this, (MrcNumber.__proto__ || Object.getPrototypeOf(MrcNumber)).apply(this, arguments));
    }
    createClass(MrcNumber, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            var number = this.textContent;
            if (!number) return;
            var options = {};
            var currency = this.getAttribute('data-currency');
            if (currency) {
                options.style = 'currency';
                options.currency = currency;
            }
            this.textContent = new Intl.NumberFormat(undefined, options).format(number);
        }
    }]);
    return MrcNumber;
}(HTMLElement);
>>>>>>> component-library update
customElements.define('mrc-number', MrcNumber);

}());
