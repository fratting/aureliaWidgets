import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Spinner {
    @bindable message;
    @bindable showSpinner;

    busyCount = 0;
    constructor(EventAggregator) {
        this._event = EventAggregator;
    }

    attached() {
        this._event.subscribe('busy', (e) => {
            this.busyCount += 1;
            this.message = (e && e.message) ? e.message : 'Please Wait...';
        });
        this._event.subscribe('notBusy', (e) => {
            this.busyCount = Math.max(this.busyCount - 1, 0);
        });
    }
}