import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Anime } from "src/app/Anime";
import { QueriesService } from "src/app/services/queries.service";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"],
})
export class DetailsPage implements OnInit {
  public anime: Anime;
  public loaded: boolean;
  public liked: boolean | null = null;
  public disliked: boolean | null = null;
  public inList: boolean | null = null;
  public watched: boolean | null = null;
  public watchLater: boolean | null = null;
  constructor(
    private route: ActivatedRoute,
    private queriesService: QueriesService,
    private storage: StorageService
  ) {}

  async ngOnInit() {
    const animeId = +this.route.snapshot.params.id;
    this.anime = new Anime();

    this.queriesService
      .getAnime(animeId)
      .subscribe((result) => {
        result["data"]["Page"]["media"].forEach((elem) => {
          this.anime.id = elem.id;
          this.anime.title = elem.title["romaji"];
          this.anime.coverImageLarge = elem.coverImage["large"];
          this.anime.coverImageMedium = elem.coverImage["medium"];
          this.anime.coverImageExtraLarge = elem.coverImage["extraLarge"];
          this.anime.genres = elem.genres;
          this.anime.episodes = elem.episodes;
          this.anime.status = elem.status;
          this.anime.formatStatus();
          console.log(this.anime);
        });
      })
      .add(() => {
        this.loaded = true;
      });
    //define o valor de "liked" e "disliked";
    
    await this.storage.init().then(async () => {
      this.storage.get("liked").then((resp) => {
        if (resp.includes(String(animeId))) {
          this.liked = true;
          this.disliked = false;
        }
      });
      this.storage.get("disliked").then((resp) => {
        if (resp.includes(String(animeId))) {
          this.disliked = true;
          this.liked = false;
        }
      });
      this.storage.get("watched").then((resp) => {
        if (Array.isArray(resp)) {
          if (resp.includes(String(animeId))) {
            this.watched = true;
          }
        }else{
          this.watched = false;
        }
      });
      this.storage.get("watchlater").then((resp) => {
        if (Array.isArray(resp)) {
          if (resp.includes(String(animeId))) {
            this.watchLater = true;
          }
        }else{
          this.watchLater = false;
        }
      });
    });
    //
  }

  async onLike() {
    this.liked = !this.liked;
    if (this.liked == true) {
      this.storage.setLiked(this.anime.id);
    } else {
      this.storage.removeLiked(this.anime.id);
    }
    if (this.liked == true && this.disliked == true) {
      this.disliked = false;
    }
  }

  onDislike() {
    this.disliked = !this.disliked;
    if (this.disliked == true) {
      this.storage.setDisliked(this.anime.id);
    } else {
      this.storage.removeDisliked(this.anime.id);
    }
    if (this.disliked == true && this.liked == true) {
      this.liked = false;
    }
  }

  onWatched() {
    this.watched = !this.watched;
    if (this.watched == true) {
      this.storage.setwatched(this.anime.id);
    } else {
      this.storage.removeWatched(this.anime.id);
    }
  }

  onWatchLater() {
    this.watchLater = !this.watchLater;
    if (this.watchLater == true) {
      this.storage.setWatchLater(this.anime.id);
    } else {
      this.storage.removeWatchLater(this.anime.id);
    }
  }
}
