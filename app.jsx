
import React from 'react';
function ProductCard({ id, name, price, category, inStock = true, rating = 0, image = '📦' }) {
  const stars = '⭐'.repeat(Math.round(rating));
  return (
    <div style={{ ...styles.card, opacity: inStock ? 1 : 0.6 }}>
      <div style={styles.cardImage}>{image}</div>
      <div style={styles.cardBody}>
        <span style={styles.badge}>{category}</span>
        <h3 style={styles.cardTitle}>{name}</h3>
        <p style={styles.stars}>{stars || 'No ratings yet'} {rating > 0 && `(${rating}/5)`}</p>
        <p style={styles.price}>₹{price.toLocaleString()}</p>
        <span style={{ ...styles.stockTag, background: inStock ? '#dcfce7' : '#fee2e2',
                       color: inStock ? '#166534' : '#991b1b' }}>
          {inStock ? '✅ In Stock' : '❌ Out of Stock'}
        </span>
      </div>
    </div>
  );
}
function StatCard({ label, value, unit = '', color = '#2563eb', icon }) {
  return (
    <div style={{ ...styles.statCard, borderTop: `4px solid ${color}` }}>
      <span style={{ fontSize: 28 }}>{icon}</span>
      <p style={{ fontSize: 26, fontWeight: 'bold', color, margin: '4px 0' }}>
        {value}{unit}
      </p>
      <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>{label}</p>
    </div>
  );
}
function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
      {categories.map(cat => (
        <button key={cat}
          onClick={() => onSelect(cat)}
          style={{
            padding: '6px 16px', borderRadius: 20, border: '1.5px solid #2563eb',
            background: selected === cat ? '#2563eb' : '#fff',
            color:      selected === cat ? '#fff'    : '#2563eb',
            cursor: 'pointer', fontWeight: 500,
          }}>
          {cat}
        </button>
      ))}
    </div>
  );
}
const PRODUCTS = [
  { id: 1, name: 'Wireless Mouse',       price: 1299, category: 'Electronics', inStock: true,  rating: 4.5, image: '🖱️' },
  { id: 2, name: 'Mechanical Keyboard',  price: 4999, category: 'Electronics', inStock: true,  rating: 4.8, image: '⌨️' },
  { id: 3, name: 'React Handbook',       price:  799, category: 'Books',       inStock: true,  rating: 4.2, image: '📘' },
  { id: 4, name: 'USB-C Hub (7-in-1)',   price: 2499, category: 'Electronics', inStock: false, rating: 4.0, image: '🔌' },
  { id: 5, name: 'Clean Code',           price:  999, category: 'Books',       inStock: true,  rating: 4.9, image: '📗' },
  { id: 6, name: 'Laptop Stand',         price: 1899, category: 'Accessories', inStock: true,  rating: 4.3, image: '💻' },
];

function App() {
  const [selectedCat, setSelectedCat] = React.useState('All');

  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  const filtered   = selectedCat === 'All'
                     ? PRODUCTS
                     : PRODUCTS.filter(p => p.category === selectedCat);

  const totalValue   = PRODUCTS.reduce((s, p) => s + p.price, 0);
  const inStockCount = PRODUCTS.filter(p => p.inStock).length;
  const avgRating    = (PRODUCTS.reduce((s, p) => s + p.rating, 0) / PRODUCTS.length).toFixed(1);

  return (
    <div style={styles.container}>
      <h1 style={{ color: '#1e3a8a' }}>HOL 3: Props — Product Catalog</h1>

      {}
      <div style={styles.statsRow}>
        <StatCard label="Total Products"   value={PRODUCTS.length} icon="📦" color="#2563eb" />
        <StatCard label="In Stock"         value={inStockCount}    icon="✅" color="#10b981" />
        <StatCard label="Average Rating"   value={avgRating}       icon="⭐" color="#f59e0b" unit="/5" />
        <StatCard label="Catalog Value"    value={`₹${(totalValue/1000).toFixed(1)}k`} icon="💰" color="#7c3aed" />
      </div>

      {}
      <CategoryFilter
        categories={categories}
        selected={selectedCat}
        onSelect={setSelectedCat}
      />

      <p style={{ color: '#6b7280', fontSize: 14 }}>
        Showing {filtered.length} products {selectedCat !== 'All' && `in "${selectedCat}"`}
      </p>

      {}
      <div style={styles.grid}>
        {filtered.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'Arial', maxWidth: 1000, margin: '0 auto', padding: 24 },
  statsRow:  { display: 'flex', gap: 12, marginBottom: 24 },
  statCard:  { flex: 1, background: '#f8fafc', borderRadius: 10, padding: 16, textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  grid:      { display: 'flex', flexWrap: 'wrap', gap: 16 },
  card:      { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', width: 210 },
  cardImage: { background: '#f1f5f9', fontSize: 56, textAlign: 'center', padding: 20 },
  cardBody:  { padding: 16 },
  cardTitle: { margin: '8px 0 4px', fontSize: 15 },
  badge:     { background: '#dbeafe', color: '#1d4ed8', fontSize: 11, padding: '2px 8px', borderRadius: 12 },
  stars:     { margin: '4px 0', fontSize: 13 },
  price:     { fontWeight: 'bold', fontSize: 18, color: '#1e3a8a', margin: '4px 0' },
  stockTag:  { fontSize: 12, padding: '3px 8px', borderRadius: 10 },
};

export default App;