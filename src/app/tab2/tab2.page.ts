import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Anime } from '../Anime';
import { QueriesService } from '../services/queries.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(
    public queriesService: QueriesService,
    public storageService: StorageService
  ) { }

  private animes = [];
  private likedAnimes = [];
  private dislikedAnimes = [];
  private watchLater = [];
  private watched = [];
  private hasNextPage: boolean;
  private page = 0;
  private sort = "TITLE_ROMAJI";

  ngOnInit(): void {
    this.getList();
    setTimeout(() => {
      this.getAll();
      console.log(this.animes);
    }, 2000);

  }

  getList() {
    this.storageService.init().then(async () => {
      this.storageService.get("liked").then((resp) => {
        console.log("liked - " + resp);
        this.likedAnimes = resp;
      });
      this.storageService.get("disliked").then((resp) => {
        console.log("disliked - " + resp);
        this.dislikedAnimes = resp;
      }
      );
      this.storageService.get("watchlater").then((resp) => {
        console.log("watchLater - " + resp);
        this.watchLater = resp;
      }
      );
      this.storageService.get("watched").then((resp) => {
        console.log("watched - " + resp);
        this.watched = resp;
      }
      );
    });
  }

  getLiked(): void {
    this.animes = [];
    this.queriesService.getByIds(this.likedAnimes, this.page, 50, this.sort)
      .subscribe((result) => {
        //this.hasNextPage = result["data"]["Page"]["PageInfo"]["hasNextPage"];
        result["data"]["Page"]["media"].forEach((elem) => {
          let anime = new Anime();
          anime.id = elem.id;
          anime.title = elem.title["romaji"];
          anime.coverImageMedium = elem.coverImage["medium"];
          this.animes.push(anime);
          console.log(this.animes);
        })
      })
  }

  getDisliked() {
    this.animes = [];
    this.queriesService.getByIds(this.dislikedAnimes, this.page, 50, this.sort)
      .subscribe((result) => {
        //this.hasNextPage = result["data"]["Page"]["PageInfo"]["hasNextPage"];
        result["data"]["Page"]["media"].forEach((elem) => {
          let anime = new Anime();
          anime.id = elem.id;
          anime.title = elem.title["romaji"];
          anime.coverImageMedium = elem.coverImage["medium"];
          this.animes.push(anime);
          console.log(this.animes);
        })
      })
  }

  getWatched() {
    this.animes = [];
    this.queriesService.getByIds(this.watched, this.page, 50, this.sort)
      .subscribe((result) => {
        //this.hasNextPage = result["data"]["Page"]["PageInfo"]["hasNextPage"];
        result["data"]["Page"]["media"].forEach((elem) => {
          let anime = new Anime();
          anime.id = elem.id;
          anime.title = elem.title["romaji"];
          anime.coverImageMedium = elem.coverImage["medium"];
          this.animes.push(anime);
          console.log(this.animes);
        })
      })
  }

  getWatchLater() {
    this.animes = [];
    this.queriesService.getByIds(this.watchLater, this.page, 50, this.sort)
      .subscribe((result) => {
        //this.hasNextPage = result["data"]["Page"]["PageInfo"]["hasNextPage"];
        result["data"]["Page"]["media"].forEach((elem) => {
          let anime = new Anime();
          anime.id = elem.id;
          anime.title = elem.title["romaji"];
          anime.coverImageMedium = elem.coverImage["medium"];
          this.animes.push(anime);
          console.log(this.animes);
        })
      })
  }

  getAll() {
    this.animes = [];
    let all = [...this.likedAnimes, ...this.dislikedAnimes, ...this.watched, ...this.watchLater];
    this.queriesService.getByIds(all, this.page, 50, this.sort)
      .subscribe((result) => {
        //this.hasNextPage = result["data"]["Page"]["PageInfo"]["hasNextPage"];
        result["data"]["Page"]["media"].forEach((elem) => {
          let anime = new Anime();
          anime.id = elem.id;
          anime.title = elem.title["romaji"];
          anime.coverImageMedium = elem.coverImage["medium"];
          this.animes.push(anime);
          console.log(this.animes);
        })
      })
  }


}
