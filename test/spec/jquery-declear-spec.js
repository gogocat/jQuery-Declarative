describe("jQuery Declear - $deClear", function() {
	var accdHeaderSelector = "> div > h3",
		accdSelector = "[data-ui-accordion]",
		$accd = $(accdSelector),
		plugin,
		pluginHeaderOption;
		
	$deClear("[data-ui-accordion]", $.fn.accordion).use.option({header: accdHeaderSelector});
	
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
		expect(pluginHeaderOption).toEqual(accdHeaderSelector);
	});
	
	it("Element jquery plugin should be an instance of $deClear", function() {
		expect(instanceof plugin).toEqual($deClear);
	});
	
	it("accordion plugin original option setter should still work", function() {
		$accd.accordion( "option", "animate", 200 );
		expect(plugin.options.animate).toEqual(200);
	});
	
	it("accordion plugin original header method should still work", function() {
		var accdHeader = $accd.accordion.accordion( "option", "header" );
		expect(accdHeader).toEqual(accdHeaderSelector);
	});
	
	it("accordion plugin original heightStyle method should still work", function() {
		var heightStyle = $( ".selector" ).accordion( "option", "heightStyle" );
		expect(heightStyle).toEqual("content");
	});
});

