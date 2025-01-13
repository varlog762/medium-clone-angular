import { Component, Input, output } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ArticleInterface } from '../../../shared/types/article.interface';
import { AddToFollowComponent } from '../../../shared/add-to-follow/components/add-to-follow/add-to-follow.component';
import { AddToFavoritesComponent } from '../../../shared/add-to-favorites/components/add-to-favorites/add-to-favorites.component';
import { ConstantsEnum } from '../../../shared/enums/constants.enum';

/**
 * This component is responsible for displaying metadata of an article,
 * such as the author's details, publication date, and controls for
 * interacting with the article. It allows:
 * - Displaying the author's username and avatar.
 * - Showing the article's publication date.
 * - Providing options for the author to edit or delete the article.
 * - Allowing users to follow the author or mark the article as a favorite.
 */
@Component({
  selector: 'mc-article-meta',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    AddToFollowComponent,
    AddToFavoritesComponent,
  ],
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.scss'],
})
export class ArticleMetaComponent {
  /** The article object containing all the metadata of the article */
  @Input() article!: ArticleInterface;

  /** Whether the current user is logged in or not */
  @Input() isLoggedIn!: boolean | null;

  /** Whether the current user is the author of the article */
  @Input() isAuthor!: boolean | null;

  /** Emitted when the user wants to edit the article */
  deleteArticleEvent = output<void>();

  /** Emitted when the user wants to delete the article */
  editArticleEvent = output<void>();

  /** Default image used for users without a profile picture */
  readonly defaultUserImage = ConstantsEnum.DEFAULT_USER_IMAGE as string;
}
