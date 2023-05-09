import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-personal-info',
  templateUrl: './employee-personal-info.component.html',
  styleUrls: ['./employee-personal-info.component.scss']
})
export class EmployeePersonalInfoComponent {
    user: any;
    hideUplodProfile:boolean = true
  constructor(   private snackBar: MatSnackBar,private route: ActivatedRoute, private http:HttpClient
  ) {}
  ngOnInit() {
    this.http.get<any>(`/api/employees/${this.route.snapshot.params['id']}`,).subscribe({
      next: (data: any) => {
        console.log(data);
        this.user = data.employee
      },
      error: (err: any) => {
        this.snackBar.open(err.error.message, 'Close')
      },
    })
      
  }
}
