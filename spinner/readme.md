
# Aurelia *Spinner* Element

Use this component to provide a blocking UI based spinner. For example, when you are waiting for data to return or loading a page

**Importing:**  
	`<require from="spinner/spinner"></require>`

**How To Use In Your View:**  
	`<spinner show-spinner.one-way="false"></spinner>`  
	*Ideally, this only has to be placed in the app.html view and nowhere else*

**How to Use in Your View Model**  
	`import {EventAggregator} from 'aurelia-event-aggregator'`  
	...  
	(inject the EventAggregator into your view model)  
	this._eventAggregator.publish('busy',{message:'show something'};
	
	
**Bindable Properties**  
	**show-spinner** - a predecit value that denotes if the spinner should show. Typically, the value is based on some boolean inside your view model.

**Events:**  
	This component uses the Aurelia *EventAggregator* to listen for the follow events you can raise to show/hide the spinner:  
		'busy',{message:'anything you want to tell the user while they wait'} - To show the spinner with a custom message, message is optional. 'Please wait' is the default message. Your message can be html or a simple string
		'notBusy' - to hide the spinner at the completion of your work (i.e. when a promise resolves)
	
	
**Dependencies:**  
* This control depends on the pub/sub of the Aurelia EventAggregator to listen for commands to show and hide
* This control uses font awesome to render the spinner graphic. This is already included with the Roster project.



**Example**  

~~~~
CancelTicket(id) {
        this._event.publish('busy', { message: `Cancelling Ticket ${id}...` });
        var p = this._http.delete(`${this._resource}/${id}`)
            .then(r => {
                this._event.publish('notBusy');
                return r;
            })
            .catch(error => {
                this._event.publish('notBusy');
                this.notifier.display({ type: 'error', message: `There was a problem retrieving your information: ${error.response}` });
            });
        return p;
    }
~~~~