import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';
import Shepherd from 'shepherd.js';

/**
 * Helper method to check if element is hidden, since we cannot use :visible without jQuery
 * @param element The element to check for visibility
 * @returns true if element is hidden
 */
function elementIsHidden(element) {
    return element.offsetWidth === 0 && element.offsetHeight === 0;
}

/**
 * Creates a button of the specified type, with the given classes and text
 *
 * @param button.type The type of button cancel, back, or next
 * @param button.classes Classes to apply to the button
 * @param button.text The text for the button
 * @param button.action The action to call
 */
function makeButton(button) {
    const { classes, disabled, label, secondary, type, text } = button;
    const builtInButtonTypes = ['back', 'cancel', 'next'];
    if (!type) {
        return button;
    }
    if (builtInButtonTypes.indexOf(type) === -1) {
        throw new Error(`'type' property must be one of 'back', 'cancel', or 'next'`);
    }
    return {
        action: this[type].bind(this),
        classes,
        disabled,
        label,
        secondary,
        text
    };
}

class ShepherdService {
    constructor() {
        this.confirmCancel = false;
        this.confirmCancelMessage = null;
        this.defaultStepOptions = {};
        this.errorTitle = null;
        this.isActive = false;
        this.messageForUser = null;
        this.modal = false;
        this.requiredElements = [];
        this.steps = [];
        this.tourName = undefined;
        this.tourObject = null;
    }
    /**
     * Get the tour object and call back
     */
    back() {
        this.tourObject.back();
    }
    /**
     * Cancel the tour
     */
    cancel() {
        this.tourObject.cancel();
    }
    /**
     * Complete the tour
     */
    complete() {
        this.tourObject.complete();
    }
    /**
     * Hides the current step
     */
    hide() {
        this.tourObject.hide();
    }
    /**
     * Advance the tour to the next step
     */
    next() {
        this.tourObject.next();
    }
    /**
     * Show a specific step, by passing its id
     * @param id The id of the step you want to show
     */
    show(id) {
        this.tourObject.show(id);
    }
    /**
     * Start the tour
     */
    start() {
        this.isActive = true;
        this.tourObject.start();
    }
    /**
     * This function is called when a tour is completed or cancelled to initiate cleanup.
     * @param completeOrCancel 'complete' or 'cancel'
     */
    onTourFinish(completeOrCancel) {
        this.isActive = false;
    }
    /**
     * Take a set of steps and create a tour object based on the current configuration
     * @param steps An array of steps
     */
    addSteps(steps) {
        this._initialize();
        const tour = this.tourObject;
        // Return nothing if there are no steps
        if (!steps || !Array.isArray(steps) || steps.length === 0) {
            return;
        }
        if (!this.requiredElementsPresent()) {
            tour.addStep({
                buttons: [
                    {
                        text: "Exit",
                        action: tour.cancel,
                    },
                ],
                id: "error",
                title: this.errorTitle,
                text: [this.messageForUser],
            });
            return;
        }
        steps.forEach((step) => {
            if (step.buttons) {
                step.buttons = step.buttons.map(makeButton.bind(this), this);
            }
            tour.addStep(step);
        });
    }
    /**
     * Observes the array of requiredElements, which are the elements that must be present at the start of the tour,
     * and determines if they exist, and are visible, if either is false, it will stop the tour from executing.
     */
    requiredElementsPresent() {
        let allElementsPresent = true;
        /* istanbul ignore next: also can't test this due to things attached to root blowing up tests */
        this.requiredElements.forEach((element) => {
            const selectedElement = document.querySelector(element.selector);
            if (allElementsPresent &&
                (!selectedElement || elementIsHidden(selectedElement))) {
                allElementsPresent = false;
                this.errorTitle = element.title;
                this.messageForUser = element.message;
            }
        });
        return allElementsPresent;
    }
    /**
     * Initializes the tour, creates a new Shepherd.Tour. sets options, and binds events
     */
    _initialize() {
        const tourObject = new Shepherd.Tour({
            confirmCancel: this.confirmCancel,
            confirmCancelMessage: this.confirmCancelMessage,
            defaultStepOptions: this.defaultStepOptions,
            tourName: this.tourName,
            useModalOverlay: this.modal,
            keyboardNavigation: false,
        });
        tourObject.on("complete", this.onTourFinish.bind(this, "complete"));
        tourObject.on("cancel", this.onTourFinish.bind(this, "cancel"));
        this.tourObject = tourObject;
    }
}
/** @nocollapse */ ShepherdService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ShepherdService_Factory() { return new ShepherdService(); }, token: ShepherdService, providedIn: "root" });
ShepherdService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root",
            },] }
];
/** @nocollapse */
ShepherdService.ctorParameters = () => [];

/*
 * Public API Surface of shepherd
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ShepherdService };
//# sourceMappingURL=angular-shepherd.js.map
