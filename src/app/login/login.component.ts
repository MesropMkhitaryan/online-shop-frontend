import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../shared/components/header/header.component";
import {FormsModule, NgForm} from "@angular/forms";
import {UserService} from "../service/user.service";
import {AuthenticationResponse} from "../model/authenticationResponse";
import {Router} from "@angular/router";
import {FooterComponent} from "../shared/components/footer/footer.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  providers:[UserService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../shared/styles/css/bootstrap.css', '../shared/styles/css/responsive.css',
    '../shared/styles/css/style.css']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
    localStorage.removeItem('token')
  }

  constructor(private userService: UserService, private router: Router /*, private headerComponent: HeaderComponent*/) {
  }

  onLogin(login: NgForm) {
     return this.userService.login(login.value).subscribe((response: AuthenticationResponse) => {
        const token = response.token;
        localStorage.setItem("token", token);
        console.log("user is logged in")
        this.router.navigate(['/home'])
      })
  }


  booleanValue: boolean | undefined;

  // Example function to update the boolean value
  updateBooleanValue(value: boolean) {
    this.userService.setBooleanValue(value);
  }
}
