import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GitService } from '../services/git.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnChanges {
  @Input() username!: string;

  userProfile: any = null;
  fetchingProfile: boolean = true;

  twitterUrl: string = 'https://twitter.com/';

  constructor(private gitService: GitService) {}

  fetchUserProfile() {
    this.resetState();
    this.fetchingProfile = true;

    this.gitService.fetchUserProfile(this.username).subscribe({
      next: (res) => {
        this.userProfile = res;
        this.fetchingProfile = false;
      },
      error: (err) => {
        this.userProfile = null;
        this.fetchingProfile = false;
      },
    });
  }

  resetState() {
    this.userProfile = null;
  }

  // Fetch profile for the new user
  ngOnChanges(): void {
    this.fetchUserProfile();
  }
}
