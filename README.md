jQuery Declarative
=======

jQuery Declarative is a helper utility that allows you to declare a jQuery plugin using declarative syntax.
The result is similar to Angular directive, where plugin options can also be supply using object literal definition. 

----

**Example Usage:**

Declare an jQuery UI accordion with options.

```html
<div id="accordion" data-ui-accordion="{heightStyle:'content', disabled: true}">
```
**In javaScript:**

Associate the data attribute selector with jQuery UI accordion.

 - set default header option - *merge with individual element's declarative options.*  
 - enable debug mode 
 - initialize the plugin

```javascript
$declare("[data-ui-accordion]", "$.fn.accordion")
	.use.option({header: "> h3"})
	.use.debug(true)
	.init();
```

**Late binding**

Sometime, you may want to declare the plugin first but initalize later. 
eg. after ajax content load.

```html
<jq-accordion data-ui-option="{heightStyle:'content'}"></jq-accordion>
```

```javascript
// target custom tag "jq-accordion"
var declareRef = $declare("jq-accordion", "$.fn.accordion")
		.use.setAttrSelector("data-ui-option") // overwrite internal attribute selector 
		.use.option({header: "> h3"})
		.use.before(function(ctx){
			// do something before init
			// ctx is the context of $declare
		})
		.use.after(function(ctx){
			// do something after init
		})
		.use.debug(true);

// sometime later load content into jq-accordion 
$.get("accordionContent.html", function(data, status){
	if(data && status === "success") {
		$("jq-accordion").html(data);
		declareRef.init();	
	}
});



```

License
----

BSD