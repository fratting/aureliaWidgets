# Aurelia *Pagination* Element

Use this element to provide a client-side paging control for your application as an Aurelia custom element.

**Importing:**
	<require from="rapiduiFramework/pagination/pagination"></require>

**How To Use In Your View:**  
	`<pagination total-pages.bind="totalPages" show-page-numbers="false" show-positional-links="true"></pagination>`

**Bindable Properties:**  
* **total-pages** - A value denoting the number of pages. Typically, computed as the total records in your data array divided by the number of records you want the user to see at a time and rounded up. Or, if using server-side pagination with JPA this information is provided in the Page data type (i.e. see EmployeeSearchController in the RAPID Framework)
* **show-page-numbers** - true/false value to denote if the page numbers should display. In scenarios when you have a lot of pages you may not want to display the numbers due to limited realestate and just show the positional links (first,previous,next,last)
* **show-positional-links** - true/false value to denote if the first/previous/next/last navigational links should display. 

Note: The objects passed in all-options and selected-options must have both properties identified in the value-property and text-property settings. The selected-options objects must have the property identified in the is-selected-property attribute. 

**Events:**  
This element uses the Aruelia EventAggregator to publish the 'rapid.page.changed' event. You will want to subscribe to this even in your view model during the attached() or activated() phase of the view model life cycle like the example below (be sure to import the EventAggregator in your view model and set it to a property like _event in the constructor):

this._event.subscribe('rapid.page.changed',(page)=>{
			this.turnPage(page);
		});
	
**Dependencies:**
	This element uses bootstrap 4 pagination layout, which you must have install in the project