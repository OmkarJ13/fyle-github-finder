import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GithubFinderComponent } from './github-finder/github-finder.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PaginationComponent } from './pagination/pagination.component';
import { UserReposComponent } from './user-repos/user-repos.component';
import { UserRepoComponent } from './user-repo/user-repo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    GithubFinderComponent,
    SearchUserComponent,
    UserDetailsComponent,
    PaginationComponent,
    UserReposComponent,
    UserRepoComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
