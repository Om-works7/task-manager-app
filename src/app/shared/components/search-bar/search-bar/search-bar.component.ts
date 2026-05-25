import { Component } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  search$ = new Subject<string>();

  ngOnInit() {
    this.search$
    .pipe(debounceTime(300))
    .subscribe(value => {
      this.filterSearch(value);
    })
  }

}
