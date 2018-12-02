# Aurelia *Multiselect* Element

Use this element to provide a multiselect button for your application as an Aurelia custom element.

**Importing:**
	<require from="rapiduiFramework/multiselect/multiselect"></require>

**How To Use In Your View:**  
	`<multiselect element-id="${entity.id}" all-options.one-way="allOptions" selected-options.one-way="entity.selectedOptions" value-property="externalId" text-property="name" is-selected-property="isSelected" save.call="saveChanges(elementId,selected)"></multiselect>`

**Bindable Properties:**  
* **element-id** - A value unique to the DOM element and used to identify the multiselect component that was updated (make sure to uniquely set this, especially if you have more than one multiselect)
* **all-options** - An object array of all the options to present to the user. 
* **selected-options** - An object array of those options which should be initially marked as selected when the multiselect renders. Must have the same object structure as the objects in your all-options, with the addition of the true/false property identified in is-selected-property.
* **value-property** - Identifies the property in your object(s) that will represent the value of the option selected by the user.
* **text-property** - Identifies the property in your object(s) that will represent the visible text of the option displayed to the user.
* **is-selected-property** - Identifies the property in your object(s) that resolves to a true/false, truthy/falsy value to determine if the option should be initially marked as selected.
* **is-multiple** - Determines if the user can select more than one option or not.
* **save** - The callback you want triggered when the user loses focus and the multiselect options hide. The object array based on the options selected at that time will be provided, along with the element Id of the element they were focused on. You must use the save.call"method(elementId,selected)" format to ensure your callback is called with the arguments.

Note: The objects passed in all-options and selected-options must have both properties identified in the value-property and text-property settings. The selected-options objects must have the property identified in the is-selected-property attribute. 

**Events:**  
This element does not expose events, but rather triggers the **save** callback
	
**Dependencies:**
	This element uses bootstrap-multiselect, which is a 3rd-party control that can be installed with "jspm install npm:bootstrap-multiselect". It also leverages the bootstrap library
	
Currently, this control displays as a button with 100% width and preset options. Future enhancements will extend on the customization