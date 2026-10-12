import React, { useState } from 'react'
import '../css/pages/payment.css'

export default function PaymentPage({ cart = [], session, navigate, clearCart, submitCartOrder, busy, setNotice }) {
  const [formData, setFormData] = useState({
    nombreTitular: session?.pnombre ? `${session.pnombre} ${session.papellido || ''}`.trim() : '',
    fechaNacimiento: '',
    numeroTarjeta: '',
    mesExp: '11',
    anioExp: '30',
    cvv: ''
  })

  const [showModal, setShowModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const total = cart.reduce((acc, item) => acc + (Number(item.precio) || 0) * (Number(item.cantidad) || 1), 0)

  const handleCardNumber = (e) => {
    let val = e.target.value.replace(/\D/g, '')
    if (val.length > 16) val = val.slice(0, 16)
    const formatted = val.match(/.{1,4}/g)?.join(' ') || ''
    setFormData((prev) => ({ ...prev, numeroTarjeta: formatted }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.numeroTarjeta || !formData.nombreTitular || !formData.fechaNacimiento || !formData.cvv) {
      if (setNotice) setNotice({ type: 'error', text: 'Por favor completa todos los campos del formulario.' })
      return
    }
    setShowModal(true)
  }

  const handleConfirmOrder = async () => {
    setIsProcessing(true)
    try {
      if (submitCartOrder) {
        await submitCartOrder()
      } else if (clearCart) {
        clearCart()
      }
      setShowModal(false)
      if (setNotice) setNotice({ type: 'success', text: '¡Pago realizado con éxito! Tu boleta ha sido generada.' })
      navigate('/')
    } catch (error) {
      if (setNotice) setNotice({ type: 'error', text: 'Ocurrió un error al procesar el pago.' })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="legacy-payment-screen">
      <div className="legacy-payment-card-wrapper">
        
        {/* TARJETA CRÉDITO PÚRPURA */}
        <div className="legacy-credit-card">
          <div className="legacy-card-top">
            <div className="legacy-card-chip"></div>
            <div className="legacy-card-brand">VISA</div>
          </div>

          <div className="legacy-card-number">
            {formData.numeroTarjeta || '•••• •••• •••• ••••'}
          </div>

          <div className="legacy-card-bottom">
            <div className="legacy-card-info">
              <span className="legacy-card-label">TITULAR DE LA TARJETA</span>
              <span className="legacy-card-val">{formData.nombreTitular.trim() || 'NOMBRE COMPLETO'}</span>
            </div>

            <div className="legacy-card-info legacy-text-right">
              <span className="legacy-card-label">EXPIRA</span>
              <span className="legacy-card-val">{formData.mesExp}/{formData.anioExp}</span>
            </div>
          </div>
        </div>

        {/* FORMULARIO DE PAGO */}
        <form onSubmit={handleSubmit} className="legacy-payment-form">
          <p className="legacy-payment-total">
            Total a pagar: <span>${total.toLocaleString('es-CL')}</span>
          </p>

          <div className="legacy-field-group">
            <label>NÚMERO DE TARJETA</label>
            <input
              type="text"
              placeholder="1234 4433 3333 3333"
              value={formData.numeroTarjeta}
              onChange={handleCardNumber}
              required
            />
          </div>

          <div className="legacy-field-group">
            <label>NOMBRE EN LA TARJETA</label>
            <input
              type="text"
              placeholder="Ej. Juan Pérez"
              value={formData.nombreTitular}
              onChange={(e) => setFormData({ ...formData, nombreTitular: e.target.value })}
              required
            />
          </div>

          <div className="legacy-field-group">
            <label>FECHA DE NACIMIENTO</label>
            <input
              type="date"
              value={formData.fechaNacimiento}
              onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
              required
            />
          </div>

          <div className="legacy-row-grid">
            <div className="legacy-field-group">
              <label>MES</label>
              <select
                value={formData.mesExp}
                onChange={(e) => setFormData({ ...formData, mesExp: e.target.value })}
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const val = String(i + 1).padStart(2, '0')
                  return <option key={val} value={val}>{val}</option>
                })}
              </select>
            </div>

            <div className="legacy-field-group">
              <label>AÑO</label>
              <select
                value={formData.anioExp}
                onChange={(e) => setFormData({ ...formData, anioExp: e.target.value })}
              >
                {['25', '26', '27', '28', '29', '30', '31', '32'].map((yr) => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>

            <div className="legacy-field-group">
              <label>CVV</label>
              <input
                type="password"
                placeholder="123"
                maxLength="4"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                required
              />
            </div>
          </div>

          <button type="submit" className="legacy-btn-submit" disabled={busy || isProcessing}>
            Confirmar Pago
          </button>

          <button type="button" onClick={() => navigate('/carrito')} className="legacy-btn-cancel">
            Volver al carrito
          </button>
        </form>

      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      {showModal && (
        <div className="legacy-modal-overlay">
          <div className="legacy-modal-content">
            <h3>¿CONFIRMAR Y FINALIZAR PAGO?</h3>
            <p>
              Se procesará el cobro de <strong>${total.toLocaleString('es-CL')}</strong> y se emitirá la boleta a nombre de <strong>{formData.nombreTitular}</strong>.
            </p>

            {isProcessing || busy ? (
              <div className="legacy-loading-text">Procesando pago y generando boleta...</div>
            ) : (
              <div className="legacy-modal-buttons">
                <button type="button" onClick={handleConfirmOrder} className="legacy-btn-accept">
                  ACEPTAR
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="legacy-btn-back">
                  VOLVER ATRÁS
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}