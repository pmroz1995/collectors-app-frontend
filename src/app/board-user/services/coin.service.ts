import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coin } from '../model/coin';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../services/login/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CoinService {

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private token: TokenStorageService) { }

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
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
      return this.http.delete<void>(`${this.apiServerUrl}/api/coin/delete/${id}`);
    }

    public getTotalPrice(): Observable<number> {
      return this.http.get<number>(`${this.apiServerUrl}/api/totalPrice/get/`)
    }

}