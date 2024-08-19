import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchOperators } from "../../../store/operators/actions";
import { fetchProducts } from "../../../store/products/actions";
import { Loader } from "../../../components/loading/loading";

const Operator = ({ selectedCountry, mobileNumber }) => {

    const dispatch = useDispatch();

    const { data: mobileData, error: mobileLookupError, loading: mobileLookupLoading } = useSelector((state) => state.mobileNumLookup);
    const { operators, loading: operatorloading } = useSelector((state) => state.operators);

    useEffect(() => {
        if (!mobileLookupLoading && !mobileLookupError && mobileNumber) {
            dispatch(fetchOperators());
        }
    }, [mobileLookupLoading, mobileLookupError, dispatch]);

    const handleOperator = (productId) => {
        dispatch(fetchProducts(productId));
    };

    // Filter operators based on selected country
    const filteredOperators = operators.filter(
        (operator) => operator.country?.iso_code == selectedCountry
    );

    return (
        <div className='operator-section'>
            {filteredOperators.length > 0 && (
                <div>
                    <p className='operator-title'>Who offers their service</p>
                    <div className='operators-container'>
                        <div className="operators-list">
                            {filteredOperators.map((operator) => (
                                <div key={operator.id} className="operator-box" onClick={() => { handleOperator(operator.id) }}>
                                    <p>{operator.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {(operatorloading) && <Loader />}
        </div>
    )
}

export default Operator;