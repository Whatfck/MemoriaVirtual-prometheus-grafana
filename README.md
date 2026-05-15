# 🎮 Memoria Virtual + Prometheus + Grafana

Versión containerizada de [MemoriaVirtual](https://github.com/guswill24/MemoriaVirtual) con herramientas de monitoreo y medición de rendimiento.

**Entorno 3D interactivo** con **React + Three.js**, **Prometheus y Grafana** ejecutado completamente en Docker.

---

## 🚀 Quick Start

### Linux / macOS
```bash
docker-compose -f docker-compose.unix.yml up -d
```

### Windows
```cmd
docker-compose -f docker-compose.windows.yml up -d
```

---

## 🌐 Acceso a Servicios

| Servicio | URL |
|----------|-----|
| **Aplicación** | http://localhost:8080 |
| **Prometheus** | http://localhost:9090 |
| **Grafana** | http://localhost:3000 |

**Grafana:** admin / admin

---

## 📊 Dashboards Grafana

Los dashboards se cargan automáticamente en Grafana.

---

## 🛑 Comandos Útiles

```bash
# Ver logs
docker-compose -f docker-compose.unix.yml logs -f

# Detener servicios
docker-compose -f docker-compose.unix.yml down

# Reconstruir
docker-compose -f docker-compose.unix.yml build

# Limpiar volúmenes
docker-compose -f docker-compose.unix.yml down -v

# Ver estado
docker-compose -f docker-compose.unix.yml ps

# Acceso bash en contenedor
docker-compose -f docker-compose.unix.yml exec web bash
```

---

## ⚠️ Troubleshooting

**Puertos en uso:** Cambia puertos en `docker-compose.yml`

**Grafana no conecta a Prometheus:** URL debe ser `http://prometheus:9090`

**Permisos Docker (Linux):**
```bash
sudo usermod -aG docker $USER
newgrp docker
```

---

## 📄 Licencia

Este proyecto es de uso académico y formativo para estudiantes y desarrolladores que deseen aprender sobre entornos 3D aplicados a React y OOP.

---
## 🧑 Autor Original
- Gustavo Willyn Sánchez Rodríguez
- email: guswillsan@gmail.com
