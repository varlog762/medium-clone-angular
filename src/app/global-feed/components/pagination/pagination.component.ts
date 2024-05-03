import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

import { UtilsService } from '../../../shared/services/utils.service';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'mc-pagination',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Input('total') total!: number | undefined;
  @Input('limit') limit!: number;
  @Input('url') url!: string;
  @Input('currentPage') currentPage!: number;

  public startPage!: number;
  public pagesCount!: number;
  public pages!: number[];

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    if (this.total) {
      this.pagesCount = Math.ceil(this.total / this.limit);
    }

    this.startPage = environment.startPage;
    this.pages = this.utilsService.range(this.startPage, this.pagesCount);
  }
}
