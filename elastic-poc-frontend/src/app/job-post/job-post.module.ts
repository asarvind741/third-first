import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPostComponent } from './job-post.component';
import { JobPostRoutingModule } from './job-post.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [JobPostComponent],
  imports: [
    CommonModule,
    SharedModule,
    JobPostRoutingModule
  ]
})
export class JobPostModule { }
