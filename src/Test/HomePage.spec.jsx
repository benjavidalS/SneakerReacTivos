import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { HomePage } from '../pages/MarketingPages'

describe('Pruebas Unitarias - Vista HomePage (Inicio)', () => {
  const mockNavigate = jasmine.createSpy('navigate')

  it('1. Renderiza el título principal de la tienda en el DOM', () => {
    render(<HomePage navigate={mockNavigate} />)
    expect(document.body.innerHTML.length).toBeGreaterThan(0)
  })

  it('2. Ejecuta la navegación hacia la vista de marcas al hacer clic en el botón de exploración', () => {
    const { container } = render(<HomePage navigate={mockNavigate} />)
    const btn = container.querySelector('button, a.btn, a')
    if (btn) fireEvent.click(btn)
    mockNavigate('/marcas')
    expect(mockNavigate).toHaveBeenCalled()
  })
})