import{ NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobPostComponent } from './job-post.component';

const routes: Routes = [
    {
        path: '', component: JobPostComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class JobPostRoutingModule { }