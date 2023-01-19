import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Users } from '../../models/users';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide: boolean = true;

  loading: boolean = false;

  constructor( private userService: UserServiceService, private _snackBar: MatSnackBar ) { }


  /***** */

  datos: Users = {
    id: '',
    email: '',
    password: '',
  };

  /******/

  usuariosArray = new Array();

  Login() {
    if(this.datos.email !== '' && this.datos.password !== '') {
      this.fakeLoading();
    } else {
      this.Error()
    }
  }

  // Button Error SnackBar 
  Error() {
    this._snackBar.open('Por favor, rellene los campos', 'Cerrar', {
      duration: 3000,
    });
  }

  ShowService() {
    this.userService.postUser(this.datos).subscribe(
      (usuario: Users) => this.usuariosArray.push(usuario));
  }

  fakeLoading() {
    this.loading = true;
    this.ShowService()
    setTimeout(() => {
      this.loading = false;
    }, 1500)
  }

  ngOnInit(): void {
  }
}
