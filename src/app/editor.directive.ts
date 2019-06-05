import { Directive, ElementRef, Input, Renderer2, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appEditor]'
})
export class EditorDirective implements AfterViewInit, OnChanges {

  @Input() editMode = false;

  constructor(private el: ElementRef, private render: Renderer2) { }

  ngAfterViewInit(): void {
    this.setState();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.editMode = changes.editMode.currentValue;
    this.setState();
  }

  private setState() {
    if (this.editMode) {
      this.render.removeClass(this.el.nativeElement, 'read-only');
      this.render.removeAttribute(this.el.nativeElement, 'disabled');
    } else {
      this.render.addClass(this.el.nativeElement, 'read-only');
      this.render.setAttribute(this.el.nativeElement, 'disabled', 'true');
    }
    // console.log(this.el.nativeElement);
  }
}
