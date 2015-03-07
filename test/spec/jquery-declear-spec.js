describe("jQuery Declear - $deClear", function() {
	var accdHeaderSelector = "",
		accdSelector = "[data-ui-accordion]",
		$accd = $(accdSelector),
		plugin,
		pluginHeaderOption;
		
	$deClear("[data-ui-accordion]", "$.fn.accordion")
		.use.option({header: accdHeaderSelector})
		.use.observer()
		.init();
	
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
/*
	it("Element jquery plugin options should be '> div > h3' ", function() {
		expect(pluginHeaderOption).toEqual(accdHeaderSelector);
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
		var heightStyle = $accd.accordion( "option", "heightStyle" );
		expect(heightStyle).toEqual("content");
	});
	
	it("accordion plugin should auto bind when DOM mutated", function() {
		var newAccd = $('<div id="accd2" data-ui-accordion="{header: > div > h2, }"><div><h2>header</h2></div><div>panel</div></div>');
		$("body").append(newAccd);
		expect($("#accd2").data().uiAccordion).toBeDefined();
	});
	
	it("Call $deClear('[data-ui-accordion]').undo() should unbind accordion plugin ", function() {
		var accdHeader;
		$deClear('[data-ui-accordion]').undo();
		accdHeader = $accd.accordion.accordion( "option", "header" );
		expect(accdHeader).toBeDefined();
	});
*/
});


