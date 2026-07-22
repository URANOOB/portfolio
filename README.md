# William Galeano — Urano OS

Portafolio profesional interactivo inspirado en el comportamiento de un sistema operativo de escritorio y diseñado con una identidad visual original. Presenta la combinación de William Galeano entre desarrollo de software, logística internacional y servicio bilingüe.

## Qué incluye

- Escritorio responsive con barra superior, Dock accesible y fondo espacial animado.
- Administrador de ventanas con abrir, cerrar, minimizar, maximizar, mover, redimensionar y traer al frente.
- Persistencia local del tema e idioma, y persistencia por sesión de las ventanas.
- Aplicaciones de Perfil, Explorador, Experiencia, Proyectos, Tecnologías, Terminal, CV y Contacto.
- Páginas compartibles para cada proyecto, sitemap, robots y datos estructurados.
- Formulario preparado para Resend, con validación en cliente y servidor.
- Dos versiones descargables del CV y diseño de impresión.
- Respeto por `prefers-reduced-motion`, navegación con teclado y estados de foco visibles.

## Arquitectura

```text
app/                 rutas, metadata, API de contacto y SEO
components/desktop/ escritorio, Dock, barra superior y arranque
components/windows/ administrador y carga dinámica de aplicaciones
components/apps/    aplicaciones funcionales de Urano OS
data/                contenido profesional tipado y editable
store/               estado global de ventanas y preferencias
lib/                 terminal segura y validación
types/               modelo TypeScript del portafolio
tests/               pruebas de lógica y renderizado
public/cv/           currículos descargables
```

Los datos inciertos se identifican como pendientes de validación. Completa fechas, cargos, enlaces, métricas, formación y certificaciones en `data/` cuando existan fuentes verificables.

## Instalación

Requiere Node.js 22.13 o superior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`. En Windows usa `Copy-Item .env.example .env.local` para copiar la configuración.

## Formulario de contacto

1. Verifica un dominio en Resend.
2. Completa `RESEND_API_KEY`, `CONTACT_EMAIL` y `CONTACT_FROM_EMAIL` en `.env.local`.
3. En producción, agrega las mismas variables al proveedor de despliegue.

Sin estas variables, el entorno local valida el formulario sin realizar una entrega real; producción devuelve un error de configuración claro.

## Validación

```bash
npm run lint
npm run format:check
npm test
```

## Despliegue en Vercel

1. Sube el repositorio a GitHub, GitLab o Bitbucket.
2. Importa el proyecto en Vercel; `vercel.json` selecciona el build estándar de Next.js.
3. Agrega las variables del formulario y `NEXT_PUBLIC_SITE_URL` con el dominio final.
4. Despliega y confirma el envío del formulario desde el dominio publicado.

También puede compilarse mediante la ruta de Sites con `npm run build`.

## Personalización rápida

- Perfil y enlaces: `data/profile.ts`
- Proyectos: `data/projects.ts`
- Experiencia: `data/experience.ts`
- Tecnologías: `data/skills.ts`
- Ventanas y accesos: `data/navigation.ts`
- Colores, movimiento y responsive: `app/globals.css`

Antes de publicar, reemplaza los enlaces nulos, agrega la fotografía profesional original y valida toda la información temporal con el CV fuente.
