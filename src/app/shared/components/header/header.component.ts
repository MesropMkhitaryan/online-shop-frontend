import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../styles/css/responsive.css','../../styles/css/bootstrap.css',
    /* '../template/css/font-awesome.min.css', */ '../../styles/css/style.css']
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
