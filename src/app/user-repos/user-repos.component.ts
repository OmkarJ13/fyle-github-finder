import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GitService } from '../services/git.service';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.css'],
})
export class UserReposComponent implements OnChanges {
  @Input() totalRepos: number = 0;
  @Input() username!: string;

  userRepos: any = null;
  fetchingRepos: boolean = false;
  repoQuery: string = '';

  currentPage: number = 1;
  maxPerPage: number = 10;
  maxPages: number = 5;

  constructor(private gitService: GitService) {}

  handleRepoSearched(repoQuery: string): void {
    this.repoQuery = repoQuery;

    this.currentPage = 1;
    this.fetchRepos();
  }

  handlePageChanged(page: number): void {
    this.currentPage = page;
    this.fetchRepos();
  }

  // Handle pagination option changes
  handleCustomizedChanges(changes: any): void {
    this.maxPerPage = Number(changes.maxPerPage);
    this.maxPages = Number(changes.maxPages);

    this.currentPage = 1;
    this.fetchRepos();
  }

  // If the number of total repositories changes, fetch repos
  ngOnChanges(): void {
    if (this.totalRepos > 0) {
      this.currentPage = 1;
      this.fetchRepos();
    }
  }

  // Fetch repos for the current user from GitHub API
  fetchRepos(): void {
    this.resetState();
    this.fetchingRepos = true;

    this.gitService
      .fetchUserRepos(
        this.username,
        this.currentPage,
        this.maxPerPage,
        this.repoQuery
      )
      .subscribe({
        next: (res) => {
          this.userRepos = res;
          this.fetchingRepos = false;
        },
        error: (err) => {
          this.userRepos = null;
          this.fetchingRepos = false;
        },
      });
  }

  resetState(): void {
    this.userRepos = null;
  }
}
