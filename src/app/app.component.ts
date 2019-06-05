import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnChanges } from '@angular/core';
import { Observable} from 'rxjs';

import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import * as DocumentActions from './store/actions';
import * as DocumentSelectors from './store/selectors';

import { DetailsComponent} from './details/details.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { ButtonDef, TemplateDef, Document } from './models';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChild(DetailsComponent) details: DetailsComponent;
  @ViewChild(ButtonsComponent) btns: ButtonsComponent;

  title = 'dynamic-buttons-lab';

  selectedId: string;
  document$: Observable<Document>;
  documents$: Observable<Document[]>;

  template: TemplateDef = {
    display: 'Test',
    id: 'Test',
    unit: 'TEST',
    properties: {
      description: {
        label: 'Beskrivning',
        type: 'textarea',
        validators: {
          required: {
            message: 'Beskrivning är obligatoriskt'
          }
        }
      },
      note: {
        label: 'Notering',
        type: 'textarea'
      },
      organizationCode: {
        label: 'Företagskod',
        type: 'text',
        validators: {
          required: {
            message: 'Företagskod är obligatoriskt'
          },
          maxlength: {
            message: 'Företagskod kan bara ha 10 tecken',
            arg: 10
          }
        }
      }
    }
  };

  buttons: ButtonDef[] = [
    { label: 'Redigera', iconClass: 'fa-pen-square',
      callbackFn: x => {
        this.editMode = true;
      },
      visibleFn: x => !this.editMode,
      enabledFn: x => x.canEdit,

    },
    { label: 'Spara', iconClass: 'fa-check-square',
      callbackFn: x => {
        // console.log('Save pressed', x);
        this.editMode = false;
        this.hasChanges = false;
        const updated: Update<Document> = {
          id: x.id,
          changes: this.details.getUpdatedValues()
        };
        this.store.dispatch(new DocumentActions.Save(updated));
      },
      visibleFn: x => this.editMode,
      enabledFn: x => this.hasChanges
    },
    { label: 'Avbryt', iconClass: 'fa-undo',
      callbackFn: x => {
        // console.log('Reset pressed', x);
        this.editMode = false;
      },
      visibleFn: x => this.editMode
    }
  ];

  editMode: boolean;
  hasChanges = false;

  constructor(private readonly store: Store<any>, private readonly api: AppService) {
    this.documents$ = api.getAllDocuments();
  }

  onValueUpdated(event: boolean) {
    this.hasChanges = event;
    this.btns.update();
  }

  onSelectedId(event: string) {
    // console.log(event);
    if (event) {
      this.document$ = this.store.pipe(select(DocumentSelectors.getById(event)));
      this.store.dispatch(new DocumentActions.Load(event));
    }
  }
}
