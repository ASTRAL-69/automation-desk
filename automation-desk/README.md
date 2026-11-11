# Automation Desk

Portafolio web del **Automation Desk**: banco de entrenamiento eléctrico‑industrial 4.0 con sistema de monitoreo basado en ESP32 (firmware FreeRTOS).
Proyecto Integrador · Facultad de Ingeniería · Universidad San Buenaventura, Bogotá · 2026‑II.

**Autores:** Bryan Cadena Agudelo · Ángel David Rubio  
**Director:** Jonathan Paolo Tovar

## Contenido del sitio

| Página | Qué muestra |
| --- | --- |
| `index.html` | Problema, módulos, normativa, metas y resumen de riesgos |
| `banco.html` | El banco, objetivos y **diagrama de pez (Ishikawa)** de las causas del problema |
| `monitoreo.html` | Mapa de pines GPIO, diagrama de conexión, tareas FreeRTOS, interbloqueo, alcance y trabajo futuro |
| `riesgos.html` | **Matriz de riesgos** (80 eventos, fases de desarrollo y campo industrial) con filtros |
| `galeria.html` | Fotos reales y renders (cada imagen indica si es FOTO o RENDER) |
| `equipo.html` | Equipo, cronograma y resultados parciales |

Documentos de soporte en `docs/`: informe técnico (`Automation_Desk_Informe.docx`) y matriz de riesgos (`Matriz_de_Riesgos.xlsx`).

## Ver el sitio en local

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

Es un sitio estático (HTML + CSS + JS), sin dependencias ni paso de compilación.

## Publicar en GitHub Pages

1. En GitHub: **Settings → Pages**.
2. En *Build and deployment* elegir **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. El sitio queda en `https://<usuario>.github.io/<repositorio>/`.
