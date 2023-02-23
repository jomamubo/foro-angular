import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../../models/topic';
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UserService, TopicService]
})
export class ListComponent implements OnInit {

  public page_title: string;
  public topics: Array<Topic>;
  public identity:any;
  public token:any;
  public status:string;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) { 
    this.page_title="Mis temas";
    this.topics = [];
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.status="success";
  }

  ngOnInit(): void {
    this.getTopic();
  }

  getTopic(){
    var userId = this.identity._id;
    this._topicService.getTopicsByUser(userId).subscribe(
      response=>{
        if(response.topics){
          this.topics = response.topics;
        }
      },
      error=>{
        console.log(error);
      }
    );
  }


  deleteTopic(topicId:any):void{
    this._topicService.deleteTopic(this.token, topicId).subscribe(
        response=>{
          this.getTopic();
        },
        error=>{
          console.log(error);
        }
      );
  }
  

}
