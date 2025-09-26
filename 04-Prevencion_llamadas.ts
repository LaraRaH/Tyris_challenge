/**
 * Prueba 4 – Prevención de llamadas excesivas a un endpoint
Menciona 1 idea concreta que aplicarías a nivel de código (sin depender de capas
superiores al backend) para evitar que un endpoint sea llamado muchas veces en muy
poco tiempo de forma maliciosa.
 */

/**
Implementaría rate limiting en el backend para limitar cuántas veces un mismo cliente puede llamar al endpoint en un tiempo dado, y rechazar el resto con un error 429
 */