import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coin } from '../model/coin';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoinService {

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

    public getCoins(): Observable<Coin[]> {
        return this.http.get<any>(this.apiServerUrl + "/api/coin/all");
    }

    public addCoins(coin: Coin): Observable<Coin> {
      return this.http.post<Coin>(`${this.apiServerUrl}/api/coin/add`, coin);
    }

    public updateCoin(coin: Coin): Observable<Coin> {
      return this.http.put<Coin>(`${this.apiServerUrl}/api/coin/update`, coin);
    }

    public deleteCoin(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/api/coin/delete/${id}`);
    }

}