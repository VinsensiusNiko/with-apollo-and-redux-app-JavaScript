import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import gql from 'graphql-tag';
import {withApollo} from '../lib/apollo';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';

const CATEGORIES_QUERY = gql`
    {
        categoryList {
            children {
                id
                name    
                children {
                    id
                    name
                    children {
                        id
                        name
                    }
                }
            }
        }
    }
`;



const index = () => {
    const pageConfig = {
        title : "--Homepage--"
    }

    const {loading, data} = useQuery(CATEGORIES_QUERY);

    if(loading){
        return <div>Loading...</div>
    }

    const categories = data.categoryList[0].children;

    return (
        <Layout pageConfig = {pageConfig}>
            <div className="main">
                <h2>Homepage</h2>
                <p>Categories</p>
                <ul>
                    {categories.map((catLvl1) => (
                        <li key={catLvl1.id}>
                            <Link href="category/[id]" as={`category/${catLvl1.id}`}>
                                <a>{catLvl1.name}</a>
                            </Link>
                            <ul>
                                {catLvl1.children.map((catLvl2) => (
                                    <li key={catLvl2.id}>
                                        <Link href="category/[id]" as={`category/${catLvl2.id}`}>
                                            <a>{catLvl2.name}</a>
                                        </Link>
                                        <ul>
                                            {catLvl2.children.map((catLvl3) => (
                                                <li key={catLvl3.id}>
                                                    <Link href="category/[id]" as={`category/${catLvl3.id}`}>
                                                        <a>{catLvl3.name}</a>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}

export default (withApollo)(index);
