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
                                    <div class="grid-item" id="grid-item-${containerIndex}-${itemIndex}" style="z-index: calc(290 - ( 10 * ${containerIndex}) - ${itemIndex})">
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
		</style>
            `;
        }
	firstUpdated() {
            this.requestUpdate()
        }
	
	updated() {
		$(window).on("resize drag click", function () {
			
			// the last content of a col can add a new content after itself in a new col on the right
			$('.grid-row .grid-item > div:last-child .btn-newcol' ).each(function(i,e)
			{
			  $(e).position({
			    my: "center center",
			    at: "right center",
			    of: '#' + $(e).parent().parent().attr('id'),
			    collision: "none none"
			   });
			});
			
			//the last content of a col can add a new content after itself in an existing col on the right
			$('.grid-item:not(:last-child) > div:last-child .btn-nextcol' ).each(function(i,e)
			{
			  $(e).position({
			    my: "center top",
			    at: "center-8 top",
			    of: '#' + $(e).parent().parent().next().attr('id'),
			    collision: "flipfit none"
			   });
			});
			
			
			//the last content of a all row can add a new content after itself in an existing row after in a new col
			$('.grid-row:not(:last-of-type) .grid-item:last-child > div:last-child .btn-nextrow' ).each(function(i,e)
			{
			  $(e).position({
			    my: "center center",
			    at: "left center",
			    of: '#' + $(e).parent().parent().parent().next().attr('id'),
			    collision: "flipfit none"
			   });
			});
			
			//the last content of a all row can add a new content after itself in an existing row after in a new col
			$('.grid-row:not(:last-of-type) .grid-item:last-child > div:last-child .btn-nextcol' ).each(function(i,e)
			{
			  $(e).position({
			    my: "center bottom",
			    at: "center-8 top-5",
			    of: '#' + $(e).parent().parent().parent().next().children('div:first-child').children('div:first-child').attr('id'),
			    collision: "flipfit none"
			   });
			   //hide button if there is no multiple column in the next existing row
			   if($(e).parent().parent().parent().next().children('div:only-child').length){
				   $(e).hide();
			   }
			});
			
			//the last content of a all row can add a new content after itself in a new row below
			$('.grid-row .grid-item:last-child > div:last-child .btn-newrow' ).each(function(i,e)
			{
			  $(e).position({
			    my: "left bottom",
			    at: "left-15 bottom+35",
			    of: '#' + $(e).parent().parent().parent().attr('id'),
			    collision: "flipfit none"
			   });
			});
			
			//add a content before the first existing content in a new col
			$('td > div.t3-page-ce > .btn-nextrow' ).each(function(i,e)
			{
			  $(e).position({
			    my: "center center",
			    at: "left center",
			    of: '#' + $(e).parent().next().children().children('div:first-child').children('div:first-child').attr('id'),
			    collision: "flipfit none"
			   });
			   
			   //hide button if there is no content in the colpos
			   //todo
			});
			
			//add a content before the first existing content in an existing col
			$('td > div.t3-page-ce > .btn-nextcol' ).each(function(i,e)
			{
			  $(e).position({
			    my: "center top",
			    at: "center-8 top",
			    of: '#' + $(e).parent().next().children().children('div:first-child').children('div:first-child').attr('id'),
			    collision: "flipfit none"
			   });
			   //hide button if there is no multiple column in the first existing row
			   if($('#grid-row-0').children('div:only-child').length){
				   $(e).hide();
			   }
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
