import React, { useState } from "react";

const StepOne = () => {
   
  const [hasColor, setHasColor] = useState({ checked: false });
  const [hasSize, setHasSize] = useState({ checked: false });

  return (
    <div>
      <h3>Choose Variation Options</h3>
      <div className="row g-3 mx-1 my-5">
        <div className="col">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={hasColor.checked}
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
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
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
              Size variant
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
