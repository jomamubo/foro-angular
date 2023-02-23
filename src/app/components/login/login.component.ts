import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService} from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public identity: string;
  public token: string;

  constructor( 
    private _userService:UserService ,
    private _router: Router,
    private _route: ActivatedRoute
  ){ 
    this.page_title='Identificate';
    this.user = new User('','','','','','','ROLE_USER');
    this.status='';
    this.identity='';
    this.token='';
  }

  ngOnInit(): void {
  }

  onSubmit(form:any):void{
    // Conseguir objecto completo del usuario logueado
   this._userService.signup(this.user).subscribe(
      response=>{
        if(response.user && response.user._id){
          // Guardamos el usuario en una propiedad
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          // Conseguir el token del usuario logueado, enviamos, segundo parametro a true, 
          // para que me saque el token
          this._userService.signup(this.user, true).subscribe(
            response=>{
              if(response.token){

                // Guardar el token del usuario en una propiedad
                this.token = response.token;
                localStorage.setItem('token', this.token);

                this.status='success';
                this._router.navigate(['/inicio']);

                console.log(response);
              }else{
                this.status='error';
              }
            },
            error=>{
              this.status='error';
              console.log(error);
            }
          );

        }else{
          this.status='error';
        }

        form.reset();

      },
      error=>{
        this.status='error';
        console.log(error);
      }
    );
  }

}
