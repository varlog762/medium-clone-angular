import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { TopBarComponent } from './shared/top-bar/components/top-bar.component';
import { AuthActions } from './auth/store/auth.actions';

@Component({
  selector: 'mc-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.getCurrentUser());
  }
}
