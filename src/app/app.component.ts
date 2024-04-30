import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from './service/cards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cards';
  showEntryPage = true;

  constructor(private router: Router,private cards:CardsService) {}

  showLoginComponent(): void {
    this.showEntryPage = false; 
  }

  navigateToDashboard(): void {
    this.router.navigate(['/cards']);
  }

  logout(): void {
    this.cards.setAuthenticated(false); 
    this.router.navigate(['/login']);
  }
}
