import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Products from './Products';
import debounce from 'lodash.debounce';

/// Data
import productData from '../productData';

import PageTitle from '../../../../layouts/PageTitle';

import { Button, Dropdown, Nav, Pagination } from 'react-bootstrap';
import Paginate from '../../../Paginate';
import { useDispatch, useSelector } from 'react-redux';
import {
  listProductDetails,
  listProducts,
} from '../../../../../actions/productActions';
import { Link } from 'react-router-dom';
import Loader from '../../../Loader';
import Message from '../../../Message';
import { Formik } from 'formik';
import { set } from 'date-fns';

const ProductGrid = ({ match, history, hasVariant, setHasVariant }) => {
  const [keyword, setKeyword] = useState('');
  const [inputValue, setInputValue] = useState('');

  const searchref = useRef();

  let pageNumber = match.params.pageNumber || 1;

  let items = [];
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading: productDetailsLoading, error: errorProductLoading } =
    productDetails;

  const paginationClicked = async (e, number) => {
    e.preventDefault();
    pageNumber = number;
    dispatch(listProducts(pageNumber));
    history.push(`/ecom-product-grid/page/${number}`);
  };

  const debouncedSave = useCallback(
    debounce((newValue) => dispatch(listProducts(1, newValue)), 1000),
    []
  );

  const updateValue = (newValue) => {
    setInputValue(newValue);
    debouncedSave(newValue);
  
  };

  useEffect(() => {
    dispatch(listProducts(pageNumber));
    dispatch(listProductDetails(0));
  }, [dispatch, pageNumber]);

  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={(event) => paginationClicked(event, number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const pag = (size, gutter, variant, bg, circle) => (
    <Pagination
      size={size}
      className={`mt-4  ${gutter ? 'pagination-gutter' : ''} ${
        variant && `pagination-${variant}`
      } ${!bg && 'no-bg'} ${circle && 'pagination-circle'}`}
    >
      {items}
    </Pagination>
  );

  return (
    <>
      {loading || productDetailsLoading ? (
        <Loader />
      ) : error || errorProductLoading ? (
        <Message variant="danger">{error || errorProductLoading}</Message>
      ) : (
        <Fragment>
          <div className="d-flex justify-content-between my-4">
            <div className="d-flex w-50">
              <input
                className="form-control shadow-none rounded mx-2"
                placeholder="Search Products"
                onChange={(input) => updateValue(input.target.value)}
                value={inputValue}
                ref={searchref}
                autoFocus
              />
            </div>

            <div className="basic-dropdown">
              <Dropdown>
                <Dropdown.Toggle variant="secondary">
                  Add Product
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setHasVariant({ checked: false });
                      history.push('/ecom/addnewproduct');
                    }}
                  >
                    Add New Product
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => {
                      setHasVariant({ checked: true });
                      history.push('/ecom/addnewproduct');
                    }}
                  >
                    Add Product With Variants
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="row">
            {products.map((product) => (
              <Products
                key={product.key}
                product={product}
                setHasVariant={setHasVariant}
                history={history}
              />
            ))}
          </div>
          <Nav>{pag('', true, 'danger', true, false)}</Nav>
        </Fragment>
      )}
    </>
  );
};

export default ProductGrid;
