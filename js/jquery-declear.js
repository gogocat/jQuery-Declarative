

(function($, env) {
	"use strict";
	// keep jQuery native $.fn.attr
	var oldAttr = $.fn.attr,
		Use = function(context){
			this.ctx = context;
		},
		jQueryDeclear = function(selector, plugin) {
			var self = this;
			if (typeof selector === "string" && typeof plugin === "string") {
				self.use = new Use(self);
				self.pluginSelector = $.trim(selector);
				self.pluginName = $.trim(plugin).replace("$.fn.", "");
				self.attrSelector = self.pluginSelector.replace("[","").replace("]","");
				return self;
			}
		};
  
	// jQueryDeclear
	jQueryDeclear.prototype = {
		pluginOption: {},
		init: function() {
			var self = this;
			$(document).ready(function() {
				self.element = $(self.pluginSelector);
				if (self.element.length) {
					self.attrOptions = self.getAttrOptions();
					self.pluginOption = $.extend({}, self.pluginOption, self.attrOptions);
					return self.assignPlugin();
				}
			});
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
		}
	};
	
	// evaluate attr sting options to javascript object
	// @opt example "{sample:'name', sampleBoolean: true}"
	// @return {sample:'name', sampleBoolean: true}
	function evalAttr(opt) {
		var fnbody = 'return ', fn, ret = {};
		if (typeof opt !== "string") {
			return ret;
		}
		try {
			fn = new Function(fnbody + opt + ";");
			ret = fn();
		} catch(err) {
			return ret;
		}
		return ret;
	}
	
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