import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../../core/shared/layout/header/header.component";
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../core/service/user.service";
import {AuthenticationResponse} from "../../core/model/authenticationResponse";
import {Router} from "@angular/router";
import {FooterComponent} from "../../core/shared/layout/footer/footer.component";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../core/service/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, ReactiveFormsModule],
  providers:[UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: any
  ngOnInit() {
    localStorage.removeItem('token')
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {
  }

  onLogin(value: any) {
     return this.userService.login(value).subscribe((response: AuthenticationResponse) => {
        const token = response.token;
        localStorage.setItem("token", token);
        this.authService.updateAuthenticationStatus()
        console.log("user is logged in")
        this.router.navigate([''])
      },
       (error: HttpErrorResponse) => {
         console.log("Error while logging", error)
       }
       )
  }

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

}
