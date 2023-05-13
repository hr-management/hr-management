import { Component } from '@angular/core';
import * as VisaEmployeesActions from "../../../store/visaEmployees/visa-employees.actions"
import {select, Store } from "@ngrx/store";
import { AppState } from 'src/app/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable,BehaviorSubject,Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog' ;
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component"
import { SendEmailService } from 'src/app/services/sendEmailService/send-email.service';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-visa-status-management',
  templateUrl: './visa-status-management.component.html',
  styleUrls: ['./visa-status-management.component.scss']
})
export class VisaStatusManagementComponent {
  state: Observable<any>
  displayedColumns: string[] = ['fullName',"workAuth","nextStep","action",]; 
  dataSource$ = new BehaviorSubject<any>([]);
  curStatus$ = new BehaviorSubject<string>("inprogress");
  sendNotification$ = new Subject();
  search:string =""
  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private sendEmailService: SendEmailService

  ) {
    this.state = this.store.pipe(select("visaEmployees"))
    this.state.subscribe((data) => {
      this.dataSource$.next(this.processVisaEmployeesData(data.visaEmployees) );
      if (data.error) {
        this.snackBar.open(data.error, 'Close', { duration: 3000 });
      }    
    })
  }
  ngOnInit() {
    this.store.dispatch(VisaEmployeesActions.getVisaEmployeesStart({ status: "inprogress",search:"" }))
    this.sendNotification$.pipe(throttleTime(5000)).subscribe((data:any) => {     
      this.sendEmailService.sendDocumentNotificationEmail({id:data.id,documentName:data.curDoc.type}).subscribe({
        next: (data) => {
            this.snackBar.open(data.message, 'Close', { duration: 3000 });
        },
        error: (err) => {
          this.snackBar.open(err.error.message, 'Close', { duration: 3000 })  
        },
      })
  });
  }

  onToggleChange(event: any) {
    this.curStatus$.next(event.value)
    if (event.value === "inprogress") {
      this.displayedColumns = ['fullName', "workAuth", "nextStep", "action"];
      this.store.dispatch(VisaEmployeesActions.getVisaEmployeesStart({status:event.value,search:""}))
    } else {
      this.displayedColumns = ['fullName', "workAuth", "nextStep", "documents"];
      this.store.dispatch(VisaEmployeesActions.getVisaEmployeesStart({status:event.value,search:this.search}))
    }
    
    
  }
  handleSearch() {
      this.store.dispatch(VisaEmployeesActions.getVisaEmployeesStart({status:"all",search:this.search}))
    
}
    openDialog(data:any,action:string): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true; 
        if (action === "approve") {
            dialogConfig.data = {data,message:'Are you sure you want to approve this document?',action:"approve"} 
          } else {
            dialogConfig.data = {data,message:'Are you sure you want to reject this document?',action:"reject"} 
          }
        dialogConfig.autoFocus=false;
        this.dialog.open(ConfirmationDialogComponent,dialogConfig);
       
  }
  processVisaEmployeesData(data:any[]):any[] {
    const processedData = []
    for (let employee of data) {
     
      const name = `${employee.firstName} ${employee.middleName} ${employee.lastName}` 
      let nextStep = ""
      let nextAction = ""
      let file = ""
      let approvedFiles = []
      let curDoc = null
      if (employee.visa.type === "F1(CPT/OPT)") {
        for (let doc of employee.workAuthDoc) {
            curDoc = doc
            if (doc.status === "notSubmitted") {
              nextStep = `Submit ${doc.type}`
              nextAction = "submit"
              break
            } else if (doc.status === "submitted") {
              nextStep = `Wait for HR approval`
              nextAction = "HR approval"
              file = doc.file
              break
            } else if (doc.status === "rejected") {
              nextStep = `Rejected`
              nextAction = "rejected"
              file = doc.file
              break
            } else {
              approvedFiles.push({fileName:doc.type,file:doc.file})
            }
            }
      } else {
        if (employee.workAuthDoc[0]) {
          approvedFiles.push({fileName:employee.workAuthDoc[0].type,file:employee.workAuthDoc[0].file} )
        }
        
      }
      
      processedData.push(
        {
          id: employee._id,
          curDoc,
          name,
          nextStep,
          nextAction,
          file,
          approvedFiles,
          workAuthTitle: employee.visa.type,
          startDate: new Date(employee.visa.startDate).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" }),
          endDate:new Date(employee.visa.endDate).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" }),
          remainingDate: Math.ceil((new Date(employee.visa.endDate).getTime() - new Date().getTime())/(1000 * 3600 * 24))
        })
    }
    return processedData
  }
}
