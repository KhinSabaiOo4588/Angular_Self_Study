import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth-guard/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-views',
    templateUrl: './views.component.html',
    styleUrl: './views.component.css',
    standalone: true,
    imports: [RouterModule, CommonModule]
})

export class ViewsComponent {
    title = 'office-management';
    isCollapsed: boolean = true;
    // activeIndex: number = 0;
    imgURL = localStorage.getItem('imgUrl');
    userName = localStorage.getItem('userName');
    defaultImageUrl: string = 'https://via.placeholder.com/150';

    constructor(private authService: AuthService, private router: Router,) { }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('imgUrl');
    }

    isDropdownVisible: boolean = false;
    isBarShow: boolean = false;


    toggleDropdown(isVisible: boolean) {
        this.isDropdownVisible = isVisible;
    }

    hideBar(bar: boolean) {
        this.isBarShow = true;
    }

    showBar() {
        this.isBarShow = false;
    }
    // colorChange(index:number) {
    //     this.activeIndex = index;
    //     console.log(this.activeIndex, index);
    // }


    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
    }

    // Check if the profile image is empty
    isProfileImageEmpty(): boolean {
        return !this.imgURL || this.imgURL.trim().length === 0;
    }

}