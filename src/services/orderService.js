import { supabase } from '../lib/supabase'

const LOCAL_ORDERS_KEY = 'fellas_honey_orders_store'

const isValidUUID = (id) => {
  return typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

const getLocalOrders = () => {
  try {
    const raw = localStorage.getItem(LOCAL_ORDERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveLocalOrder = (order) => {
  try {
    const orders = getLocalOrders()
    orders.unshift(order)
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders))
  } catch (err) {
    console.warn('Failed to save order to localStorage:', err)
  }
}

export const orderService = {
  async createOrder(orderPayload, items = []) {
    const orderNumber = `FEL-${Math.floor(100000 + Math.random() * 900000)}`
    const sanitizedUserId = isValidUUID(orderPayload.user_id) ? orderPayload.user_id : null

    const newOrder = {
      ...orderPayload,
      user_id: sanitizedUserId,
      order_number: orderNumber,
      payment_method: orderPayload.payment_method || 'Cash on Delivery',
      payment_status: orderPayload.payment_status || 'Pending',
      status: 'Pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    try {
      // 1. Insert order into Supabase
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([newOrder])
        .select()
        .single()

      if (orderError) {
        console.warn('Supabase createOrder error, utilizing local order backup:', orderError)
        throw orderError
      }

      // 2. Insert order items into Supabase
      if (items && items.length > 0) {
        const orderItemsToInsert = items.map(item => ({
          order_id: orderData.id,
          product_id: isValidUUID(item.product_id || item.id) ? (item.product_id || item.id) : null,
          product_name: item.name,
          product_image: item.image_url,
          price: Number(item.price),
          quantity: Number(item.quantity),
          weight: item.weight || '500g',
          subtotal: Number(item.price) * Number(item.quantity)
        }))

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItemsToInsert)

        if (itemsError) {
          console.warn('Supabase createOrderItems warning:', itemsError)
        }
      }

      const completedOrder = { ...orderData, items }
      saveLocalOrder(completedOrder)
      return completedOrder
    } catch (err) {
      console.warn('Using offline/local fallback order creation due to database policy:', err.message)
      const mockOrder = {
        id: 'ord-' + Date.now(),
        ...newOrder,
        items
      }
      saveLocalOrder(mockOrder)
      return mockOrder
    }
  },

  async getOrderByNumber(orderNumber) {
    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber)
        .single()

      if (!orderError && orderData) {
        const { data: itemsData } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', orderData.id)

        return { ...orderData, items: itemsData || [] }
      }
    } catch (err) {
      console.warn('Supabase getOrderByNumber fallback to local orders:', err.message)
    }

    // Fallback: search local orders
    const localOrders = getLocalOrders()
    const found = localOrders.find(o => o.order_number === orderNumber)
    return found || null
  },

  async getUserOrders(userId) {
    if (!userId) return []
    let dbOrders = []
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (!error && data) {
        dbOrders = data
      }
    } catch (err) {
      console.warn('Supabase getUserOrders error:', err.message)
    }

    const localOrders = getLocalOrders().filter(o => o.user_id === userId || !o.user_id)
    // Combine and deduplicate
    const all = [...dbOrders]
    for (const loc of localOrders) {
      if (!all.some(o => o.order_number === loc.order_number)) {
        all.push(loc)
      }
    }
    return all
  },

  async getAllOrdersAdmin() {
    let dbOrders = []
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(*)
        `)
        .order('created_at', { ascending: false })

      if (!error && data) {
        dbOrders = data
      }
    } catch (err) {
      console.warn('Supabase getAllOrdersAdmin error:', err.message)
    }

    const localOrders = getLocalOrders()
    const all = [...dbOrders]
    for (const loc of localOrders) {
      if (!all.some(o => o.order_number === loc.order_number)) {
        all.push(loc)
      }
    }
    return all
  },

  async updateOrderStatus(orderId, status) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select()
        .single()

      if (!error && data) {
        return data
      }
    } catch (err) {
      console.warn('Supabase updateOrderStatus fallback:', err.message)
    }

    // Update local order
    const localOrders = getLocalOrders()
    const idx = localOrders.findIndex(o => o.id === orderId)
    if (idx !== -1) {
      localOrders[idx].status = status
      localOrders[idx].updated_at = new Date().toISOString()
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(localOrders))
      return localOrders[idx]
    }
    return { id: orderId, status }
  }
}
