import {AfterViewChecked, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {AuthService} from "../../../service/auth.service";
import {Subject, Subscription, takeUntil} from "rxjs";
import {ProductPageComponent} from "../../../../page/product-page/product-page.component";
import {ProductCardComponent} from "../../components/products/product-card.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  showLinks : boolean = true
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(isAuthenticated => {
        this.showLinks = isAuthenticated;
      });
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
