import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header/page';

interface Product {
  name: string;
  category: string;
  price: number;
  image: string;
  desc: string;
  isBundle?: boolean;
  oldPrice?: number;
}

const allProducts: Product[] = [
  { name: 'Gel Pen', category: 'Pens', price: 250, image: '/images/gelpen.jpg', desc: 'Smooth writing gel pen for daily use.' },
  { name: 'Fountain Pen', category: 'Pens', price: 850, image: '/images/fountainpen.jpg', desc: 'Luxury pen with elegant premium finish.' },
  { name: 'Ball Pen', category: 'Pens', price: 150, image: '/images/ballpen.jpg', desc: 'Simple and reliable everyday pen.' },
  { name: 'Simple Pencil', category: 'Pencils', price: 50, image: '/images/simplepencil.jpg', desc: 'Best for school writing and exams.' },
  { name: 'Color Pencil Set', category: 'Pencils', price: 350, image: '/images/colorpencil.jpg', desc: '12 vibrant colors for drawing and art.' },
  { name: 'School Notebook', category: 'Notebooks', price: 300, image: '/images/schoolnotebook.jpg', desc: 'Ruled pages notebook for daily school writing.' },
  { name: 'College Notebook', category: 'Notebooks', price: 450, image: '/images/collegenotebook.jpg', desc: 'Thick pages notebook for long notes and lectures.' },
  { name: 'Sketch Book', category: 'Notebooks', price: 500, image: '/images/sketchbook.jpg', desc: 'Premium sketch book for drawing and creative work.' },
  { name: 'School Bag', category: 'Bags', price: 2500, image: '/images/schoolbag.jpg', desc: 'Durable and comfortable school bag.' },
  { name: 'Laptop Bag', category: 'Bags', price: 4000, image: '/images/laptopbag.jpg', desc: 'Safe padded laptop protection bag.' },
  { name: 'Whiteboard Marker', category: 'Markers', price: 220, image: '/images/whiteboard.jpg', desc: 'Easy erase marker for board writing.' },
  { name: 'Highlighter', category: 'Markers', price: 180, image: '/images/highlighter.jpg', desc: 'Bright color marker for important text.' },
  { name: 'Marker Pen', category: 'Markers', price: 200, image: '/images/markerpen.jpg', desc: 'Bold color marker pen for art and labeling.' },
  { name: 'Student Bundle', category: 'Bundles', price: 999, oldPrice: 1400, image: '/images/bundle.jpg', desc: 'Notebook + Gel Pen + Color Pencil Set — Save Rs.401!', isBundle: true },
  { name: 'Office Bundle', category: 'Bundles', price: 1499, oldPrice: 2000, image: '/images/office-set.jfif', desc: 'Ball Pen x5 + Highlighter x3 + Whiteboard Marker x2', isBundle: true },
];

const categories = ['All', 'Pens', 'Pencils', 'Notebooks', 'Bags', 'Markers', 'Bundles'];

const Services = () => {
  const [searchParams] = useSearchParams();
  const [searchName, setSearchName] = useState(searchParams.get('search') || '');
  const [filterCategory, setFilterCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const s = searchParams.get('search');
    if (s) setSearchName(s);
  }, [searchParams]);

  const addToCart = (name: string, price: number) => {
    const cart: { name: string; price: number }[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
  };

  const buyNow = (name: string) => alert(`Proceeding to buy: ${name}`);

  const resetFilters = () => {
    setSearchName(''); setFilterCategory(''); setMinPrice(''); setMaxPrice(''); setSortBy(''); setActiveTab('All');
  };

  const quickFilter = (cat: string) => {
    setActiveTab(cat);
    setFilterCategory(cat === 'All' ? '' : cat);
  };

  let filtered = allProducts.filter((p) => {
    const matchName = p.name.toLowerCase().includes(searchName.toLowerCase());
    const matchCat = filterCategory === '' || p.category === filterCategory;
    const matchMin = minPrice === '' || p.price >= parseFloat(minPrice);
    const matchMax = maxPrice === '' || p.price <= parseFloat(maxPrice);
    return matchName && matchCat && matchMin && matchMax;
  });

  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === 'name-asc') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy === 'name-desc') filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));

  const inputCls = 'px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:border-primary';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Header title="🛒 All Products" subtitle="Explore our complete stationery collection" />

      {/* Search & Filter */}
      <section className="max-w-5xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold text-primary dark:text-secondary mb-5">🔍 Search &amp; Filter Products</h2>

        <div className="flex flex-wrap gap-4 mb-5">
          <div className="flex flex-col gap-1 flex-1 min-w-40">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Search by Name</label>
            <input type="text" placeholder="e.g. Gel Pen, Notebook..." value={searchName}
              onChange={(e) => setSearchName(e.target.value)} className={inputCls} />
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-40">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Filter by Category</label>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className={inputCls}>
              <option value="">All Categories</option>
              {categories.slice(1).map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-40">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Min Price (Rs.)</label>
            <input type="number" placeholder="e.g. 100" value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)} className={inputCls} />
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-40">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Max Price (Rs.)</label>
            <input type="number" placeholder="e.g. 1000" value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)} className={inputCls} />
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-40">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={inputCls}>
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
          <div className="flex flex-col justify-end flex-1 min-w-40">
            <button onClick={resetFilters}
              className="mt-5 px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:scale-[1.03] transition-transform cursor-pointer text-sm">
              ✖ Reset Filters
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((cat) => (
            <button key={cat} onClick={() => quickFilter(cat)}
              className={`px-4 py-1.5 border-2 border-primary rounded-full text-sm font-bold cursor-pointer transition-colors
                ${activeTab === cat
                  ? 'bg-primary text-white'
                  : 'bg-transparent text-primary dark:text-secondary dark:border-secondary hover:bg-primary hover:text-white dark:hover:bg-secondary'}`}>
              {cat}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {filtered.length === 0 ? 'No products found' : `Showing ${filtered.length} product(s)`}
        </p>
      </section>

      {/* Products Grid */}
      <section className="flex flex-wrap justify-center gap-5 py-10 px-5" id="productGrid">
        {filtered.length === 0 ? (
          <p className="text-center py-10 text-lg text-gray-500 dark:text-gray-400">No products found matching your search.</p>
        ) : (
          filtered.map((product) => (
            <div key={product.name}
              className={`w-64 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg text-center transition-transform hover:-translate-y-1 lg:w-[30%]
                ${product.isBundle ? 'border-2 border-yellow-400' : ''}`}>
              <img src={product.image} alt={product.name} className="w-full h-40 object-contain" />
              <span className={`inline-block px-3 py-0.5 rounded-full text-xs text-white mb-1.5
                ${product.isBundle ? 'bg-gradient-to-r from-yellow-400 to-red-500' : 'bg-secondary'}`}>
                {product.isBundle ? '🎁 Bundle' : product.category}
              </span>
              <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">{product.name}</h3>
              <p className="text-sm my-1">
                <span className="text-gray-800 dark:text-gray-200 font-semibold">Rs.{product.price}</span>
                {product.oldPrice && (
                  <span className="line-through text-gray-400 text-xs ml-1.5">Rs.{product.oldPrice}</span>
                )}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{product.desc}</p>
              <button onClick={() => addToCart(product.name, product.price)}
                className="w-full mt-1 py-2.5 border-none rounded-xl cursor-pointer font-bold text-white bg-gradient-to-br from-primary to-secondary shadow-md hover:scale-[1.03] transition-transform text-sm">
                🛒 Add To Cart
              </button>
              <button onClick={() => buyNow(product.name)}
                className="w-full mt-2 py-2.5 border-none rounded-xl cursor-pointer font-bold text-white bg-gradient-to-br from-primary to-secondary shadow-md hover:scale-[1.03] transition-transform text-sm">
                ⚡ Buy Now
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Services;
