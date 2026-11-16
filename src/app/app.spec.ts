import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('muestra saldo inicial S/ 250.00 y el historial vacío', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const html = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(html).toContain('S/ 250.00');
    expect(html).toContain('Aún no hay movimientos');
  });
});
