# Honeyvault: ajustes de cierre de la demo

15 de octubre de 2026. Cami autorizó implementar las seis propuestas de cierre y publicar en GitHub y Vercel.

## Implementación

1. Tres entradas: Pasteles, Cajas y Eventos, con destinos e intención propios. La antigua intención de celebración sigue siendo compatible con sesiones existentes.
2. Una acción principal por bloque. «Elegir mi pedido» lleva a las tres entradas; «Elegir este pastel», «Elegir esta caja» y «Planear mi evento» mantienen el mismo texto y conservan la selección. El encabezado conserva «Armar pedido». Los enlaces trasladan el foco al destino.
3. Presupuesto móvil hasta 760 px: barra inferior con cantidad y total, desglose desplegable, estados incompleto/entrega pendiente, Escape para cerrar y foco conservado. Usa el mismo presupuesto que escritorio y el recibo. Solo aparece mientras se ve el configurador, desaparece en el recibo y reserva espacio para el final del formulario. Contempla safe areas y limita la altura del panel según el encabezado.
4. Introducciones más breves. Se eliminan la segunda acción del bloque inicial, explicaciones de evento duplicadas, badges repetidos y avisos redundantes de demo. Se conserva el aviso superior, la confirmación final y las condiciones locales: alérgenos, anticipación, mínimos, entrega y montaje.
5. Alcance visible desde las entradas: un sabor por pedido diario, 1–24 piezas; cajas de surtido fijo de 6 o 12 piezas sin sustituciones; eventos de 6–200 personas. Se conserva la compra sencilla de la demo.
6. Foco y adaptación: altura del encabezado medida con ResizeObserver para los destinos; encabezado móvil en dos filas, controles de al menos 44 px, panel de búsqueda alineado al ancho disponible y devolución del foco al editar un recibo.

## Comprobaciones

- 36 pruebas de reglas, búsqueda, restauración y ausencia de envíos reales.
- Compilación de producción con comprobación de tipos y lint.
- Revisión del CSS adaptable y de las condiciones de visibilidad/altura del presupuesto.
- La comprobación pública verifica las tres entradas, los recorridos, EN/ES y el foco del teclado.

## Límite de verificación

El navegador disponible en esta sesión no ofrece emulación ni cambio de viewport. Por tanto, la revisión del CSS móvil no equivale a una prueba visual/táctil en teléfono. Esa comprobación queda pendiente y debe cubrir 320–390 px, apertura/cierre del desglose, teclado virtual, safe area y acceso al botón final sin quedar tapado. No se declara «cero fricciones» ni validación en dispositivos reales.

La demo conserva datos ficticios, cálculo local y ausencia de compras, reservas o envíos reales.
