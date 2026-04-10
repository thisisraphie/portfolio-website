import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DevProject {
  type: 'dev';
  title: string;
  description: string;
  link: string;
  thumbnail: string;
  video: string;
}

export interface DesignProject {
  type: 'design';
  title: string;
  description: string;
  link: string;
  photos: string[];
  currentPhoto: number;
}

export type Project = DevProject | DesignProject;

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent {

  // ── Filter ──────────────────────────────
  activeFilter = signal<'all' | 'dev' | 'design'>('all');

  setFilter(f: 'all' | 'dev' | 'design') {
    this.activeFilter.set(f);
  }

  get filteredProjects(): Project[] {
    const f = this.activeFilter();
    if (f === 'all') return this.projects;
    return this.projects.filter(p => p.type === f);
  }

  // ── Modal ────────────────────────────────
  showForm = signal(false);
  formType = signal<'dev' | 'design'>('dev');

  openForm() { this.showForm.set(true); }
  closeForm() { this.showForm.set(false); this.resetForm(); }

  // ── Form state ───────────────────────────
  form = {
    title: '',
    description: '',
    link: '',
  };

  // Dev
  thumbnailPreview = signal<string>('');
  videoPreview = signal<string>('');

  onThumbnail(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => this.thumbnailPreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  onVideo(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    this.videoPreview.set(url);
  }

  // Design
  photoPreviews = signal<string[]>([]);

  onPhotos(e: Event) {
    const files = Array.from((e.target as HTMLInputElement).files ?? []);
    const current = this.photoPreviews();
    let loaded = 0;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreviews.set([...this.photoPreviews(), reader.result as string]);
        loaded++;
      };
      reader.readAsDataURL(file);
    });
  }

  removePhoto(i: number) {
    this.photoPreviews.set(this.photoPreviews().filter((_, idx) => idx !== i));
  }

  // ── Submit ───────────────────────────────
  projects: Project[] = [];

  submit() {
    if (!this.form.title.trim()) { alert('Please enter a title.'); return; }

    if (this.formType() === 'dev') {
      this.projects.unshift({
        type: 'dev',
        title: this.form.title,
        description: this.form.description,
        link: this.form.link,
        thumbnail: this.thumbnailPreview(),
        video: this.videoPreview(),
      });
    } else {
      if (this.photoPreviews().length === 0) { alert('Please upload at least one photo.'); return; }
      this.projects.unshift({
        type: 'design',
        title: this.form.title,
        description: this.form.description,
        link: this.form.link,
        photos: this.photoPreviews(),
        currentPhoto: 0,
      });
    }

    this.closeForm();
  }

  resetForm() {
    this.form = { title: '', description: '', link: '' };
    this.thumbnailPreview.set('');
    this.videoPreview.set('');
    this.photoPreviews.set([]);
  }

  // ── Delete ───────────────────────────────
  deleteProject(i: number) {
    this.projects.splice(i, 1);
  }

  // ── Carousel ────────────────────────────
  prevPhoto(project: DesignProject) {
    project.currentPhoto =
      (project.currentPhoto - 1 + project.photos.length) % project.photos.length;
  }

  nextPhoto(project: DesignProject) {
    project.currentPhoto =
      (project.currentPhoto + 1) % project.photos.length;
  }

  isDesign(p: Project): p is DesignProject { return p.type === 'design'; }
  isDev(p: Project): p is DevProject { return p.type === 'dev'; }
}