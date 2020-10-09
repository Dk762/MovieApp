import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent implements OnInit {

  id = 0;
  data = {
    "id": 0,
    "title": "",
    "description": "",
    "img": "",
    "avgrats": "",
    "myrating": "",
    "comments": ""
  };
  movies: any;
  movieObj = {};
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private route: ActivatedRoute, private router: Router, private _http: HttpClient) { }

  updateMovie(movie) {
    this.movieObj = {
      "title": movie.title,
      "description": movie.description,
      "img": movie.img,
      "avgrats": movie.avgrats
    };
    const url = `${"http://localhost:5555/movies"}/${this.id}`;
    this._http.put(url, JSON.stringify(this.movieObj), { headers: this.headers }).toPromise()
      .then(() => {
        this.router.navigate(['/']);
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this._http.get("http://localhost:5555/movies").subscribe(
      (res: Response) => {
        this.movies = res;
        for (let i = 0; i < this.movies.length; i++) {
          if (parseInt(this.movies[i].id) === this.id) {
            this.data = this.movies[i];
            console.log(this.data);
            break;
          }
        }
      }
    );
  }

}
