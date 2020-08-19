import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,} from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public url:string=environment.url;
 
  constructor(private http:HttpClient,private router:Router) { }
 
  login(obj:Object):Observable<any>{
    let m=this.http.post(this.url+"admin_login",obj);
   
    
    
    return m;
  }
  register(obj:Object):Observable<any>{
    let m=this.http.post(this.url+"teams/register",obj);
    return m;
  }
  editScore(webScore:Number,id:string,teamName:string):Observable<any>{
    let m={webScore:webScore,id:id,teamName:teamName}
    return this.http.put(this.url+"teams/editScore",m);
  }
  getTeams():Observable<any>{
    return this.http.get<any>(this.url+"getTeams").pipe(
      map(obj => {
        return obj;
      })
    )
  }

  changeScore(obj:Object):Observable<any>
  {
    return this.http.post<any>(this.url+"changeScore",obj)
    
  }
 
  teamLogin(team : Object) : Observable<any> {
    let obj = {
      error:null,
      team : null,
      questions : null,
    }
    return this.http.post<any>(this.url + "team/login", {teamNo : team['teamNo']}).pipe(
      map (result => {
      if (result['error']) {
        obj.error=true;
        obj.questions = [];
        obj.questions.push(result['message']);
      }
      else {
        obj.error=false;
        obj.team = result['team'];
      }
      return obj;
    }))
  }

  addQuestion(obj:Object):Observable<any>{
    let m=this.http.post<any>(this.url+"addQuestion",obj);
    return m;
  }
 
  getQues() : Observable<String[]> {
    return this.http.get<String[]>(this.url+"questions").pipe(
      map (ques => {
      return ques;
    }))
  }
 
  isLoggedIn():boolean{
  
    if(localStorage.getItem("admin-logged")=="true")
     { 
        
        
       return true;
    
       }  else
      return false;
  }
}