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
import {customElement} from 'lit/decorators';

/**
 * @module TYPO3/CMS/DynamicGrid/GridContainerElement
 *
 * @example
 * <fof-typo3-dynamic-grid-control></fof-typo3-dynamic-grid-control>
 */
@customElement('fof-typo3-dynamic-grid-control')
export class GridControlElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  public render(): TemplateResult {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}
