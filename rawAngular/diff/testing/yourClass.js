'use strict';


class SomeClass {

    constructor() {
        this.started = false;
        this.currentStrokeEvents = [];
    }

    testMethod(event) {
        console.log('Event Fired!', event);
    }

    startStroke() {
        this.started = true;
        this.currentStrokeEvents = [];
    }

    updateStroke(event) {
        if (this.started) {
            console.log(event);
            this.currentStrokeEvents.push(event)
        }
    }

    endStroke() {
        this.started = false;
        console.log('Store the stroke now with these events', this.currentStrokeEvents);
    }
}
