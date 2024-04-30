import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CardsService } from './service/cards.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cardsService: CardsService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.cardsService.isAuthenticated().pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
            alert("Not accessible, try after successful login !");
          this.router.navigate(['/login']); 
        }
        
      })
    );
  }
}
