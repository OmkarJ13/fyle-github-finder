import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PAT } from 'src/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GitService {
  // Auth token to increase API time limit
  headers: HttpHeaders = new HttpHeaders({ Authorization: `token ${PAT}` });
  constructor(private http: HttpClient) {}

  fetchUserProfile(username: string): Observable<any> {
    return this.http.get<any>(`https://api.github.com/users/${username}`, {
      headers: this.headers,
    });
  }

  fetchUserRepos(
    username: string,
    page: number,
    max: number,
    query: string
  ): Observable<any> {
    const encodedQuery: string = encodeURI(
      `user:${username} ${query} in:name sort:updated-asc`
    );

    return this.http.get<any>(
      `https://api.github.com/search/repositories?q=${encodedQuery}&page=${page}&per_page=${max}`,
      { headers: this.headers }
    );
  }
}
