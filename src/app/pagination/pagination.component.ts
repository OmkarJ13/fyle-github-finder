import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage!: number;
  @Input() totalData!: number;

  @Input() maxPages!: number;
  @Input() maxPerPage!: number;

  requiredPages: number = 0;

  // Range of pages to show, if maxPages is 10 this will default to an array of [1, ..., 10]
  currentPages: number[] = Array.from(
    { length: this.maxPages },
    (_, i) => i + 1
  );

  @Output() goToPage: EventEmitter<number> = new EventEmitter();
  @Output() saveCustomizedChanges: EventEmitter<Object> = new EventEmitter();

  paginationOptionForm: FormGroup = this.formBuilder.group({
    maxPerPage: '',
    maxPages: '',
  });

  customizingPagination: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  // Toggles pagination customization form
  toggleCustomizePagination(): void {
    this.customizingPagination = !this.customizingPagination;
    this.paginationOptionForm.setValue({
      maxPerPage: this.maxPerPage,
      maxPages: this.maxPages,
    });
  }

  // Shifts current range of pages by max forward or backward, depending upon the argument passed
  shiftPagesByMax(forward: boolean): void {
    if (forward) {
      this.currentPages = this.currentPages.map((cur) => cur + this.maxPages);
    } else {
      this.currentPages = this.currentPages.map((cur) => cur - this.maxPages);
    }
  }

  // Emits event to save customized changes
  onSaveCustomizedChanges(): void {
    this.saveCustomizedChanges.emit(this.paginationOptionForm.value);
    this.paginationOptionForm.reset();

    this.customizingPagination = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { currentPage, maxPerPage, totalData, maxPages } = changes;

    // If max entries per page changes, re-calculate pages required to show the data
    if (maxPerPage && maxPerPage.previousValue !== maxPerPage.currentValue) {
      this.requiredPages = Math.ceil(this.totalData / this.maxPerPage);

      this.paginationOptionForm.patchValue({
        maxPerPage: maxPerPage.currentValue,
      });
    }

    // If max number of pages changes, re-calculate the max range of pages to show at a time
    if (maxPages && maxPages.previousValue !== maxPages.currentValue) {
      this.currentPages = Array.from(
        { length: this.maxPages },
        (_, i) => i + 1
      );

      this.paginationOptionForm.patchValue({ maxPages: maxPages.currentValue });
    }

    // If max entries per page changes, re-calculate pages required to show the data
    if (totalData && totalData.previousValue !== totalData.currentValue) {
      this.requiredPages = Math.ceil(this.totalData / this.maxPerPage);
    }

    if (currentPage && currentPage.previousValue !== currentPage.currentValue) {
      // Check if current page is greater than max number of pages allowed
      if (
        currentPage.currentValue >
        this.currentPages[this.currentPages.length - 1]
      ) {
        this.shiftPagesByMax(true);
      } else if (currentPage.currentValue < this.currentPages[0]) {
        this.shiftPagesByMax(false);
      }
    }
  }
}
