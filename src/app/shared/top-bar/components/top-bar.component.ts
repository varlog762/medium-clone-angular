import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';

import { CurrentUserInterface } from '../../types/current-user.interface';
import { authFeature } from '../../../auth/store/auth.state';
import { ConstantsEnum } from '../../enums/constants.enum';

@Component({
  selector: 'mc-top-bar',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean | null>;
  isAnonymous$!: Observable<boolean>;
  currentUser$!: Observable<CurrentUserInterface | null>;

  defaultUserImage = ConstantsEnum.DEFAULT_USER_IMAGE;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(authFeature.selectIsLoggedIn);
    this.isAnonymous$ = this.store.select(authFeature.selectIsAnonymous);
    this.currentUser$ = this.store.select(authFeature.selectCurrentUser);
  }
}
