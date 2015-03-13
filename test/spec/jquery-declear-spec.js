	
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
	
	it("call accordion header options should be '> h3'", function() {
		var accdHeader = $accd.accordion( "option", "header" );
		expect(accdHeader).toEqual(accdHeaderSelector);
	});
	
	it("accordion should be disabled - click 2nd header and 2nd content pane should be hidden", function() {
		var accdheader2 = $("#accordion h3:eq(1)");
		accdheader2.click();
		expect(accdheader2.next(".ui-accordion-content")).toBeHidden();
	});
	
	it("call accordion enable options should allow 2nd header click and open content pane", function() {
		var accdHeader = $accd.accordion("enable"),
			accdheader2 = $("#accordion h3:eq(1)");		
		accdheader2.click();
		expect(accdheader2.next(".ui-accordion-content")).toBeVisible();
	});

});

describe("jQuery Declear - use on jq-accordion custom tag", function() {
	var accdHeaderSelector = "> h3",
		accdSelector = "jq-accordion",
		$accd = $(accdSelector),
		declearRef;
	
	declearRef = $deClear("jq-accordion", "$.fn.accordion")
		.use.setAttrSelector("data-ui-option")
		.use.option({header: accdHeaderSelector})
		.use.debug(true);
		
	beforeEach(function(done) {
		$.get("spec/fixtures/accordionContent.html", function(data, status){
			if(data && status === "success") {
				$accd.html(data);
				declearRef.init();
			}
			done();
		});
	});
	
	it("jq-accordion should have been initialised", function(done) {
		var plugin = $("jq-accordion").data().uiAccordion;
		expect(plugin).toBeDefined();
		done();
	});
	
});


