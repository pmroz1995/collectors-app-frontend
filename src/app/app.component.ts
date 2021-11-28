import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Coin } from './model/coin';
import { CoinService } from './services/coin.service';
import { NgForm } from '@angular/forms';
import { Stamp } from './model/stamp';
import { StampService } from './services/stamp.service';
import { TotalPrice } from './model/totalPrice';
import { TotalPriceService } from './services/totalPrice.service';
import { Watch } from './model/watch';
import { WatchService } from './services/watch.service';
import { TokenStorageService } from './services/login/token-storage.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public coins: Coin[] | undefined;
  public stamps: Stamp[] | undefined; 
  public deleteCoin: Coin;
  public updateCoin: Coin;
  public deleteStamp: Stamp;
  public updateStamp: Stamp;
  public totalPrices: TotalPrice[] | undefined;
  public watches: Watch[] | undefined;
  public updateWatch: Watch;
  public deleteWatch: Watch;

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(
    private coinService: CoinService,
    private stampService: StampService,
    private totalPriceSerice: TotalPriceService,
    private watchService: WatchService,
    private tokenStorageService: TokenStorageService){}

  public refresh(): void {
    window.location.reload();
  }

  ngOnInit() {
    this.getCoins();
    this.getStamps();
    this.getTotalPrices();
    this.getWatches();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
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
      this.updateCoin = coin;
      button.setAttribute('data-target', '#updateCoinModal');
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

  public onUpdateCoin(coin: Coin): void {
    this.coinService.updateCoin(coin).subscribe(
      (response: Coin) => {
        console.log(response);
        this.getCoins();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      
    );
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
    if (mode === 'update') {
      this.updateStamp = stamp;
      button.setAttribute('data-target', '#updateStampModal');
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
        this.refresh()
        
      },
      (error: HttpErrorResponse) => {
        this.stampService.getStamps();
        alert(error.message);
      }
    );
  }

  public onUpdateStamp(stamp: Stamp): void {
    this.stampService.updateStamp(stamp).subscribe(
      (response: Stamp) => {
        console.log(response);
        this.getStamps();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      
    );
  }

    // --------------------------------------------------------------------------------------------------------//
    // -------------------------------------------Watch--------------------------------------------------------//
    // --------------------------------------------------------------------------------------------------------//

    public getWatches(): void {
      this.watchService.getWatches().subscribe(
        (response: Watch[]) => {
          this.watches = response;
  
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }

    public onOpenModalWatch(watch: Watch, mode: string): void {
      const button = document.createElement('button');
      const container = document.getElementById('main-container');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'delete') {
        this.deleteWatch = watch;
        button.setAttribute('data-target', '#deleteWatchModal');
      }
      if (mode === 'update') {
        this.updateWatch = watch;
        button.setAttribute('data-target', '#updateWatchModal');
      }
      if (mode === 'delete') {
        this.deleteWatch = watch;
        button.setAttribute('data-target', '#deleteWatchModal');
      }
  
      container?.appendChild(button);
      button.click();
    }

    public onOpenModalWatchAdd(mode: string): void {
      const button = document.createElement('button');
      const container = document.getElementById('main-container');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        button.setAttribute('data-target', '#addWatchModal');
      }
      container?.appendChild(button);
      button.click();
    }

    public onAddWatch(addWatchForm: NgForm): void {
      document.getElementById("add-coin-button-id")?.click();
      this.watchService.addWatch(addWatchForm.value).subscribe(
        (response: Watch) => {
          this.getWatches();
          console.log(response);
          this.refresh();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          this.getWatches();
          addWatchForm.reset();
        }
      );
    }

    public onUpdateWatch(updateWatchForm: Watch): void {
      this.watchService.updateWatch(updateWatchForm).subscribe(
        (response: Watch) => {
          console.log(response);
          this.getWatches();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        
      );
    }

    public onDeleteWatch(watchId: number): void {
      this.watchService.deleteWatch(watchId).subscribe(
        (response: void) => {
          console.log(response);
          },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      this.refresh()
      this.getWatches()
    } 

}
