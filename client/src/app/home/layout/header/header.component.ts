import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {Store,select} from "@ngrx/store";
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
state: Observable<any>
  constructor( private store: Store<AppState>) {
    this.state = this.store.pipe(select("user"))
  }
  ngOnInit() {
}
}
