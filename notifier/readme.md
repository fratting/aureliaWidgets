
# Aurelia *Notifier* Component

This is an Aurelia component to display messages to the user


**How to Use in Your View Model**  
~~~~
import {inject} from 'aurelia-framework';
import {Notifier} from 'notifier/notifier;

Then inject it or new it up inside your viewmodel or component:

@inject(Notifier)
export class YouViewModel {
    constructor(notifier) {
        this._notifier = notifier;
    }
}
~~~~
	
**Events:**  
**this._notifier.display({ type: 'warning', message: Unable to verify your User ID. Please use a valid User ID' });**

There a many options to choose from:

*  **type**: 'info' (default), 'error','warning','warn','success','successful','question', used to indicate the color scheme and icon
*  **message**: A string, which can contain inner-html for presentation
*  **sticky**: true/false, to make the notifier stay put until the user clicks it. Otherwise, the notifier hides after 3.5 seconds
*  **clearOtherAlerts**: true/false, false by default, multiple notifications will show if still in display. But you can kill the existing notifications first using this setting
*  **layout**: 'top','topLeft','topCenter','topRight','center','centerLeft','centerRight','bottom','bottomLeft','bottomCenter','bottomRight', 'topRight' is the default and denotes where to place the notifier
*  **showProgressBar**: true/false, false is the default, setting used to display a progress bar as time elapses for the message to auto-hides
*  **buttons**: array of objects to set the button's id, html, and optional events (see below)

## Example display with buttons
*Note: You'll want the notifier to be set to sticky to give the user the ability to respond. You can set any button event, the click event being the most important to capture the user's selection.
Buttons are pulled-right when bootstrap is included in your project and will display in the reverse order in which you add them to your array.

~~~~
this._notifier.display({
            type: 'question',
            message: 'Do you want to continue?',
            sticky: true,
            buttons: [{ id: 'button1', html: 'Yes', events: [{ type: 'click', callBack: () => { console.log('Yes clicked event'); } }, { type: 'mouseenter', callBack: () => { console.log('Yes mouseenter event'); } }] },
                { id: 'button2', html: 'No', events: [{ type: 'click', callBack: () => { console.log('No clicked event'); } }, { type: 'mouseenter', callBack: () => { console.log('No mouseenter event'); } }] }]
        });
~~~~		
Notifications use the browser's page visibility notification-If a message displays while the user is on a different tab or minimizes the browser then the message will stay put until the page regains focus for browsers that support the capability

**Events:**  
	This component has no events
	
	
**Dependencies:**  
*  this version of notifier requires you to include noty.js and font-awesome  **https://ned.im/noty/#/**  
**http://fontawesome.io/**  

They both can be npm installed or jspm installed ('jspm install npm:noty'  and 'jspm install font-awesome' from your command prompt)  
