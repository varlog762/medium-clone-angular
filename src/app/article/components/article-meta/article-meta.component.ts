import { Component, Input, output } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ArticleInterface } from '../../../shared/types/article.interface';
import { AddToFollowComponent } from '../../../shared/add-to-follow/components/add-to-follow/add-to-follow.component';
import { AddToFavoritesComponent } from '../../../shared/add-to-favorites/components/add-to-favorites/add-to-favorites.component';
import { ConstantsEnum } from '../../../shared/enums/constants.enum';

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
  @Input() article!: ArticleInterface;
  @Input() isLoggedIn!: boolean | null;
  @Input() isAuthor!: boolean | null;

  deleteArticleEvent = output<void>();
  editArticleEvent = output<void>();

  defaultUserImage = ConstantsEnum.DEFAULT_USER_IMAGE as string;
}
