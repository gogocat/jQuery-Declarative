	
// start jasmine unit testing
describe("jQuery Declear - $deClear", function() {
	var accdHeaderSelector = "> h3",
		accdSelector = "[data-ui-accordion]",
		$accd = $(accdSelector),
		plugin,
		pluginHeaderOption;
	
	// assign accordion plugin
	window.declear = $deClear("[data-ui-accordion]", "$.fn.accordion")
		.use.option({header: accdHeaderSelector})
		.use.debug(true)
		.init();

	
	beforeEach(function() {
		plugin = $("#accordion").data().uiAccordion,
		pluginHeaderOption = plugin.options.header;
	});
	
	it("should be a global function", function() {
		expect(typeof $deClear).toBe("function");
	});
	
	it("Element should has jquery plugin data object", function() {
		expect(plugin).toBeDefined();
	});

	it("Element jquery plugin options should be '> h3' ", function() {
		expect(pluginHeaderOption).toEqual(accdHeaderSelector);
	});
	
	
	it("accordion plugin original option setter should still work", function() {
		$accd.accordion( "option", "animate", 200 );
		expect(plugin.options.animate).toEqual(200);
	});
	
	it("accordion plugin original header method should still work", function() {
		var accdHeader = $accd.accordion( "option", "header" );
		expect(accdHeader).toEqual(accdHeaderSelector);
	});
	
	it("accordion plugin original heightStyle method should still work", function() {
		var heightStyle = $accd.accordion( "option", "heightStyle" );
		expect(heightStyle).toEqual("content");
	});
	
	it("accordion", function() {
		var accdHeader = $accd.accordion( "option", "header" );
		expect(accdHeader).toEqual(accdHeaderSelector);
	});

});

describe("jQuery Declear - use on jq-accordion custom tag", function() {
	var accdHeaderSelector = "> h3",
		accdSelector = "jq-accordion",
		$accd = $(accdSelector),
		plugin,
		pluginHeaderOption;
	
	$deClear("jq-accordion", "$.fn.accordion")
		.use.setAttrSelector("data-ui-option")
		.use.option({header: accdHeaderSelector})
		.use.debug(true)
		.init();
		
});


