import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ProjectsComponent } from './pages/projects/projects';
import { BlogComponent } from './pages/blog/blog';
import { CertificatesComponent } from './pages/certificates/certificates';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'certificates', component: CertificatesComponent },
];