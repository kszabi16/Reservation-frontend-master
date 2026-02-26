import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingDto } from '../../../core/models/booking-dto';
import { BookingService } from '../../../core/services/booking.service';
import { BookingStatus } from '../../../core/models/booking-dto';

@Component({
  selector: 'app-booking-host',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './booking-host-component.html'
})
export class BookingHostComponent implements OnInit {

  bookings: BookingDto[] = [];
  BookingStatus=BookingStatus;
  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.bookingService.getHostBookings().subscribe({
      next: (res) => this.bookings = res,
      error: (err) => console.error(err)
    });
  }

  confirm(id: number): void {
    this.bookingService.confirmBooking(id).subscribe({
      next: () => this.load(),
      error: (err) => console.error(err)
    });
  }

  cancel(id: number): void {
    this.bookingService.cancelBooking(id).subscribe({
      next: () => this.load(),
      error: (err) => console.error(err)
    });
  }
}
