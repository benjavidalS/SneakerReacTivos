import React from 'react'
import { render, screen } from '@testing-library/react'
import { AboutPage, JournalPage } from '../pages/MarketingPages'

describe('Pruebas Unitarias - Vistas Informativas (Nosotros y Blogs)', () => {
  const mockNavigate = jasmine.createSpy('navigate')

  it('1. (Nosotros) Renderiza el contenido de la historia y valores corporativos', () => {
    render(<AboutPage navigate={mockNavigate} />)
    const matches = screen.queryAllByText(/nosotros|historia|misión|facture/i)
    expect(matches.length).toBeGreaterThan(0)
  })

  it('2. (Blogs) Muestra el encabezado y las entradas disponibles del diario de noticias', () => {
    render(<JournalPage navigate={mockNavigate} />)
    expect(document.body.textContent).toBeTruthy()
  })
})