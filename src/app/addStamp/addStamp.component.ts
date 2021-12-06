import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/login/user.service';
import { Stamp } from './stamp';
import { StampService } from './stamp.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-AddWatch',
  templateUrl: './addStamp.component.html',
  styleUrls: ['./addStamp.component.css']
})
export class AddStamp implements OnInit {
  content: string;
  public deleteStamp: Stamp;
  public updateStamp: Stamp;
  public stamps: Stamp[] | undefined; 
  
  constructor(
    private stampService: StampService,
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
    this.getStamps()
  } 
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
        addFormStamp.reset();
        console.log(response);
        
      },
      (error: HttpErrorResponse) => {
        this.stampService.getStamps();
        alert(error.message);
      }
    );
  }
 
}
