import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-error-message',
  standalone: true,
  imports: [],
  template: '<div>{{message}}</div>',
})
export class ErrorMessageComponent {
  @Input('message') message: string = 'Something went wrong';
}
