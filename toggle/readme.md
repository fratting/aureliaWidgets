# Aurelia *Toggle* Element

Use this component as an alternative to typical checkboxes.

**Importing:**
	<require from="rapiduiFramework/toggle/toggle"></require>

**How To Use In Your View:**
	<toggle element-id="unique value" is-enabled="true/false" state.one-way="enable/disable" initial-state.one-time="enable/disable" change.delegate="someFunction($event)"></toggle>

**Bindable Properties:**  
* **is-checked** - denotes if the switch should be in an 'on' state or 'off' state based on some predicate value; values are "true" or "false"
* **initial-state** - denotes what the state of the toggle should be when it first renders onto the page; values are "enable" and "disable". This determines if the user can click the toggle
* **element-id** - sets a unique identifier for the toggle switch, which is valuable especially if you have many of them in your view; value is any unique string for the view
* **state** - denotes what the state of the toggle should be after the toggle has rendered onto the page; values are "enable" and "disable". This determines if the user can click the toggle

**Events:**
* **change** - When the state of the toggle swith changes based on the user's interaction with it then the change event will be raised with the Aurelia $event; value for this event is an event handler function that receives the Aurelia $event object.
	
	
	The $event parameter contains the following payload information:
	{
		detail:{
					id:'unique value',
					value:'true/false state of the control'
				}
	}
	
**Dependencies:**
	This control uses a 3rd party Aurelia component called 'bootstrap-toggle' which must be installed via jspm, if not already installed (jspm install bootstrap-toggle )