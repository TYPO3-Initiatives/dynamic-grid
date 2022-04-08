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

import {html, css, LitElement, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators';
import {styleMap} from 'lit-html/directives/style-map';
import {DirectiveResult} from 'lit-html/directive';

interface GridRow {
  /* items: GridItem[]; */
  containers: RowInnerContainer[];
}

interface RowInnerContainer {
  items: GridItem[];
  id: string;
  fraction: number;
}

interface GridItem {
  id: string;
  fraction: number;
  size: number;
  entities: EntityPointer[];
}

interface EntityPointer {
  name: string;
  identifier: string;
}

/**
 * @module TYPO3/CMS/DynamicGrid/GridContainerElement
 *
 * @example
 * <fof-typo3-dynamic-grid-container></fof-typo3-dynamic-grid-container>
 */
@customElement('fof-typo3-dynamic-grid-container')
export class GridContainerElement extends LitElement {
  @property({type: Array, reflect: true}) rows: GridRow[] = [];
  @property({type: Number}) maxFractions: Number = 12;

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
  protected createRenderRoot(): HTMLElement | ShadowRoot {
    return this;
  }

  private index: number = 1;

  public render(): TemplateResult {
    /*

        <!-- AK: ...realy ugly solution, but for now it works while requiring the backend css here -->
        <link rel="stylesheet" href="/typo3/sysext/backend/Resources/Public/Css/backend.css" media="all">
    */
    return html`
        ${this.rows.map((row: GridRow) => html`
            ${row.containers.map((container: RowInnerContainer, containerIndex: number) => html`
                <div class="grid-row" id="grid-row-${containerIndex}">
                    ${container.items.map((item: GridItem, itemIndex) => html`
                        <div class="grid-item" id="grid-item-${containerIndex}-${itemIndex}" style="z-index: calc(290 - ( 10 * ${containerIndex}) - ${itemIndex})">
                            ${item.entities.map((entity: EntityPointer, entityIndex) => html `
                                ${this.insertContentElement(entity.identifier)}
                            `)}
                        </div>
                    `)}
                </div>
            `)}
        `)}
    `;

  }

  public appendRow(): void
  {
    this.rows = [].concat(this.rows, [{items: [this.createGridItem()]}]);
  }

  public prependItem(row: GridRow): void
  {
    row.containers = [].concat([this.createGridItem()], row.containers);
    this.rows = [].concat(this.rows);
  }

  public appendItemAfter(row: GridRow, after: RowInnerContainer): void
  {
    const afterIndex = row.containers.indexOf(after);
    row.containers.splice(afterIndex + 1, 0, this.createRowInnerContainer());
    this.rows = [].concat(this.rows);
  }

  private styleRow(row: GridRow): DirectiveResult {
    return styleMap({'grid-template-areas': '"' + row.containers.map((container: RowInnerContainer) => container.id).join(' ') + '"'});
  }

  private styleItem(item: GridItem): DirectiveResult {
    return styleMap({'grid-area': '"' + item.id + '"'});
  }

  private createRowInnerContainer(): RowInnerContainer {
    return {items: [], id: 'x', fraction: 1};
  }

  private createGridItem(): GridItem {
    return {id: 'x' + this.index++, fraction: 1, entities: [], size: 1};
  }

  // look for the rendered content element and move that to the right position
  private insertContentElement(identifier: string): TemplateResult {
    let contentElement = document.querySelector('#element-tt_content-' + identifier);
    return html `
        ${contentElement}
    `;
  }
}
