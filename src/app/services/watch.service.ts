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


}