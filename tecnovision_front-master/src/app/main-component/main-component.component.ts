import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css']
})
export class MainComponentComponent implements OnInit {

  flag: boolean;
  customerViewRoute: string;
  private userInfo;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(sessionStorage.getItem('userSessionInfo'));
    var userType = this.userInfo.userType;
    this.flag = (userType == 'administrator') ? true : false;
    if (!this.flag) {
      this.customerSpecificRoutes();
    }
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    var path = this.router.url;
    if (path == '/main') {
      sessionStorage.removeItem('userSessionInfo');
    }
  }

  customerSpecificRoutes(): void {
    var customerId = this.userInfo.userId;
    this.customerViewRoute = "/main/customer/view/".concat(customerId);
  }

  logOut(): void {
    this.router.navigate(['/login']);
    sessionStorage.removeItem('userSessionInfo');
    setTimeout(() => {
      alert('Has cerrado sesión');
    }, 200);
  }

}
