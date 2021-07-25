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
      :host {
        display: block;
      }
      .outer {
        border: 0.5em solid transparent;
      }
      .outer:hover {
        border: 0.5em solid grey;
      }
      .bottom {
        text-align: center;
      }
      button.add {
        background: orange;
      }
      button.add.left {
        position: absolute;
        top: 50%;
        left: -1em;
      }
      button.add.right {
        position: absolute;
        top: 50%;
        right: -1em;
      }

      .grid-row {
        border: 1px dotted grey;
        margin: 0 1em 1em 1em;
        padding: 1em;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(0px,1fr));
        position:relative;
      }

      .grid-item {
        position: relative;
        border: 1px dotted grey;
        padding: 0.5em;
        margin: 0.5em;
        display: grid;
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
