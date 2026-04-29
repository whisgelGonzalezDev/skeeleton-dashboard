# skeeleton-base

> Production-ready React admin dashboard scaffold — auth, dark mode, i18n, toasts, error boundaries and a clean feature-based architecture out of the box.

---

## Descripción para GitHub

**skeeleton-base** es un scaffold de dashboard administrativo construido con React 18, Vite, TypeScript y Tailwind CSS. Incluye autenticación mock, modo oscuro, internacionalización en 4 idiomas, notificaciones toast, manejo de errores y una arquitectura modular lista para escalar.

`React 18` · `Vite` · `TypeScript` · `Tailwind CSS` · `React Router v6` · `TanStack Query v5` · `i18next` · `Sonner`

---

## Instalación

### Requisitos previos

- Node.js **18+**
- npm **9+**

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/skeeleton-base.git
cd skeeleton-base

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`.

### Credenciales de acceso (mock)

```
Email:    admin@skeeleton.com
Password: password123
```

### Comandos disponibles

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción (`tsc` + Vite) |
| `npm run preview` | Preview del build de producción |
| `npm run lint` | ESLint sobre todo el proyecto |

### Variables de entorno (opcionales)

Crea un archivo `.env` en la raíz si necesitas apuntar a una API real:

```env
VITE_API_BASE_URL=https://api.tu-dominio.com
```

> Sin esta variable, el cliente HTTP apunta a `/api` por defecto.

---

## Arquitectura

El proyecto sigue **Screaming Architecture**: la estructura de carpetas grita *qué hace* la app, no *cómo está construida*.

```
src/
├── core/               # Infraestructura compartida (no es negocio)
│   ├── components/     # Componentes UI reutilizables
│   ├── hooks/          # Hooks de utilidad globales
│   ├── providers/      # Contextos React (tema, etc.)
│   ├── i18n/           # Configuración y traducciones
│   └── utils/          # Funciones helper y mock data
│
├── features/           # ★ Aquí vive el negocio
│   ├── auth/           # Login, hook de autenticación
│   └── users/          # Módulo de usuarios (tabla, API, página)
│   └── sales/          # Módulo de ventas (dashboard)
│
├── layout/             # Shell de la app (sidebar + header)
├── routes/             # Router y guard de rutas protegidas
└── main.tsx            # Entry point
```

---

## Guía rápida: ¿Dónde va cada cosa?

### Añadir una nueva feature de negocio

Ejemplo: módulo de **Productos**.

```
src/features/products/
├── api/
│   └── getProducts.ts      ← useQuery hook + función fetch
├── components/
│   └── ProductTable.tsx    ← UI de la feature
└── ProductsPage.tsx        ← Página que ensambla todo
```

**1. Crear el hook de datos** (`api/getProducts.ts`):

```ts
import { useQuery } from '@tanstack/react-query'
import { simulateApiDelay, MOCK_PRODUCTS } from '@/core/utils/mockData'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => simulateApiDelay(MOCK_PRODUCTS),
  })
}
```

**2. Crear la página** (`ProductsPage.tsx`):

```tsx
import { useTranslation } from 'react-i18next'
import { ProductTable } from './components/ProductTable'

export function ProductsPage() {
  const { t } = useTranslation()
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
        {t('products.title')}
      </h1>
      <ProductTable />
    </div>
  )
}
```

**3. Registrar la ruta** (`src/routes/index.tsx`):

```tsx
import { ProductsPage } from '@/features/products/ProductsPage'

// Dentro de protectedRoutes:
{ path: '/products', element: <ProductsPage /> }
```

**4. Añadir al sidebar** (`src/layout/DashboardLayout.tsx`):

```tsx
import { Package } from 'lucide-react'

// Dentro de NAV_ITEMS:
{ to: '/products', labelKey: 'nav.products', icon: Package }
```

**5. Añadir traducciones** (`src/core/i18n/locales/en.ts` y los otros 3):

```ts
nav:      { products: 'Products' },
products: { title: 'Products' },
```

---

### Añadir un componente UI reutilizable

Va en `src/core/components/`. Debe ser genérico, sin lógica de negocio.

```tsx
// src/core/components/Spinner.tsx
export function Spinner() {
  return (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
  )
}
```

Exportarlo desde el barrel `src/core/components/index.ts`:

```ts
export { Spinner } from './Spinner'
```

---

### Mostrar una notificación toast

Usa `useNotify` en cualquier componente que esté dentro del árbol de `ThemeProvider`:

```tsx
import { useNotify } from '@/core/hooks/useNotify'

function MyComponent() {
  const notify = useNotify()

  const handleSave = async () => {
    await saveData()
    notify.success('common.savedSuccessfully')  // clave de i18n
    notify.error('common.error')
    notify.info('common.info')
  }
}
```

> Añade la clave correspondiente en los 4 archivos de locale antes de usarla.

---

### Proteger una ruta

Todas las rutas hijas del layout ya están protegidas automáticamente por `ProtectedRoute`. No hace falta hacer nada extra — basta con añadir la ruta dentro de `protectedRoutes` en `src/routes/index.tsx`.

```tsx
// ✅ Ya protegida — está dentro de ProtectedRoute > DashboardLayout
{ path: '/products', element: <ProductsPage /> }

// ✅ Pública — fuera del bloque protegido
{ path: '/auth/login', element: <LoginPage /> }
```

---

### Usar el Modal base

```tsx
import { Modal } from '@/core/components'

function MyFeature() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Abrir</button>

      <Modal open={open} onClose={() => setOpen(false)} size="md">
        <Modal.Header onClose={() => setOpen(false)}>
          Crear producto
        </Modal.Header>
        <Modal.Body>
          {/* formulario */}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setOpen(false)}>Cancelar</button>
          <button>Guardar</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
```

Cierra con `Esc`, con clic en el backdrop o con el botón `×`.

---

### Envolver una sección con ErrorBoundary

```tsx
import { ErrorBoundary } from '@/core/components'

// En routes/index.tsx, alrededor de cualquier feature:
{
  path: '/products',
  element: (
    <ErrorBoundary>
      <ProductsPage />
    </ErrorBoundary>
  ),
}
```

Si `ProductsPage` lanza un error de renderizado, el sidebar y el resto de la app siguen funcionando. Solo esa sección muestra la UI de recuperación.

---

### Reemplazar el mock auth por una API real

Edita únicamente `src/features/auth/hooks/useAuth.tsx`:

```ts
const login = useCallback(async (email: string, password: string) => {
  // Reemplaza simulateApi() con tu llamada real:
  const response = await apiClient.post<AuthUser>('/auth/login', { email, password })
  if (!response.ok) throw new Error('invalid_credentials')

  localStorage.setItem(SESSION_KEY, JSON.stringify(response.data))
  setUser(response.data)
}, [])
```

El cliente HTTP está en `src/core/utils/apiClient.ts` y lee `VITE_API_BASE_URL` del entorno.

---

## Stack completo

| Capa | Librería | Versión |
|---|---|---|
| UI framework | React | 18.3 |
| Build tool | Vite | 5.4 |
| Lenguaje | TypeScript | 5.5 |
| Estilos | Tailwind CSS | 3.4 |
| Routing | React Router | 6.26 |
| Server state | TanStack Query | 5.56 |
| i18n | i18next + react-i18next | 23/15 |
| Íconos | Lucide React | 0.447 |
| Toasts | Sonner | latest |

---

## Convenciones

- **Nombres de archivos**: `PascalCase` para componentes y páginas, `camelCase` para hooks y utils.
- **Traducciones**: toda cadena visible por el usuario va en los 4 archivos de locale. Nunca texto hardcodeado en componentes.
- **Dark mode**: usa siempre el par `text-zinc-900 dark:text-white` para títulos y `text-zinc-500 dark:text-zinc-300` para texto secundario.
- **Datos mock**: viven en `src/core/utils/mockData.ts`. Al conectar una API real, solo cambia la función `queryFn` del hook correspondiente.
