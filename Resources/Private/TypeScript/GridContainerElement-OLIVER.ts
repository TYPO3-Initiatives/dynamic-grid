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
  items: GridItem[];
}

interface GridItem {
  id: string;
  fraction: number;
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

  private index: number = 1;

  public render(): TemplateResult {
    return html`
      ${this.rows.map((row: GridRow) => html`
        <div class="grid-row" style="${this.styleRow(row)}">
          ${row.items.map((item: GridItem, itemIndex: number) => html`
            <div class="grid-item" style="${this.styleItem(item)}">
              ${itemIndex !== 0 ? '' : html`
                  <button class="left add" @click="${() => this.prependItem(row)}">+</button>
              `}
              <div>${item.id}</div>
              <button class="right add" @click="${() => this.appendItemAfter(row, item)}">+</button>
            </div>
          `)}
        </div>
      `)}
      <div class="bottom">
        <button class="add" @click="${this.appendRow}">+</button>
      </div>
      <div class="outer">
        <div class="body">
          <slot></slot>
        </div>
      </div>
    `;
  }

  public appendRow(): void
  {
    this.rows = [].concat(this.rows, [{items: [this.createGridItem()]}]);
  }

  public prependItem(row: GridRow): void
  {
    row.items = [].concat([this.createGridItem()], row.items);
    this.rows = [].concat(this.rows);
  }

  public appendItemAfter(row: GridRow, after: GridItem): void
  {
    const afterIndex = row.items.indexOf(after);
    row.items.splice(afterIndex + 1, 0, this.createGridItem());
    this.rows = [].concat(this.rows);
  }

  private styleRow(row: GridRow): DirectiveResult {
    return styleMap({'grid-template-areas': '"' + row.items.map((item: GridItem) => item.id).join(' ') + '"'});
  }

  private styleItem(item: GridItem): DirectiveResult {
    return styleMap({'grid-area': '"' + item.id + '"'});
  }

  private createGridItem(): GridItem {
    return {id: 'x' + this.index++, fraction: 1, entities: []};
  }
}
