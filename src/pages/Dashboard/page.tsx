import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StockItem {
  name: string;
  category: string;
  price: number;
  qty: number;
}

const defaultStock: StockItem[] = [
  { name: 'Gel Pen', category: 'Pens', price: 250, qty: 50 },
  { name: 'Fountain Pen', category: 'Pens', price: 850, qty: 20 },
  { name: 'Ball Pen', category: 'Pens', price: 150, qty: 80 },
  { name: 'Simple Pencil', category: 'Pencils', price: 50, qty: 100 },
  { name: 'Color Pencil', category: 'Pencils', price: 350, qty: 40 },
  { name: 'School Notebook', category: 'Notebooks', price: 300, qty: 60 },
  { name: 'College Notebook', category: 'Notebooks', price: 450, qty: 35 },
  { name: 'Sketch Book', category: 'Notebooks', price: 500, qty: 25 },
  { name: 'School Bag', category: 'Bags', price: 2500, qty: 15 },
  { name: 'Laptop Bag', category: 'Bags', price: 4000, qty: 10 },
  { name: 'Whiteboard Marker', category: 'Markers', price: 220, qty: 45 },
  { name: 'Highlighter', category: 'Markers', price: 180, qty: 55 },
  { name: 'Marker Pen', category: 'Markers', price: 200, qty: 30 },
];

type Section = 'none' | 'view' | 'insert' | 'update' | 'delete' | 'charts';

const Dashboard = () => {
  const [stockData, setStockData] = useState<StockItem[]>(() => {
    const saved = localStorage.getItem('stockData');
    return saved ? JSON.parse(saved) : defaultStock;
  });
  const [activeSection, setActiveSection] = useState<Section>('none');
  const [cartCount, setCartCount] = useState(0);

  // Insert form state
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newQty, setNewQty] = useState('');

  // Update form state
  const [updateName, setUpdateName] = useState('');
  const [updatePrice, setUpdatePrice] = useState('');
  const [updateQty, setUpdateQty] = useState('');

  // Delete form state
  const [deleteName, setDeleteName] = useState('');

  useEffect(() => {
    const cart: unknown[] = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
  }, []);

  const saveStock = (data: StockItem[]) => {
    setStockData(data);
    localStorage.setItem('stockData', JSON.stringify(data));
  };

  const showSection = (section: Section) => {
    setActiveSection(section);
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const insertStock = () => {
    if (!newName || !newCategory || !newPrice || !newQty) {
      alert('Please fill all fields.');
      return;
    }
    const updated = [...stockData, { name: newName, category: newCategory, price: parseInt(newPrice), qty: parseInt(newQty) }];
    saveStock(updated);
    alert(`${newName} added to stock!`);
    setNewName(''); setNewCategory(''); setNewPrice(''); setNewQty('');
  };

  const updateStock = () => {
    const item = stockData.find((i) => i.name.toLowerCase() === updateName.toLowerCase());
    if (!item) { alert('Product not found.'); return; }
    const updated = stockData.map((i) =>
      i.name.toLowerCase() === updateName.toLowerCase()
        ? { ...i, price: updatePrice ? parseInt(updatePrice) : i.price, qty: updateQty ? parseInt(updateQty) : i.qty }
        : i
    );
    saveStock(updated);
    alert(`${updateName} updated successfully!`);
  };

  const deleteStock = () => {
    const idx = stockData.findIndex((i) => i.name.toLowerCase() === deleteName.toLowerCase());
    if (idx === -1) { alert('Product not found.'); return; }
    if (confirm(`Delete ${stockData[idx].name}?`)) {
      const updated = stockData.filter((_, i) => i !== idx);
      saveStock(updated);
      alert(`${deleteName} deleted.`);
      setDeleteName('');
    }
  };

  const quickDelete = (name: string) => {
    if (confirm(`Delete ${name}?`)) {
      const updated = stockData.filter((i) => i.name !== name);
      saveStock(updated);
      alert(`${name} deleted.`);
    }
  };

  const prefillUpdate = (name: string, price: number, qty: number) => {
    setUpdateName(name);
    setUpdatePrice(String(price));
    setUpdateQty(String(qty));
    showSection('update');
  };

  const totalValue = stockData.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      <section className="dash-header">
        <h1>📊 Stock Management Dashboard</h1>
        <p>Manage your stationery inventory — view, add, update and delete stock records</p>
      </section>

      {/* STAT CARDS */}
      <section className="dash-stats">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{stockData.length}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Rs.{totalValue.toLocaleString()}</h3>
            <p>Total Stock Value</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <h3>{cartCount}</h3>
            <p>Items in Cart</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{[...new Set(stockData.map((i) => i.category))].length}</h3>
            <p>Categories</p>
          </div>
        </div>
      </section>

      {/* ACTION BUTTONS */}
      <section className="dash-actions">
        <h2>⚙️ Stock Operations</h2>
        <div className="action-grid">
          <div className="action-card view-card" onClick={() => showSection('view')}>
            <div className="action-icon">👁</div>
            <h3>View All Stock</h3>
            <p>Browse complete inventory list</p>
          </div>
          <div className="action-card insert-card" onClick={() => showSection('insert')}>
            <div className="action-icon">➕</div>
            <h3>Insert New Stock</h3>
            <p>Add a new product to inventory</p>
          </div>
          <div className="action-card update-card" onClick={() => showSection('update')}>
            <div className="action-icon">✏️</div>
            <h3>Update Stock</h3>
            <p>Edit existing product details</p>
          </div>
          <div className="action-card delete-card" onClick={() => showSection('delete')}>
            <div className="action-icon">🗑</div>
            <h3>Delete Stock</h3>
            <p>Remove a product from inventory</p>
          </div>
          <div className="action-card search-card" onClick={() => window.location.href = '/services'}>
            <div className="action-icon">🔍</div>
            <h3>Search Products</h3>
            <p>Find products by name or category</p>
          </div>
          <div className="action-card report-card" onClick={() => showSection('charts')}>
            <div className="action-icon">📊</div>
            <h3>Stock Reports</h3>
            <p>View graphical stock analytics</p>
          </div>
        </div>
      </section>

      {/* VIEW SECTION */}
      <section className={`dash-section${activeSection === 'view' ? ' active' : ''}`} id="view">
        <h2>👁 All Stock Records</h2>
        <div className="table-wrap">
          <table className="stock-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price (Rs.)</th>
                <th>Stock Qty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((item, i) => (
                <tr key={item.name}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td><span className="badge">{item.category}</span></td>
                  <td>Rs.{item.price}</td>
                  <td>{item.qty}</td>
                  <td>
                    <button className="tbl-btn edit-btn" onClick={() => prefillUpdate(item.name, item.price, item.qty)}>✏️ Edit</button>
                    <button className="tbl-btn del-btn" onClick={() => quickDelete(item.name)}>🗑 Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* INSERT SECTION */}
      <section className={`dash-section${activeSection === 'insert' ? ' active' : ''}`} id="insert">
        <h2>➕ Insert New Stock</h2>
        <div className="dash-form">
          <input type="text" placeholder="Product Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
            <option value="">Select Category</option>
            {['Pens', 'Pencils', 'Notebooks', 'Bags', 'Markers', 'Office Supplies', 'Bundles'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input type="number" placeholder="Price (Rs.)" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
          <input type="number" placeholder="Stock Quantity" value={newQty} onChange={(e) => setNewQty(e.target.value)} />
          <button onClick={insertStock}>➕ Add Product</button>
        </div>
      </section>

      {/* UPDATE SECTION */}
      <section className={`dash-section${activeSection === 'update' ? ' active' : ''}`} id="update">
        <h2>✏️ Update Stock</h2>
        <div className="dash-form">
          <input type="text" placeholder="Product Name to Update" value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
          <input type="number" placeholder="New Price (Rs.)" value={updatePrice} onChange={(e) => setUpdatePrice(e.target.value)} />
          <input type="number" placeholder="New Stock Quantity" value={updateQty} onChange={(e) => setUpdateQty(e.target.value)} />
          <button onClick={updateStock}>✏️ Update Product</button>
        </div>
      </section>

      {/* DELETE SECTION */}
      <section className={`dash-section${activeSection === 'delete' ? ' active' : ''}`} id="delete">
        <h2>🗑 Delete Stock</h2>
        <div className="dash-form">
          <input type="text" placeholder="Product Name to Delete" value={deleteName} onChange={(e) => setDeleteName(e.target.value)} />
          <button className="btn-danger" onClick={deleteStock}>🗑 Delete Product</button>
        </div>
      </section>

      

      {/* CHARTS SECTION */}
      {(() => {
        const CHART_COLORS = ['#0f4c81','#00a8a8','#f59e0b','#ef4444','#8b5cf6','#10b981','#f97316'];
        const categories = [...new Set(stockData.map((i) => i.category))];
        const qtys = categories.map((c) =>
          stockData.filter((i) => i.category === c).reduce((s, i) => s + i.qty, 0)
        );
        const names  = stockData.map((i) => i.name.split(' ')[0]);
        const prices = stockData.map((i) => i.price);

        return (
          <section className="dash-charts" id="charts">
            <h2>📈 Stock Analytics</h2>
            <div className="charts-grid">
              <div className="chart-card">
                <h3>Stock by Category (Bar Chart)</h3>
                <div className="chart-wrap">
                  <Bar
                    data={{
                      labels: categories,
                      datasets: [{ label: 'Total Qty', data: qtys, backgroundColor: CHART_COLORS }],
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
                  />
                </div>
              </div>
              <div className="chart-card">
                <h3>Category Distribution (Pie Chart)</h3>
                <div className="chart-wrap">
                  <Pie
                    data={{
                      labels: categories,
                      datasets: [{ data: qtys, backgroundColor: CHART_COLORS }],
                    }}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              </div>
              <div className="chart-card chart-card--wide">
                <h3>Price Range Overview (Line Chart)</h3>
                <div className="chart-wrap--wide">
                  <Line
                    data={{
                      labels: names,
                      datasets: [{
                        label: 'Price (Rs.)',
                        data: prices,
                        borderColor: '#0f4c81',
                        backgroundColor: 'rgba(15,76,129,0.1)',
                        fill: true,
                        tension: 0.4,
                      }],
                    }}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* QUICK LINKS */}
      <section className="dash-links">
        <h2>🔗 Quick Links</h2>
        <div className="links-grid">
          <Link to="/" className="quick-link">🏠 Home</Link>
          <Link to="/services" className="quick-link">🛒 All Products</Link>
          <Link to="/login" className="quick-link">🔒 Login</Link>
          <Link to="/signup" className="quick-link">🔓 Signup</Link>
          <Link to="/contact" className="quick-link">📞 Contact</Link>
        </div>
      </section>

      <footer className="dash-footer">
        <p>© 2026 E-Commerce Stationery Shop — Admin Panel</p>
      </footer>
    </>
  );
};

export default Dashboard;
