import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Coin } from './model/coin';
import { CoinService } from './services/coin.service';
import { NgForm } from '@angular/forms';
import { Stamp } from './model/stamp';
import { StampService } from './services/stamp.service';
import { TotalPrice } from './model/totalPrice';
import { TotalPriceService } from './services/totalPrice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public coins: Coin[] | undefined;
  public stamps: Stamp[] | undefined; 
  public deleteCoin: Coin;
  public deleteStamp: Stamp;
  public totalPrices: TotalPrice[] | undefined;

  constructor(
    private coinService: CoinService,
    private stampService: StampService,
    private totalPriceSerice: TotalPriceService){}

  public refresh(): void {
    window.location.reload();
  }

  ngOnInit() {
    this.getCoins();
    this.getStamps();
    this.getTotalPrices();
  }


  // --------------------------------------------------------------------------------------------------------//
  // --------------------------------------------Coin--------------------------------------------------------//
  // --------------------------------------------------------------------------------------------------------//

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


  public onOpenModal(coin: Coin, mode: string): void {
    const button = document.createElement('button');
    const container = document.getElementById('main-container');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'update') {
      button.setAttribute('data-target', '#exampleModal');
    }
    if (mode === 'delete') {
      this.deleteCoin = coin;
      button.setAttribute('data-target', '#deleteCoinModal');  
    }
    container?.appendChild(button);
    button.click();
  }

  public onOpenModalAdd(mode: string): void {
    const button = document.createElement('button');
    const container = document.getElementById('main-container');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCoinModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddCoin(addForm: NgForm): void {
    document.getElementById("add-coin-button-id")?.click();
    this.coinService.addCoins(addForm.value).subscribe(
      (response: Coin) => {
        this.getCoins();
        this.getTotalPrices()
        console.log(response);
        addForm.reset();
        this.refresh()

      },
      (error: HttpErrorResponse) => {
        this.coinService.getCoins();
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onDeletCoin(coinId: number): void {
    this.coinService.deleteCoin(coinId).subscribe(
      (response: void) => {
        console.log(response);
        },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.refresh()
    this.getCoins()
  }  

  // --------------------------------------------------------------------------------------------------------//
  // --------------------------------------------Stamp--------------------------------------------------------//
  // --------------------------------------------------------------------------------------------------------//

  
  public getStamps(): void {
    this.stampService.getStamps().subscribe(
      (response: Stamp[]) => {
        this.stamps = response;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getTotalPrices(): void {
    this.totalPriceSerice.getTotalPrices().subscribe(
      (response: TotalPrice[]) => {
        this.totalPrices = response;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  

  public onOpenModalStamp(stamp: Stamp, mode: string): void {
    const button = document.createElement('button');
    const container = document.getElementById('main-container');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'delete') {
      this.deleteStamp = stamp;
      button.setAttribute('data-target', '#deleteStampModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onDeleteStamp(stampId: number): void {
    this.stampService.deleteStamp(stampId).subscribe(
      (response: void) => {
        console.log(response);
        },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.refresh()
    this.getStamps()
  } 

  public onOpenModalStampAdd(mode: string): void {
    const button = document.createElement('button');
    const container = document.getElementById('main-container');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addStampModal');
    }
    container?.appendChild(button);
    button.click();
  }


  public onAddStamp(addFormStamp: NgForm): void {
    document.getElementById("add-stamp-button-id")?.click();
    this.stampService.addStamp(addFormStamp.value).subscribe(
      (response: Stamp) => {
        this.getStamps();
        console.log(response);
        addFormStamp.reset()
        
      },
      (error: HttpErrorResponse) => {
        this.stampService.getStamps();
        alert(error.message);
      }
    );
  }



}
