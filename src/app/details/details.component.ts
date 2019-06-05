import { Component, OnInit, Input, Output, ChangeDetectionStrategy, OnChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { TemplateDef, SelectOption } from '../models';
import { hasChanges } from '../utils';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit, OnChanges {

  form: FormGroup;
  @Input() detail: any;
  @Input() template: TemplateDef;
  @Input() editMode: boolean;

  @Input() users: SelectOption[] = [];
  @Input() departments: SelectOption[] = [];

  @Output() valueUpdated = new EventEmitter<boolean>();

  get f() {
    return this.form.controls;
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.f[''].touched
    this.form = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(50)]],
      textarea: ['', [Validators.required, Validators.maxLength(50)]],
      organizationCode: ['', [Validators.required]]
    });
  }

  ngOnChanges() {
    if (this.template) {
      const obj = {};

      if (this.detail) {
        for (const key of Object.keys(this.template.properties) ) {
          const validators = this.template.properties[key].validators;
          obj[key] = new FormControl(this.detail[key], this.getValidators(validators));
        }
      } else {
        for (const key of Object.keys(this.template.properties) ) {
          obj[key] = null;
        }
      }
      this.form = this.formBuilder.group(obj);

      this.form.valueChanges.subscribe(v => {
        const source = this.getUpdatedValues();
        const result = hasChanges(source, this.detail);
        this.valueUpdated.emit(result);
      });
    }

    // console.log(this.f);
  }

  getUpdatedValues() {
    const updatedFormValues = {};
    this.form['_forEachChild']((control, name) => {
     if (control.dirty) {
      updatedFormValues[name] = control.value;
     }
   });
   return updatedFormValues;
  }

  private getValidators(validators?: {[key: string]: { message: string, arg?: any}}) {
    const result = [];
    if (validators) {
      Object.keys(validators).forEach((key, i) => {
        switch (key) {
          case 'required': {
            result.push(Validators.required);
            break;
          }
          case 'maxlength': {
            const lenght = validators[key].arg;
            result.push(Validators.maxLength(lenght));
            break;
          }
        }
      });
    }
    return result;
  }

}
