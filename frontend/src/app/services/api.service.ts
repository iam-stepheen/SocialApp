import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:Http ) { }
  //Api to handle Authentication
  auth(details){
    let headers = new Headers
    headers.append('Content-Type','application/json')
    return this.http.post('http://localhost:8080/api/auth',details,{headers})
    .map(res=>res.json())
  }
  freinds_functions(details){
    let headers = new Headers
    headers.append('Content-Type','application/json')
    return this.http.post('http://localhost:8080/api/freindrequest',details,{headers})
    .map(res=>res.json())
  }
  getuser(){
    const token = localStorage.getItem('token')
    //console.log(token)
    let headers = new Headers
    headers.append('Authorization',token)
    return this.http.get('http://localhost:8080/api/profile',{headers})
    .map(res=>res.json())
  }
  loggedIn() {

    return tokenNotExpired('token');
  } 
}
