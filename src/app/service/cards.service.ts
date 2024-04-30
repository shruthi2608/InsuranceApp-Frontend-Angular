import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { BehaviorSubject, Observable, throwError  } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardsService {
  baseUrl='https://localhost:44380/api/cards';

  constructor(private http:HttpClient) { }

  //get all cards
  getAllCards(): Observable<Card[]>{
  return this.http.get<Card[]>(this.baseUrl);
  }

  addCard(card:Card):Observable<Card>{
   return this.http.post<Card>(this.baseUrl,card);

  }

  delete(id:number):Observable<Card>{
    return this.http.delete<Card>(this.baseUrl + '/'+ id);
  }

  updateCard(card:Card):Observable<Card>{
    return this.http.put<Card>(this.baseUrl + '/'+ card.id,card);
  }

  checkLogin(loginId: string, username: string): Observable<boolean> {
    const url = `${this.baseUrl}/logins/${loginId}?username=${username}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        const loginSuccessful = response.success; 
        if (loginSuccessful) {
          this.setAuthenticated(true); 
        } else {
          this.setAuthenticated(false); 
        }
        return loginSuccessful;
      }),
      catchError(error => {
        console.error('Error occurred while checking login:', error);
        this.setAuthenticated(false); 
        return throwError('Error occurred while checking login'); 
      })
    );
  }


  getPoliciesByLoginId(loginId: string): Observable<any[]> {
    const url = `${this.baseUrl}/policies-with-login-details`;
    return this.http.get<any[]>(url).pipe(
      map(policies => {
        return policies.filter(policy => policy.loginId === parseInt(loginId));
      })
    );
  }

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);



  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }
  

}
