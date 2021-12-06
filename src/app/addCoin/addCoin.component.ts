import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/login/user.service';
import { Coin } from './coin';
import { WatchService } from './watch.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CoinService } from '../services/coin.service';

@Component({
  selector: 'app-AddCoin',
  templateUrl: './addCoin.component.html',
  styleUrls: ['./addCoin.component.css']
})
export class AddCoin implements OnInit {
  content: string;
  public coins: Coin[] | undefined;
  public deleteCoin: Coin;

  constructor(
    private coinService: CoinService,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
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
  }  

}
