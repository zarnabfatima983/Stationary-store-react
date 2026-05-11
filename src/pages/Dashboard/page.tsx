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
  CategoryScale, LinearScale, BarElement, ArcElement,
  PointElement, LineElement, Title, Tooltip, Legend, Filler
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

const inputCls = 'w-full px-3 py-2.5 mb-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:border-primary';

const Dashboard = () => {
  const [stockData, setStockData] = useState<StockItem[]>(() => {
    const saved = localStorage.getItem('stockData');
    return saved ? JSON.parse(saved) : defaultStock;
  });
  const [activeSection, setActiveSection] = useState<Section>('none');
  const [cartCount, setCartCount] = useState(0);

  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newQty, setNewQty] = useState('');

  const [updateName, setUpdateName] = useState('');
  const [updatePrice, setUpdatePrice] = useState('');
  const [updateQty, setUpdateQty] = useState('');

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
    setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const insertStock = () => {
    if (!newName || !newCategory || !newPrice || !newQty) { alert('Please fill all fields.'); return; }
    saveStock([...stockData, { name: newName, category: newCategory, price: parseInt(newPrice), qty: parseInt(newQty) }]);
    alert(`${newName} added to stock!`);
    setNewName(''); setNewCategory(''); setNewPrice(''); setNewQty('');
  };

  const updateStock = () => {
    const item = stockData.find((i) => i.name.toLowerCase() === updateName.toLowerCase());
    if (!item) { alert('Product not found.'); return; }
    saveStock(stockData.map((i) =>
      i.name.toLowerCase() === updateName.toLowerCase()
        ? { ...i, price: updatePrice ? parseInt(updatePrice) : i.price, qty: updateQty ? parseInt(updateQty) : i.qty }
        : i
    ));
    alert(`${updateName} updated successfully!`);
  };

  const deleteStock = () => {
    const idx = stockData.findIndex((i) => i.name.toLowerCase() === deleteName.toLowerCase());
    if (idx === -1) { alert('Product not found.'); return; }
    if (confirm(`Delete ${stockData[idx].name}?`)) {
      saveStock(stockData.filter((_, i) => i !== idx));
      alert(`${deleteName} deleted.`);
      setDeleteName('');
    }
  };

  const quickDelete = (name: string) => {
    if (confirm(`Delete ${name}?`)) {
      saveStock(stockData.filter((i) => i.name !== name));
      alert(`${name} deleted.`);
    }
  };

  const prefillUpdate = (name: string, price: number, qty: number) => {
    setUpdateName(name); setUpdatePrice(String(price)); setUpdateQty(String(qty));
    showSection('update');
  };

  const totalValue = stockData.reduce((sum, i) => sum + i.price * i.qty, 0);

  const statCards = [
    { icon: '📦', value: stockData.length, label: 'Total Products' },
    { icon: '💰', value: `Rs.${totalValue.toLocaleString()}`, label: 'Total Stock Value' },
    { icon: '🛒', value: cartCount, label: 'Items in Cart' },
    { icon: '✅', value: [...new Set(stockData.map((i) => i.category))].length, label: 'Categories' },
  ];

  const actionCards = [
    { cls: 'border-t-primary', icon: '👁', title: 'View All Stock', desc: 'Browse complete inventory list', section: 'view' as Section },
    { cls: 'border-t-emerald-500', icon: '➕', title: 'Insert New Stock', desc: 'Add a new product to inventory', section: 'insert' as Section },
    { cls: 'border-t-amber-400', icon: '✏️', title: 'Update Stock', desc: 'Edit existing product details', section: 'update' as Section },
    { cls: 'border-t-red-500', icon: '🗑', title: 'Delete Stock', desc: 'Remove a product from inventory', section: 'delete' as Section },
    { cls: 'border-t-violet-500', icon: '🔍', title: 'Search Products', desc: 'Find products by name or category', section: null },
    { cls: 'border-t-secondary', icon: '📊', title: 'Stock Reports', desc: 'View graphical stock analytics', section: 'charts' as Section },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <section className="text-center py-10 px-5 bg-gradient-to-br from-primary to-secondary text-white">
        <h1 className="text-3xl font-bold mb-2">📊 Stock Management Dashboard</h1>
        <p className="text-sm">Manage your stationery inventory — view, add, update and delete stock records</p>
      </section>

      {/* Stat Cards */}
      <section className="flex flex-wrap gap-5 px-8 pt-8 pb-3 justify-center">
        {statCards.map((s) => (
          <div key={s.label}
            className="flex items-center gap-4 bg-white dark:bg-gray-800 px-6 py-5 rounded-2xl shadow-md min-w-48 flex-1 max-w-64 hover:-translate-y-1 transition-transform">
            <div className="text-4xl">{s.icon}</div>
            <div>
              <h3 className="text-2xl font-bold text-primary dark:text-secondary">{s.value}</h3>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Action Cards */}
      <section className="px-8 py-5">
        <h2 className="text-xl font-bold text-primary dark:text-secondary mb-4">⚙️ Stock Operations</h2>
        <div className="flex flex-wrap gap-4">
          {actionCards.map((a) => (
            <div key={a.title}
              onClick={() => a.section ? showSection(a.section) : (window.location.href = '/services')}
              className={`flex-1 min-w-40 max-w-52 bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md text-center cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all border-t-4 ${a.cls}`}>
              <div className="text-4xl mb-2">{a.icon}</div>
              <h3 className="text-sm font-bold text-primary dark:text-secondary mb-1">{a.title}</h3>
              <p className="text-xs text-gray-400">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* View Section */}
      {activeSection === 'view' && (
        <section className="px-8 py-5" id="view">
          <h2 className="text-xl font-bold text-primary dark:text-secondary mb-4">👁 All Stock Records</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
              <thead>
                <tr>
                  {['#', 'Product Name', 'Category', 'Price (Rs.)', 'Stock Qty', 'Actions'].map((h) => (
                    <th key={h} className="bg-primary text-white px-4 py-3 text-left text-sm">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stockData.map((item, i) => (
                  <tr key={item.name} className="hover:bg-teal-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-3 text-sm border-b border-gray-100 dark:border-gray-700 dark:text-gray-200">{i + 1}</td>
                    <td className="px-4 py-3 text-sm border-b border-gray-100 dark:border-gray-700 dark:text-gray-200">{item.name}</td>
                    <td className="px-4 py-3 text-sm border-b border-gray-100 dark:border-gray-700">
                      <span className="bg-secondary text-white px-2.5 py-0.5 rounded-full text-xs">{item.category}</span>
                    </td>
                    <td className="px-4 py-3 text-sm border-b border-gray-100 dark:border-gray-700 dark:text-gray-200">Rs.{item.price}</td>
                    <td className="px-4 py-3 text-sm border-b border-gray-100 dark:border-gray-700 dark:text-gray-200">{item.qty}</td>
                    <td className="px-4 py-3 text-sm border-b border-gray-100 dark:border-gray-700">
                      <button onClick={() => prefillUpdate(item.name, item.price, item.qty)}
                        className="px-3 py-1.5 bg-amber-400 text-white rounded-lg text-xs font-bold mr-1 hover:scale-105 transition-transform cursor-pointer">
                        ✏️ Edit
                      </button>
                      <button onClick={() => quickDelete(item.name)}
                        className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-bold hover:scale-105 transition-transform cursor-pointer">
                        🗑 Del
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Insert Section */}
      {activeSection === 'insert' && (
        <section className="px-8 py-5" id="insert">
          <h2 className="text-xl font-bold text-primary dark:text-secondary mb-4">➕ Insert New Stock</h2>
          <div className="max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <input type="text" placeholder="Product Name" value={newName} onChange={(e) => setNewName(e.target.value)} className={inputCls} />
            <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className={inputCls}>
              <option value="">Select Category</option>
              {['Pens', 'Pencils', 'Notebooks', 'Bags', 'Markers', 'Office Supplies', 'Bundles'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input type="number" placeholder="Price (Rs.)" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className={inputCls} />
            <input type="number" placeholder="Stock Quantity" value={newQty} onChange={(e) => setNewQty(e.target.value)} className={inputCls} />
            <button onClick={insertStock}
              className="w-full py-3 bg-gradient-to-br from-primary to-secondary text-white font-bold rounded-xl hover:scale-[1.02] transition-transform cursor-pointer">
              ➕ Add Product
            </button>
          </div>
        </section>
      )}

      {/* Update Section */}
      {activeSection === 'update' && (
        <section className="px-8 py-5" id="update">
          <h2 className="text-xl font-bold text-primary dark:text-secondary mb-4">✏️ Update Stock</h2>
          <div className="max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <input type="text" placeholder="Product Name to Update" value={updateName} onChange={(e) => setUpdateName(e.target.value)} className={inputCls} />
            <input type="number" placeholder="New Price (Rs.)" value={updatePrice} onChange={(e) => setUpdatePrice(e.target.value)} className={inputCls} />
            <input type="number" placeholder="New Stock Quantity" value={updateQty} onChange={(e) => setUpdateQty(e.target.value)} className={inputCls} />
            <button onClick={updateStock}
              className="w-full py-3 bg-gradient-to-br from-primary to-secondary text-white font-bold rounded-xl hover:scale-[1.02] transition-transform cursor-pointer">
              ✏️ Update Product
            </button>
          </div>
        </section>
      )}

      {/* Delete Section */}
      {activeSection === 'delete' && (
        <section className="px-8 py-5" id="delete">
          <h2 className="text-xl font-bold text-primary dark:text-secondary mb-4">🗑 Delete Stock</h2>
          <div className="max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <input type="text" placeholder="Product Name to Delete" value={deleteName} onChange={(e) => setDeleteName(e.target.value)} className={inputCls} />
            <button onClick={deleteStock}
              className="w-full py-3 bg-gradient-to-br from-red-500 to-red-700 text-white font-bold rounded-xl hover:scale-[1.02] transition-transform cursor-pointer">
              🗑 Delete Product
            </button>
          </div>
        </section>
      )}

      {/* Charts Section */}
      {(() => {
        const CHART_COLORS = ['#0f4c81','#00a8a8','#f59e0b','#ef4444','#8b5cf6','#10b981','#f97316'];
        const cats = [...new Set(stockData.map((i) => i.category))];
        const qtys = cats.map((c) => stockData.filter((i) => i.category === c).reduce((s, i) => s + i.qty, 0));
        const names = stockData.map((i) => i.name.split(' ')[0]);
        const prices = stockData.map((i) => i.price);

        return (
          <section className="px-8 pb-8 max-w-5xl mx-auto" id="charts">
            <h2 className="text-xl font-bold text-primary dark:text-secondary mb-4">📈 Stock Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center mb-3">Stock by Category (Bar Chart)</h3>
                <div className="relative h-48">
                  <Bar data={{ labels: cats, datasets: [{ label: 'Total Qty', data: qtys, backgroundColor: CHART_COLORS }] }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center mb-3">Category Distribution (Pie Chart)</h3>
                <div className="relative h-48">
                  <Pie data={{ labels: cats, datasets: [{ data: qtys, backgroundColor: CHART_COLORS }] }}
                    options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md md:col-span-2">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center mb-3">Price Range Overview (Line Chart)</h3>
                <div className="relative h-44">
                  <Line data={{ labels: names, datasets: [{ label: 'Price (Rs.)', data: prices, borderColor: '#0f4c81', backgroundColor: 'rgba(15,76,129,0.1)', fill: true, tension: 0.4 }] }}
                    options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Quick Links */}
      <section className="px-8 pb-5">
        <h2 className="text-xl font-bold text-primary dark:text-secondary mb-4">🔗 Quick Links</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { to: '/', label: '🏠 Home' },
            { to: '/services', label: '🛒 All Products' },
            { to: '/login', label: '🔒 Login' },
            { to: '/signup', label: '🔓 Signup' },
            { to: '/contact', label: '📞 Contact' },
          ].map(({ to, label }) => (
            <Link key={to} to={to}
              className="px-4 py-2 bg-white dark:bg-gray-800 text-primary dark:text-secondary rounded-xl font-bold text-xs shadow-sm border border-primary/20 dark:border-secondary/30 hover:bg-primary dark:hover:bg-secondary hover:text-white hover:-translate-y-0.5 transition-all">
              {label}
            </Link>
          ))}
        </div>
      </section>

      <footer className="text-center py-5 bg-primary dark:bg-gray-900 text-white text-sm mt-8">
        <p>© 2026 E-Commerce Stationery Shop — Admin Panel</p>
      </footer>
    </div>
  );
};

export default Dashboard;
