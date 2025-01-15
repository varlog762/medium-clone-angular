import { Component, Input } from '@angular/core';

import { PopularTagType } from '../types/popular-tag.type';

/**
 * Component for displaying a list of tags on feed and article pages.
 */
@Component({
  selector: 'mc-tag-list',
  standalone: true,
  imports: [],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
})
export class TagListComponent {
  @Input('tags') tags!: PopularTagType[];
}
