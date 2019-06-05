import { Directive, Self, OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// TODO: se: https://netbasal.com/make-your-angular-forms-error-messages-magically-appear-1e32350b7fa5
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  private _destroy$ = new Subject();


  constructor(@Self() private control: NgControl) {}

  ngOnInit() {
    this.control.valueChanges.pipe(
      takeUntil(this._destroy$)
    ).subscribe(() => {
      // handle errors
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
