import React from 'react'
import { vi } from 'vitest'

globalThis.React = React

if (typeof globalThis.jasmine === 'undefined') {
  globalThis.jasmine = {
    createSpy: () => vi.fn(),
  }
}

// Mocks simples para ventana del navegador
Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true })
Object.defineProperty(window, 'open', { value: () => {}, writable: true })
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Proxy universal para WebGL y Canvas: responde a CUALQUIER función (deleteBuffer, createShader, etc.)
const webglProxy = new Proxy({}, {
  get: (target, prop) => {
    if (prop === 'canvas') return { width: 800, height: 600 }
    return vi.fn().mockReturnValue(1)
  }
})

if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation(() => webglProxy)
}