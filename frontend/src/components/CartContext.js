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
import Back from "./Back";

// Define the products array with details of different plans
const productsArray = [
  {
    id: "price_1QdB1WRosPL8EM1RliY5Hded",
    title: "Rice",
    price: 4950,
    desc: "Grade A",
  },
  {
    id: "price_1QdB2GRosPL8EM1Rr66MowNt",
    title: "Rice",
    price: 3800,
    desc: "Grade B",
  },
  {
    id: "price_1QdB3ZRosPL8EM1R2HdYcTVN",
    title: "Wheat",
    price: 3850,
    desc: "Grade A",
  },
  {
    id: "price_1QdB4rRosPL8EM1RE32LGJqy",
    title: "Onion",
    price: 4400,
    desc: "Grade A",
  },
  {
    id: "price_1QdB6cRosPL8EM1RMm9phF7t",
    title: "Onion",
    price: 1000,
    desc: "Grade B",
  },
  
  {
    id: "price_1QdBAZRosPL8EM1R1NUXxUrf",
    title: "Potatoes",
    price: 5200,
    desc: "Grade A",
  },
  {
    id: "price_1QdBBvRosPL8EM1RZ87oHjxJ",
    title: "Potatoes",
    price: 1974,
    desc: "Grade B",
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
              <button onClick={() => cart.addOneToCart(product.id)}>+</button>
              <button onClick={() => cart.removeOneFromCart(product.id)}>-</button>
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
    await fetch("http://localhost:5000/checkout", {
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
  <h1 align="center" className="p-3">Buy Commodities</h1>
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
            />
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

  {/* Wrap all ProductCard components inside this div */}
  {/* <div className="cont">
    {products.map((product, idx) => (
      <ProductCard key={idx} product={product} />
    ))}
  </div> */}
</>

  );
}

function Cancel() {
  return (<>
  <Back title='Payment Cancelled' />
  <h1>Sorry to see you cancelled your Stripe payment!</h1>
  </>);
}

function Store() {
  return (
    <Container> {/* Add the Container here */}
      <Row xs={1} md={3} className="g-4">
        {productsArray.map((product, idx) => (
          <Col align="center" key={idx}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}


function Success() {
  return (
    <>
    <Back title='Payment Sucessfull' />
    <h1>Thank you for your purchase!</h1>
    </>
  );
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
