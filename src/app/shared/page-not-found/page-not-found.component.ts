import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

/**
 * Component for displaying a page not found message.
 */
@Component({
  selector: 'mc-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
  private location = inject(Location);

  goBack(): void {
    this.location.back();
  }
}
