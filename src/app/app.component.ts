import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Coin } from './model/coin';
import { CoinService } from './services/coin.service';
import { NgForm } from '@angular/forms';
import { Stamp } from './model/stamp';
import { StampService } from './services/stamp.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public coins: Coin[] | undefined;
  public stamps: Stamp[] | undefined; 
  public deleteCoin: Coin;

  constructor(
    private coinService: CoinService,
    private stampService: StampService
  ){}

  public refresh(): void {
    window.location.reload();
  }

  ngOnInit() {
    this.getCoins();
    this.getStamps();
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
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'update') {
      button.setAttribute('data-target', '#exampleModal');
    }
    if (mode === 'delete') {
      this.deleteCoin = coin;
      button.setAttribute('data-target', '#deleteModal');  
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
        console.log(response);
        addForm.reset();
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
  







}
