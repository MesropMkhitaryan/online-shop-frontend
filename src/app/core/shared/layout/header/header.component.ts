import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  showLinks : boolean = true
  constructor(private userService: UserService, private route: Router) {
  }
  ngOnInit(): void {
    if (localStorage.length !== 0){
      this.showLinks = localStorage.getItem('token') === null
    }
  }

  onLogout() {
    if (localStorage.getItem('token') !== null){
      localStorage.removeItem('token')
      window.location.reload();
    }
  }
}
