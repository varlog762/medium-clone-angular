import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mc-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Input('total') total!: number | undefined;
  @Input('limit') limit!: number;
  @Input('url') url!: string;
  @Input('currentPage') currentPage!: number;

  public pagesCount!: number;
  public pages!: number[];

  ngOnInit(): void {
    if (this.total) {
      this.pagesCount = Math.ceil(this.total / this.limit);
    }

    this.pages = Array(this.pagesCount).fill(1);
    console.log(this.pages);
  }
}
