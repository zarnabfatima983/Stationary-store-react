import Header from '../../components/Header/page';
import { useNavigate } from 'react-router-dom';

interface Product {
  name: string;
  price: number;
  image: string;
  alt: string;
}

const featuredProducts: Product[] = [
  { name: 'Fountain Pen', price: 250, image: '/images/fountainpen.jpg', alt: 'Fountain Pen' },
  { name: 'School Bag', price: 2500, image: '/images/schoolbag.jpg', alt: 'School Bag' },
  { name: 'Notebook', price: 450, image: '/images/schoolnotebook.jpg', alt: 'Notebook' },
  { name: 'Color Pencil', price: 350, image: '/images/colorpencil.jpg', alt: 'Color Pencil' },
];

const Home = () => {
  const navigate = useNavigate();

  const addToCart = (name: string, price: number) => {
    const cart: { name: string; price: number }[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
  };

  const buyNow = (name: string) => {
    alert(`Proceeding to buy: ${name}`);
    navigate('/services');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Header
        title="Premium Stationery Collection"
        subtitle="Buy Pens, Bags, Notebooks, Pencils & More"
        showButton={true}
      />

      <section className="flex flex-wrap justify-center gap-5 py-10 px-5" id="productList">
        {featuredProducts.map((product) => (
          <div key={product.name}
            className="w-64 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg text-center transition-transform hover:-translate-y-1 lg:w-[30%]">
            <img src={product.image} alt={product.alt} className="w-full h-40 object-contain" />
            <h3 className="font-bold text-base mt-2 text-gray-900 dark:text-gray-100">{product.name}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm my-1">Rs.{product.price}</p>
            <button onClick={() => addToCart(product.name, product.price)}
              className="w-full mt-2 py-3 border-none rounded-xl cursor-pointer font-bold text-white bg-gradient-to-br from-primary to-secondary shadow-md hover:scale-[1.03] transition-transform text-sm">
              Add To Cart
            </button>
            <button onClick={() => buyNow(product.name)}
              className="w-full mt-2 py-3 border-none rounded-xl cursor-pointer font-bold text-white bg-gradient-to-br from-primary to-secondary shadow-md hover:scale-[1.03] transition-transform text-sm">
              Buy Now
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
