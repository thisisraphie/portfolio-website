import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  skills = [
    'UI/UX Design',
    'HTML & CSS',
    'JavaScript',
    'React',
    'Figma',
  ];
}