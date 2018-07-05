# Aurelia *Filter* Value Converter

Use this component from your view to filter an array of objects by some property

**Importing:**
	<require from="converters/fileValueConverter"></require>

**How To Use In Your View:**
`<div repeat.for="person of persons | filter:'propertyName':'valuetoSearch'">
		...
	</div>`

Typically, you would use this filter against an array that you are repeating over to render a view.  

**Note:** This value converter currently uses the Array.filter method, which may not be supported by all browsers and may require a polyfill update