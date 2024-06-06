import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {RouterModule} from '@angular/router';//import RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent,RouterModule],
  template: `
  <main>
    <header class="brand-name">
      <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
    </header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>
`,
  // templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'homes';
}
