import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/competition', title: 'Competition',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/member', title: 'Member',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/competitions', title: 'Competitions',  icon:'ni- text-orange', class: '' },
    { path: '/myCompetitions', title: 'My Competitions',  icon:'ni- text-orange', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router,private userService:UserService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  onClick(){
    localStorage.clear();
    this.router.navigate(['/'])
  }
}
