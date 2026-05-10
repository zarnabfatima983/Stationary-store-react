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
    const cart: { name: string; price: number }[] = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
  };

  const buyNow = (name: string) => {
    alert(`Proceeding to buy: ${name}`);
    navigate('/services');
  };

  return (
    <>
      <Header
        title="Premium Stationery Collection"
        subtitle="Buy Pens, Bags, Notebooks, Pencils & More"
        showButton={true}
      />

      <section className="products" id="productList">
        {featuredProducts.map((product) => (
          <div className="card" key={product.name}>
            <img src={product.image} alt={product.alt} />
            <h3>{product.name}</h3>
            <p>Rs.{product.price}</p>
            <button onClick={() => addToCart(product.name, product.price)}>
              Add To Cart
            </button>
            <button onClick={() => buyNow(product.name)}>Buy Now</button>
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;
