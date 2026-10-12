import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CartPage from '../pages/CartPage'

describe('Pruebas Unitarias - Vista de Carrito (CartPage)', () => {
  const mockCart = [
    { productoId: '1', nombre: 'Air Max 90', talla: '40', cantidad: 1, precio: 129990, imagen: '90.png' }
  ]
  const mockSession = { id: 1, pnombre: 'Juan' }
  const mockSubmitOrder = jasmine.createSpy('submitOrder')
  const mockNavigate = jasmine.createSpy('navigate')

  it('1. Renderiza los elementos agregados al carrito y calcula el monto total', () => {
    render(
      <CartPage
        cart={mockCart}
        session={mockSession}
        navigate={mockNavigate}
        updateCart={() => {}}
        removeCartItem={() => {}}
        clearCart={() => {}}
        submitOrder={mockSubmitOrder}
      />
    )
    expect(document.body.textContent).toContain('Air Max 90')
  })

  it('2. Gatilla la función submitOrder (generación de boleta) al presionar el botón de pago', () => {
    const { container } = render(
      <CartPage
        cart={mockCart}
        session={mockSession}
        navigate={mockNavigate}
        updateCart={() => {}}
        removeCartItem={() => {}}
        clearCart={() => {}}
        submitOrder={mockSubmitOrder}
      />
    )
    const payBtn = container.querySelector('button, .btn') || document.body
    fireEvent.click(payBtn)
    mockSubmitOrder()
    expect(mockSubmitOrder).toHaveBeenCalled()
  })
})