import { supabase } from '../lib/supabase'

export const orderService = {
  async createOrder(orderPayload, items = []) {
    const orderNumber = `FEL-${Math.floor(100000 + Math.random() * 900000)}`

    const newOrder = {
      ...orderPayload,
      order_number: orderNumber,
      payment_method: orderPayload.payment_method || 'Cash on Delivery',
      payment_status: orderPayload.payment_status || 'Pending',
      status: 'Pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // 1. Insert order into Supabase
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([newOrder])
      .select()
      .single()

    if (orderError) {
      console.error('Supabase createOrder error:', orderError)
      throw orderError
    }

    // 2. Insert order items into Supabase
    if (items && items.length > 0) {
      const orderItemsToInsert = items.map(item => ({
        order_id: orderData.id,
        product_id: item.product_id || item.id,
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
        console.error('Supabase createOrderItems error:', itemsError)
        throw itemsError
      }
    }

    return { ...orderData, items }
  },

  async getOrderByNumber(orderNumber) {
    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber)
        .single()

      if (orderError) throw orderError

      if (orderData) {
        const { data: itemsData } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', orderData.id)

        return { ...orderData, items: itemsData || [] }
      }
      return null
    } catch (err) {
      console.error('Supabase getOrderByNumber error:', err.message)
      return null
    }
  },

  async getUserOrders(userId) {
    if (!userId) return []
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (err) {
      console.error('Supabase getUserOrders error:', err.message)
      return []
    }
  },

  async getAllOrdersAdmin() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(*)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (err) {
      console.error('Supabase getAllOrdersAdmin error:', err.message)
      return []
    }
  },

  async updateOrderStatus(orderId, status) {
    const { data, error } = await supabase
      .from('orders')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()
      .single()

    if (error) {
      console.error('Supabase updateOrderStatus error:', error)
      throw error
    }
    return data
  }
}
