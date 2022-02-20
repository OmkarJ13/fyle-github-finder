import { Component } from '@angular/core';

@Component({
  selector: 'app-github-finder',
  templateUrl: './github-finder.component.html',
  styleUrls: ['./github-finder.component.css'],
})
export class GithubFinderComponent {
  username: string = '';
  constructor() {}

  setCurrentUser(username: string): void {
    this.username = username;
  }
}
