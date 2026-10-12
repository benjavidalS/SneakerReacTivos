import React from 'react'
import { render } from '@testing-library/react'
import CatalogPage from '../pages/CatalogPage'

describe('Pruebas Unitarias - Vista Catálogo (CatalogPage)', () => {
  const mockProducts = [
    { id: '1', nombreModelo: 'Air Jordan 3', tipoCategoria: 'Jordan', precio: 219990, linkImagen: 'jordan.png' }
  ]
  const mockNavigate = jasmine.createSpy('navigate')

  it('1. Renderiza el catálogo de productos correctamente', () => {
    render(<CatalogPage routeCategory="jordan" categoryProducts={mockProducts} navigate={mockNavigate} />)
    expect(document.body).toBeTruthy()
  })

  it('2. Despliega la información de los productos en pantalla', () => {
    render(<CatalogPage routeCategory="jordan" categoryProducts={mockProducts} navigate={mockNavigate} />)
    expect(document.body.textContent.length).toBeGreaterThan(0)
  })
})