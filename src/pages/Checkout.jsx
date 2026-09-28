import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Truck, CreditCard, ShieldCheck, CheckCircle2, ArrowLeft, Lock, Sparkles, Building, User, Mail, Phone, MapPin } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { orderService } from '../services/orderService'
import { formatCurrency } from '../utils/formatters'

export const Checkout = () => {
  const { items, subtotal, deliveryFee, discountAmount, total, clearCart } = useCart()
  const { user, profile } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')

  // Form State
  const [formData, setFormData] = useState({
    shipping_name: profile?.full_name || '',
    shipping_email: user?.email || profile?.email || '',
    shipping_phone: profile?.phone || '',
    shipping_address: '',
    shipping_city: '',
    shipping_country: 'United States',
    shipping_postal_code: '',
    delivery_notes: ''
  })

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto px-4 space-y-4">
        <div className="text-4xl">🍯</div>
        <h2 className="font-serif font-bold text-xl text-amberBrown-950">Your basket is empty</h2>
        <p className="text-xs text-amberBrown-600">Please add honey items to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-block px-6 py-2.5 bg-honey-500 font-bold text-xs rounded-xl text-amberBrown-950"
        >
          Browse Honey Products
        </Link>
      </div>
    )
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.shipping_name || !formData.shipping_email || !formData.shipping_phone || !formData.shipping_address || !formData.shipping_city || !formData.shipping_postal_code) {
      addToast('Please fill in all required shipping fields', 'error')
      return
    }

    setLoading(true)

    try {
      const orderPayload = {
        user_id: user?.id || null,
        subtotal,
        delivery_fee: deliveryFee,
        discount: discountAmount,
        total,
        payment_method: paymentMethod,
        payment_status: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Completed',
        ...formData
      }

      const createdOrder = await orderService.createOrder(orderPayload, items)
      
      // Clear Cart
      clearCart()

      addToast('🍯 Order placed successfully!', 'success')
      navigate(`/order-success/${createdOrder.order_number}`)
    } catch (err) {
      console.error('Order creation error:', err)
      addToast(err.message || 'Failed to place order. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-6 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/cart"
          className="p-2 rounded-xl bg-white border border-honey-200 text-amberBrown-800 hover:bg-honey-100 transition-colors"
          aria-label="Back to Cart"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-amberBrown-950">
            Secure Checkout
          </h1>
          <p className="text-xs text-amberBrown-500">
            Fast, safe, and mobile-friendly order process
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Shipping & Payment Info */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Contact & Shipping Address Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-honey-200/80 shadow-soft space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-honey-100">
              <div className="w-8 h-8 rounded-xl bg-honey-100 text-honey-800 font-black text-xs flex items-center justify-center">
                1
              </div>
              <h2 className="font-serif font-bold text-lg text-amberBrown-950">
                Delivery Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              
              {/* Full Name */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-bold text-amberBrown-900 block">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-amberBrown-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="shipping_name"
                    required
                    value={formData.shipping_name}
                    onChange={handleChange}
                    placeholder="e.g. Asim J"
                    className="w-full pl-10 pr-4 py-2.5 bg-cream-50 rounded-xl border border-honey-300 text-amberBrown-900 focus:outline-none focus:ring-2 focus:ring-honey-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="font-bold text-amberBrown-900 block">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-amberBrown-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="shipping_email"
                    required
                    value={formData.shipping_email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-cream-50 rounded-xl border border-honey-300 text-amberBrown-900 focus:outline-none focus:ring-2 focus:ring-honey-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="font-bold text-amberBrown-900 block">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-amberBrown-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="shipping_phone"
                    required
                    value={formData.shipping_phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2.5 bg-cream-50 rounded-xl border border-honey-300 text-amberBrown-900 focus:outline-none focus:ring-2 focus:ring-honey-500"
                  />
                </div>
              </div>

              {/* Street Address */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-bold text-amberBrown-900 block">
                  Street Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-amberBrown-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="shipping_address"
                    required
                    value={formData.shipping_address}
                    onChange={handleChange}
                    placeholder="House number, Street name, Apt / Suite"
                    className="w-full pl-10 pr-4 py-2.5 bg-cream-50 rounded-xl border border-honey-300 text-amberBrown-900 focus:outline-none focus:ring-2 focus:ring-honey-500"
                  />
                </div>
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label className="font-bold text-amberBrown-900 block">
                  City *
                </label>
                <input
                  type="text"
                  name="shipping_city"
                  required
                  value={formData.shipping_city}
                  onChange={handleChange}
                  placeholder="San Francisco"
                  className="w-full px-4 py-2.5 bg-cream-50 rounded-xl border border-honey-300 text-amberBrown-900 focus:outline-none focus:ring-2 focus:ring-honey-500"
                />
              </div>

              {/* Postal Code */}
              <div className="space-y-1.5">
                <label className="font-bold text-amberBrown-900 block">
                  Postal / ZIP Code *
                </label>
                <input
                  type="text"
                  name="shipping_postal_code"
                  required
                  value={formData.shipping_postal_code}
                  onChange={handleChange}
                  placeholder="94107"
                  className="w-full px-4 py-2.5 bg-cream-50 rounded-xl border border-honey-300 text-amberBrown-900 focus:outline-none focus:ring-2 focus:ring-honey-500"
                />
              </div>

              {/* Country */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-bold text-amberBrown-900 block">
                  Country
                </label>
                <input
                  type="text"
                  name="shipping_country"
                  value={formData.shipping_country}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-cream-50 rounded-xl border border-honey-300 text-amberBrown-900 focus:outline-none focus:ring-2 focus:ring-honey-500"
                />
              </div>

              {/* Delivery Notes */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-bold text-amberBrown-900 block">
                  Delivery Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  name="delivery_notes"
                  value={formData.delivery_notes}
                  onChange={handleChange}
                  placeholder="e.g. Please leave package at front door, ring bell..."
                  className="w-full px-4 py-2 bg-cream-50 rounded-xl border border-honey-300 text-amberBrown-900 focus:outline-none focus:ring-2 focus:ring-honey-500"
                />
              </div>

            </div>
          </div>

          {/* 2. Payment Method Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-honey-200/80 shadow-soft space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-honey-100">
              <div className="w-8 h-8 rounded-xl bg-honey-100 text-honey-800 font-black text-xs flex items-center justify-center">
                2
              </div>
              <h2 className="font-serif font-bold text-lg text-amberBrown-950">
                Payment Method
              </h2>
            </div>

            <div className="space-y-3">
              {/* Cash on Delivery */}
              <label
                className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-honey-500 bg-honey-50/70 shadow-honey-sm'
                    : 'border-honey-200 hover:bg-cream-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="Cash on Delivery"
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-1 accent-honey-600 w-4 h-4"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-amberBrown-950">
                      Cash on Delivery (COD)
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-natureGreen-100 text-natureGreen-800">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-amberBrown-600 mt-0.5">
                    Pay securely with cash or card upon doorstep receipt of your fresh honey order.
                  </p>
                </div>
              </label>

              {/* Online Payment (Card / UPI Demo) */}
              <label
                className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'Online Payment'
                    ? 'border-honey-500 bg-honey-50/70 shadow-honey-sm'
                    : 'border-honey-200 hover:bg-cream-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="Online Payment"
                  checked={paymentMethod === 'Online Payment'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-1 accent-honey-600 w-4 h-4"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-amberBrown-950">
                      Credit Card / Apple Pay / UPI
                    </span>
                    <span className="text-xs">💳</span>
                  </div>
                  <p className="text-xs text-amberBrown-600 mt-0.5">
                    Instant zero-touch payment gateway sandbox (Demo enabled).
                  </p>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-honey-200/80 shadow-soft space-y-5 sticky top-24">
            
            <h3 className="font-serif font-bold text-lg text-amberBrown-950 pb-3 border-b border-honey-100">
              Your Order ({items.length} items)
            </h3>

            {/* Item summary snippets */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1 divide-y divide-honey-100">
              {items.map(item => (
                <div key={item.cartItemId} className="pt-2 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover bg-honey-50 border border-honey-200"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-amberBrown-950 truncate max-w-[150px]">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-amberBrown-500 font-medium">
                        Qty: {item.quantity} × {item.weight}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amberBrown-900">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-3 border-t border-honey-200 space-y-2 text-xs sm:text-sm text-amberBrown-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-amberBrown-900">{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-natureGreen-700 font-bold">
                  <span>Discount</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-amberBrown-900">
                  {deliveryFee === 0 ? <span className="text-natureGreen-700 font-bold">FREE</span> : formatCurrency(deliveryFee)}
                </span>
              </div>
              <div className="pt-3 border-t border-honey-200 flex justify-between items-baseline font-black text-amberBrown-950">
                <span className="text-sm sm:text-base">Total Due</span>
                <span className="text-2xl text-honey-700">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-amber-gold-gradient hover:opacity-95 text-amberBrown-950 font-black text-sm rounded-2xl shadow-honey-md flex items-center justify-center gap-2 transition-all transform active:scale-98 disabled:opacity-75"
            >
              {loading ? (
                <span>Placing Your Order... 🍯</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order • {formatCurrency(total)}</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-amberBrown-500 font-medium">
              By placing your order, you agree to Fellas Honey terms of service and harvest delivery guarantee.
            </p>

          </div>
        </div>

      </form>

    </div>
  )
}
