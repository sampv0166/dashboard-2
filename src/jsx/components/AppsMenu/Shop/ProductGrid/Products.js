import React from 'react';
import { Link } from 'react-router-dom';

const Products = ({ product, setHasVariant, history }) => {
  return (
    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
      <div className="card">
        <div className="card-body">
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (
                product.variations.length === 1 &&
                product.variations[0].color_name === null &&
                product.variations[0].size_value === null
              ) {
                setHasVariant({ checked: false });
              } else {
                setHasVariant({ checked: true });
              }
              
              history.push(`/ecom/product-edit/${product.id}`);
            }}
            className="new-arrival-product"
          >
            <div
              className="new-arrivals-img-contnent"
              style={{ height: '200px', objectFit: 'contain' }}
            >
              <img
                className="img-fluid"
                src={
                  product.variations.length > 0 &&
                  product.variations[0].images[0]
                }
                alt=""
                style={{ height: '200px', objectFit: 'contain' }}
              />
            </div>

            <div className="new-arrival-content text-center mt-3">
              <h4>{product.name_en}</h4>
              {product.deleted_at === null ? '' : <h4 className = 'text-danger' >DELETED</h4>}

              {/*rating*/}

              {/* <span className="">AED {price}</span>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
