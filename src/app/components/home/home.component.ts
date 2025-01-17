import { Component } from "@angular/core";
import { DataService } from "../../services/data.service";
import { RouterLink } from "@angular/router";
import { AsyncPipe, NgFor } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { Observable } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
import { AutoHideMsgDirective } from "../../directives/auto-hide-msg.directive";
@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    AutoHideMsgDirective,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  data$ = this.dataService.getItems();
  successMessage = "";
  removedMessage = "";
  showAddMsg: boolean = false;
  showRemoveMsg: boolean = false;
  constructor(private dataService: DataService) {}

  addItem(): void {
    const newItem = `Item ${Math.floor(Math.random() * 100)}`;

    this.handleResponse(
      this.dataService.addItem(newItem),
      "Item added successfully",
      "success"
    );
  }

  removeItem(id: string): void {
    this.handleResponse(
      this.dataService.deleteItem(id),
      "Item removed successfully",
      "removed"
    );
  }
  private handleResponse(
    observable: Observable<any>,
    message: string,
    type: "success" | "removed"
  ): void {
    observable.subscribe({
      next: () => {
        this.data$ = this.dataService.getItems();
        if (type === "success") {
          this.successMessage = message;
          this.removedMessage = "";
          this.showAddMsg = true;
          this.showRemoveMsg = false;
        } else {
          this.removedMessage = message;
          this.successMessage = "";
          this.showAddMsg = false;
          this.showRemoveMsg = true;
        }
      },
      error: (err) => console.error("Error:", err),
    });
  }
  closeMessage() {
    this.successMessage = "";
    this.removedMessage = "";
  }
}
