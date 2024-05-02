import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input('total') total!: number;
  @Input('limit') limit!: number;
  @Input('url') url!: string;
  @Input('currentPage') currentPage!: number;
}
