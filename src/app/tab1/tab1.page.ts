import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { Anime } from '../Anime';
import { QueriesService } from '../services/queries.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    public queriesService: QueriesService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) { }

  private animes = [];
  private hasNextPage: boolean;
  private page = 0;
  private sort = "TITLE_ROMAJI";
  private notFound: boolean;
  private canCleanFilter = false;
  private genres = [];

  ngOnInit(): void {
    /*var genres = this.route.snapshot.params;
    for (let i = 0; i < 18; i++) {
      if (genres[i] != undefined) {
        this.genres.push(genres[i]);
      }
    }
    // console.log(this.genres.length);
    if (this.genres.length > 0) {
      this.canCleanFilter = true;
      this.getAnimeByGenres();
    } else {*/
    this.getAnimes();
    //}
  }

  /*typeSort(value) {
    this.sort = value;
    this.animes = [];
    this.page = 0;
    if (this.genres.length > 0) {
      this.getAnimeByGenres();
    } else {
      this.getAnimes();
    }
  }

  cleanFilter() {
    this.canCleanFilter = false;
    this.animes = [];
    this.page = 0;
    this.getAnimes();
  }*/

  getAnimes() {
    this.page++;
    this.queriesService
      .getAnimes(this.page, 50, this.sort)
      .subscribe((result) => {
        console.log(result);
        this.hasNextPage = result["data"]["Page"]["pageInfo"]["hasNextPage"];
        result["data"]["Page"]["media"].forEach((elem) => {
          let anime = new Anime();
          anime.id = elem.id;
          anime.title = elem.title["romaji"];
          anime.coverImageMedium = elem.coverImage["medium"];
          this.animes.push(anime);
        });
      });
  }

  searchAnime(event) {
    this.animes = [];
    this.page = 0;
    this.hasNextPage = false;
    if (event.detail.value.length < 1) {
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
      this.getAnimes();
    } else {
      this.queriesService
        .searchAnime(event.detail.value)
        .subscribe((result) => {
          result["data"]["Page"]["media"].forEach((elem) => {
            let anime = new Anime();
            anime.id = elem.id;
            anime.title = elem.title["romaji"];
            anime.coverImageMedium = elem.coverImage["medium"];
            this.animes.push(anime);
          });
        });
    }
    // if(this.animes.length == 0){
    //   this.notFound = true;
    // }
  }

  getAnimeByGenres() {
    // this.animes = [];
    // this.page = 0;
    // this.hasNextPage = false;
    this.queriesService
      .getByGenres(this.genres, this.page, 50, this.sort)
      .subscribe((result) => {
        // this.hasNextPage = result["data"]["Page"]["pageInfo"]["hasNextPage"];
        result["data"]["Page"]["media"].forEach((elem) => {
          let anime = new Anime();
          anime.id = elem.id;
          anime.title = elem.title["romaji"];
          anime.coverImageMedium = elem.coverImage["medium"];
          console.log(anime);
          this.animes.push(anime);
        });
      });
    console.log(this.animes);
  }

  loadData(event) {
    setTimeout(() => {
      if (this.hasNextPage == true) {
        this.getAnimes();
        event.target.complete();
      } else {
        event.target.disabled = true;
      }
    }, 500);
  }

  sortBy() {
    this.navCtrl.navigateForward("sort");
  }

  openAnime(id: number) {
    //this.navCtrl.navigateForward(["details", id]);
  }
}



