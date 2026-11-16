import { Component, input, output } from '@angular/core';
import { SolicitudMovimiento, TipoMovimiento } from './movimiento.model';

@Component({
  selector: 'app-nuevo-movimiento',
  templateUrl: './nuevo-movimiento.component.html',
})
export class NuevoMovimientoComponent {
  // Padre -> Hijo: el saldo actual llega con input()
  saldo = input.required<number>();

  // Hijo -> Padre: solo se emite una solicitud válida con output()
  movimientoValido = output<SolicitudMovimiento>();

  // Estado propio del formulario (el hijo NO modifica saldo ni historial)
  tipo: TipoMovimiento = 'Recarga';
  monto = ''; // texto tal como lo escribe el usuario

  // Event binding: se llaman desde el HTML con (change) y (input)
  cambiarTipo(evento: Event): void {
    this.tipo = (evento.target as HTMLSelectElement).value as TipoMovimiento;
  }

  cambiarMonto(evento: Event): void {
    this.monto = (evento.target as HTMLInputElement).value;
  }

  // Monto como número, o null si está vacío o no es numérico
  get montoNumerico(): number | null {
    if (this.monto.trim() === '') {
      return null;
    }
    const numero = Number(this.monto);
    return isNaN(numero) ? null : numero;
  }

  // Mensaje de error (null si no hay error que mostrar)
  get error(): string | null {
    const monto = this.montoNumerico;
    if (monto === null) {
      return null; // vacío: se muestra una ayuda, no un error
    }
    if (monto <= 0) {
      return 'El monto debe ser mayor que cero';
    }
    if (this.tipo === 'Gasto' && monto > this.saldo()) {
      return 'Saldo insuficiente para realizar el gasto';
    }
    return null;
  }

  // Formulario válido: hay monto > 0 y no hay error
  get formularioValido(): boolean {
    const monto = this.montoNumerico;
    return monto !== null && monto > 0 && this.error === null;
  }

  registrar(): void {
    if (!this.formularioValido) {
      return; // nunca se emite una solicitud inválida
    }
    this.movimientoValido.emit({
      tipo: this.tipo,
      monto: this.montoNumerico as number,
    });
    this.monto = ''; // limpiar el monto para el siguiente movimiento
  }
}
