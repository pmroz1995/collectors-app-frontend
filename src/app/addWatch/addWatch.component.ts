import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/login/user.service';

@Component({
  selector: 'app-AddWatch',
  templateUrl: './addWatch.component.html',
  styleUrls: ['./addWatch.component.css']
})
export class AddWatch implements OnInit {
  content: string;

  constructor(private userService: UserService) { }

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
}
