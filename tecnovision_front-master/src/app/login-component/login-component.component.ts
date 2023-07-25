import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer-component/customer';
import { LoginServiceService } from '../services/login-service.service';
import { Administrator } from '../administrator-component/administrator';
import { TimeoutError } from 'rxjs';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {

  user: string = '';
  password: string = '';
  message: string;
  customer: Customer;
  fieldTextType: boolean;
  hide: boolean = true;

  constructor(private loginService: LoginServiceService, private route: Router) { }

  ngOnInit(): void {    
    sessionStorage.removeItem('userSessionInfo');
  }

  onSubmit(): void {
    var object = '';
    var type = '';
    if (this.user.includes('tecnovision')) {
      const administrator = new Administrator();
      administrator.email = this.user;
      administrator.password = this.password;
      object = JSON.stringify(administrator);
      type = 'administrator';
    } else {
      const customer = new Customer();
      customer.email = this.user;
      customer.password = this.password;
      object = JSON.stringify(customer);
      type = 'customer';
    }
    this.login(object, type);
  }

  private login(object: string, type: string): void {
    this.loginService.checkLogin(object, type).subscribe(
      result => {
        try {
          if (result instanceof TimeoutError) {
            throw new Error("Error de conexión con el servidor");
          } else {
            this.validateLogin(result);
          }
        } catch (e) {
          this.message = e;
          this.hide = false;
          setTimeout(() => {
            this.hide = true;
          }, 3000);
        }
      }
    );
  }

  private validateLogin(response: string[]): void {
    var userId = parseInt(response[0]);
    if (userId > 0) {
      const data = { userId: response[0], userType: response[1] };
      sessionStorage.setItem('userSessionInfo', JSON.stringify(data));
      this.route.navigate(['/main']);
    } else {
      alert('Credenciales incorrectas!!!');
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
