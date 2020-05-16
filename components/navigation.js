import React from 'react';
import Link from 'next/link';

const Navigation = () => {
    return (
        <div className="navi">
            <ul>
                <li>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                {/* <li>
                    <Link href="/category/[id]" as="/category/42">
                        <a>Category</a>
                    </Link>
                </li> */}
                <li>
                    <Link href="/aboutus">
                        <a>About Us</a>
                    </Link>
                </li>
                <li>
                    <Link href="/cart">
                        <a>Cart</a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Navigation;
