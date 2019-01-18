import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: 'post-job', loadChildren: './job-post/job-post.module#JobPostModule'
  },
  {
    path: '', redirectTo: '/post-job', pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
