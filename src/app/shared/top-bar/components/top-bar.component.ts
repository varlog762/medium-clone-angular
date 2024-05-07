import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';

import { CurrentUserInterface } from '../../types/current-user.interface';
import { authFeature } from '../../../auth/store/auth.feature';

@Component({
  selector: 'mc-top-bar',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent implements OnInit {
  public isLoggedIn$!: Observable<boolean | null>;
  public isAnonymous$!: Observable<boolean>;
  public currentUser$!: Observable<CurrentUserInterface | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(authFeature.selectIsLoggedIn);
    this.isAnonymous$ = this.store.select(authFeature.selectIsAnonymous);
    this.currentUser$ = this.store.select(authFeature.selectCurrentUser);
  }
}
