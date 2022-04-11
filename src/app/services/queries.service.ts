import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {
  readonly apiURL: string;
  httpHeader: HttpHeaders;

  constructor(private http: HttpClient) {
    this.apiURL = 'https://graphql.anilist.co';
    this.httpHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
  }

  getAnimes(page: number, perPage: number, sort: string) {
    var query = `query($id: Int, $page: Int, $perPage: Int, $sort: [MediaSort]){
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (id: $id, type: ANIME, sort: $sort, isAdult: false) {
          id
          title {
            romaji
          }
          coverImage {
            medium
            large
            extraLarge
          }
          episodes
          genres
        }
      }
    }`
    var variables = {
      page: page,
      perPage: perPage,
      sort: sort
    }

    return this.http.post(this.apiURL, JSON.stringify({
      query: query,
      variables: variables
    }), { headers: this.httpHeader });

  }

  getAnime(id: number) {
    var query = `query($id: Int, $page: Int, $perPage: Int){
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (id: $id, type: ANIME) {
          id
          title {
            romaji
          }
          coverImage {
            medium
            large
            extraLarge
          }
          status
          episodes
          genres
        }
      }
    }`

    var variables = {
      id: id,
      page: 1
    }

    return this.http.post(this.apiURL, JSON.stringify({
      query: query,
      variables: variables
    }), { headers: this.httpHeader });
  }

  searchAnime(search: string) {
    var query = `query($id: Int, $page: Int, $perPage: Int, $search: String){
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (id: $id, type: ANIME, isAdult: false, search: $search) {
          id
          title {
            romaji
          }
          coverImage {
            medium
            large
            extraLarge
          }
          episodes
          genres
        }
      }
    }`
    var variables = {
      search: search,
      page: 1,
      perPage: 50
    }

    return this.http.post(this.apiURL, JSON.stringify({
      query: query,
      variables: variables
    }), { headers: this.httpHeader });

  }

  getByIds(ids: number[], page: number, perPage: number, sort: string) {
    var query = `query($page: Int, $perPage: Int, $sort: [MediaSort], $ids: [Int]){
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (type: ANIME, isAdult: false, sort: $sort, id_in: $ids) {
          id
          title {
            romaji
          }
          coverImage {
            medium
            large
            extraLarge
          }
          episodes
          genres
        }
      }
    }`
    var variables = {
      ids: ids,
      page: page,
      perPage: perPage,
      sort: sort
    }

    return this.http.post(this.apiURL, JSON.stringify({
      query: query,
      variables: variables
    }), { headers: this.httpHeader });
  }

  getByGenres(genres: string[], page: number, perPage: number, sort: string) {
    var query = `query($page: Int, $perPage: Int, $sort: [MediaSort], $genres: [String]){
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (type: ANIME, isAdult: false, sort: $sort, genre_in: $genres) {
          id
          title {
            romaji
          }
          coverImage {
            medium
            large
            extraLarge
          }
          episodes
          genres
        }
      }
    }`
    var variables = {
      genres: genres,
      page: page,
      perPage: perPage,
      sort: sort
    }

    return this.http.post(this.apiURL, JSON.stringify({
      query: query,
      variables: variables
    }), { headers: this.httpHeader });
  }
}
