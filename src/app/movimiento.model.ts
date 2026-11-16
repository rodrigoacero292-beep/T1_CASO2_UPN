export type TipoMovimiento = 'Recarga' | 'Gasto';

// Solicitud que el hijo envía al padre (output)
export interface SolicitudMovimiento {
  tipo: TipoMovimiento;
  monto: number;
}

// Movimiento guardado en el historial del padre
export interface Movimiento extends SolicitudMovimiento {
  id: number;
}
