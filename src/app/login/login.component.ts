import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from '../service/cards.service';
import { ToastrService } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginId!: string;
  username!: string;

  constructor(
    private cardsService: CardsService,
    private router: Router,
    private toastr:ToastrService 
  ) { }

  login(): void {
    if (this.loginId && this.username) {
      this.cardsService.checkLogin(this.loginId, this.username).subscribe(
        (loginSuccessful: boolean) => {
          if (loginSuccessful) {
            this.cardsService.setAuthenticated(true);
            this.toastr.success('Login successful ', ' ✓ Success');
          
            this.router.navigate(['/policy', this.loginId]);
          } else {
            this.toastr.error('Invalid login ID or username', ' X Error');
          }
        },
        error => {
          console.error('Error occurred while checking login:', error);
          this.toastr.error('Error occurred while checking login', ' X Error');
        }
      );
    } else {
      this.toastr.warning('Please enter login ID and username', ' ! Warning');
    }
  }
}
