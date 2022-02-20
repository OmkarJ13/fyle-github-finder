import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-repo',
  templateUrl: './search-repo.component.html',
  styleUrls: ['./search-repo.component.css'],
})
export class SearchRepoComponent implements OnInit {
  @Output() onRepoSearched: EventEmitter<string> = new EventEmitter();

  searchTimer: any;
  searchTime: number = 500;

  constructor(private formBuilder: FormBuilder) {}

  searchRepoForm: FormGroup = this.formBuilder.group({
    query: '',
  });

  ngOnInit(): void {
    this.searchRepoForm.controls['query'].valueChanges.subscribe(() => {
      this.setSearchTimer();
    });
  }

  // Timer to call API after user searches, timer is reset if the user keeps typing
  setSearchTimer(): void {
    if (this.searchTimer !== undefined) {
      clearTimeout(this.searchTimer);
      this.searchTimer = undefined;
    }

    this.searchTimer = setTimeout(
      () => this.onRepoSearched.emit(this.searchRepoForm.value.query),
      this.searchTime
    );
  }
}
