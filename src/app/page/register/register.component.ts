import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "../../core/shared/layout/header/header.component";
import {FooterComponent} from "../../core/shared/layout/footer/footer.component";
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../core/service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule],
  providers: [UserService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  form: any

  constructor(private userService: UserService, private route: Router) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.min(3)]),
      lastName: new FormControl('',[Validators.min(3), Validators.required] ),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }

  get firstName(){
    return this.form.get('firstName');
  }

  get lastName(){
    return this.form.get('lastName');
  }

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }


  onRegister(value: any) {
    this.userService.register(value).subscribe(response =>{
      this.route.navigate(['/login'])
    },
      (error: HttpErrorResponse) => {
        console.log("Error while registering",error)
      }
    )
  }


}
