import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  // Default route - redirect to home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  // Main portfolio sections
  { path: 'home', component: HeroComponent, title: 'Ankit Kumar - Full Stack Developer' },
  { path: 'about', component: AboutComponent, title: 'About - Ankit Kumar' },
  { path: 'skills', component: SkillsComponent, title: 'Skills - Ankit Kumar' },
  { path: 'projects', component: ProjectsComponent, title: 'Projects - Ankit Kumar' },
  { path: 'contact', component: ContactComponent, title: 'Contact - Ankit Kumar' },
  
  // Future routes for blog, resume, etc.
  // { path: 'blog', loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent) },
  // { path: 'resume', loadComponent: () => import('./pages/resume/resume.component').then(m => m.ResumeComponent) },
  
  // Wildcard route - 404 page
  { path: '**', redirectTo: '/home' }
];
