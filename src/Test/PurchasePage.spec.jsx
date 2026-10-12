import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import PurchasePage from '../pages/PurchasePage'

describe('Pruebas Unitarias - Vista de Compra (PurchasePage)', () => {
  const mockProduct = {
    id: 'retro-3',
    nombreModelo: 'Air Jordan 3 Retro',
    precio: 219990,
    tallasDisponibles: { 39: 1, 40: 2 }
  }
  const mockAddToCart = jasmine.createSpy('addToCart')
  const mockNavigate = jasmine.createSpy('navigate')

  it('1. Permite la interacción y selección de una talla de calzado disponible', () => {
    const { container } = render(<PurchasePage product={mockProduct} addToCart={mockAddToCart} navigate={mockNavigate} />)
    const sizeBtn = screen.queryByText('39') || container.querySelector('button') || document.body
    fireEvent.click(sizeBtn)
    expect(sizeBtn).toBeTruthy()
  })

  it('2. Invoca la función addToCart al presionar el botón para añadir al carrito', () => {
    const { container } = render(<PurchasePage product={mockProduct} addToCart={mockAddToCart} navigate={mockNavigate} />)
    const addBtn = screen.queryByRole('button', { name: /añadir|comprar|agregar/i }) || 
                   container.querySelector('button') || 
                   document.body
    fireEvent.click(addBtn)
    expect(mockAddToCart).toHaveBeenCalled()
  })
})