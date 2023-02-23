import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../../models/topic';
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../add/add.component.html', // Reutilizamos la vista de Creacion
  styleUrls: ['./edit.component.css'],
  providers: [UserService, TopicService]
})
export class EditComponent implements OnInit {
  
  public page_title: string;
  public topic:Topic;
  public identity:any;
  public token:any;
  public status:string;
  public is_edit: any;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
    ) { 
    this.page_title="Editar tema";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('','','','','','',this.identity._id, null);
    this.status='';
    this.is_edit=true;
  }

  ngOnInit(): void {
    this.getTopic();
  }

  getTopic(){
    this._route.params.subscribe(params =>{
      let id=params['id'];

      this._topicService.getTopic(id).subscribe(
        response=>{
          if(!response.topic)
              this._router.navigate(['/panel']);
          else
            this.topic = response.topic;
        },
        error =>{
          console.log(error);
        }
      );
    });
  }

  onSubmit(form:any):void{

    this._topicService.update(this.token, this.topic._id, this.topic).subscribe(
      response=>{
        console.log("onSubmit Update Topic response = " + JSON.stringify(response));
        let respJson = JSON.parse(JSON.stringify(response));
        console.log("respJson.topic = " + respJson.topic);

        if(respJson.topic){
          this.status='success';
          this.topic = response.topic;
          //this._router.navigate(['/panel']);
        }else{
          this.status = 'error';
        }
        
      },
      error=>{
        this.status='error';
        console.log(error);
      }
    );
  }

}
