import { Component, Input, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { addToFollowActions } from '../../store/add-to-follow.actions';

@Component({
  selector: 'mc-add-to-follow',
  standalone: true,
  imports: [],
  templateUrl: './add-to-follow.component.html',
  styleUrl: './add-to-follow.component.scss',
})
export class AddToFollowComponent implements OnInit {
  @Input('isFollwed') isFollowedProps!: boolean;
  @Input('username') usernameProps!: string;

  isFollowed!: boolean;
  store = inject(Store);

  ngOnInit(): void {
    this.isFollowed = this.isFollowedProps;
  }

  handleFollowing(): void {
    this.store.dispatch(
      addToFollowActions.followUser({
        username: this.usernameProps,
        isFollowed: this.isFollowed,
      })
    );
    this.isFollowed = !this.isFollowed;
  }
}
