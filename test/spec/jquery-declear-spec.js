describe("jQuery Declear - $deClear", function() {
	
	$deClear($.fn.accordion).use.option({header: "> div > h3"});
	
	it("should be a global function", function() {
		expect(typeof $deClear).toBe("function");
	});


});

