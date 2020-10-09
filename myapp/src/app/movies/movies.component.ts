import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private _http: HttpClient) { }
  movieObj: any;
  strConfirmation = "Movie has beed added";
  isSuccess=false;

  addNewMovie(newMovie) {
    this.movieObj = {
      "title": newMovie.title,
      "description": newMovie.description,
      "img": newMovie.img,
      "avgrats": newMovie.avgrats,
      "myrating": "0",
      "comments": ""
    }
    this._http.post("http://localhost:5555/movies/", this.movieObj).subscribe((res: Response) => {
      this.isSuccess=true;
    });
  }

  ngOnInit(): void {
  }

}
