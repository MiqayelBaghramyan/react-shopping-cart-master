import React, { Component } from 'react';
import formatCurrency from '../util';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showChekout: false,
        };
    }

    handleRemoveFromCart = (item) => {
        this.props.removeFromCart(item);
        this.setState({
            showRemoveNotification: true,
            removedItem: item,
        });
        setTimeout(() => {
            this.setState({ showRemoveNotification: false, removedItem: null });
        }, 3000);
    };

    handleClearCart = () => {
        this.props.clearCart();
    };

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        }
        this.props.createOrder(order);
    }

    render() {
        const { cartItems } = this.props;
        const { showRemoveNotification, removedItem } = this.state;

        return (
            <div>
                {cartItems.length === 0 ? (
                    <p className='cart cart-header'>Cart Is Empty</p>
                ) : (
                    <p className='cart cart-header'>You have {cartItems.length} items in the cart</p>
                )}

                <div>
                    {showRemoveNotification && removedItem && (
                        <div className='notification'>
                            {removedItem.title} has been removed from the cart.
                        </div>
                    )}
                    <div className='cart'>
                        <ul className='cart-items'>
                            {cartItems.map(item => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div>
                                        <p>{item.title}</p>
                                        <div className='right'>
                                            {formatCurrency(item.price)} x {item.count}{" "}
                                            <button
                                                className='button'
                                                onClick={() => this.handleRemoveFromCart(item)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {cartItems.length !== 0 && (
                        <div>
                            <div className='cart'>
                                <div className='total'>
                                    <div>
                                        Total:{" "}
                                        {formatCurrency(
                                            cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                        )}
                                    </div>
                                    <button className='button primary' onClick={() => this.setState({ showChekout: true })}>
                                        Proceed
                                    </button>
                                    <button className='button' onClick={this.handleClearCart}>
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                            {this.state.showChekout && (
                                <div className='cart'>
                                    <form onSubmit={this.createOrder}>
                                        <ul className='form-container'>
                                            <li>
                                                <label>Email</label>
                                                <input name='email' type='email' required onChange={this.handleInput} />
                                            </li>
                                            <li>
                                                <label>Name</label>
                                                <input name='name' type='text' required onChange={this.handleInput} />
                                            </li>
                                            <li>
                                                <label>Address</label>
                                                <input name='address' type='text' required onChange={this.handleInput} />
                                            </li>
                                            <li>
                                                <button className='button promary' type='submit'>Chekout</button>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}
                </div >
            </div>
        );
    }
}
