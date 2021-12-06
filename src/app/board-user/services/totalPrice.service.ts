import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TotalPrice } from '../model/totalPrice';

@Injectable({
  providedIn: 'root',
})
export class TotalPriceService {

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

    public getTotalPrices(): Observable<TotalPrice[]> {
        return this.http.get<any>(this.apiServerUrl + "/api/totalPrice/get");
    }


}