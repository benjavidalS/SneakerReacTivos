import React from 'react'
import { render } from '@testing-library/react'
import ProductPage from '../pages/ProductPage'

describe('Pruebas Unitarias - Vista Detalle de Producto', () => {
  const mockProduct = {
    id: 'air-max-90',
    nombreModelo: 'Air Max 90',
    precio: 129990,
    descripcion: 'Silueta icónica que combina comodidad diaria.',
    tallasDisponibles: { 40: 2 }
  }
  const mockNavigate = jasmine.createSpy('navigate')

  it('1. Despliega la información detallada del producto', () => {
    render(<ProductPage product={mockProduct} navigate={mockNavigate} />)
    expect(document.body.textContent).toContain('Air Max 90')
  })

  it('2. Maneja el estado condicional cuando no se proporciona un producto', () => {
    render(<ProductPage product={null} navigate={mockNavigate} />)
    expect(document.body.textContent.length).toBeGreaterThan(0)
  })
})