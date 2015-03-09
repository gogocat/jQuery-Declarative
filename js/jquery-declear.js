/*
*	jQueryDeclear
*	Copyright (c) 2014, Adam Chow
*	BSD License
*	[https://github.com/gogocat/jQuery-Declarative]
*/

/* JSOL
 * Copyright 2010, Google Inc.
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *     * Neither the name of Google Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function($, env) {
	"use strict";

	var enableDebug = false,
		trim =  /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
		JSOL = {},
		originalAttr;
	
	// Use constructor
	function Use(context){
		this.ctx = context;
	}
	
	// jQueryDeclear constructor
	function jQueryDeclear(selector, plugin) {
		var self = this;
		self.constructor = jQueryDeclear;
		if (typeof selector === "string" && typeof plugin === "string") {
			self.use = new Use(self);
			self.pluginSelector = $.trim(selector);
			self.pluginName = $.trim(plugin).replace("$.fn.", "");
			self.attrSelector = self.pluginSelector.replace("[","").replace("]","");
			return self;
		}
	}
  
	
	jQueryDeclear.prototype = {
		pluginOption: {},
		init: function(defer) {
			var self = this,
				isDefer = (defer === false) ? false: true,
				onReady = function() {
					self.element = $(self.pluginSelector);
					if (self.element.length) {
						self.attrOptions = self.getAttrOptions();
						self.pluginOption = $.extend({}, self.pluginOption, self.attrOptions);
						return self.assignPlugin();
					}
				};
				
			if (isDefer) {
				// TODO make jquery deffer obj
				// return promise;
			}
			// TODO: check if running at Node js
			$(document).ready(onReady);
		},
		getAttrOptions: function() {
			var self = this,
				attrOptions = self.element.attr(self.attrSelector),
				ret = {};
			if(attrOptions) {
				ret = evalAttr(attrOptions);
			}
			return ret; 
		},
		assignPlugin: function() {
			var self = this;
			self.element[self.pluginName](self.pluginOption);
		}
	};
	
	Use.prototype = {
		option: function(option) {
			var self = this;
			if ($.isPlainObject(option)) {
				$.extend(self.ctx.pluginOption, option);
			}
			return self.ctx;
		},
		observer: function() {
			var self = this;
			return self.ctx;
		},
		debug: function(isEnable) {
			var self = this;
			enableDebug = (isEnable === false) ? false : true;
			return self.ctx;
		}
	};
	
	/*
	* JSOL [https://github.com/daepark/JSOL]
	*/
	JSOL.parse = function(text) {
		// make sure text is a "string"
		if (typeof text !== "string" || !text) {
			return null;
		}
		// Make sure leading/trailing whitespace is removed
		text = text.replace(trim, "");
		// Make sure the incoming text is actual JSOL (or Javascript Object Literal)
		// Logic borrowed from http://json.org/json2.js
		if ( /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
			.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
			.replace(/(?:^|:|,)(?:\s*\[)+/g, ":")
			/** everything up to this point is json2.js **/
			/** this is the 5th stage where it accepts unquoted keys **/
			.replace(/\w*\s*\:/g, ":")) ) {
			return (new Function("return " + text))();
		}
		else {
			if (enableDebug) {
				throw("Invalid JSOL: " + text);
			}
		}
	};
	
	// evaluate attr sting options to javascript object
	// @opt example "{sample:'name', sampleBoolean: true}"
	// @return {sample:'name', sampleBoolean: true}
	function evalAttr(opt) {
		var ret = JSOL.parse(opt) || {};
		return ret;
	}
	
	// decorate $.fn.attr
	// $(element).attr() return a JSON object
	originalAttr = $.fn.attr;
	$.fn.attr = function() {
		var obj;
		if(arguments.length === 0) {
			if(this.length === 0) {
				return null;
			}
			obj = {};
			$.each(this[0].attributes, function() {
				if(this.specified) {
					obj[this.name] = this.value;
				}
			});
			return obj;
		}
		return originalAttr.apply(this, arguments);
	};
	
	// extend jQuery
	$.extend({
		evalAttr: function(opt) {
			return evalAttr(opt);
		}
	});
	
	// set $deClear to global
	env.$deClear = function(selector, plugin) {
		return new jQueryDeclear(selector, plugin);
	};
	
	
})(jQuery, typeof window !== "undefined" ? window : this);