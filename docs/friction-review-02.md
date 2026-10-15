# Honeyvault: segunda revisión de fricciones

15 de octubre de 2026. Alcance: demo bilingüe de portafolio, tres recorridos simulados y las dos capturas señaladas por Cami. Se aplican las correcciones visuales solicitadas y las técnicas; las nuevas decisiones de diseño quedan para discutir.

## Cambios aplicados

| Fricción observada | Solución |
| --- | --- |
| El menú se repetía antes del hero. | Se elimina la fila del hero; se conserva la navegación superior. |
| Los enlaces superiores y el CTA eran poco claros. | Botones Pasteles, Cajas, Tiendas y Eventos; CTA «Armar pedido», con equivalentes en inglés. Menú compacto cuando no cabe la navegación completa. |
| Una banda marrón tapaba la parte inferior de las fotos de minis. | Fotos sin banda; nombres debajo, selección visible con contorno y marca. |
| Cambiar de tienda o modalidad podía sustituir una fecha elegida. | Se conserva el día explícito. Una hora incompatible se vacía y solicita una nueva elección; un día cerrado no se cambia por otro sin avisar. Las fechas iniciales automáticas siguen respetando la preparación de cada recorrido. |
| Explorar el mapa o consultar una zona modificaba la tienda/modalidad del pedido. | El mapa y el selector de zona cambian solo la vista. El botón «Pedir en…» sigue siendo la acción explícita que selecciona la tienda. |
| Enter en una búsqueda con varias coincidencias elegía arbitrariamente la primera. | Se mantienen los resultados para elegir. Solo una coincidencia única puede abrirse directamente. |
| Los detalles y el CTA de un pastel cambiaban al pasar el cursor por otra textura. | El panel y su CTA siguen el producto elegido mediante clic o teclado. El hover conserva la previsualización visual de las texturas. |
| Un error del formulario podía seguir visible después de corregir el campo. | El resumen muestra únicamente los errores que siguen vigentes. Al enviar se usa la hora actual también para actualizar la validación visible. |
| Un evento sin sabores mostraba un total de $0. | Se pide completar selección/cantidad antes de mostrar un presupuesto. |
| El contador de la galería no describía todas las tarjetas visibles. | Se muestra el intervalo visible (por ejemplo, 1–5 de 9) y las flechas se desactivan en los extremos reales. |
| Al cerrar el menú compacto podía perderse el foco de navegación. | Los enlaces llevan el foco al destino, respetando movimiento reducido. |

## Decisiones de diseño para discutir

Son fricciones posibles a partir de la estructura y la interfaz; no hay datos de usuarios ni mediciones de conversión que permitan cuantificar su impacto. Se discutieron después de esta revisión y Cami autorizó los ajustes de cierre: véase [cierre de la demo](demo-release.md).

| Prioridad | Observación | Propuesta para una demo |
| --- | --- | --- |
| Alta | Cuatro tarjetas iniciales representan tres recorridos: ocasión especial y pedido grande desembocan en el mismo formulario de evento. | Reducir a tres entradas: Pasteles, Cajas y Eventos. Si se quieren conservar cuatro, definir ejemplos distintos que cambien de verdad la configuración. |
| Alta | En móvil, el presupuesto queda después del formulario; al elegir sabores no se ve simultáneamente el total. | Un resumen compacto plegable o un total fijo, sin ocupar demasiado espacio. Requiere decidir el tratamiento visual y verificarlo en móvil. |
| Media | La página tiene catálogo, cajas, tiendas, prueba social, galería, configuración y contenido editorial; hay muchos pasos de desplazamiento y llamadas repetidas. | Simplificar introducciones y hacer que cada sección tenga una sola acción principal hacia el recorrido correspondiente. |
| Media | Los avisos de demo se repiten en varios bloques. | Mantener el aviso inicial y la confirmación final; integrar las aclaraciones necesarias cerca del dato al que aplican. Revisar el copy sin perder claridad sobre la simulación. |
| Media | El pedido diario admite un solo sabor y las cajas son de surtido fijo. | Decidir si la demo debe enseñar una bolsa mixta. Para una demostración breve, conservar el alcance actual; para enseñar un carrito, diseñar selección múltiple y edición del resumen. |

## Verificación y límites

`npm test`: 36 pruebas de reglas comerciales, búsqueda, restauración, validación y ausencia de envíos reales. Se añaden casos de conservación de fecha/hora entre tiendas y recuperación de fechas vacías, caducadas o imposibles. `npm run lint` y `npm run build` revisan integración y tipos.

La comprobación de producción se centra en la navegación única, fotos y etiquetas, buscador, conservación de fecha, consulta del mapa y los tres resúmenes simulados. La revisión visual se hace en escritorio; las reglas adaptativas se revisan en CSS, sin afirmar una prueba en dispositivos móviles reales.

Comprobado en la web pública: búsqueda «crema» con cinco resultados y sin elección automática al pulsar Enter; día elegido mediante el control nativo conservado entre tiendas, hora válida conservada y hora incompatible vaciada; consulta de mapa/zona independiente del pedido; error de ZIP eliminado al corregirlo; resúmenes de 3 pistachos ($22.50), 2 cajas pequeñas ($84) y evento de 24 personas con montaje y entrega ($299). Las fotos muestran los nombres debajo. La revisión detectó además que el scroll snap inicial dejaba 4 px de desplazamiento; los límites de las flechas se calculan ahora por la posición de las tarjetas, incluyendo ese margen.

No se añaden pagos, contactos, stock real ni integraciones comerciales: el objetivo sigue siendo que el visitante complete y entienda una simulación breve.
