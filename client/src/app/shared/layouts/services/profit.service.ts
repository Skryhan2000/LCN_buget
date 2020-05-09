
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, Profit } from '../interfaces';


@Injectable({
    providedIn: 'root'
})
export class ProfitService{
    constructor(private http: HttpClient){}

     fetch(): Observable<Profit[]> {
        return this.http.get<Profit[]>('/api/profit')
      }
    
      getById(id: string): Observable<Profit>{
       return this.http.get<Profit>(`/api/profit/${id}`)
      }

      create(profit: Profit): Observable<Profit>{
        return this.http.post<Profit>('/api/profit', profit)
    }

    update(profit: Profit): Observable<Profit>{
        return this.http.patch<Profit>(`/api/profit/${profit._id}`, profit)
    }

    delete(profit: Profit): Observable<Message>{
        return this.http.delete<Message>(`/api/profit/${profit._id}`)
    }
}