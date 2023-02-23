import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService{

	public url: string; 
	public identity:any;
  	public token:any;


	constructor(private _http: HttpClient){
		this.url = global.url;		
	}

	prueba(){
		return "Hola mundo desde un servicio de Angular";
	}

	register(user:any):Observable<any>{
		// Convertir el objecto del usuario a un json string
		let params = JSON.stringify(user);

		// Definir las cabeceras
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		// Hacer peticion AJAX
		return this._http.post(this.url+'register', params, { headers: headers});

	}

	signup(user:any, gettoken:any=null):Observable<any>{
		// Comprobar si llega gettoken
		if(gettoken != null){
			user.gettoken = gettoken;
		}

		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url+'login', params, {headers:headers});
		
	}

	getIdentity(){
		// Parseamos desde el local storage
		let identity = JSON.parse(localStorage.getItem('identity') || '{}');

		if(identity && identity != null && identity != undefined && identity != "undefined")
			this.identity = identity;
		else 
			this.identity = null;

		return this.identity;
	}

	getToken(){
		// Parseamos desde el local storage
		let token = localStorage.getItem('token');

		if(token && token != null && token != undefined && token != "undefined")
			this.token = token;
		else 
			this.token=null;

		return this.token;

	}

	update(user:any):Observable<any>{
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
										.set('Authorization', this.getToken());

		return this._http.put(this.url+'user/update', params, {headers:headers});
	}

	getUsers():Observable<any>{
		return this._http.get(this.url+'users');
	}


	getUser(userId:any):Observable<any>{
		return this._http.get(this.url+'user/'+userId);
	}
	
}