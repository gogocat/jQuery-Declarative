jQuery Declarative
=======

jQuery Declarative is a helper utility that allows you to declare a jQuery plug-in using declarative syntax.
The result is similar to Angular directive, where plug-in options can also be supply using object literal definition. 

----

Why
---
Traditional jQuery plug-in assignment is usually something like this using css class or id selector (due to support old IEs).
```html
<div class="ui-accordion">...</div>
```
```javascript
$(".ui-accordion").accordion();
```

Developers now prefer to use declarative syntax. No more guesting / search of what plug-in might bind to the element.

 > **Note:** Attribute selector has been available since jQuery version 1.0

*So why use this script?  I can just do...*
```javascript
$("[data-ui-accordion]").accordion();
```
Well, jQuery declarative script safely parses options declared in the DOM element plus some other benefits.

**Example:**

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
In the above code, we associate the data attribute selector "**[data-ui-accordion]**" with jQuery UI accordion "**$.fn.accordion**" plug-in. Then 'use' the following settings and finally call init() to initialize the plug-in.

 - set default header option - *will merge with individual element's declarative options.*  (*optional*)
 - enable debug mode (*optional*)
 - initialize the plug-in
 
> **Note:**
> The options provided from the DOM element will merge with options provided in 'use.options()' call. 
> 
> The merge order is like so:  **{Final} = {use.option} < {DOM}** 
> 
> This pattern is most beneficial when there are multiple elements needs to bind to a same plug-in, but some element needs different settings. 
> 
> **$.fn.** is just for clarify that it is a proper jQuery plug-in. 
> 
>  *$("[data-ui-accordion]").accordion({header: "> h3", heightStyle:'content', disabled: true });*
>  
>  Therefore, it should works for any jQuery plug-ins!

Late binding
----------------

Sometime you may want to declare the plug-in first but initalize it later. 

**Example:** 
Making a jQuery UI accordion like a web component and use ajax to load content.

```html
<jq-accordion data-ui-option="{heightStyle:'content'}"></jq-accordion>
```

```javascript
// target custom tag "jq-accordion"
// store the call into a variable for reference
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

No. The reason is that will open up opportunity for script injection attack, also very ugly syntax...
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