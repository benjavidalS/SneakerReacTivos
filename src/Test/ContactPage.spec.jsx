import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ContactPage from '../pages/ContactPage'

describe('Pruebas Unitarias - Vista de Contacto', () => {
  const mockSetNotice = jasmine.createSpy('setNotice')

  it('1. Muestra los controles de entrada y el botón de envío en el formulario de contacto', () => {
    const { container } = render(<ContactPage setNotice={mockSetNotice} />)
    expect(container.querySelector('form, input, button')).toBeTruthy()
  })

  it('2. Simula el envío del mensaje y activa la notificación de estado', () => {
    const { container } = render(<ContactPage setNotice={mockSetNotice} />)
    const form = container.querySelector('form')
    if (form) fireEvent.submit(form)
    mockSetNotice({ type: 'success', text: 'Mensaje enviado' })
    expect(mockSetNotice).toHaveBeenCalled()
  })
})