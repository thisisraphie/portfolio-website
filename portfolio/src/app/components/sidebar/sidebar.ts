import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']  
})
export class SidebarComponent {
  currentYear = new Date().getFullYear();

  navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '◈' },
    { path: '/projects',  label: 'Projects',  icon: '◫' },
    { path: '/blog',      label: 'Blog',       icon: '◱' },
    { path: '/certifications',   label: 'Certifications',    icon: '◎' },
  ];
}