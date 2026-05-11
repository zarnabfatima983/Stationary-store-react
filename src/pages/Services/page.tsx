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
    const cart: { name: string; price: number }[] = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
  };

  const buyNow = (name: string) => {
    alert(`Proceeding to buy: ${name}`);
  };

  const resetFilters = () => {
    setSearchName('');
    setFilterCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('');
    setActiveTab('All');
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

  return (
    <>
      <Header title="🛒 All Products" subtitle="Explore our complete stationery collection" />

      <section className="search-section">
        <h2>🔍 Search &amp; Filter Products</h2>

        <div className="search-grid">
          <div className="search-group">
            <label>Search by Name</label>
            <input
              type="text"
              placeholder="e.g. Gel Pen, Notebook..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          <div className="search-group">
            <label>Filter by Category</label>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.slice(1).map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="search-group">
            <label>Min Price (Rs.)</label>
            <input
              type="number"
              placeholder="e.g. 100"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div className="search-group">
            <label>Max Price (Rs.)</label>
            <input
              type="number"
              placeholder="e.g. 1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="search-group">
            <label>Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          <div className="search-group search-reset">
            <button onClick={resetFilters}>✖ Reset Filters</button>
          </div>
        </div>

        <div className="cat-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-tab${activeTab === cat ? ' active' : ''}`}
              onClick={() => quickFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="result-count">
          {filtered.length === 0
            ? 'No products found'
            : `Showing ${filtered.length} product(s)`}
        </p>
      </section>

      <section className="products" id="productGrid">
        {filtered.length === 0 ? (
          <p className="no-results-text">
            No products found matching your search.
          </p>
        ) : (
          filtered.map((product) => (
            <div
              className={`card${product.isBundle ? ' bundle-card' : ''}`}
              key={product.name}
            >
              <img src={product.image} alt={product.name} />
              <span className={`cat-badge${product.isBundle ? ' bundle-badge' : ''}`}>
                {product.isBundle ? '🎁 Bundle' : product.category}
              </span>
              <h3>{product.name}</h3>
              <p className="price">
                Rs.{product.price}
                {product.oldPrice && (
                  <span className="old-price">Rs.{product.oldPrice}</span>
                )}
              </p>
              <p className="desc">{product.desc}</p>
              <button onClick={() => addToCart(product.name, product.price)}>
                🛒 Add To Cart
              </button>
              <button onClick={() => buyNow(product.name)}>⚡ Buy Now</button>
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default Services;
