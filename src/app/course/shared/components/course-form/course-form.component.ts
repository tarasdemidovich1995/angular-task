import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Author, CourseRequest } from 'src/app/interfaces';
import { MyValidators } from '../../my.validators';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html'
})
export class CourseFormComponent implements OnChanges {
  @Input() course: CourseRequest;
  @Input() authors: Author[];
  public isAuthorsOpen = false;
  public form: FormGroup;

  public ngOnChanges(): void {
    if (this.course) {
      this.form = new FormGroup({
        name: new FormControl(this.course.name, [Validators.required]),
        description: new FormControl(this.course.description, [Validators.required]),
        date: new FormControl(this.course.date, [Validators.required]),
        length: new FormControl(this.course.length, [Validators.required]),
        authors: new FormControl(this.course.authors, [MyValidators.atLeastOneLength]),
        authorSearch: new FormControl('')
      });
    }
  }

  public addAuthor(author: Author): void {
    this.form.patchValue({authors: [...this.form.get('authors').value, author]});
  }

  public removeAuthor(id: number): void {
    this.form.patchValue({
      authors: this.form.get('authors').value.filter(author => author.id !== id)
    });
  }

  public getUpdatedCourse(): CourseRequest {
    const course = { ...this.form.value, id: this.course.id };
    delete course.authorSearch;
    return course;
  }
}
