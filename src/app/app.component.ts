import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  filterForm: FormGroup;
  fileName: string = '';
  isDownloading: boolean = false;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      initialDate: ['', Validators.required],
      finalDate: ['', Validators.required],
      customerCode: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(2000), Validators.max(2030)]]
    });
  }

  applyFilters(): void {
    if (this.filterForm.valid) {
      const filterData: FilterData = this.filterForm.value;
      
      // Generate filename based on filter criteria
      this.generateFileName(filterData);
      
      console.log('Applied filters:', filterData);
      // Here you would typically call your service to fetch filtered data
      // this.dataService.getFilteredData(filterData).subscribe(...)
    }
  }

  resetForm(): void {
    this.filterForm.reset();
    this.fileName = '';
  }

  generateFileName(filterData: FilterData): void {
    const startDate = new Date(filterData.initialDate).toISOString().split('T')[0];
    const endDate = new Date(filterData.finalDate).toISOString().split('T')[0];
    
    this.fileName = `report_${filterData.customerCode}_${startDate}_to_${endDate}_${filterData.year}.xlsx`;
  }

  downloadFile(): void {
    if (!this.fileName) return;
    
    this.isDownloading = true;
    
    // Simulate file download
    setTimeout(() => {
      // Create a blob and download link
      const blob = new Blob(['Sample file content'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = this.fileName;
      link.click();
      window.URL.revokeObjectURL(url);
      
      this.isDownloading = false;
      console.log('File downloaded:', this.fileName);
    }, 1500);
    
  
  }

  private getFilterData(): FilterData {
    return this.filterForm.value;
  }
  
}
