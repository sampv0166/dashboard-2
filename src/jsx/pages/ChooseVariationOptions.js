import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import VariationOptions from './VariationOptions';

const ChooseVariationOptions = ({
  showOptions,
  setShowOptions,
  setShow,
  hasColor,
  setHasColor,
  hasSize,
  setHasSize,
}) => {
  return (
    <div>
      <div className="row g-3 mx-1 my-5">
        <div className="col">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={hasColor.checked}
              onChange={(d) => {
                hasColor.checked === true ? (d = false) : (d = true);
                setHasColor({ checked: d });
              }}
            />
            <label class="form-check-label" >
              Color variant
            </label>
          </div>
        </div>

        <div className="col">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={hasSize.checked}
              onChange={(d) => {
                hasSize.checked === true ? (d = false) : (d = true);
                setHasSize({ checked: d });
              }}
            />
            <label class="form-check-label" >
              Size variant
            </label>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary "
        onClick={() => {
          setShow(true);
          setShowOptions(false);
        }}
      >
        Ok
      </button>
    </div>
  );
};

export default ChooseVariationOptions;
