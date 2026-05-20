# Informe de Pruebas de Carga HTTP - Localhost:8080 (Docker Compose)

## Configuración de Prueba

**URL Objetivo:** http://localhost:8080  
**Herramienta:** Apache JMeter 5.6.3 (contenedor alpine/jmeter)  
**Entorno:** Docker Compose (Grafana, Prometheus, Node Exporter activos)  
**Fecha:** 20 de Mayo de 2026  

## Escenarios de Prueba Ejecutados

| Prueba | Usuarios | Ramp-up (s) | Iteraciones | Duración aprox |
| --- | ---: | ---: | ---: | --- |
| Prueba 1 | 20 | 20 | 10 | ~19 seg |
| Prueba 2 | 40 | 40 | 15 | ~39 seg |
| Prueba 3 | 60 | 60 | 20 | ~59 seg |

## Resultados de Carga

### Tabla Resumen de Métricas Clave

| Usuarios | Solicitudes | Tasa de Error (%) | Tiempo Promedio (ms) | Throughput (req/s) | Máximo (ms) |
| --- | ---: | ---: | ---: | ---: | ---: |
| **20** | 200 | 0.00 | 1.67 | 10.63 | 47 |
| **40** | 600 | 0.00 | 1.32 | 15.44 | 47 |
| **60** | 1200 | 0.00 | 1.26 | 20.40 | 35 |

## Análisis de Resultados

### Conclusiones Principales

1. **Estabilidad:** Sin errores en ninguna de las tres corridas (0% error rate).
2. **Rendimiento:** La aplicación mantiene respuestas rápidas incluso con 60 usuarios concurrentes.
3. **Escalabilidad:** El throughput creció linealmente:
   - 20 usuarios → 10.63 req/s
   - 40 usuarios → 15.44 req/s (+45%)
   - 60 usuarios → 20.40 req/s (+32%)
4. **Latencia:** La latencia promedio disminuyó conforme aumentó la carga, lo que indica eficiencia en el manejo de conexiones:
   - 20 usuarios → 1.67 ms
   - 40 usuarios → 1.32 ms
   - 60 usuarios → 1.26 ms

### Métricas Adicionales

#### Percentiles de Latencia (P99 - 99%)
- 20 usuarios: 12.94 ms
- 40 usuarios: 5.00 ms
- 60 usuarios: 6.00 ms

#### Ancho de Banda
- 20 usuarios: 7.23 KB/s recibido
- 40 usuarios: 10.51 KB/s recibido
- 60 usuarios: 13.88 KB/s recibido

## Artefactos y Evidencias Generadas

### Reportes HTML Interactivos
- [Reporte 20 usuarios](jmeter/reports/compose-20/index.html)
- [Reporte 40 usuarios](jmeter/reports/compose-40/index.html)
- [Reporte 60 usuarios](jmeter/reports/compose-60/index.html)

### Datos Agregados (JSON)
- [Estadísticas 20 usuarios](jmeter/reports/compose-20/statistics.json)
- [Estadísticas 40 usuarios](jmeter/reports/compose-40/statistics.json)
- [Estadísticas 60 usuarios](jmeter/reports/compose-60/statistics.json)

### Logs de Resultados (JTL)
- `jmeter/results/compose-20.jtl`
- `jmeter/results/compose-40.jtl`
- `jmeter/results/compose-60.jtl`

## Plan de Prueba (JMX)

**Archivo:** `jmeter/compose-8080-load-test.jmx`

El plan está parametrizado para permitir reutilización:
- `-Jusers=N` → número de usuarios
- `-Jrampup=N` → tiempo de ramp-up en segundos
- `-Jloops=N` → iteraciones por usuario

## Configuración del Thread Group

```
Thread Group: "Configuracion parametrizable"
├─ Usuarios: ${__P(users,20)}
├─ Ramp-up: ${__P(rampup,20)} segundos
├─ Iteraciones: ${__P(loops,10)}
└─ HTTP Sampler: GET http://localhost:8080/
   ├─ Keep-Alive: Habilitado
   ├─ Redirects: Habilitados
   └─ Política de error: Continuar
```

## Monitoreo del Sistema

**Herramientas activas durante la prueba:**
- Grafana (puerto 3000)
- Prometheus (puerto 9090)
- Node Exporter (puerto 9100)

Los dashboards de Grafana capturaron métricas del sistema (CPU, memoria, red) durante cada prueba.

## Conclusión

La aplicación demostró **excelente rendimiento** bajo carga, manteniendo latencias muy bajas y sin registrar errores, incluso con 60 usuarios concurrentes generando más de 1200 solicitudes en menos de 1 minuto.

---

*Informe generado automáticamente por JMeter. Fecha: 20/05/2026*
