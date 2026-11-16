import { TestBed } from '@angular/core/testing';
import { BilleteraComponent } from './billetera.component';
import { NuevoMovimientoComponent } from './nuevo-movimiento.component';

describe('BilleteraComponent (padre)', () => {
  function crear() {
    const fixture = TestBed.createComponent(BilleteraComponent);
    return fixture.componentInstance;
  }

  it('flujo del enunciado: 250 -> recarga 100 -> gasto 50', () => {
    const padre = crear();
    expect(padre.saldo).toBe(250);
    expect(padre.movimientos.length).toBe(0);

    padre.procesarMovimiento({ tipo: 'Recarga', monto: 100 });
    expect(padre.saldo).toBe(350);

    padre.procesarMovimiento({ tipo: 'Gasto', monto: 50 });
    expect(padre.saldo).toBe(300);

    // el gasto (más reciente) aparece antes que la recarga
    expect(padre.movimientos.map((m) => m.tipo)).toEqual(['Gasto', 'Recarga']);
  });

  it('rechaza un gasto mayor al saldo', () => {
    const padre = crear();
    padre.procesarMovimiento({ tipo: 'Gasto', monto: 400 });
    expect(padre.saldo).toBe(250);
    expect(padre.movimientos.length).toBe(0);
  });

  it('rechaza montos en cero o negativos', () => {
    const padre = crear();
    padre.procesarMovimiento({ tipo: 'Recarga', monto: 0 });
    padre.procesarMovimiento({ tipo: 'Recarga', monto: -10 });
    expect(padre.saldo).toBe(250);
    expect(padre.movimientos.length).toBe(0);
  });
});

describe('NuevoMovimientoComponent (hijo)', () => {
  function crear(saldo: number) {
    const fixture = TestBed.createComponent(NuevoMovimientoComponent);
    fixture.componentRef.setInput('saldo', saldo);
    const hijo = fixture.componentInstance;
    const emitidos: unknown[] = [];
    hijo.movimientoValido.subscribe((m) => emitidos.push(m));
    return { hijo, emitidos };
  }

  it('el formulario vacío es inválido', () => {
    const { hijo } = crear(300);
    expect(hijo.formularioValido).toBe(false);
  });

  it('cero y negativos son inválidos y muestran error', () => {
    const { hijo } = crear(300);
    hijo.monto = '0';
    expect(hijo.formularioValido).toBe(false);
    expect(hijo.error).not.toBeNull();
    hijo.monto = '-5';
    expect(hijo.formularioValido).toBe(false);
  });

  it('un gasto mayor al saldo muestra "Saldo insuficiente" y no emite', () => {
    const { hijo, emitidos } = crear(300);
    hijo.tipo = 'Gasto';
    hijo.monto = '400';
    expect(hijo.error).toContain('Saldo insuficiente');
    expect(hijo.formularioValido).toBe(false);
    hijo.registrar();
    expect(emitidos.length).toBe(0);
  });

  it('un movimiento válido se emite y limpia el monto', () => {
    const { hijo, emitidos } = crear(300);
    hijo.tipo = 'Gasto';
    hijo.monto = '50';
    expect(hijo.formularioValido).toBe(true);
    hijo.registrar();
    expect(emitidos).toEqual([{ tipo: 'Gasto', monto: 50 }]);
    expect(hijo.monto).toBe('');
  });
});
