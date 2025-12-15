# FlashResponse.ai ⚡

> **Low-Latency AI Inference Demo**
>
> Una prueba de concepto de ingeniería enfocada en minimizar el TTFT (Time-To-First-Token) utilizando Google Gemini 2.0 Flash-Lite y arquitecturas reactivas.

![Status](https://img.shields.io/badge/Status-MVP_Ready-success)
![Model](https://img.shields.io/badge/AI_Model-Gemini_2.0_Flash_Lite-blue)
![Tech](https://img.shields.io/badge/Stack-React_19_+_Tailwind-38bdf8)

## 🎯 Objetivo del Proyecto

El objetivo de **FlashResponse.ai** no es construir otro chatbot genérico, sino demostrar cómo integrar Inteligencia Artificial en productos de producción donde la **latencia** es un KPI crítico.

Este proyecto resuelve el problema de la "fricción cognitiva" en interfaces de IA, reduciendo el tiempo de respuesta inicial de ~1.5s (promedio en modelos Pro) a **<500ms**, creando una experiencia de usuario fluida e instantánea.

## 🚀 Características Principales

*   **Arquitectura Low-Latency:** Optimizada para un *Time-To-First-Token* (TTFT) inferior a 500ms.
*   **Streaming Nativo:** Renderizado de tokens en tiempo real para feedback visual inmediato.
*   **Observabilidad Integrada:** Dashboard de métricas en vivo en cada mensaje:
    *   `TTFT`: Latencia de red + inferencia inicial.
    *   `Total Time`: Duración completa de la generación.
    *   `TPS`: Tokens por segundo (Throughput).
*   **Multimodalidad:** Procesamiento de imágenes y texto sin sacrificar velocidad.
*   **Ingeniería de Prompts (System Instructions):** "Persona" inyectada para respuestas técnicas, concisas y con *Context Grounding* (fecha/hora real).

## 🛠️ Stack Tecnológico

*   **Frontend:** React 19 + TypeScript + Vite.
*   **Estilos:** Tailwind CSS (Diseño moderno, Dark Mode por defecto).
*   **AI SDK:** `@google/genai` (Google GenAI SDK para Web).
*   **Modelo:** `gemini-2.0-flash-lite-preview-02-05` (Elegido por su balance costo/velocidad).
*   **Routing:** React Router DOM v7.

## 📐 Arquitectura

El sistema sigue un patrón directo **Client-to-Model** para minimizar saltos de red en esta demo (Edge-ready):

1.  **Input:** El usuario envía texto o imagen.
2.  **Pre-processing:** React gestiona el estado y prepara el payload multimodal.
3.  **Inference:** Llamada directa a Gemini Flash-Lite vía SDK.
4.  **Streaming:** Los chunks de respuesta se procesan y renderizan al vuelo.
5.  **Metrics:** Un `PerformanceObserver` interno calcula los tiempos entre el request y el primer byte.

## 📦 Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/flash-response-ai.git
    cd flash-response-ai
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz (o configura tu entorno):
    ```env
    API_KEY=tu_google_api_key_aqui
    ```

4.  **Iniciar en desarrollo:**
    ```bash
    npm run start
    ```

## 🧠 Decisiones de Ingeniería

### ¿Por qué Flash-Lite?
Para casos de uso de alta frecuencia (Customer Support, Data Extraction), la "inteligencia profunda" de un modelo Pro a menudo es innecesaria y costosa. Flash-Lite ofrece un *throughput* masivo a una fracción del costo y latencia, ideal para sistemas *Real-Time*.

### UX Optimista
La interfaz implementa estados de carga inmediatos y feedback visual durante el streaming. No esperamos a que la respuesta esté completa; mostramos la "intención" de la IA instantáneamente.

### Context Grounding
Para evitar alucinaciones temporales, el sistema inyecta dinámicamente la fecha y hora del navegador en el `System Instruction` antes de cada sesión, anclando al modelo en el presente.

---

**Autor:** Tu Nombre
**Licencia:** MIT
