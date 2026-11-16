import { Component } from '@angular/core';
import { Movimiento, SolicitudMovimiento } from './movimiento.model';
import { NuevoMovimientoComponent } from './nuevo-movimiento.component';

@Component({
  selector: 'app-billetera',
  imports: [NuevoMovimientoComponent],
  templateUrl: './billetera.component.html',
})
export class BilleteraComponent {
  // El PADRE es dueño del estado (saldo inicial S/ 250.00, historial vacío)
  saldo = 250;
  movimientos: Movimiento[] = [];
  private siguienteId = 1;

  // Se ejecuta cuando el hijo emite un movimiento válido
  procesarMovimiento(solicitud: SolicitudMovimiento): void {
    // Validación defensiva: el padre protege su propio estado
    if (!(solicitud.monto > 0)) {
      return;
    }
    if (solicitud.tipo === 'Gasto' && solicitud.monto > this.saldo) {
      return;
    }

    const nuevoSaldo =
      solicitud.tipo === 'Recarga'
        ? this.saldo + solicitud.monto
        : this.saldo - solicitud.monto;

    // Redondeo a 2 decimales para evitar errores de punto flotante
    this.saldo = Math.round(nuevoSaldo * 100) / 100;

    // El movimiento más reciente va al inicio del historial
    this.movimientos = [{ id: this.siguienteId++, ...solicitud }, ...this.movimientos];
  }
}
