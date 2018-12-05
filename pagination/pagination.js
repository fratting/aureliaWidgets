import { inject , bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(EventAggregator)
export class Pagination{
	currentPage=1;
	@bindable totalPages=1;
	@bindable showPageNumbers = true;
	@bindable showPositionalLinks = true;
	currentPage = 1;
	
	constructor(event){
		this._event = event;
	}

	attached(){
		this.showPageNumbers = this.showPageNumbers=='false' ? false : true;
		this.showPositionalLinks = this.showPositionalLinks=='false' ? false : true;
	}
	
	triggerPageChange(page){
		this.currentPage = page+1;
		this._event.publish('page.changed',this.currentPage);
	}
	first(){	
		if(this.currentPage==1){
			return;
		}
		this.triggerPageChange(0);
	}
	last(){
		if(this.currentPage==this.totalPages){
			return;
		}

		this.triggerPageChange(this.totalPages-1);
	}
	previous(){
		if(this.currentPage==1){
			return;
		}
		this.triggerPageChange(Math.max(0,this.currentPage-2));
	}
	forward(){
		if(this.currentPage==this.totalPages){
			return;
		}
		this.triggerPageChange(Math.min(this.totalPages-1,this.currentPage));
	}
}