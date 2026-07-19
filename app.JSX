
import React, { useState } from 'react';
const PRODUCTS = [
  { id: 1, name: 'React Handbook',         price: 799,  emoji: '📘', category: 'Books'       },
  { id: 2, name: 'Wireless Mouse',         price: 1299, emoji: '🖱️', category: 'Electronics' },
  { id: 3, name: 'Mechanical Keyboard',    price: 4999, emoji: '⌨️', category: 'Electronics' },
  { id: 4, name: 'Laptop Stand',           price: 1899, emoji: '💻', category: 'Accessories' },
  { id: 5, name: 'Spring Boot in Action',  price: 999,  emoji: '📗', category: 'Books'       },
  { id: 6, name: 'USB-C Hub',              price: 2499, emoji: '🔌', category: 'Electronics' },
];
function CartItem({ item, onRemove, onQtyChange }) {
  return (
    <div style={styles.cartRow}>
      <span style={{ fontSize: 22, width: 32 }}>{item.emoji}</span>
      <span style={{ flex: 2, fontWeight: 500 }}>{item.name}</span>
      <span style={{ width: 80, color: '#6b7280' }}>₹{item.price}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={() => onQtyChange(item.id, -1)} style={styles.qtyBtn}>−</button>
        <span style={{ fontWeight: 'bold', minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
        <button onClick={() => onQtyChange(item.id, +1)} style={styles.qtyBtn}>+</button>
      </div>
      <span style={{ width: 90, fontWeight: 'bold', color: '#1e3a8a', textAlign: 'right' }}>
        ₹{(item.price * item.qty).toLocaleString()}
      </span>
      <button onClick={() => onRemove(item.id)} style={styles.removeBtn}>✕</button>
    </div>
  );
}

function ProductCard({ product, onAdd, isInCart }) {
  return (
    <div style={styles.productCard}>
      <span style={{ fontSize: 40 }}>{product.emoji}</span>
      <h4 style={{ margin: '8px 0 4px', fontSize: 14 }}>{product.name}</h4>
      <p style={{ margin: '0 0 10px', color: '#6b7280', fontSize: 12 }}>{product.category}</p>
      <p style={{ margin: '0 0 12px', fontWeight: 'bold', color: '#1e3a8a', fontSize: 16 }}>
        ₹{product.price.toLocaleString()}
      </p>
      <button
        onClick={() => onAdd(product)}
        style={{
          ...styles.addBtn,
          background: isInCart ? '#10b981' : '#2563eb',
        }}
      >
        {isInCart ? '✓ Added' : '+ Add to Cart'}
      </button>
    </div>
  );
}

function App() {
  // State: array of cart items { ...product, qty }
  const [cart, setCart]         = useState([]);
  const [toast, setToast]       = useState('');
  const [coupon, setCoupon]     = useState('');
  const [discount, setDiscount] = useState(0);
  const totalItems    = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal      = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmt   = Math.round(subtotal * discount);
  const grandTotal    = subtotal - discountAmt;
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`✅ ${product.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
    showToast('🗑️ Item removed from cart');
  };

  const changeQty = (id, delta) => {
    setCart(prev =>
      prev
        .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('🛒 Cart cleared!');
  };

  const applyCoupon = () => {
    const codes = { SAVE10: 0.10, SAVE20: 0.20, DN50: 0.50 };
    if (codes[coupon.toUpperCase()]) {
      setDiscount(codes[coupon.toUpperCase()]);
      showToast(`🎉 Coupon "${coupon.toUpperCase()}" applied! ${codes[coupon.toUpperCase()] * 100}% off`);
    } else {
      showToast('❌ Invalid coupon code. Try SAVE10, SAVE20, or DN50');
    }
  };

  const checkout = () => {
    showToast(`🎊 Order placed! Total: ₹${grandTotal.toLocaleString()}`);
    setCart([]);
    setDiscount(0);
    setCoupon('');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>HOL 4: useState — Shopping Cart</h1>

      {}
      {toast && <div style={styles.toast}>{toast}</div>}

      <div style={styles.layout}>
        {/* LEFT: Product Catalog */}
        <div style={styles.left}>
          <h2 style={styles.sectionTitle}>🛍️ Products</h2>
          <div style={styles.productGrid}>
            {PRODUCTS.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={addToCart}
                isInCart={cart.some(i => i.id === p.id)}
              />
            ))}
          </div>
        </div>

        {}
        <div style={styles.right}>
          <h2 style={styles.sectionTitle}>
            🛒 Cart
            {totalItems > 0 && (
              <span style={styles.cartBadge}>{totalItems}</span>
            )}
          </h2>

          {cart.length === 0 ? (
            <div style={styles.emptyCart}>
              <p style={{ fontSize: 48 }}>🛒</p>
              <p style={{ color: '#9ca3af' }}>Your cart is empty.</p>
              <p style={{ color: '#9ca3af', fontSize: 13 }}>Add products from the left panel.</p>
            </div>
          ) : (
            <>
              {}
              <div style={styles.cartHeader}>
                <span style={{ flex: 2 }}>Item</span>
                <span style={{ width: 80 }}>Price</span>
                <span style={{ width: 100 }}>Qty</span>
                <span style={{ width: 90, textAlign: 'right' }}>Total</span>
                <span style={{ width: 24 }}></span>
              </div>
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onQtyChange={changeQty}
                />
              ))}

              {}
              <div style={styles.couponRow}>
                <input
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  placeholder="Coupon code (SAVE10 / SAVE20 / DN50)"
                  style={styles.couponInput}
                />
                <button onClick={applyCoupon} style={styles.couponBtn}>Apply</button>
              </div>

              {}
              <div style={styles.summary}>
                <div style={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div style={{ ...styles.summaryRow, color: '#10b981' }}>
                    <span>Discount ({discount * 100}%)</span>
                    <span>−₹{discountAmt.toLocaleString()}</span>
                  </div>
                )}
                <div style={{ ...styles.summaryRow, fontWeight: 'bold', fontSize: 18, borderTop: '2px solid #e2e8f0', paddingTop: 10, marginTop: 6 }}>
                  <span>Grand Total</span>
                  <span style={{ color: '#1e3a8a' }}>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {}
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button onClick={clearCart}  style={{ ...styles.actionBtn, background: '#6b7280', flex: 1 }}>
                  Clear Cart
                </button>
                <button onClick={checkout}   style={{ ...styles.actionBtn, background: '#10b981', flex: 2 }}>
                  ✅ Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {}
      <div style={styles.stateBox}>
        <h3 style={{ margin: '0 0 8px' }}>🔍 Current State (useState debug view)</h3>
        <pre style={styles.statePre}>
          {JSON.stringify({ cartItems: totalItems, subtotal, discount: `${discount * 100}%`, grandTotal }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
const styles = {
  container:    { fontFamily: "'Segoe UI', Arial, sans-serif", maxWidth: 1100, margin: '0 auto', padding: 24, color: '#1e293b' },
  pageTitle:    { color: '#1e3a8a', marginBottom: 20 },
  layout:       { display: 'flex', gap: 24, alignItems: 'flex-start' },
  left:         { flex: 1 },
  right:        { width: 420, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 },
  sectionTitle: { margin: '0 0 16px', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: 8 },
  cartBadge:    { background: '#ef4444', color: '#fff', borderRadius: '50%', width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 },
  productGrid:  { display: 'flex', flexWrap: 'wrap', gap: 12 },
  productCard:  { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 16, width: 150, textAlign: 'center' },
  addBtn:       { width: '100%', padding: '7px 0', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500 },
  toast:        { background: '#1e293b', color: '#fff', padding: '12px 20px', borderRadius: 8, marginBottom: 16, fontWeight: 500 },
  emptyCart:    { textAlign: 'center', padding: '30px 0' },
  cartHeader:   { display: 'flex', fontSize: 12, fontWeight: 'bold', color: '#6b7280', padding: '4px 0', borderBottom: '1px solid #e2e8f0', marginBottom: 8 },
  cartRow:      { display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0', borderBottom: '1px solid #f1f5f9' },
  qtyBtn:       { width: 26, height: 26, border: '1px solid #d1d5db', borderRadius: 4, background: '#f9fafb', cursor: 'pointer', fontWeight: 'bold' },
  removeBtn:    { background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 16, padding: '0 4px' },
  couponRow:    { display: 'flex', gap: 8, marginTop: 14 },
  couponInput:  { flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13 },
  couponBtn:    { padding: '8px 14px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' },
  summary:      { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 14, marginTop: 12 },
  summaryRow:   { display: 'flex', justifyContent: 'space-between', marginBottom: 6 },
  actionBtn:    { padding: '10px 0', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 },
  stateBox:     { marginTop: 24, background: '#1e293b', borderRadius: 10, padding: 16 },
  statePre:     { color: '#94a3b8', margin: 0, fontSize: 13, fontFamily: 'monospace' },
};

export default App;