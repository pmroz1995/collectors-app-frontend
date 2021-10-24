import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Coin } from './coin';
import { CoinService } from './coin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public coins: Coin[] | undefined;

  constructor(private coinService: CoinService){}

  ngOnInit() {
    this.getCoins();
  }

  public getCoins(): void {
    this.coinService.getCoins().subscribe(
      (response: Coin[]) => {
        this.coins = response;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
