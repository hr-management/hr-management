import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/AuthService/auth-service.service';
import { AppState } from 'src/app/store';
import { OptReceiptComponent } from './opt-receipt/opt-receipt.component';

@Component({
  selector: 'app-visa-status',
  templateUrl: './visa-status.component.html',
  styleUrls: ['./visa-status.component.scss']
})
export class VisaStatusComponent {
  @ViewChild('optReceipt', { static: false })
  onboardingForm?: OptReceiptComponent;
  user: any;
  title = 'Visa Status';

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    this.store.pipe(select('user')).subscribe((data) => {
      if (data.user) {
        console.log(data.user);
        this.user = data.user;
      }
    });
  }
}
