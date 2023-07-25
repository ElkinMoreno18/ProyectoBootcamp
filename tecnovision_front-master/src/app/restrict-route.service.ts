import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestrictRouteService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let activate = false;
    let component = (route.parent.url.toString() != '') ? route.parent.url.toString() : route.url.toString();  // -> Verifica el componente a inicializar //
    if (sessionStorage.length > 0) {
      const userType = JSON.parse(sessionStorage.getItem('userSessionInfo')).userType;
      if (component != 'main') {
        let operation = route.params.operation; // operacion para el componente
        if (this.validateOperations(operation) == true) {
          if (userType == 'administrator') {
            activate = ((component == 'order' && operation == 'save') || (component == 'customer' && operation == 'register')) ? false : true;
          } else {
            activate = ((component == 'customer' && (operation != 'save' && operation != 'list')) || component == 'order') ? true : false;
          }
        }
        if (!activate) {
          this.navigateTo('main', 'Página no encontrada!!!')
        }
      } else {
        activate = true;
      }
    } else {
      if(route.params.operation == 'register'){
        activate = true;
      } else if (!activate) {
        this.navigateTo('login', 'Acceso no autorizado, por favor inicie sesión');
      }
    }
    return activate;
  }

  navigateTo(component: string, message: string): void {
    this.router.navigate(['/' + component + '']);
    setTimeout(() => {
      alert(message);
    }, 100);
  }


  validateOperations(operation: string): boolean {
    let flag = false;
    const operations = ['save', 'view', 'list'];
    operations.forEach(element => {
      if (element == operation) {
        flag = true;
      }
    });
    return flag;
  }

}
