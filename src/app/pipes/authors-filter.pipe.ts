import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../interfaces';

@Pipe({
  name: 'authorsFilter',
  pure: false,
})
export class AuthorsFilterPipe implements PipeTransform {

  transform(
    allAuthors: Author[],
    existingAuthors: Author[],
    search: string,
  ): Author[] {
    if (!search.trim()) {
      return allAuthors.filter((author) => !existingAuthors.includes(author));
    }
    return allAuthors.filter((author) =>
      !existingAuthors.includes(author)
      && author.name.toLowerCase().includes(search.toLowerCase())
    );
  }

}
