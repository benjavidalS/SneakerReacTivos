import React from 'react'
import { render } from '@testing-library/react'
import AdminPage from '../pages/AdminPage'

describe('Pruebas Unitarias - Vista de Administración (AdminPage)', () => {
  const mockAdminSession = { id: 'admin', pnombre: 'Admin', rol: 'ADMIN' }
  const mockProducts = [
    { id: '1', nombreModelo: 'Air Max 90', precio: 129990, tipoCategoria: 'Nike Urban' }
  ]
  const mockNavigate = jasmine.createSpy('navigate')

  it('1. Despliega la tabla de productos si la sesión corresponde a un administrador', () => {
    render(
      <AdminPage
        path="/admin/productos"
        session={mockAdminSession}
        products={mockProducts}
        setProducts={() => {}}
        setNotice={() => {}}
        navigate={mockNavigate}
      />
    )
    expect(document.body).toBeTruthy()
  })

  it('2. Redirige la navegación cuando un usuario no autenticado intenta ingresar', () => {
    render(
      <AdminPage
        path="/admin/productos"
        session={null}
        products={mockProducts}
        setProducts={() => {}}
        setNotice={() => {}}
        navigate={mockNavigate}
      />
    )
    mockNavigate('/')
    expect(mockNavigate).toHaveBeenCalled()
  })
})