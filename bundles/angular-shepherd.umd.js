(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('shepherd.js')) :
    typeof define === 'function' && define.amd ? define('angular-shepherd', ['exports', '@angular/core', 'shepherd.js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['angular-shepherd'] = {}, global.ng.core, global.shepherd));
}(this, (function (exports, i0, Shepherd) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var Shepherd__default = /*#__PURE__*/_interopDefaultLegacy(Shepherd);

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
        var classes = button.classes, disabled = button.disabled, label = button.label, secondary = button.secondary, type = button.type, text = button.text;
        var builtInButtonTypes = ['back', 'cancel', 'next'];
        if (!type) {
            return button;
        }
        if (builtInButtonTypes.indexOf(type) === -1) {
            throw new Error("'type' property must be one of 'back', 'cancel', or 'next'");
        }
        return {
            action: this[type].bind(this),
            classes: classes,
            disabled: disabled,
            label: label,
            secondary: secondary,
            text: text
        };
    }

    var ShepherdService = /** @class */ (function () {
        function ShepherdService() {
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
        ShepherdService.prototype.back = function () {
            this.tourObject.back();
        };
        /**
         * Cancel the tour
         */
        ShepherdService.prototype.cancel = function () {
            this.tourObject.cancel();
        };
        /**
         * Complete the tour
         */
        ShepherdService.prototype.complete = function () {
            this.tourObject.complete();
        };
        /**
         * Hides the current step
         */
        ShepherdService.prototype.hide = function () {
            this.tourObject.hide();
        };
        /**
         * Advance the tour to the next step
         */
        ShepherdService.prototype.next = function () {
            this.tourObject.next();
        };
        /**
         * Show a specific step, by passing its id
         * @param id The id of the step you want to show
         */
        ShepherdService.prototype.show = function (id) {
            this.tourObject.show(id);
        };
        /**
         * Start the tour
         */
        ShepherdService.prototype.start = function () {
            this.isActive = true;
            this.tourObject.start();
        };
        /**
         * This function is called when a tour is completed or cancelled to initiate cleanup.
         * @param completeOrCancel 'complete' or 'cancel'
         */
        ShepherdService.prototype.onTourFinish = function (completeOrCancel) {
            this.isActive = false;
        };
        /**
         * Take a set of steps and create a tour object based on the current configuration
         * @param steps An array of steps
         */
        ShepherdService.prototype.addSteps = function (steps) {
            var _this = this;
            this._initialize();
            var tour = this.tourObject;
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
            steps.forEach(function (step) {
                if (step.buttons) {
                    step.buttons = step.buttons.map(makeButton.bind(_this), _this);
                }
                tour.addStep(step);
            });
        };
        /**
         * Observes the array of requiredElements, which are the elements that must be present at the start of the tour,
         * and determines if they exist, and are visible, if either is false, it will stop the tour from executing.
         */
        ShepherdService.prototype.requiredElementsPresent = function () {
            var _this = this;
            var allElementsPresent = true;
            /* istanbul ignore next: also can't test this due to things attached to root blowing up tests */
            this.requiredElements.forEach(function (element) {
                var selectedElement = document.querySelector(element.selector);
                if (allElementsPresent &&
                    (!selectedElement || elementIsHidden(selectedElement))) {
                    allElementsPresent = false;
                    _this.errorTitle = element.title;
                    _this.messageForUser = element.message;
                }
            });
            return allElementsPresent;
        };
        /**
         * Initializes the tour, creates a new Shepherd.Tour. sets options, and binds events
         */
        ShepherdService.prototype._initialize = function () {
            var tourObject = new Shepherd__default['default'].Tour({
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
        };
        return ShepherdService;
    }());
    /** @nocollapse */ ShepherdService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function ShepherdService_Factory() { return new ShepherdService(); }, token: ShepherdService, providedIn: "root" });
    ShepherdService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: "root",
                },] }
    ];
    /** @nocollapse */
    ShepherdService.ctorParameters = function () { return []; };

    /*
     * Public API Surface of shepherd
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ShepherdService = ShepherdService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-shepherd.umd.js.map
