

(function($) {
	"use strict";
	// keep jQuery native $.fn.attr
	var oldAttr = $.fn.attr,
		Use = function(context){
			this.ctx = context;
		},
		jQueryDeclear = function(selector, plugin) {
			var self = this;
			if (typeof selector === "string" && plugin) {
				self.use = new Use(self);
				return self init(selector, plugin);
			}
		};
	
	// call $(element).attr() return a object of attributes
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
		return oldAttr.apply(this, arguments);
	};
  
	// evaluate attr sting options to javascript object
	// @opt example "{sample:'name', sampleBoolean: true}"
	// @return {sample:'name', sampleBoolean: true}
	function evalAttr(opt) {
		var fnbody = 'return ', fn, ret;
		if (typeof opt !== "string") {
			return opt;
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
			self.pluginSelector = "[" + $.trim(pluginSelector) + "]";
			setTimeout(function() {
				if (self.pluginOption) {
					$(self.pluginSelector)
				}
			});
		}
	};
	
	Use.prototype = {
		option: function(option) {
			var self = this;
			self.ctx.pluginOption = option;
		}
	};
	
})(jQuery);