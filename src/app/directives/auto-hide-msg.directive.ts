import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[autoHideMsg]',
  standalone: true,
})
export class AutoHideMsgDirective implements OnInit {
  @Input() hideAfter: number = 5000;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.el.nativeElement.style.display = 'none';
    }, this.hideAfter);
  }
}
