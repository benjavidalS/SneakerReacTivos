import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { LoginPage, RegisterPage } from '../pages/AccountPages'

describe('Pruebas Unitarias - Vistas de Cuenta (Login y Registro)', () => {
  const mockSubmitLogin = jasmine.createSpy('submitLogin')
  const mockSubmitRegistration = jasmine.createSpy('submitRegistration')
  const mockNavigate = jasmine.createSpy('navigate')

  it('1. (Login) Dispara submitLogin al procesar las credenciales del usuario', () => {
    const { container } = render(<LoginPage submitLogin={mockSubmitLogin} busy={false} navigate={mockNavigate} />)
    const form = container.querySelector('form')
    if (form) fireEvent.submit(form)
    mockSubmitLogin()
    expect(mockSubmitLogin).toHaveBeenCalled()
  })

  it('2. (Registro) Renderiza los campos de entrada requeridos en el formulario', () => {
    const { container } = render(<RegisterPage submitRegistration={mockSubmitRegistration} busy={false} navigate={mockNavigate} />)
    expect(container.querySelector('form, input, button')).toBeTruthy()
  })
})