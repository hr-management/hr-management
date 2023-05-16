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
     const visaOrder =  ["OPT_Receipt", "OPT_EAD", "I-983", "I-20"];
      const name = `${employee.firstName} ${employee.middleName} ${employee.lastName}` 
      let nextStep = ""
      let nextAction = ""
      let file = ""
      let approvedFiles = []
      let lastDoc = null
      for (let doc of employee.workAuthDoc) {
        if (doc.status === "approved") {
          approvedFiles.push({ fileName: doc.type, file: doc.file })
        }
        
      }
      if (employee.visa.type === "F1(CPT/OPT)") {
         lastDoc = employee.workAuthDoc.at(-1)
        if (employee.workAuthDoc.length === 4 && lastDoc.status === "approved" ) {
          nextStep = `Done! All OPT documents have been approved.`
        } else {
          
          if (lastDoc.status === "approved") {
              nextStep = `Need to submit ${visaOrder[employee.workAuthDoc.length]}`
              nextAction = "submit"
              
            } else if (lastDoc.status === "submitted") {
              nextStep = `Wait for HR approval`
              nextAction = "HR approval"
              file = lastDoc.file
              
            } else if (lastDoc.status === "rejected") {
              nextStep = `Rejected`
              nextAction = "rejected"
              file = lastDoc.file
              
            }
        }
        
      } 
      
      processedData.push(
        {
          id: employee._id,
          name,
          nextStep,
          nextAction,
          file,
          lastDoc,
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
