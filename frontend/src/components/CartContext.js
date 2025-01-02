import { createContext, useState, useContext } from "react";
import {
  Button,
  Container,
  Navbar,
  Modal,
  Card,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import "../css/ProductCard.css";

// Define the products array with details of different plans
const productsArray = [
  {
    id: "price_1QcQ63RosPL8EM1Rl0yiZgIe",
    title: "BASIC PLAN",
    price: 1999,
    desc: "Access to weather updates and basic crop recommendations.",
  },
  {
    id: "price_1QcQ77RosPL8EM1Rj5sJ32sm",
    title: "STANDARD PLAN",
    price: 3999,
    desc: "Includes pest detection, soil health analysis, and detailed crop management tips.",
  },
  {
    id: "price_1QcQ7iRosPL8EM1R14BkopTM",
    title: "PREMIUM PLAN",
    price: 5999,
    desc: "Complete access to all features, including market trends and government scheme alerts.",
  },
  {
    id: "price_1QcQ8BRosPL8EM1R9dfWSilO",
    title: "ULTIMATE PLAN",
    price: 9999,
    desc: "Full suite of services, personalized recommendations, and one-on-one expert consultations.",
  },
];

// Helper function to get product data by ID
function getProductData(id) {
  let productData = productsArray.find((product) => product.id === id);

  if (productData == undefined) {
    console.log("Product data does not exist for ID: " + id);
    return undefined;
  }

  return productData;
}

// Cart Context
export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

// Cart Provider component
function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // Get the quantity of a product in the cart
  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  // Add one quantity to the cart
  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      // product is not in cart
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      // product is in cart
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  // Remove one quantity from the cart
  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  // Delete a product from the cart
  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => currentProduct.id !== id)
    );
  }

  // Calculate the total cost of items in the cart
  function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem.id);
      totalCost += productData.price * cartItem.quantity;
    });
    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

// ProductCard component
// function ProductCard(props) {
//     const product = props.product;
//     const cart = useContext(CartContext);
//     const productQuantity = cart.getProductQuantity(product.id);
//     return (
//         <Card>
//             <Card.Body>
//                 <Card.Title>{product.title}</Card.Title>
//                 <Card.Text>INR {product.price}</Card.Text>
//                 <Card.Text>{product.desc}</Card.Text>
//                 { productQuantity > 0 ?
//                     <>
//                         <Form as={Row}>
//                             <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
//                             <Col sm="6">
//                                 <Button sm="6" onClick={() => cart.addOneToCart(product.id)} className="mx-2">+</Button>
//                                 <Button sm="6" onClick={() => cart.removeOneFromCart(product.id)} className="mx-2">-</Button>
//                             </Col>
//                         </Form>
//                         <Button variant="danger" onClick={() => cart.deleteFromCart(product.id)} className="my-2">Remove from cart</Button>
//                     </>
//                     :
//                     <Button variant="primary" onClick={() => cart.addOneToCart(product.id)}>Add To Cart</Button>
//                 }
//             </Card.Body>
//         </Card>
//     );
// }

function ProductCard(props) {
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);

  return (
    <>
      <div className="cont">
        <div className="product-card">
          <h4>{product.title}</h4>
          <h1>
            <span>₹</span>
            {product.price}
          </h1>
          <p>{product.desc}</p>
          {productQuantity > 0 ? (
            <>
              <div className="cart-controls">
                <label>In Cart: {productQuantity}</label>
                <div className="quantity-buttons">
                  <button onClick={() => cart.addOneToCart(product.id)}>
                    +
                  </button>
                  <button onClick={() => cart.removeOneFromCart(product.id)}>
                    -
                  </button>
                </div>
              </div>
              <button
                className="remove-btn"
                onClick={() => cart.deleteFromCart(product.id)}
              >
                Remove from cart
              </button>
            </>
          ) : (
            <button
              className="add-to-cart-btn"
              onClick={() => cart.addOneToCart(product.id)}
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// CartProduct component
function CartProduct(props) {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const productData = getProductData(id);

  return (
    <>
      <h3>{productData.title}</h3>
      <p>{quantity} total</p>
      <p>INR {(quantity * productData.price).toFixed(2)}</p>
      <Button size="sm" onClick={() => cart.deleteFromCart(id)}>
        Remove
      </Button>
      <hr />
    </>
  );
}

// NavbarComponent component
function NavbarComponent() {
  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkout = async () => {
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url); // Forwarding user to Stripe
        }
      });
  };

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <>
      <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.items.map((currentProduct, idx) => (
                <CartProduct
                  key={idx}
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                ></CartProduct>
              ))}

              <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

              <Button variant="success" onClick={checkout}>
                Purchase items!
              </Button>
            </>
          ) : (
            <h1>There are no items in your cart!</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

function Cancel() {
  return <h1>Sorry to see you cancelled your Stripe payment!</h1>;
}

function Store() {
  return (
    <>
      <h1 align="center" className="p-3">
        Welcome to the store!
      </h1>
      <Row xs={1} md={3} className="g-4">
        {productsArray.map((product, idx) => (
          <Col align="center" key={idx}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

function Success() {
  return <h1>Thank you for your purchase!</h1>;
}

export {
  productsArray,
  getProductData,
  ProductCard,
  CartProduct,
  NavbarComponent,
  Cancel,
  Store,
  Success,
};
export { CartProvider };
