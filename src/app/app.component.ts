import { Component, OnInit } from '@angular/core';
import { Coin } from './model/coin';
import { Stamp } from './model/stamp';
import { TotalPrice } from './model/totalPrice';
import { Watch } from './model/watch';
import { TokenStorageService } from './services/login/token-storage.service';
import { WatchService } from './services/watch.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


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
    private watchService: WatchService,
    private tokenStorageService: TokenStorageService){}

  public refresh(): void {
    window.location.reload();
  }

  ngOnInit() {

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
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.getWatches();
        addWatchForm.reset();
      }
    );
  }
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

  
}
