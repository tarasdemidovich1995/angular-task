import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorsService } from 'src/app/course/shared/services/authors.service';
import { CoursesService } from 'src/app/course/shared/services/courses.service';

import { Author } from 'src/app/interfaces';

@Component({
  selector: 'app-create-course-page',
  templateUrl: './create-course-page.component.html',
  styleUrls: ['./create-course-page.component.scss']
})
export class CreateCoursePageComponent implements OnInit {
  public name: string;
  public description: string;
  public length: number;
  public date: string;
  public authors: Author[] = [];
  public authorSearch = '';
  public isAuthorsOpen = false;

  constructor(
    private coursesService: CoursesService,
    public authorsService: AuthorsService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    if (!this.authorsService.list.length) {
      this.authorsService.update().subscribe({
        error: () => {
          this.router.navigate(['/courses']);
        }
      });
    }
  }

  public save(): void {
    if (this.name && this.description && this.length && this.date && this.authors) {
      this.coursesService.create({
        name: this.name,
        description: this.description,
        length: this.length,
        date: this.date,
        id: Math.floor(Math.random() * 10000),
        isTopRated: false,
        authors: [],
      }).subscribe(() => {
        this.router.navigate(['/courses']);
      });
    }
  }

  public removeAuthor(id: string): void {
    console.log(id);
    this.authors = this.authors.filter(a => a.id !== id);
  }

  public addAuthor(author: Author): void {
    this.authors.push(author);
  }
}
