import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import {withApollo} from '../../lib/apollo';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { withRedux } from '../../lib/redux';



const PRODUCTPDP = gql`
    query getProduct($urlKey: String!) {
        products(filter: { url_key: { eq: $urlKey } }) {
            items {
                name
                sku
                stock_status
                description {
                    html
                }
                image {
                    url
                    label
                }
                price_range {
                    minimum_price {
                        regular_price {
                            currency
                            value
                        }
                        final_price {
                            currency
                            value
                        }
                    }
                }
            }
        }
    }
`;

const Pdp = () => {
    const router = useRouter();
    const{ url_key } = router.query;
    const dispatch = useDispatch();
    const { data, loading } = useQuery(PRODUCTPDP, {variables: {urlKey: url_key}});
    const pageConfig = {
        title : url_key
    }
    const [qty, setQty] = useState();

    if(loading){
        return <div>Loading...</div>
    }

    const productpdp = data.products.items[0];
    //console.log(productpdp);

    const handleChangeQty = (e) =>{
        setQty(e.target.value);
    }

    const handleAddToCart = (e) =>{
        e.preventDefault();
        console.log(qty);
        const item = {
            sku: productpdp.sku,
            name: productpdp.name,
            image: productpdp.image,
            qty: qty,
            price: productpdp.price_range.minimum_price.final_price.value
        };
        console.log(item);

        dispatch({
            type: 'ADD_TO_CART',
            item
        });
    }

    return (
        <Layout pageConfig = {pageConfig}>
            <div className="main pdp">
                <div className="product-img">
                    <img src={productpdp.image.url}></img>
                </div>
                <div className="product-details">
                    <div className="details-name">
                        {productpdp.name}
                    </div>
                    <div className="details-sku">
                        SKU#: {productpdp.sku}
                        <strong>({productpdp.stock_status})</strong>
                    </div>
                    <hr></hr>
                    <div className="price">
                        {productpdp.price_range.minimum_price.final_price.value}$
                    </div>
                </div>
                <div className="details-desc">
                    {productpdp.description.html}
                </div>
                <div className="action-primary">
                    <form onSubmit={handleAddToCart}>
                        <input type="number" name="qty" placeholder="input here..." onChange={handleChangeQty}></input>
                        <button type="submit"> Add to Cart</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default compose(withApollo, withRedux)(Pdp);

