import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mc-top-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {}
