import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,private router:Router) { }


  // this.http.get(url, header)
  private loginUrl = "http://localhost:5000/api/login"
  private registerUrl = "http://localhost:5000/api/register"

  login(data): Observable<any> {


    return this.http.post(this.loginUrl, data)
  }

  register(data): Observable<any> {

    return this.http.post(this.registerUrl, data)
  }

  testGetRegister() {
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${sessionStorage.getItem("token")}`)
    }
    return this.http.get(this.registerUrl, header)
  }

checkSessionStorage(){
  if(sessionStorage.getItem("token")){
    return
  }
  else{
    this.router.navigate(["/"])
  }
}

  logout() {

    sessionStorage.removeItem("token")

  }


}
