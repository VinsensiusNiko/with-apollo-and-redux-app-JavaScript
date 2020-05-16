import React from 'react';
import Layout from '../components/layout';
import { useSelector } from 'react-redux';
import { withRedux } from '../lib/redux';


const Cart = () => {
    const cart = useSelector(state => state.cart);
    const pageConfig = {
        title: "--Cart--"
    }
    console.log(cart);
    let total = 0;
    let currency = '';
    cart.forEach((item) => {
        total += parseInt(item.qty) * item.price.value;
        currency = item.price.currency;
    });
    return (
        <Layout pageConfig = {pageConfig}>
            <div className="main cart">
                <h2 className="title">Shopping Cart</h2>
                <table className="_cart">
                    <thead>
                        <th>Products</th>
                        <th>Price</th>
                    </thead>
                    <tbody>
                        {cart.map(item => (
                            <tr>
                                <td className="_carts">
                                    <div className="product-img">
                                        <img src={item.image.url}></img>
                                    </div>
                                    <div className="details-name">
                                        {item.name}
                                    </div>
                                    <div className="details-sku">
                                        {item.sku}
                                    </div>
                                </td>
                                <td className="_carts">
                                    <div className="qty">
                                        Qty: {item.qty}
                                    </div>
                                    <div className="price">
                                        {item.price}$
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default (withRedux)(Cart);
