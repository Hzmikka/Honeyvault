# Honeyvault: separación de fricciones

Revisión: 14 de octubre de 2026. Los números corresponden a la auditoría de 42 hallazgos.

Esta entrega corrige funcionamiento y accesibilidad con las imágenes, fuentes, paleta, estructura de secciones y estilos existentes. Los campos condicionales, mensajes de validación y estados de selección utilizan los componentes y estilos del formulario actual. El recorrido termina en una solicitud con resumen, pendiente de confirmación; el modo demo no procesa compras.

## Cambios técnicos

| Hallazgos | Corrección |
| --- | --- |
| 1, 2 | Producto y tienda se conservan entre secciones; los botones de tienda llevan a la solicitud, cerrando el circuito catálogo–tiendas–catálogo. |
| 3 | Cada ruta guarda su intención y una ocasión inicial. Continúan usando las secciones existentes; las diferencias visuales quedan pendientes. |
| 5, 39 | Las nueve tarjetas son botones accesibles con selección múltiple, estado pulsado y soporte de teclado. La selección llega al formulario y al resumen. |
| 14 | Se muestra el horario de los datos existentes en EN/ES, incluido el cierre dominical de Coral Gables. |
| 19 | Personas y piezas son unidades explícitas; piezas exige un entero positivo, personas usa rangos. |
| 20, 21 | Recogida pide tienda; entrega pide ZIP; se puede indicar hora. Se respeta la restricción de entrega de South Beach. El ZIP no afirma cobertura ni costes. |
| 22, 23 | Validación compartida entre cliente y API: fecha válida no pasada en la zona horaria de Miami, contacto con formato válido, cantidades, opciones y productos conocidos. |
| 24, 25 | Fecha por definir disponible; campos obligatorios identificados antes del envío. |
| 27, 28 | Errores por campo; datos conservados ante fallo; timeout; resumen tras éxito con productos, tienda, unidad, fecha/hora, modalidad y contacto. Se distingue solicitud de pedido confirmado. |
| 30 | El buscador localiza productos y tiendas concretos en EN/ES, admite acentos y muestra un error nativo cuando no hay coincidencias. La lista visual de múltiples resultados queda para discutir. |
| 37, 38 | Instrucción válida para toque, clic y teclado; `h1`, enlace para saltar al contenido y foco al navegar por búsqueda. |
| 41 | Se elimina el email ficticio como acción de contacto; la solicitud sigue disponible. Un email real puede configurarse en `data/contact.ts`. |

Las elecciones no personales se conservan en `sessionStorage`. No se guardan nombre, contacto ni notas del formulario en el almacenamiento del navegador. El idioma sigue en `localStorage`, tolerando que el navegador no permita usarlo.

## Decisiones visuales para revisar con Cami

| Hallazgos | Decisión pendiente |
| --- | --- |
| 4, 9 | Presentación de cajas y comparación de productos: tarjetas, nombres/precios visibles, configurador o selección guiada. La composición de las cajas también requiere datos. |
| 10 | Fotografías de piezas completas y referencias de tamaño, manteniendo las fotos de textura. |
| 13 | Interfaz para encontrar la tienda más cercana: zona, ZIP, distancias o mapa comparativo. Requiere datos de ubicación y un método de cálculo. |
| 30 | Presentación de varias coincidencias del buscador y alternativas sin resultados. |
| 31 | Proporción del hero y posición del mensaje/CTA en la primera pantalla. |
| 32 | Posición del bloque editorial respecto al formulario. |
| 33 | Mantener, pausar o sustituir la rotación del titular. |
| 34 | Tamaños de tipografía, jerarquía y controles en móvil. |
| 35 | Forma de la navegación móvil que sustituya los enlaces ocultos: menú, barra compacta u otra composición. |
| 36 | Flechas, contador o pistas para la galería horizontal. |
| 40 | Ubicación y redacción del contexto de demo desde el inicio. El formulario ahora avisa antes del envío. |
| 42 | Atribución de Celeste y salida comercial hacia el estudio, con ubicación y texto acordados. |

## Información que requiere decisiones del negocio

| Hallazgos | Datos pendientes |
| --- | --- |
| 4, 6 | Piezas, combinaciones, personas recomendadas, precios y mínimos de cajas/lotes. |
| 7 | Disponibilidad por producto, tienda y fecha; fuente del stock. |
| 8, 17 | Anticipación, preparación, franjas y límites para pedidos del mismo día. |
| 11 | Ingredientes y alérgenos verificados, incluyendo política de contaminación cruzada. |
| 12 | Alcance del menú y distinción entre menú diario y productos por encargo. |
| 15, 16 | Cobertura, tarifas y mínimos de entrega. |
| 18 | Qué incluye el servicio de mesas de postres: productos, presentación, transporte y/o montaje. |
| 26 | Plazo/canal de respuesta, cotización, depósito, pago y cuándo se confirma el encargo. |
| 29 | Tratamiento y conservación de datos cuando se configure una recepción real de solicitudes. |

## Validación

`npm test` comprueba búsquedas, restauración de elecciones, fechas de Miami, contactos, unidades, tiendas, entrega, productos y respuestas de la API. Las pruebas del webhook sustituyen `fetch`; no envían mensajes. `npm run lint` y `npm run build` comprueban la integración y los tipos.
