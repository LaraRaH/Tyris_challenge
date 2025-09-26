/**
 * Prueba 3 – Optimización de Respuesta de Endpoints
Menciona 3 ideas concretas que aplicarías para:
- Mejorar el tiempo de respuesta de un endpoint.
- Prevenir que aumente el tiempo de respuesta en el futuro
 */

/**RESPUESTA:
Para mejorar el tiempo de respuesta de un endpoint, en primer lugar optimizaría las consultas a la base de datos usando índices o devolviendo sólo la información necesaria.
Si, a pesar de ello, la cantidad de información devuelta sigue siendo considerable, intentaría reducir la carga con paginación. Además, emplearía llamadas asíncronas.

En cuanto a la prevención de aumento de la respuesta de un endpoint, le daría importancia a los test de rendimiento para evitar que un endpoint lento llegue a producción, 
intentaría hacer un buen uso de los timeouts para evitar que las llamadas a sistemas externos se descontrolen y le daría mucha importancia a la documentación para evitar
la repetición de lógica y haría refactos periódicos de las partes más conflictivas.
 */