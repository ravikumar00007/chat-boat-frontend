import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://3.85.209.54:4041/show'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<string>(this.apiUrl, JSON.stringify({ text: message }), { headers, responseType: 'text' as 'json' });
  }
}
