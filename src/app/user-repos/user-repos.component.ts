import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GitService } from '../services/git.service';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.css'],
})
export class UserReposComponent implements OnInit, OnChanges {
  @Input() totalRepos: number = 0;
  @Input() username!: string;

  userRepos: any = null;
  fetchingRepos: boolean = false;

  currentPage: number = 1;
  maxPerPage: number = 10;
  maxPages: number = 5;

  searchTimer: any;
  searchTime: number = 500;

  searchRepoForm: FormGroup = this.formBuilder.group({
    query: '',
  });

  constructor(
    private gitService: GitService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchRepoForm.controls['query'].valueChanges.subscribe(() => {
      this.setSearchTimer();
    });
  }

  handleRepoSearched(): void {
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

  // Timer to call API after user searches, timer is reset if the user keeps typing
  setSearchTimer(): void {
    if (this.searchTimer !== undefined) {
      clearTimeout(this.searchTimer);
      this.searchTimer = undefined;
    }

    this.searchTimer = setTimeout(
      this.handleRepoSearched.bind(this),
      this.searchTime
    );
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
        this.searchRepoForm.value.query
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

  // Scroll to bottom of the window
  scrollToBottom(): void {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

  // Scroll to top of the window
  scrollToTop(): void {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  }
}
