jQuery Declarative
=======

jQuery Declarative is a helper utility that allows you to declare a jQuery plugin using declarative syntax.
The result is similar to Angular directive, where plugin options can also be supply using object literal definition. 

----

**Example Usage:**

Declare an jQuery UI accordion with options.

```html
<div data-ui-accordion="{heightStyle:'content', disabled: true}">
```
**In javaScript:**

```javascript
$declare("[data-ui-accordion]", "$.fn.accordion")
	.use.option({header: "> h3"})
	.use.debug(true)
	.init();
```
Associate the data attribute selector "**[data-ui-accordion]**" with jQuery UI accordion "**$.fn.accordion**".

 - set default header option - *will merge with individual element's declarative options.*  (*optional*)
 - enable debug mode (*optional*)
 - initialize the plugin


Late binding
----------------

Sometime you may want to declare the plugin first but initalize it later. 

**Example:** 
Making a jQuery UI accordion like a web component and use ajax to load content.

```html
<jq-accordion data-ui-option="{heightStyle:'content'}"></jq-accordion>
```

```javascript
// target custom tag "jq-accordion"
// store into a variable for reference
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

**Can I declare callbacks in HTML element?**

No. The reason is that will open opportunity for script injection attack, also very ugly syntax...
but you can always declare callbacks at the javascript call.

```javascript
$declare("[data-myPlugin]", "$.fn.myPlugin")
	.use.option({
		onShow: function(){
			// do something
		},
		onHide: function(){
			// do something
		},
	})
	.init();
```

License
----

BSD