import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";

@Directive({
  selector: "[autoHideMsg]",
  standalone: true,
})
export class AutoHideMsgDirective implements OnChanges {
  @Input() hideAfter: number = 5000;
  @Input() show: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["show"]) {
      if (this.show) {
        this.el.nativeElement.style.display = "flex";
        setTimeout(() => {
          this.el.nativeElement.style.display = "none";
        }, this.hideAfter);
      } else {
        this.el.nativeElement.style.display = "none";
      }
    }
  }
}
