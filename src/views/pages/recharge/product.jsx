import React from "react";
import { useSelector } from 'react-redux';
import { Loader } from "../../../components/loading/loading";

const Products = () => {

    const { products: productData, error: productError, loading: productLoading } = useSelector((state) => state.products);

    const rechargePrice = productData
        .map((item) => ({
            rechargePriceData: `${item.destination.amount} ${item.destination.unit}`
        }));

    const sortedrechargeList = rechargePrice.sort((a, b) => {
        const valueA = parseFloat(a.rechargePriceData);
        const valueB = parseFloat(b.rechargePriceData);
        return valueA - valueB;
    });

    return (
        <div className='product-section'>
            <p className='product-title'>Let's select a top-up</p>
            <div className='product-container'>
                <div className="product-list">
                    {sortedrechargeList.map((items) => (
                        <div key={items.id} className="product-box">
                            <p>{items.rechargePriceData}</p>
                        </div>
                    ))}
                </div>
            </div>
            {(productLoading) && <Loader />}
        </div>
    )
}

export default Products;