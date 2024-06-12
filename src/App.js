import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
      size: "",
      sort: "",
    };
  }

  createOrder = () => {
    alert("Need To Save order for" + this.createOrder.name)
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems }, () => {
      localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
    });
  };

  clearCart = () => {
    this.setState({ cartItems: [] }, () => {
      localStorage.removeItem("cartItems");
    });
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.filter(
      (item) => item._id !== product._id
    );
    this.setState({ cartItems }, () => {
      localStorage.removeItem("cartItems", JSON.stringify(cartItems));
    });
  };

  sortProducts = (e) => {
    const sort = e.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
        ),
    }));
  };

  filterProducts = (e) => {
    const size = e.target.value;
    if (size === "") {
      this.setState({ size, products: data.products });
    } else {
      this.setState({
        size,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(size) >= 0
        ),
      });
    }
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>

        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                clearCart={this.clearCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>

        <footer>All rights reserved</footer>
      </div>
    );
  }
}

export default App;
