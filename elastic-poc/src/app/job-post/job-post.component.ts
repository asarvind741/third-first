import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { JobService } from '../services/job.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent implements OnInit {
  
  jobPostForm: FormGroup;
  isPostSubmitted: Boolean = true;

  constructor(
    private jobService: JobService,
    private toastrSerrvice: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.createForm();
  }

  createForm(){
    let preferredLocation = new FormArray([]);
    preferredLocation.push(new FormControl);
    this.jobPostForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      responsblities: new FormControl(null, Validators.required),
      companyName: new FormControl(null, Validators.required),
      jobType: new FormControl(null, Validators.required),
      minSalary: new FormControl(null, Validators.required),
      maxSalary: new FormControl(null, Validators.required),
      preferredLocation: preferredLocation
    })
  }

  onSubmit(){
    this.spinner.show();
    this.jobService.saveNewJobPost(this.jobPostForm.value)
    .subscribe((response: HttpResponse<any>) => {
     this.spinner.hide();
      if(response.status === 200){
        this.isPostSubmitted = true;
        this.toastrSerrvice.success('Job posted successfully', 'Success', {
          closeButton: true,
          timeOut: 10000
        })
      }
      else {
        this.toastrSerrvice.error('Error occured', 'Error');
        console.log("error", response);
      }
    }, (err: HttpErrorResponse) => {
      console.log("error", err);
      this.toastrSerrvice.error(err.error.message, 'Error')
    })

  }

  onAddLocation(){
    const control = new FormControl(null);
    (<FormArray>this.jobPostForm.get('preferredLocation')).push(control)
  }

}
