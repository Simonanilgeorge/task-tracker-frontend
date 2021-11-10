import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http:HttpClient) { }

  private url="http://localhost:5000/api/stocks"


  getAllStocks(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  addStock(data:any):Observable<any>{
    return this.http.post<any>(this.url,data)
  }

  deleteStock(id:any):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`)
  }

}
