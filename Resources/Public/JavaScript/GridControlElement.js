/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "lit", "lit/decorators"], function (require, exports, lit_1, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GridControlElement = void 0;
    /**
     * @module TYPO3/CMS/DynamicGrid/GridContainerElement
     *
     * @example
     * <fof-typo3-dynamic-grid-control></fof-typo3-dynamic-grid-control>
     */
    let GridControlElement = class GridControlElement extends lit_1.LitElement {
        render() {
            return lit_1.html `
      <div>
        <slot></slot>
      </div>
    `;
        }
    };
    GridControlElement.styles = [
        lit_1.css `
      :host {
        display: block;
      }
    `
    ];
    GridControlElement = __decorate([
        decorators_1.customElement('fof-typo3-dynamic-grid-control')
    ], GridControlElement);
    exports.GridControlElement = GridControlElement;
});
