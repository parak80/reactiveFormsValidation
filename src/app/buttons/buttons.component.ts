import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, ChangeDetectorRef } from '@angular/core';

import { ButtonDef } from '../models/button-def';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsComponent implements OnInit {

  @Input() data: any;
  @Input() buttons: ButtonDef[];

  constructor(private readonly cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  update() {
    this.cd.markForCheck();
  }
}
