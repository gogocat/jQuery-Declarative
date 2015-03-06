

(function($) {
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
				return self init(selector, plugin);
			}
		};
  
	// evaluate attr sting options to javascript object
	// @opt example "{sample:'name', sampleBoolean: true}"
	// @return {sample:'name', sampleBoolean: true}
	function evalAttr(opt) {
		var fnbody = 'return ', fn, ret;
		if (typeof opt !== "string") {
			return null;
		}
		try {
			fn = new Function(fnbody + opt + ";");
			ret = fn();
		} catch(err) {
			ret = null;
		}
		return ret;
	}
	
	// extend jQuery
	$.extend({
		evalAttr: function(opt) {
			return evalAttr(opt);
		}
	});
	
	// jQueryDeclear
	jQueryDeclear.prototype = {
		pluginOption: null,
		init: function(selector, plugin) {
			var self = this;
			
			self.pluginSelector = $.trim(pluginSelector);
			self.element = $(self.pluginSelector);
			self.pluginOption = self.getAttrOptions();
			if (self.element.length) {
				return self.assignPlugin();
			}
		},
		getAttrOptions: function() {
			var attrOptions = self.element.attr(self.pluginSelector),
				ret = null;
			if(attrOptions) {
				ret = evalAttr(attrOptions);
			}
			return ret; 
		},
		assignPlugin: function() {
			self.element[plugin](self.pluginOption);
		}
	};
	
	Use.prototype = {
		option: function(option) {
			if ($.isPlainObject(option)) {
				self.ctx.pluginOption = self.ctx.pluginOption || {};
				$.extend(self.ctx.pluginOption, option);
			}
			return this;
		},
		observer: function() {
			return this;
		}
	};
	
})(jQuery);