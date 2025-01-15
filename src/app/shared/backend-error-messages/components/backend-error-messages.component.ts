import { Component, Input, OnInit } from '@angular/core';

import { BackendErrorsInterface } from '../../types/backend-errors.interface';

/**
 * Component for displaying backend error messages.
 * Accepts an object with error details and renders them as a list.
 */
@Component({
  selector: 'mc-backend-error-messages',
  standalone: true,
  imports: [],
  templateUrl: './backend-error-messages.component.html',
  styleUrl: './backend-error-messages.component.scss',
})
export class BackendErrorMessagesComponent implements OnInit {
  /**
   * Object containing backend error messages, where each key is a field name
   * and the value is an array of error messages.
   */
  @Input() backendErrors!: BackendErrorsInterface | null;

  /**
   * List of formatted error messages derived from the `backendErrors` input.
   */
  errorMessages!: string[];

  /**
   * Lifecycle hook to initialize the error messages list based on the `backendErrors` input.
   */
  ngOnInit(): void {
    if (this.backendErrors) {
      this.errorMessages = Object.keys(this.backendErrors).map(
        (name: string) => {
          const messages = this.backendErrors
            ? this.backendErrors[name].join(', ')
            : '';

          return `${name}: ${messages}`;
        }
      );
    }
  }
}
