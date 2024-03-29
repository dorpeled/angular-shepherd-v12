import Shepherd from "shepherd.js";
export declare class ShepherdService {
    confirmCancel: boolean;
    confirmCancelMessage: string;
    defaultStepOptions: object;
    errorTitle: any;
    isActive: boolean;
    messageForUser: string;
    modal: boolean;
    requiredElements: any[];
    steps: any[];
    tourName: any;
    tourObject: Shepherd.Tour;
    constructor();
    /**
     * Get the tour object and call back
     */
    back(): void;
    /**
     * Cancel the tour
     */
    cancel(): void;
    /**
     * Complete the tour
     */
    complete(): void;
    /**
     * Hides the current step
     */
    hide(): void;
    /**
     * Advance the tour to the next step
     */
    next(): void;
    /**
     * Show a specific step, by passing its id
     * @param id The id of the step you want to show
     */
    show(id: any): void;
    /**
     * Start the tour
     */
    start(): void;
    /**
     * This function is called when a tour is completed or cancelled to initiate cleanup.
     * @param completeOrCancel 'complete' or 'cancel'
     */
    onTourFinish(completeOrCancel: string): void;
    /**
     * Take a set of steps and create a tour object based on the current configuration
     * @param steps An array of steps
     */
    addSteps(steps: Array<any>): void;
    /**
     * Observes the array of requiredElements, which are the elements that must be present at the start of the tour,
     * and determines if they exist, and are visible, if either is false, it will stop the tour from executing.
     */
    private requiredElementsPresent;
    /**
     * Initializes the tour, creates a new Shepherd.Tour. sets options, and binds events
     */
    private _initialize;
}
