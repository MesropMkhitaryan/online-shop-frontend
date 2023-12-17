import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../core/shared/layout/header/header.component";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "../core/shared/layout/footer/footer.component";
import {UserService} from "../core/service/user.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-system',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './system.component.html',
  styleUrl: './system.component.css',
  providers: [UserService, HttpClient]
})
export class SystemComponent {

}
