import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/login/user.service';
import { Watch } from './watch';
import { WatchService } from './watch.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-AddWatch',
  templateUrl: './addWatch.component.html',
  styleUrls: ['./addWatch.component.css']
})
export class AddWatch implements OnInit {
  content: string;
  public watches: Watch[] | undefined;
  public updateWatch: Watch;
  public deleteWatch: Watch;

  constructor(
    private watchService: WatchService,
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
    if (mode === 'add') {
      this.updateWatch = watch;
      button.setAttribute('data-target', '#addWatchModal');
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
        addWatchForm.reset();
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
    this.getWatches()
  } 
}
