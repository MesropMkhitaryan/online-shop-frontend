import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "../shared/components/header/header.component";
import {FooterComponent} from "../shared/components/footer/footer.component";
import {FormsModule, NgForm} from "@angular/forms";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  providers: [UserService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css',  '../shared/styles/css/bootstrap.css', '../shared/styles/css/responsive.css',
    '../shared/styles/css/style.css']
})
export class RegisterComponent implements OnInit{

  ngOnInit(): void {
  }
  constructor(private userService: UserService) {

  }

  onRegister(register: NgForm) {
    this.userService.register(register.value).subscribe(response =>{
      register.resetForm();
    })
  }


}
