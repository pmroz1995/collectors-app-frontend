import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Watch } from '../model/watch';

@Injectable({
  providedIn: 'root',
})
export class WatchService {

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

    public getWatches(): Observable<Watch[]> {
        return this.http.get<any>(this.apiServerUrl + "/api/watch/all");
    }

    public addWatch(watch: Watch): Observable<Watch> {
      return this.http.post<Watch>(`${this.apiServerUrl}/api/watch/add`, watch);
    }

    public updateWatch(watch: Watch): Observable<Watch> {
      return this.http.put<Watch>(`${this.apiServerUrl}/api/watch/update`, watch);
    }

    public deleteWatch(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/api/watch/delete/${id}`);
    }

}