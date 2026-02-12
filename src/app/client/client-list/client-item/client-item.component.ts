import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../model/client';

@Component({
  selector: 'app-client-item',
  templateUrl: './client-item.component.html',
  styleUrls: ['./client-item.component.scss']
})
export class ClientItemComponent {
  @Input() client!: Client;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
}
