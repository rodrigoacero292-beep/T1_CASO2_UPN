Billetera Digital – Caso 2
Billetera digital hecha con Angular y Bootstrap:

BilleteraComponent (padre): es dueño del estado (saldo inicial S/ 250.00 e historial vacío). Muestra el saldo con interpolación, el historial con @for y el mensaje "Aún no hay movimientos" con @if.
NuevoMovimientoComponent (hijo): formulario de tipo (Recarga/Gasto) y monto. Recibe el saldo con input() y notifica al padre un movimiento válido con output(). Muestra el error con @if y deshabilita el botón con [disabled] cuando el formulario es inválido.
Versiones utilizadas:

Node.js 20.19 o superior (o 22)
Angular 22.2 / Angular CLI 22.2
Bootstrap 5.3.3 (cargado por CDN en src/index.html, requiere internet)
#Cómo ejecutarlo:

bash https://github.com/rodrigoacero292-beep/T1_CASO2 seleccionar la carpeta usar lo siguiente para poder abrirlo: npm install npm start 

Se bre http://localhost:4200 en el navegador o en el terminal. (npm start)

#Pruebas automáticas:

bash npm test 

#Pruebas funcionales (manuales):

| 1 | Abrir la aplicación | Saldo S/ 250.00; historial vacío | | 2 | Registrar recarga de S/ 100.00 | Saldo S/ 350.00; recarga en el historial | | 3 | Registrar gasto de S/ 50.00 | Saldo S/ 300.00; el gasto aparece antes que la recarga | | 4 | Intentar gasto de S/ 400.00 | Error "Saldo insuficiente", botón deshabilitado; saldo sigue en S/ 300.00 | | 5 | Ingresar cero, negativo o monto vacío | Se rechaza; no cambia el saldo ni el historial |