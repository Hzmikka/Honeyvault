# Honeyvault: cierre de fricciones para la demo

Actualizado el 15 de octubre de 2026. Implementación autorizada de los cambios técnicos y visuales. Los números conservan la auditoría original de 42 hallazgos.

La demo tiene tres recorridos completos: piezas diarias, cajas de surtido fijo y eventos. Las reglas de precios, preparación, horarios, stock y entrega son ficticias, consistentes y visibles. No se procesa ninguna compra ni se envían solicitudes.

| Hallazgos | Solución en la demo |
| --- | --- |
| 1, 2 | Las elecciones de producto, caja, sabores, modalidad y tienda siguen al visitante; los botones de tienda y producto llegan al configurador. |
| 3 | Cada recorrido tiene campos y unidades propios: piezas, cajas o personas. El pedido diario no pide datos de evento. |
| 4, 6 | Cajas de 6 y 12 piezas, con cantidades exactas por sabor, personas sugeridas, precio, mínimo de una caja y número de cajas explícito. |
| 5, 39 | Nueve mini postres seleccionables con ratón, toque y teclado, estado persistente y selección visible en el formulario y resumen. |
| 7 | Stock de muestra: pistacho agotado hoy en Wynwood; vainilla agotada hoy en South Beach. Se ofrecen otra tienda o una fecha posterior. |
| 8, 17 | Preparación de 30 minutos, 24 horas o 48 horas según recorrido. Solo se ofrecen franjas que respetan anticipación, apertura, cierre y domingo cerrado en Coral Gables. Hora de Miami con horario de verano. |
| 9, 10 | Nombres y precios visibles en las tarjetas; pieza completa junto a cada textura; cajas representadas con el número exacto de piezas. |
| 11, 12 | Menú diario separado de cajas y minis por encargo. Tamaño y alérgenos homogéneos y señalados como ejemplos. |
| 13, 14 | Selector de zona de muestra con tienda recomendada; horarios semanales visibles y estado de apertura por hora de Miami. |
| 15, 16 | Cobertura de ejemplo: 33127 ($8, mínimo $20), 33134 ($10, mínimo $25), 33139 solo recogida, otros ZIP fuera de cobertura. Alternativa de recogida y desglose de costes. |
| 18 | Productos y cajas incluidos. Presentación y 30 min de montaje opcionales por $75 con entrega; mesa, flores, personal y desmontaje excluidos. |
| 19 | La ruta fija la unidad. Eventos calculan dos minis por persona y distribuyen todas las piezas entre los sabores, incluso si el reparto no es exacto. |
| 20, 21 | Recogida pide tienda; entrega pide ZIP y determina la tienda correspondiente. Cambiar a recogida elimina entrega y montaje del presupuesto. |
| 22, 23 | Cantidades enteras con límites, productos conocidos, cobertura, mínimo, stock, fechas y franjas se validan antes del resumen. Fechas imposibles o pasadas no pasan. |
| 24, 25 | Fecha flexible solo en eventos. Campos opcionales identificados; el evento puede rellenarse con un ejemplo, sin contacto personal. |
| 26 | El resumen explica el siguiente paso hipotético: pago y confirmación para piezas/cajas, revisión, cotización y depósito para eventos. |
| 27, 28 | Errores con recuperación y foco; resumen de productos, cantidades, tienda, fecha/hora, modalidad y desglose. Se indica que no se ha comprado, reservado ni enviado nada. |
| 29 | El configurador se ejecuta localmente, sin POST ni datos de contacto. Solo elecciones no personales se conservan en sessionStorage. La API anterior permanece compatible pero nunca invoca un webhook, incluso si existe LEAD_WEBHOOK_URL. |
| 30 | Lista visible de múltiples resultados reales en EN/ES, acentos, cajas y tiendas; sin coincidencias se ofrecen ejemplos y enlaces al catálogo. Escape cierra la lista. |
| 31 | Rutas de pasteles, cajas y eventos accesibles antes de la imagen principal; se conserva el hero sensorial. |
| 32 | El bloque editorial queda después del configurador. |
| 33 | Rotación más lenta, pausa manual y al interactuar, con respeto de reduced motion. |
| 34, 35 | Texto y controles mayores, formularios en una columna en móvil y menú compacto que reemplaza la navegación oculta. |
| 36 | Flechas, posición de la galería y número de productos seleccionados. |
| 37, 38 | Instrucciones independientes del hover; enlaces, botones nativos, estados pulsados, etiquetas, foco, h1 y salto al contenido. |
| 40, 41, 42 | Aviso de demo desde el inicio, sin contactos ficticios de la pastelería; autoría y CTA real a Celeste Web Studio al finalizar y en el pie. |

## Criterios para una futura versión comercial

Los datos operativos son fixtures, no afirmaciones sobre negocios reales. Antes de vender harían falta precios, recetas y alérgenos verificados, cobertura real, stock, pagos, gestión de pedidos, política de privacidad y datos de contacto del negocio. Estas integraciones no forman parte de la demo.

## Validación

`npm test` comprueba cálculos en centavos, reparto, anticipación, cierres, zona horaria, stock, cobertura, mínimos, validaciones, búsqueda, restauración y la prohibición de envíos reales. `npm run lint` y `npm run build` comprueban la integración y tipos. La comprobación pública tras publicar recorre los tres flujos y sus resúmenes.
