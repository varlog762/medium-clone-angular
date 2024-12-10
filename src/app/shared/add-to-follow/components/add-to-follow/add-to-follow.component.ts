import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';

import { addToFollowActions } from '../../store/add-to-follow.actions';
import { addToFollowFeature } from '../../store/add-to-follow.state';

@Component({
  selector: 'mc-add-to-follow',
  standalone: true,
  imports: [],
  templateUrl: './add-to-follow.component.html',
  styleUrl: './add-to-follow.component.scss',
})
export class AddToFollowComponent implements OnInit, OnDestroy {
  @Input({ alias: 'isFollowed' }) isFollowedProps!: boolean;
  @Input({ alias: 'username' }) usernameProps!: string;
  @Input({ alias: 'isLoggedIn' }) isLoggedInProps!: boolean | null;

  isFollowed!: boolean;
  isFollowedSubscription!: Subscription;
  store = inject(Store);
  router = inject(Router);

  ngOnInit(): void {
    this.initializeListeners();
  }

  initializeListeners(): void {
    this.isFollowedSubscription = this.store
      .select(addToFollowFeature.selectIsFollowed)
      .subscribe((isFollowed: boolean | null) => {
        this.isFollowed = isFollowed ?? this.isFollowedProps;
      });
  }

  handleFollowing(): void {
    if (this.isLoggedInProps) {
      this.store.dispatch(
        addToFollowActions.followUser({
          username: this.usernameProps,
          isFollowed: this.isFollowed,
        })
      );
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnDestroy(): void {
    this.isFollowedSubscription.unsubscribe();
  }
}
