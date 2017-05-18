import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActionRegistry } from './model';
var FormElementComponent = (function () {
    function FormElementComponent(actionRegistry) {
        this.actionRegistry = actionRegistry;
        this.control = new FormControl('', function () { return null; });
        this.widget = null;
        this.buttons = [];
    }
    FormElementComponent.prototype.ngOnInit = function () {
        this.parseButtons();
    };
    FormElementComponent.prototype.parseButtons = function () {
        if (this.formProperty.schema.buttons !== undefined) {
            this.buttons = this.formProperty.schema.buttons;
            for (var _i = 0, _a = this.buttons; _i < _a.length; _i++) {
                var button = _a[_i];
                if (!button.type) {
                    button.type = 'button';
                }
                if (!button.CSSClass) {
                    button.CSSClass = [];
                }
                this.createButtonCallback(button);
            }
        }
    };
    FormElementComponent.prototype.createButtonCallback = function (button) {
        var _this = this;
        button.action = function (e) {
            var action;
            if (button.id && (action = _this.actionRegistry.get(button.id))) {
                if (action) {
                    action(_this.formProperty, button.parameters);
                }
            }
            e.preventDefault();
        };
    };
    FormElementComponent.prototype.onWidgetInstanciated = function (widget) {
        this.widget = widget;
        var id = 'field' + (FormElementComponent.counter++);
        this.widget.formProperty = this.formProperty;
        this.widget.schema = this.formProperty.schema;
        this.widget.name = id;
        this.widget.id = id;
        this.widget.control = this.control;
    };
    return FormElementComponent;
}());
export { FormElementComponent };
FormElementComponent.counter = 0;
FormElementComponent.decorators = [
    { type: Component, args: [{
                selector: 'sf-form-element',
                template: "\n    <div *ngIf=\"formProperty.visible\"\n      [class.has-error]=\"!control.valid\"\n\t    [class.has-success]=\"control.valid\">\n\t    <sf-widget-chooser\n\t      (widgetInstanciated)=\"onWidgetInstanciated($event)\"\n\t      [widgetInfo]=\"formProperty.schema.widget\">\n\t    </sf-widget-chooser>\n\t    <div class=\"jws-form-actions\">\n        <button class=\"btn\" [ngClass]=\"button.CSSClass\" [attr.type]=\"button.type\" *ngFor=\"let button of buttons\" (click)=\"button.action($event)\">{{button.label}}</button>\n      </div>\n    </div>"
            },] },
];
/** @nocollapse */
FormElementComponent.ctorParameters = function () { return [
    { type: ActionRegistry, },
]; };
FormElementComponent.propDecorators = {
    'formProperty': [{ type: Input },],
};
