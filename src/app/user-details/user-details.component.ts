import { Component, Input, OnChanges } from '@angular/core';
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

  fetchUserProfile(): void {
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

  resetState(): void {
    this.userProfile = null;
  }

  // Fetch profile for the new username
  ngOnChanges(): void {
    this.fetchUserProfile();
  }
}
