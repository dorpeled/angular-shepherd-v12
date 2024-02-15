import { Injectable } from "@angular/core";
import Shepherd from "shepherd.js";
import { elementIsHidden } from "./utils/dom";
import { makeButton } from "./utils/buttons";
import * as i0 from "@angular/core";
export class ShepherdService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlcGhlcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3NoZXBoZXJkL3NyYy9saWIvc2hlcGhlcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sUUFBUSxNQUFNLGFBQWEsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFLN0MsTUFBTSxPQUFPLGVBQWU7SUFhMUI7UUFaQSxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0Qix5QkFBb0IsR0FBVyxJQUFJLENBQUM7UUFDcEMsdUJBQWtCLEdBQVcsRUFBRSxDQUFDO1FBQ2hDLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixtQkFBYyxHQUFXLElBQUksQ0FBQztRQUM5QixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2QscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxhQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLGVBQVUsR0FBa0IsSUFBSSxDQUFDO0lBRWxCLENBQUM7SUFFaEI7O09BRUc7SUFDSCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNO1FBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FB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UTtZQUN2QixlQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDM0Isa0JBQWtCLEVBQUUsS0FBSztTQUMxQixDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNwRSxVQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUVoRSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDOzs7O1lBM0pGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IFNoZXBoZXJkIGZyb20gXCJzaGVwaGVyZC5qc1wiO1xuaW1wb3J0IHsgZWxlbWVudElzSGlkZGVuIH0gZnJvbSBcIi4vdXRpbHMvZG9tXCI7XG5pbXBvcnQgeyBtYWtlQnV0dG9uIH0gZnJvbSBcIi4vdXRpbHMvYnV0dG9uc1wiO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46IFwicm9vdFwiLFxufSlcbmV4cG9ydCBjbGFzcyBTaGVwaGVyZFNlcnZpY2Uge1xuICBjb25maXJtQ2FuY2VsID0gZmFsc2U7XG4gIGNvbmZpcm1DYW5jZWxNZXNzYWdlOiBzdHJpbmcgPSBudWxsO1xuICBkZWZhdWx0U3RlcE9wdGlvbnM6IG9iamVjdCA9IHt9O1xuICBlcnJvclRpdGxlID0gbnVsbDtcbiAgaXNBY3RpdmUgPSBmYWxzZTtcbiAgbWVzc2FnZUZvclVzZXI6IHN0cmluZyA9IG51bGw7XG4gIG1vZGFsID0gZmFsc2U7XG4gIHJlcXVpcmVkRWxlbWVudHMgPSBbXTtcbiAgc3RlcHMgPSBbXTtcbiAgdG91ck5hbWUgPSB1bmRlZmluZWQ7XG4gIHRvdXJPYmplY3Q6IFNoZXBoZXJkLlRvdXIgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvKipcbiAgICogR2V0IHRoZSB0b3VyIG9iamVjdCBhbmQgY2FsbCBiYWNrXG4gICAqL1xuICBiYWNrKCkge1xuICAgIHRoaXMudG91ck9iamVjdC5iYWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FuY2VsIHRoZSB0b3VyXG4gICAqL1xuICBjYW5jZWwoKSB7XG4gICAgdGhpcy50b3VyT2JqZWN0LmNhbmNlbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBsZXRlIHRoZSB0b3VyXG4gICAqL1xuICBjb21wbGV0ZSgpIHtcbiAgICB0aGlzLnRvdXJPYmplY3QuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgY3VycmVudCBzdGVwXG4gICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMudG91ck9iamVjdC5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQWR2YW5jZSB0aGUgdG91ciB0byB0aGUgbmV4dCBzdGVwXG4gICAqL1xuICBuZXh0KCkge1xuICAgIHRoaXMudG91ck9iamVjdC5uZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyBhIHNwZWNpZmljIHN0ZXAsIGJ5IHBhc3NpbmcgaXRzIGlkXG4gICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHN0ZXAgeW91IHdhbnQgdG8gc2hvd1xuICAgKi9cbiAgc2hvdyhpZCkge1xuICAgIHRoaXMudG91ck9iamVjdC5zaG93KGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCB0aGUgdG91clxuICAgKi9cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy50b3VyT2JqZWN0LnN0YXJ0KCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBhIHRvdXIgaXMgY29tcGxldGVkIG9yIGNhbmNlbGxlZCB0byBpbml0aWF0ZSBjbGVhbnVwLlxuICAgKiBAcGFyYW0gY29tcGxldGVPckNhbmNlbCAnY29tcGxldGUnIG9yICdjYW5jZWwnXG4gICAqL1xuICBvblRvdXJGaW5pc2goY29tcGxldGVPckNhbmNlbDogc3RyaW5nKSB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRha2UgYSBzZXQgb2Ygc3RlcHMgYW5kIGNyZWF0ZSBhIHRvdXIgb2JqZWN0IGJhc2VkIG9uIHRoZSBjdXJyZW50IGNvbmZpZ3VyYXRpb25cbiAgICogQHBhcmFtIHN0ZXBzIEFuIGFycmF5IG9mIHN0ZXBzXG4gICAqL1xuICBhZGRTdGVwcyhzdGVwczogQXJyYXk8YW55Pikge1xuICAgIHRoaXMuX2luaXRpYWxpemUoKTtcbiAgICBjb25zdCB0b3VyID0gdGhpcy50b3VyT2JqZWN0O1xuXG4gICAgLy8gUmV0dXJuIG5vdGhpbmcgaWYgdGhlcmUgYXJlIG5vIHN0ZXBzXG4gICAgaWYgKCFzdGVwcyB8fCAhQXJyYXkuaXNBcnJheShzdGVwcykgfHwgc3RlcHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnJlcXVpcmVkRWxlbWVudHNQcmVzZW50KCkpIHtcbiAgICAgIHRvdXIuYWRkU3RlcCh7XG4gICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkV4aXRcIixcbiAgICAgICAgICAgIGFjdGlvbjogdG91ci5jYW5jZWwsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgaWQ6IFwiZXJyb3JcIixcbiAgICAgICAgdGl0bGU6IHRoaXMuZXJyb3JUaXRsZSxcbiAgICAgICAgdGV4dDogW3RoaXMubWVzc2FnZUZvclVzZXJdLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RlcHMuZm9yRWFjaCgoc3RlcCkgPT4ge1xuICAgICAgaWYgKHN0ZXAuYnV0dG9ucykge1xuICAgICAgICBzdGVwLmJ1dHRvbnMgPSBzdGVwLmJ1dHRvbnMubWFwKG1ha2VCdXR0b24uYmluZCh0aGlzKSwgdGhpcyk7XG4gICAgICB9XG5cbiAgICAgIHRvdXIuYWRkU3RlcChzdGVwKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPYnNlcnZlcyB0aGUgYXJyYXkgb2YgcmVxdWlyZWRFbGVtZW50cywgd2hpY2ggYXJlIHRoZSBlbGVtZW50cyB0aGF0IG11c3QgYmUgcHJlc2VudCBhdCB0aGUgc3RhcnQgb2YgdGhlIHRvdXIsXG4gICAqIGFuZCBkZXRlcm1pbmVzIGlmIHRoZXkgZXhpc3QsIGFuZCBhcmUgdmlzaWJsZSwgaWYgZWl0aGVyIGlzIGZhbHNlLCBpdCB3aWxsIHN0b3AgdGhlIHRvdXIgZnJvbSBleGVjdXRpbmcuXG4gICAqL1xuICBwcml2YXRlIHJlcXVpcmVkRWxlbWVudHNQcmVzZW50KCkge1xuICAgIGxldCBhbGxFbGVtZW50c1ByZXNlbnQgPSB0cnVlO1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IGFsc28gY2FuJ3QgdGVzdCB0aGlzIGR1ZSB0byB0aGluZ3MgYXR0YWNoZWQgdG8gcm9vdCBibG93aW5nIHVwIHRlc3RzICovXG4gICAgdGhpcy5yZXF1aXJlZEVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudC5zZWxlY3Rvcik7XG5cbiAgICAgIGlmIChcbiAgICAgICAgYWxsRWxlbWVudHNQcmVzZW50ICYmXG4gICAgICAgICghc2VsZWN0ZWRFbGVtZW50IHx8IGVsZW1lbnRJc0hpZGRlbihzZWxlY3RlZEVsZW1lbnQpKVxuICAgICAgKSB7XG4gICAgICAgIGFsbEVsZW1lbnRzUHJlc2VudCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVycm9yVGl0bGUgPSBlbGVtZW50LnRpdGxlO1xuICAgICAgICB0aGlzLm1lc3NhZ2VGb3JVc2VyID0gZWxlbWVudC5tZXNzYWdlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGFsbEVsZW1lbnRzUHJlc2VudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgdG91ciwgY3JlYXRlcyBhIG5ldyBTaGVwaGVyZC5Ub3VyLiBzZXRzIG9wdGlvbnMsIGFuZCBiaW5kcyBldmVudHNcbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxpemUoKSB7XG4gICAgY29uc3QgdG91ck9iamVjdCA9IG5ldyBTaGVwaGVyZC5Ub3VyKHtcbiAgICAgIGNvbmZpcm1DYW5jZWw6IHRoaXMuY29uZmlybUNhbmNlbCxcbiAgICAgIGNvbmZpcm1DYW5jZWxNZXNzYWdlOiB0aGlzLmNvbmZpcm1DYW5jZWxNZXNzYWdlLFxuICAgICAgZGVmYXVsdFN0ZXBPcHRpb25zOiB0aGlzLmRlZmF1bHRTdGVwT3B0aW9ucyxcbiAgICAgIHRvdXJOYW1lOiB0aGlzLnRvdXJOYW1lLFxuICAgICAgdXNlTW9kYWxPdmVybGF5OiB0aGlzLm1vZGFsLFxuICAgICAga2V5Ym9hcmROYXZpZ2F0aW9uOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRvdXJPYmplY3Qub24oXCJjb21wbGV0ZVwiLCB0aGlzLm9uVG91ckZpbmlzaC5iaW5kKHRoaXMsIFwiY29tcGxldGVcIikpO1xuICAgIHRvdXJPYmplY3Qub24oXCJjYW5jZWxcIiwgdGhpcy5vblRvdXJGaW5pc2guYmluZCh0aGlzLCBcImNhbmNlbFwiKSk7XG5cbiAgICB0aGlzLnRvdXJPYmplY3QgPSB0b3VyT2JqZWN0O1xuICB9XG59XG4iXX0=