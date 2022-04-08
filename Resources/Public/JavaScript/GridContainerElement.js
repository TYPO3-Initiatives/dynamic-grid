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
define(["require", "exports", "lit", "lit/decorators", "lit-html/directives/style-map"], function (require, exports, lit_1, decorators_1, style_map_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GridContainerElement = void 0;
    /**
     * @module TYPO3/CMS/DynamicGrid/GridContainerElement
     *
     * @example
     * <fof-typo3-dynamic-grid-container></fof-typo3-dynamic-grid-container>
     */
    let GridContainerElement = class GridContainerElement extends lit_1.LitElement {
        constructor() {
            super(...arguments);
            this.rows = [];
            this.maxFractions = 12;
            this.index = 1;
        }
        /*
        // static styles don`t work since we deactivated the shadow dom
        
          static styles = [
            css`
            .t3-page-ce {
                margin: 10px;
                transform:scale(1) !important;
                z-index:299;
            }
            .t3-page-ce-hidden{
                opacity: 1;
            }
            .t3-page-ce-hidden .t3-page-ce-dragitem{
                opacity: 0.4;
            }
            .grid-row {
                margin: 45px 25px;
                padding: 0;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(0px,1fr));
                position:relative;
            }
            .grid-row:first-child {
                margin-top: 0;
            }
            .grid-item {
                position: relative;
                padding: 20px 0;
                margin: 0;
                display: grid;
                align-content: baseline;
                border-left:1px dashed #cdcdcd;
                border-bottom:1px dashed #cdcdcd;
                border-top:1px dashed #cdcdcd;
              }
            .grid-item:last-child {
                border-right: 1px dashed #cdcdcd;
            }
            .btn-newrow {
                margin: 10px 0;
            }
            .grid-row .grid-item .btn-newrow,
            .grid-row .grid-item .btn-newcol,
            .grid-row .grid-item:only-child .btn-newitem,
            .btn-nextcol,
            .btn-nextrow {
                display: none;
            }
            .grid-row .grid-item:only-child .btn-newrow,
            .grid-row .grid-item:last-child > div:last-child .btn-newrow,
            .grid-row .grid-item > div:last-child .btn-newcol,
            .grid-item:not(:last-child) > div:last-child .btn-nextcol,
            .grid-row:not(:last-of-type) .grid-item:last-child > div:last-child .btn-nextcol,
            .grid-row:not(:last-of-type) .grid-item:last-child > div:last-child .btn-nextrow,
            td > div.t3-page-ce > .btn-nextcol,
            td > div.t3-page-ce > .btn-nextrow {
                display: block;
                position: absolute;
            }
            td > div.t3-page-ce > .btn-nextcol {
                border:1px solid red;
            }
            .grid-row:not(:last-of-type) .grid-item:last-child > div:last-child .btn-nextcol {
                //border:1px solid red;
            }
            .grid-item:not(:last-child) > div:last-child .btn-nextcol {
                //border: 1px solid blue;
            }
            .grid-row:not(:last-of-type) .grid-item:last-child > div:last-child .btn-nextrow {
                //border: 1px solid green;
            }
            .btn-newitem {
                position: absolute;
                bottom: -18px;
                left: 50%;
                margin-left:-24px;
            }
            `
          ];
         */
        // disable shadow dom for now...
        createRenderRoot() {
            return this;
        }
        render() {
            /*
        
                <!-- AK: ...realy ugly solution, but for now it works while requiring the backend css here -->
                <link rel="stylesheet" href="/typo3/sysext/backend/Resources/Public/Css/backend.css" media="all">
            */
            return lit_1.html `
        ${this.rows.map((row) => lit_1.html `
            ${row.containers.map((container, containerIndex) => lit_1.html `
                <div class="grid-row" id="grid-row-${containerIndex}">
                    ${container.items.map((item, itemIndex) => lit_1.html `
                        <div class="grid-item" id="grid-item-${containerIndex}-${itemIndex}" style="z-index: calc(290 - ( 10 * ${containerIndex}) - ${itemIndex})">
                            ${item.entities.map((entity, entityIndex) => lit_1.html `
                                ${this.insertContentElement(entity.identifier)}
                            `)}
                        </div>
                    `)}
                </div>
            `)}
        `)}
    `;
        }
        appendRow() {
            this.rows = [].concat(this.rows, [{ items: [this.createGridItem()] }]);
        }
        prependItem(row) {
            row.containers = [].concat([this.createGridItem()], row.containers);
            this.rows = [].concat(this.rows);
        }
        appendItemAfter(row, after) {
            const afterIndex = row.containers.indexOf(after);
            row.containers.splice(afterIndex + 1, 0, this.createRowInnerContainer());
            this.rows = [].concat(this.rows);
        }
        styleRow(row) {
            return style_map_1.styleMap({ 'grid-template-areas': '"' + row.containers.map((container) => container.id).join(' ') + '"' });
        }
        styleItem(item) {
            return style_map_1.styleMap({ 'grid-area': '"' + item.id + '"' });
        }
        createRowInnerContainer() {
            return { items: [], id: 'x', fraction: 1 };
        }
        createGridItem() {
            return { id: 'x' + this.index++, fraction: 1, entities: [], size: 1 };
        }
        // look for the rendered content element and move that to the right position
        insertContentElement(identifier) {
            let contentElement = document.querySelector('#element-tt_content-' + identifier);
            return lit_1.html `
        ${contentElement}
    `;
        }
    };
    __decorate([
        decorators_1.property({ type: Array, reflect: true })
    ], GridContainerElement.prototype, "rows", void 0);
    __decorate([
        decorators_1.property({ type: Number })
    ], GridContainerElement.prototype, "maxFractions", void 0);
    GridContainerElement = __decorate([
        decorators_1.customElement('fof-typo3-dynamic-grid-container')
    ], GridContainerElement);
    exports.GridContainerElement = GridContainerElement;
});
