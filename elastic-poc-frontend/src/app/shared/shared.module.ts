import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        ReactiveFormsModule,
        NgxSpinnerModule,
        FormsModule
    ],
    declarations:[]
})

export class SharedModule { }