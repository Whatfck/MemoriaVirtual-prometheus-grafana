import Stats from 'stats.js'

export default class MonitorRendimiento {
    constructor(gui) {
        this.stats = new Stats()
        this.stats.showPanel(0) // 0: FPS | 1: MS | 2: MB
        document.body.appendChild(this.stats.dom)

        this.memoryThreshold = 1200 // MB
        this.warningShown = false

        this.data = {
            fps: 0,
            jsMemoryMB: 0,
            alerta: '✔️ Memoria en rango',
            modoEjecucion: 'Normal',         // 🧵 Selector de modo
            tiempoBloquesMS: 0,              // ⏱️ Medición de carga
            arquitectura: 'CISC'             // 🧠 Selector arquitectural
        }

        const folder = gui.addFolder('📊 Rendimiento')
        folder.add(this.data, 'fps').name('🎯 FPS').listen()
        folder.add(this.data, 'jsMemoryMB').name('📈 Heap JS (MB)').listen()
        this.alertController = folder.add(this.data, 'alerta').name('⚠️ Estado').listen()

        // 🧵 Modo de Ejecución
        folder.add(this.data, 'modoEjecucion', ['Normal', 'Paralelo']).name('🧵 Modo Ejecución')

        // ⏱️ Tiempo de ejecución de carga
        folder.add(this.data, 'tiempoBloquesMS').name('⏱️ Tiempo 500 bloques (ms)').listen()

        // 🧠 Simulación de arquitectura
        folder.add(this.data, 'arquitectura', ['CISC', 'RISC']).name('🧠 Arquitectura')

        this.start()
    }

    start() {
        let lastTime = performance.now()
        let frameCount = 0
        let currentFps = 0
        const updateInterval = 50 // ms - actualizar FPS cada 50ms para máxima reactividad

        const loop = () => {
            this.stats.begin()

            // Cálculo preciso de FPS con actualización muy frecuente
            frameCount++
            const currentTime = performance.now()
            const deltaTime = currentTime - lastTime

            if (deltaTime >= updateInterval) {
                currentFps = Math.round((frameCount * 1000) / deltaTime)
                this.data.fps = currentFps
                frameCount = 0
                lastTime = currentTime
            }

            // Medición de Heap JS (solo en Chrome)
            if (performance && performance.memory) {
                const heapUsedMB = performance.memory.usedJSHeapSize / 1048576
                this.data.jsMemoryMB = heapUsedMB.toFixed(2)

                if (heapUsedMB > this.memoryThreshold && !this.warningShown) {
                    this.data.alerta = '🟥 ¡Memoria crítica!'
                    this.warningShown = true
                    console.warn('🚨 Uso excesivo de memoria. Posible swap activado.')
                } else if (heapUsedMB <= this.memoryThreshold && this.warningShown) {
                    this.data.alerta = '✔️ Memoria en rango'
                    this.warningShown = false
                }
            }

            this.stats.end()
            requestAnimationFrame(loop)
        }

        loop()
    }

    /**
     * Llamar esta función desde la lógica de agregar bloques.
     * Ejemplo:
     * monitor.marcarInicio()
     * ... ejecutar bloque
     * monitor.marcarFin()
     */
    marcarInicio() {
        this._inicio = performance.now()
    }

    marcarFin() {
        const fin = performance.now()
        this.data.tiempoBloquesMS = (fin - this._inicio).toFixed(2)
    }
}
