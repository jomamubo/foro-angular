import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import {global} from '../../services/global';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status: string;
  public afuConfig;
  public url;

  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _userService: UserService
    ) { 
    this.page_title="Ajustes de usuario";
    this.identity = _userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.status='';
    this.url=global.url;

    this.afuConfig = {
        multiple: false,
        formatsAllowed: ".jpg,.jpeg,.png,.gif",
        maxSize: 50,
        uploadAPI:  {
          url: this.url+"upload-avatar",
          headers: {
            "Authorization" : this.token
          }
        },
        theme: "attachPin",
        hideProgressBar: false,
        hideResetBtn: true,
        hideSelectBtn: false,
        replaceTexts: {
          selectFileBtn: 'Sube tu avatar',
          resetBtn: 'Reset',
          uploadBtn: 'Upload',
          dragNDropBox: 'Drag N Drop',
          attachPinBtn: 'Sube tu foto...',
          afterUploadMsg_success: 'Successfully Uploaded !',
          afterUploadMsg_error: 'Upload Failed !',
          sizeLimit: 'Size Limit'
        }
    };
  }

  ngOnInit(): void {
  }

  avatarUpload(datos:any){
    //console.log("avatarUpload datos = " + JSON.stringify(datos));
    let data_obj = datos;
    this.user.image = data_obj.body.user.image;
    //console.log(this.user);

  }

  onSubmit(form:any):void{
    this._userService.update(this.user).subscribe(
      response=>{

        if(!response.user){
          this.status='error';
        }else{
          this.status='success';
          localStorage.setItem('identity', JSON.stringify(this.user));
        }

      },
      error=>{
        this.status='error';
        console.log(error);
      }
    );
  }
}
