import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public async get(key: string) {
    let value = await this._storage.get(key);
    return value;
  }

  public async getAllKeys() {
    let keys = await this._storage.keys();
    return keys;
  }

  public setLiked(id) {
    this.get("liked").then((elem) => {
      if (Array.isArray(elem)) {
        if (!elem.includes(String(id))) {
          elem.push(String(id));
          this.set("liked", elem);
        }
      } else {
        let array = [String(id)];
        this.set("liked", array);
      }
    });
  }

  public setDisliked(id){
    this.get("disliked").then(elem => {
      if(Array.isArray(elem)){
        if(!elem.includes(String(id))){
          elem.push(String(id));
          this.set("disliked", elem);
        }
      }else{
        let array = [String(id)];
        this.set("disliked", array);
      }
    })
  }

  public setWatchLater(id){
    this.get("watchlater").then(elem => {
      if(Array.isArray(elem)){
        if(!elem.includes(String(id))){
          elem.push(String(id));
          this.set("watchlater", elem);
        }
      }else{
        let array = [String(id)];
        this.set("watchlater", array);
      }
    })
  }

  public setwatched(id){
    this.get("watched").then(elem => {
      if(Array.isArray(elem)){
        if(!elem.includes(String(id))){
          elem.push(String(id));
          this.set("watched", elem);
        }
      }else{
        let array = [String(id)];
        this.set("watched", array);
      }
    })
  }

  public removeLiked(id) {
    this.get("liked").then((elem) => {
      if (Array.isArray(elem)) {
        let liked = [];
        elem.forEach((item) => {
          if (item != String(id)) {
            liked.push(item);
          }
        });
        this.set("liked", liked);
      }
    });
  }

  public removeDisliked(id){
    this.get("disliked").then(elem => {
      if(Array.isArray(elem)){
        let disliked = [];
        elem.forEach(item => {
          if(item != String(id)){
            disliked.push(item);
          }
        });
        this.set("disliked", disliked);
      }
    });
  }

  public removeWatchLater(id) {
    this.get("watchlater").then((elem) => {
      if (Array.isArray(elem)) {
        let watchLater = [];
        elem.forEach((item) => {
          if (item != String(id)) {
            watchLater.push(item);
          }
        });
        this.set("watchlater", watchLater);
      }
    });
  }

  public removeWatched(id) {
    this.get("watched").then((elem) => {
      if (Array.isArray(elem)) {
        let watched = [];
        elem.forEach((item) => {
          if (item != String(id)) {
            watched.push(item);
          }
        });
        this.set("watched", watched);
      }
    });
  }

  public remove(key) {
    this._storage.remove(key);
  }

  /** ⚠️ DANGER ZONE ⚠️ */
  public clear() {
    this._storage.clear();
  }
}
