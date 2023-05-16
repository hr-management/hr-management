import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/store";
import * as GetUserAction from "../store/auth/get-user.actions";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  state: Observable<any>;
  sideBarLinks: any[] = [];

  constructor(private store: Store<AppState>) {
    this.state = this.store.pipe(select("user"));
    this.state.subscribe((data) => {
      if (data.user.role === "HR") {
        this.sideBarLinks = [
          "employee-profiles",
          "visa-status-management",
          "hiring-management",
          "housing-management",
        ];
      } else if (
        data.user.role === "employee" &&
        data.user.applicationStatus === "approved"
      ) {
        this.sideBarLinks = [
          "personal-information",
          "assigned-house",
          "visa-status",
        ];
      } else if (
        data.user.role === "employee" &&
        data.user.applicationStatus !== "approved" &&
        data.user.workAuthDoc[0].status) {
        this.sideBarLinks = [
          "onboarding-application",
          "personal-information",
          "assigned-house",
          "visa-status",
        ];
      } else {
        this.sideBarLinks = [
          "onboarding-application",
          "personal-information",
          "assigned-house",
        ];
      }
    });
  }
  ngOnInit() {
    this.store.dispatch(GetUserAction.GetUsersStart());
  }
}
