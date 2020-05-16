import React from 'react';
import { useRouter } from 'next/router';
import Navigation from '../../components/navigation';
import Head from 'next/head';
import Layout from '../../components/layout';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import {withApollo} from '../../lib/apollo';

const CATEGORY = gql`
    query getCategoryById($id: String!) {
        categoryList(filters: { ids: { eq: $id } }) {
            name
            url_key
            image_path
            description
            products {
                items {
                    id
                    name
                    url_key
                    description {
                        html
                    }
                    small_image {
                        url
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
    }
`;

const Category = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data, loading } = useQuery(CATEGORY, {variables: {id: id}});
    const pageConfig = {
        title : id
    }
    
    if(loading){
        return <div>Loading...</div>
    }

    const category = data.categoryList[0];
    //console.log(category);

    return (
        <Layout pageConfig = {pageConfig}>
            <div className="main">
                <h2 className="title">Category {category.name}</h2>
                <div className="category-image">
                    <img src={category.image_path}></img>
                </div>
                <div className="category-description">
                    {category.description}
                </div>
                <div className="list-category">
                    {category.products.items.map( (item) => (
                        <div className="product-item">
                            <div className="product-img">
                                <Link href="/pdp/[url_key]" as={`/pdp/${item.url_key}`}>
                                    <a><img src={item.small_image.url}></img></a>
                                </Link>
                            </div>
                            <div className="product-details">
                                <div className="details-name">
                                    {item.name}
                                </div>
                                <div className="price">
                                    {item.price_range.minimum_price.final_price.value}$
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default (withApollo)(Category);
