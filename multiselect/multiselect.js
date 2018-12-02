import {inject, bindable, bindingMode} from 'aurelia-framework';
//import {BindingEngine} from 'aurelia-binding';
import $ from 'jquery';
import 'bootstrap-multiselect';

@inject(Element)
export class Multiselect{
	@bindable elementId;
	@bindable allOptions = [];
	@bindable isMultiple = 'true';
	@bindable selectedOptions = [];
	@bindable selected = [];
	@bindable valueProperty;
	@bindable textProperty;
	@bindable isSelectedProperty;
	@bindable save;
	changesMade = false;
	
	constructor(element){
		this._element=element;
	}
	
	clearSelectedOptions(){
		this.selected.splice(0);
	}
	
	attached(){
		$(()=>{
			//this.cloneCommittedList();
			this.isMultiple = (this.isMultiple=='true');
			
			let $ele = $(`#${this.elementId}`);
			if(this.isMultiple){
				$ele.attr('multiple','multiple');
			}
			else{
				document.getElementById(this.elementId).selectedIndex = -1;// to prevent the first option from auto-selecting when showing radio buttons
			}
			
			//pre-populate what's already selected so it isn't lost on return
			this.selected = !!this.selected ? this.selected : [];
			this.selected.splice(0); //clear for reload
			this.selectedOptions.forEach(o=>this.selected.push(o));
	
			if(!!this.elementId){
				$(`#${this.elementId}`).multiselect({
					buttonWidth:'100%',
					buttonClass:'btn btn-secondary',
					nonSelectedText: 'No Options Selection',
					allSelectedText: this.isMultiple ? 'All Options Selected' : null,
					includeSelectAllOption: this.isMultiple,
					selectAllValue: this.isMultiple ? '*' : null,
					enableFiltering:false, //doesn't render with bs 4
					onChange:(option,checked,select)=>{
						this.changesMade = true;
						if(!option){
							this.clearSelectedOptions();
							if(checked){
								this.allOptions.forEach(o=>{this.selected.push(o)});
							}
							return; //bug with component. onChange triggered on select all which it shouldn't be
						}

						let $item = option[0]; //unwrap jquery object
						let id = $item.value;
						
						let optionItem = this.allOptions.find(o=>o[this.valueProperty]==id);
						if(checked){
							if(!this.isMultiple){
								this.selected.splice(0,this.selected.length, optionItem);
								this.save({elementId:this.elementId,selected:this.selected}); //because the drop down will hide immediately in a single-select scenario, need to trigger save now
							}
							
							this.selected.push(optionItem);
							return;
						}
						let indexOf = this.selected.findIndex(o=>o[this.valueProperty]==id);
						if(indexOf >= 0){
							this.selected.splice(indexOf,1);
						}	
					},
					onSelectAll:()=>{
						//bug: select all is triggering on deselect and not working...so not used
						//OnChange event is used to infer select all
					
					},
					onDeselectAll:()=>{
						//bug: deselect doesn't trigger at all
						//onChange event is used to infer deselect all						
					},
					onDropdownHidden:(event)=>{
						if(!this.isMultiple){
							//drop down hides immediately in single-select scenarios, so the save call will be triggered onChange for that situation
							return;
						}
						if(this.changesMade){
							//need to wrap parameters into object for them to be passed to the function
							this.save({elementId:this.elementId,selected:this.selected});
							$(`#${this.elementId}`).multiselect('updateButtonText');
						}	
					}
				});
				
				for(let i=0;i<this.allOptions.length;i++){
					let $option = $(`#option_${this.elementId}_${i}`);
					let val = $option.val().toLowerCase();
					let selected = this.selected.find(s=>s[this.valueProperty].toLowerCase()===val);
					if(!!selected){
						$option.attr('selected','selected');
					}
				}	

				$(`#${this.elementId}`).multiselect('refresh');
				$(`#${this.elementId}`).multiselect('updateButtonText');
				let $container = $('.multiselect-container');
				$container.css('max-height','300px');
				$container.css('overflow-y','scroll');
				
			}	
		});
	}
	
	getValue(option){
		return option[this.valueProperty];
	}
	
	getText(option){
		return option[this.textProperty];
	}
	getIsSelected(option){
		/*let result= option[this.isSelectedProperty];
		return result;*/
		let exists = this.selectedOptions.findIndex(o=>o[this.valueProperty]===option[this.valueProperty]);
		return exists >= 0;
	}
	/*cloneCommittedList(){
		this.committedList = JSON.parse(JSON.stringify(this.options)); //clone selection for roll backs and commit points
	}*/
}