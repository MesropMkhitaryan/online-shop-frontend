import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css', '../../styles/css/responsive.css','../../styles/css/bootstrap.css',
    /* '../template/css/font-awesome.min.css', */ '../../styles/css/style.css']
})
export class FooterComponent implements OnInit{
  ngOnInit(): void {
  }
  logoImg= "assets/images/logo.png"
}
