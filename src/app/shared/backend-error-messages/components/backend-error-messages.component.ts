import { Component, Input, OnInit } from '@angular/core';

import { BackendErrorsInterface } from '../../types/backend-errors.interface';

@Component({
  selector: 'mc-backend-error-messages',
  standalone: true,
  imports: [],
  templateUrl: './backend-error-messages.component.html',
  styleUrl: './backend-error-messages.component.scss',
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input() backendErrors!: BackendErrorsInterface | null;

  public errorMessages!: string[];

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
