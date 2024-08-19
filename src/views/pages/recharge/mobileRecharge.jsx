import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ErrorIcon from '@mui/icons-material/Error';
import { FixedSizeList as List } from 'react-window';
import { fetchCountries } from '../../../store/countries/actions';
import { fetchOperators } from '../../../store/operators/actions';
import { fetchMobileNumLookup } from '../../../store/mobileLookup/actions';
import Operator from './operator';
import { CircularFullLoading, CircularInnerLoading, Loader } from '../../../components/loading/loading';
import Products from './product';

const validationSchema = Yup.object({
  selectedCountry: Yup.string().required("Recipient's country is required"),
  mobileNumber: Yup.string()
    // .matches(/^\d+$/, 'Mobile number must contain only digits')
    .required('Mobile number is required'),
});

const MobileRecharge = () => {

  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const [progressStep, setProgressStep] = useState(1);

  const { countries, loading } = useSelector((state) => state.countries);
  const { data: mobileData, error: mobileLookupError, loading: mobileLookupLoading } = useSelector((state) => state.mobileNumLookup);
  const { products } = useSelector((state) => state.products);


  useEffect(() => {
    if (!isMounted.current) {
      dispatch(fetchCountries());
      isMounted.current = true;
    }
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      selectedCountry: '',
      mobileNumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(fetchMobileNumLookup({
        mobile_number: values.mobileNumber
      }));
    },
  });

  useEffect(() => {
    if (!mobileLookupLoading && mobileData?.length > 0) {
      setProgressStep(2);
    }
  }, [mobileLookupLoading, mobileData]);

  return (
    <div className="recharge-container">
      <div className='header-section'>
        <h1>Worldwide mobile recharge!</h1>
        <p className='sub-title'>Send credit and data to any Phone</p>

        <div className="progress-indicator">
          <span className={`dot ${progressStep === 1 ? 'active' : ''}`}></span>
          <span className="line"></span>
          <span className={`dot ${progressStep === 2 ? 'active' : ''}`}></span>
          <span className="line"></span>
          <span className="dot"></span>
        </div>
      </div>

      <form className='input-section' onSubmit={formik.handleSubmit}>
        {!products?.length > 0 && (
          <div>
            <div className="input-container">
              <label className="input-label" htmlFor="selectedCountry">
                Recipient's country
              </label>
              <select
                id="selectedCountry"
                name="selectedCountry"
                className="country-select"
                value={formik.values.selectedCountry}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" label="Select a country" />
                {countries.map((country, index) => (
                  <option key={`${country.iso_code}-${index}`} value={country.iso_code}>
                    {country.name}
                  </option>
                ))}
              </select>
              {formik.touched.selectedCountry && formik.errors.selectedCountry ? (
                <div className="error">{formik.errors.selectedCountry}</div>
              ) : null}
            </div>

            <div className="input-container">
              <label className="input-label" htmlFor="mobileNumber">
                Enter Mobile Number
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                className="mobile-input"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Mobile Number"
              />
              {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                <div className="error">{formik.errors.mobileNumber}</div>
              ) : null}
            </div>
            {mobileLookupError && (
              <div>
                <p className='lookup-error'><ErrorIcon className='error-icon' /> Invalid </p>
                <p className='lookup-error-message'>{mobileLookupError}</p>
              </div>
            )}
          </div>

        )}
        {!mobileData?.length > 0 && (
          <div className='button-container'>
            <button type="submit" className="recharge-button">{'Start Recharge'}</button>
          </div>
        )}
      </form>

      {!products?.length > 0 && (
        <Operator
          selectedCountry={formik.values.selectedCountry}
          mobileNumber={formik.values.mobileNumber}
        />
      )}

      {products?.length > 0 && (
        <Products
          mobileNumber={formik.values.mobileNumber}
        />
      )}

      {(loading || mobileLookupLoading) && <Loader />}
    </div>
  );
};

export default MobileRecharge;
