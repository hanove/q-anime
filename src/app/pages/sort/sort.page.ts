import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-sort",
  templateUrl: "./sort.page.html",
  styleUrls: ["./sort.page.scss"],
})
export class SortPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  private genres = [
    { genre: "Action", isChecked: false },
    { genre: "Adventure", isChecked: false },
    { genre: "Comedy", isChecked: false },
    { genre: "Drama", isChecked: false },
    { genre: "Ecchi", isChecked: false },
    { genre: "Fantasy", isChecked: false },
    { genre: "Horror", isChecked: false },
    { genre: "Mahou Shoujo", isChecked: false },
    { genre: "Mecha", isChecked: false },
    { genre: "Music", isChecked: false },
    { genre: "Mystery", isChecked: false },
    { genre: "Psychological", isChecked: false },
    { genre: "Romance", isChecked: false },
    { genre: "Sci-fi", isChecked: false },
    { genre: "Slice of Life", isChecked: false },
    { genre: "Sports", isChecked: false },
    { genre: "Supernatural", isChecked: false },
    { genre: "Thriller", isChecked: false }
  ];
  private selectedGenres = [];

  ngOnInit() {}

  sort() {
    this.genres.forEach(genre => {
      if(genre.isChecked == true){
        this.selectedGenres.push(genre.genre);
      }
    })
    // console.log(this.selectedGenres);
    this.navCtrl.navigateBack(["tabs/tab1", this.selectedGenres]);
  }
}
