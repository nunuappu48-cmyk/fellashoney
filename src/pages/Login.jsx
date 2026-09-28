import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, LogIn, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { HoneycombPattern } from '../components/HoneyDecoration'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn, loginAsDemo } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.from || '/account'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await signIn({ email, password })
      if (res?.unconfirmedFallback) {
        addToast('Signed in successfully! 🍯', 'success')
      } else {
        addToast('Welcome back to Fellas Honey! 🍯', 'success')
      }
      navigate(redirectPath)
    } catch (err) {
      addToast(err.message || 'Failed to sign in. Please check your credentials.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickDemo = (role) => {
    loginAsDemo(role)
    addToast(`Signed in as ${role === 'admin' ? 'Admin' : 'Customer'} demo! 🍯`, 'success')
    navigate(role === 'admin' ? '/admin' : redirectPath)
  }

  return (
    <div className="py-8 sm:py-16 max-w-md mx-auto px-4 relative">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-honey-300 shadow-soft-lg space-y-6 relative overflow-hidden">
        
        <HoneycombPattern className="text-honey-400 opacity-5" />

        {/* Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="w-14 h-14 bg-amber-gold-gradient rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-honey-sm">
            🍯
          </div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-amberBrown-950">
            Welcome Back
          </h1>
          <p className="text-xs text-amberBrown-600">
            Sign in to track orders, manage your profile and view your honey rewards.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-amberBrown-900">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-amberBrown-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-cream-50 rounded-xl border border-honey-300 text-xs sm:text-sm text-amberBrown-900 focus:outline-none focus:ring-2 focus:ring-honey-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-amberBrown-900">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] font-bold text-honey-700 hover:text-amberBrown-900"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-amberBrown-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-cream-50 rounded-xl border border-honey-300 text-xs sm:text-sm text-amberBrown-900 focus:outline-none focus:ring-2 focus:ring-honey-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-amber-gold-gradient hover:opacity-95 text-amberBrown-950 font-black text-xs sm:text-sm rounded-2xl shadow-honey-md transition-all active:scale-95 disabled:opacity-75 flex items-center justify-center gap-2"
          >
            {loading ? 'Signing In...' : 'Sign In to Account'}
          </button>
        </form>

        {/* Demo Fast Access (Customer & Admin) */}
        <div className="pt-4 border-t border-honey-100 space-y-2 relative z-10">
          <p className="text-[11px] font-bold text-center text-amberBrown-500 uppercase tracking-wider">
            Quick One-Click Demo Access
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('customer')}
              className="py-2.5 px-3 bg-honey-50 hover:bg-honey-100 border border-honey-200 text-amberBrown-900 rounded-xl text-xs font-bold transition-colors text-center"
            >
              🍯 Demo Customer
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="py-2.5 px-3 bg-amber-100/70 hover:bg-amber-200/80 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold transition-colors text-center flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center text-xs text-amberBrown-600 relative z-10">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-honey-700 hover:underline">
            Register now
          </Link>
        </div>

      </div>
    </div>
  )
}
