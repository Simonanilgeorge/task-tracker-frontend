import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http:HttpClient) { }
  private url="http://localhost:5000/api/expenses"

  getAllExpenses():Observable<any>{
    return this.http.get<any>(this.url);
  }

  addExpense(data):Observable<any>
  {
    return this.http.post<any>(this.url,data)
  }

}
