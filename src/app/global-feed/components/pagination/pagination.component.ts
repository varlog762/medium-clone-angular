import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

import { UtilsService } from '../../../shared/services/utils.service';
import { environment } from '../../../../environments/environment.development';

/**
 * The PaginationComponent handles the display and navigation of pagination controls.
 * It calculates the total pages based on input data and highlights the current page.
 */
@Component({
  selector: 'mc-pagination',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  /** The total number of articles */
  @Input('total') total!: number | undefined;

  /** The number of articles per page */
  @Input('limit') limit!: number;

  /** The base URL for generating pagination links */
  @Input('url') url!: string;

  /** The current page number */
  @Input('currentPage') currentPage!: number;

  /** The starting page number */
  public startPage!: number;

  /** The total number of pages */
  public pagesCount!: number;

  /** An array of page numbers */
  public pages!: number[];

  constructor(private utilsService: UtilsService) {}

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * Calculates the total number of pages and generates an array of page numbers.
   */
  ngOnInit(): void {
    if (this.total) {
      this.pagesCount = Math.ceil(this.total / this.limit);
    }

    this.startPage = environment.startPage;
    this.pages = this.utilsService.range(this.startPage, this.pagesCount);
  }
}
