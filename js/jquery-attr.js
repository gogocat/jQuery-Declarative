

(function($) {
	"use strict";
	// keep jQuery native $.fn.attr
	var oldAttr = $.fn.attr;
	
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
	
	$.extend({
		evalAttr: function(opt) {
			return evalAttr(opt);
		}
	});
	
})(jQuery);