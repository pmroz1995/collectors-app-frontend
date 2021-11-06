import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stamp } from '../model/stamp';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StampService {

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

    public getStamps(): Observable<Stamp[]> {
        return this.http.get<any>(this.apiServerUrl + "/api/stamp/all");
    }

    public addStamp(stamp: Stamp): Observable<Stamp> {
      return this.http.post<Stamp>(`${this.apiServerUrl}/api/stamp/add`, stamp);
    }

    public updateStamp(stamp: Stamp): Observable<Stamp> {
      return this.http.put<Stamp>(`${this.apiServerUrl}/api/stamp/update`, stamp);
    }

    public deleteStamp(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/api/stamp/delete/${id}`);
    }

}