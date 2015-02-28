describe("jQuery Declear - $deClear", function() {
	var plugin,
		pluginHeaderOption;
		
	$deClear($.fn.accordion).use.option({header: "> div > h3"});
	
	beforeEach(function() {
		plugin = $("#accordion").data().uiAccordion,
		pluginHeaderOption = plugin.options.header;
	});
	
	it("should be a global function", function() {
		expect(typeof $deClear).toBe("function");
	});
	
	it("Element should has jquery plugin in data object", function() {
		expect(plugin).toBeDefined();
	});

	it("Element jquery plugin options should be '> div > h3' ", function() {
		expect(pluginHeaderOption).toEqual("> div > h3");
	});
	
	
});

