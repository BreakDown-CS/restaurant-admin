import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from '@/router'
import { env } from '@/lib/env'

async function enableMocking() {
  if (!env.VITE_ENABLE_MOCKS) return

  const { worker } = await import('@/mocks/browser')
  await worker.start({ onUnhandledFrame: 'bypass' })
}

const router = getRouter()
const rootElement = document.getElementById('app')!

enableMocking().then(() => {
  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(<RouterProvider router={router} />)
  }
})
