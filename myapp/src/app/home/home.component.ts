import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { observable } from 'rxjs/observable'
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) {

  }
  id = 0;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  arrMovies: any;
  fetchdata() {
    this.http.get("http://localhost:5555/movies").subscribe(
      (res: Response) => {
        this.arrMovies = res;
        console.log(this.arrMovies);
      }
    );
  }

  ngOnInit(): void {
    this.fetchdata();

  }

  deleteMovie(id) {


    if (confirm("Are you sure to delete this movie?")) {
      const url = `${"http://localhost:5555/movies"}/${id}`;
      return this.http.delete(url, { headers: this.headers }).toPromise()
        .then(() => {
          this.fetchdata();
        });
    }
  }

}
