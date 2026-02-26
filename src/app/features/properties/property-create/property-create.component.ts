import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';   
import { Router } from '@angular/router';
import { PropertyService } from '../../../core/services/property.service';
import { CreatePropertyDto } from '../../../core/models/property-dto';

@Component({
  selector: 'property-create',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './property-create.component.html',
  styleUrl:'../properties.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PropertyCreateComponent {
  property: CreatePropertyDto = {
    title: '',
    description: '',
    location: '',
    pricePerNight: 0,
    capacity: 1
  };
 
  loading = false;
  message = '';
  error = '';

  constructor(private propertyService: PropertyService, private router: Router) {}

  createProperty() {
    this.loading = true;
    this.propertyService.createProperty(this.property).subscribe({
      next: () => {
        this.loading = false;
        this.message =
          'A hirdetésed rögzítésre került. Ha új felhasználó vagy, kérelmedet az adminisztrátor fogja jóváhagyni.';
        setTimeout(() => this.router.navigate(['/properties']), 3000);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Nem sikerült létrehozni az ingatlant.';
        console.error(err);
      }
    });
  }
}
