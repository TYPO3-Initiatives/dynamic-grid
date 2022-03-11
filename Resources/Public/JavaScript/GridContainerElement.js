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

	static properties = {
            colPos: { attribute: 'colpos' },
            rows: { attribute: 'rows' },
        };
	
        constructor() {
            super(...arguments);
            this.maxFractions = 12;
            this.index = 1;
	}
	
        render() {

            return lit_1.html `
	
	        ${this.rows.map((row) => lit_1.html `
	                ${row.colPos != this.colPos ? '' : lit_1.html `
                            ${row.containers.map((container, containerIndex) => lit_1.html `
	                        <div class="grid-row" id="grid-row-${containerIndex}">
                                ${container.items.map((item, itemIndex) =>  lit_1.html `
                                    <div class="grid-item" id="grid-item-${containerIndex}-${itemIndex}">
		                    ${item.entities.map(function(entity, entityIndex) {
				        entity.inner = document.querySelector('#element-tt_content-' + entity.identifier);
			                return lit_1.html `
			                    ${entity.inner}
				    `})}
                                    </div>
		                `)}
		                </div>
                            `)}
		        `}
	        `)}
		
      
		<style>
		    .t3-page-ce {
			margin: 20px 10px;
			transform:scale(1) !important;
		    }
		    .grid-row {
		        margin: 0;
		        padding: 0;
		        display: grid;
		        grid-template-columns: repeat(auto-fit, minmax(0px,1fr));
		        position:relative;
		    }
		    .grid-item {
		        position: relative;
		        padding: 0;
		        margin: 0;
		        display: grid;
			align-content: baseline;
			border:1px solid red;
		    }
		    .btn-newrow,
		    .btn-newcol,
		    .grid-row .grid-item:only-child .btn-newitem,
		    .btn-nextcol,
		    .btn-nextcol-nextrow {
		        display: none;
		    }
		    .grid-row .grid-item:only-child .btn-newrow,
                    .grid-row .grid-item:last-child > div:last-child .btn-newrow,
                    .grid-row .grid-item > div:last-child .btn-newcol {
		        display: block;
			position: absolute;
		    }
		    .t3-page-ce {
  		        position: static !important;
		    }
		    .btn-newitem {
			transform:translate(50%, -24px);
			margin-left:-24px;
		    }
		</style>
            `;
        }
	
	updated() {
		$(window).on("resize click", function () {
			$('.grid-row .grid-item > div:last-child .btn-newcol' ).each(function(i,e)
			{
			  $(e).position({
			    my: "center center",
			    at: "right center",
			    of: '#' + $(e).parent().parent().attr('id'),
			    collision: "none none"
			   });
			});
			
			$('.grid-row .grid-item:last-child > div:last-child .btn-newrow' ).each(function(i,e)
			{
			  console.log($(e).parent().parent().parent().attr('id'));
			  $(e).position({
			    my: "left bottom",
			    at: "left+10 bottom",
			    of: '#' + $(e).parent().parent().parent().attr('id'),
			    collision: "flipfit none"
			   });
			});
		// Invoke the resize event immediately on load
		}).resize();
		
	}
	
        createRenderRoot() {
        /**
           * Render template without shadow DOM. Note that shadow DOM features like
           * encapsulated CSS and slots are unavailable.
           */
	    return this;

	}
	
	
        styleRow(row) {
            return style_map_1.styleMap({ 'grid-template-areas': '"' + row.colPos.map((item) => item.id).join(' ') + '"' });
        }
        styleItem(item) {
            return style_map_1.styleMap({ 'grid-area': '"' + item.id + '"' });
        }
    };
    GridContainerElement.styles = [
        lit_1.css `
      :host {
        display: block;
      }
    `
    ];
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
