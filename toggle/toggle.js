import {inject, bindable, bindingMode} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-binding';
import $ from 'jquery';
import 'bootstrap-toggle';

@inject(Element,BindingEngine)
export class ToggleCustomElement{
	@bindable({defaultBindingMode: bindingMode.twoWay}) isChecked; //on or off
	@bindable elementId;
	@bindable({defaultBindingMode: bindingMode.oneWay}) state; //enable or disable
	@bindable initialState; //enable or disable (clickable)
	@bindable onLabel;
	@bindable offLabel;
	@bindable onStyle;
	@bindable offStyle;
	
	constructor(element,bindingEngine){
		this.element = element;
		this._bindingEngine = bindingEngine;
		
		/*Observer state property change to toggle switch*/
		this.stateSubscription = this._bindingEngine.propertyObserver(this,'state').subscribe((newValue,oldValue)=>{
			if(this.elementId){
				let $ele = $(`#${this.elementId}`);
				$ele.bootstrapToggle(newValue);
			}
		});
	}
	
	attached(){
		/*raise change event on toggle switch*/
		$(()=>{
			let $ele = $(`#${this.elementId}`);

			$ele.bootstrapToggle({
				on: this.onLabel ? this.onLabel : 'Enabled',
				off: this.offLabel ? this.offLabel : 'Disabled',
				onstyle:this.onStyle ? this.onStyle: 'primary',
				offstyle:this.offStyle ? this.offStyle: 'default'
			});
			
			//Enables/disables the toggle control on attached
			if(this.initialState && this.initialState==='disable'){
				$ele.bootstrapToggle('disable');
			}
			
			//Flips toggle on/off on attached
			if(this.isChecked){
				$ele.unbind('change'); //to allow initial state to be set w/no trigger
				$ele.bootstrapToggle('on');
			}
			
			$ele.on('change',(event)=>{
				let changeEvent;
							
                if (window.CustomEvent) {
                    changeEvent = new CustomEvent('change', {
                        detail: {
                        	id: event.target.id,
                            value: event.target.value
                        },
                        bubbles: true
                    });
                } else {
                    changeEvent = document.createEvent('CustomEvent');
                    changeEvent.initCustomEvent('change', true, true, {
                        detail: {
                        	id:event.target.id,
                            value: event.target.value
                        }
                    });
                }
                this.element.dispatchEvent(changeEvent);
			});
		});				
	}
	
	detached(){
		this.stateSubscription.dispose();
	}
}