import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
})
export class SearchUserComponent {
  @Output() onUserSearched: EventEmitter<string> = new EventEmitter();

  searchUserForm: FormGroup = this.formBuilder.group({
    username: '',
  });

  constructor(private formBuilder: FormBuilder) {}

  handleUserSearched(): void {
    this.onUserSearched.emit(this.searchUserForm.value.username);
    this.searchUserForm.reset();
  }
}
