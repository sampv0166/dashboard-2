import React, { useEffect, useLayoutEffect, useState } from "react";
import Wizard from "../components/Forms/Wizard/Wizard";
import { Alert, Card, Row, Tab, Tabs } from "react-bootstrap";
import TextField from "../components/TextField";
import { Form, Formik } from "formik";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import {
  createSingleVariation,
  deleteVariationImage,
  insertSingleVariationImage,
  updateVariation,
} from "../../actions/variationActions";
import { listProductDetails } from "../../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const VariationOptions = ({
  setShow,
  setShowOptions,
  hasColor,
  setHasColor,
  hasSize,
  setHasSize,
  setProductVariationList,
  productId,
  varId,
  variations,
}) => {
  const [color, setColor] = useState("FAF5F5");
  const [hasOffer, sethasOffer] = useState({ checked: false });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [productVariations, setProductVariations] = useState([]);

  const [formikFileArray, setFormikFileArray] = useState([]);
  const [deleteimageurl, setDeletedimageurl] = useState([]);

  const productDetails = useSelector((state) => state.productDetails);
  const {
    product,
    loading: loadingproductDetails,
    error: errorproductDetails,
    success: successproductDetails,
  } = productDetails;

  const variationUpdate = useSelector((state) => state.variationUpdate);
  const { loading: loadingVariationUpdate, error: errorVariationUpdate } =
    variationUpdate;

  const dispatch = useDispatch();

  const handleVariationImageChange = async (e, formik) => {
    if (varId) {
      if (e.target.files) {
        const filesArray = Array.from(e.target.files).map((file) =>
          URL.createObjectURL(file)
        );

        setSelectedFiles((prevImages) => prevImages.concat(filesArray));

        Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
      }

      const files = Array.from(e.target.files).map((file) => file);

      Array.from(e.target.files).forEach((file) => {
        formikFileArray.push(file);
      });

      formik.setFieldValue("images", formikFileArray);
    } else {
      if (e.target.files) {
        const filesArray = Array.from(e.target.files).map((file) =>
          URL.createObjectURL(file)
        );

        setSelectedFiles((prevImages) => prevImages.concat(filesArray));

        Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
      }

      const files = Array.from(e.target.files).map((file) => file);

      Array.from(e.target.files).forEach((file) => {
        formikFileArray.push(file);
      });

      formik.setFieldValue("images", formikFileArray);
    }
  };

  const renderPhotos = (source, formik) => {
    return source.map((photo, index) => {
      return photo !== "https://khaymatapi.mvp-apps.ae/storage/" ? (
        <div className="col w-100">
          <Card
            className="my-2 p-1 rounded"
            style={{ height: "180px", objectFit: "contain" }}
          >
            <Card.Img
              style={{ height: "170px", objectFit: "contain" }}
              src={photo}
              variant="top"
              key={photo}
            />
            <button
              onClick={(e) =>
                handleRemoveVariationImage(
                  e,
                  source[index],
                  index,
                  source,
                  formikFileArray,
                  formik
                )
              }
              type="button px-1"
              className="btn btn-white text-danger rounded fs-3"
              style={{ position: "absolute" }}
            >
              <i className="bx bx-trash"></i>
            </button>
          </Card>
        </div>
      ) : (
        ""
      );
    });
  };

  const handleRemoveVariationImage = (
    e,
    fileToRemove,
    index,
    source,
    formikFileArray,
    formik
  ) => {
    e.preventDefault();

    if (selectedFiles.length === 1) {
      alert("atleast one image required");
      return;
    }

    source = source.filter((fileName) => fileName !== fileToRemove);
    formikFileArray.filter((fileName) => fileName !== fileToRemove);

    if (varId) {
      var url = `khaymatapi.mvp-apps.ae/storage/`;
      var result = fileToRemove.toString();
      result = result.replace(url.toString(), "");
      result = result.replace("://www.", "");
      result = result.replace("https://", "");
      deleteimageurl.push(result);
      console.log(deleteimageurl);
      //dispatch(deleteVariationImage(result, varId, productId));
    }

    setSelectedFiles(source);
    const files = Array.from(formikFileArray).filter((file, i) => index !== i);
    formik.setFieldValue("images", files);
    setFormikFileArray(files);
    console.log(formikFileArray);
  };

  const addToVariationList = (formik) => {
    formik.setFieldValue("blobImage", selectedFiles);
    setProductVariationList((prev) => [...prev, formik.values]);
    formik.setFieldValue("price", "");
    formik.setFieldValue("offerprice", "");
    formik.setFieldValue("stocks", "");
    formik.setFieldValue("color_name", "");
    formik.setFieldValue("color_value", "");
    formik.setFieldValue("hasoffer", "");
    formik.setFieldValue("size_value", "");
    setFormikFileArray([]);
    setSelectedFiles([]);
    formik.setFieldValue("images", []);
  };

  const handleSaveVariation = (formik) => {
    if (
      formikFileArray.length === 0 ||
      formik.values.price === "" ||
      formik.values.stocks === "" ||
      (formik.values.color_name !== "" && formik.values.color_value === "") ||
      (hasColor.checked === true && formik.values.color_name === "") ||
      (hasSize.checked === true && formik.values.size_value === "") ||
      (hasOffer.checked === true && formik.values.offerprice === "")
    ) {
      setShowAlert(true);
      setTimeout(() => {
        // ***
        setShowAlert(false); // *** If you want to clear the error message as well
      }, 5000);
    } else {
      if (productId) {
        let formdata = new FormData();
        formdata.append("product_id", productId);

        if (varId) {
          console.log(formikFileArray);
          for (var i = 0; i < formikFileArray.length; i++) {
            if (typeof formikFileArray[i] === "string") {
            } else {
              formdata.append(`images[${i}]`, formikFileArray[i]);
            }
          }
          formdata.append("id", varId);
        } else {
          if (typeof formik.values.images === "string") {
            formdata.delete("images");
          } else {
            for (var i = 0; i < formik.values.images.length; i++) {
              formdata.append(`images[${i}]`, formik.values.images[i]);
            }
          }
        }

        formdata.append("price", formik.values.price);
        formdata.append("offerprice", formik.values.offerprice);
        formdata.append("stocks", formik.values.stocks);
        formdata.append("color_name", formik.values.color_name);
        formdata.append("color_value", formik.values.color_value);
        formdata.append("size_value", formik.values.size_value);
        formik.values.hasoffer === true
          ? formdata.append("hasoffer", 1)
          : formdata.append("hasoffer", 0);

        if (varId) {
          dispatch(
            updateVariation(
              dispatch,
              formdata,
              productId,
              deleteimageurl,
              varId
            )
          );
          setDeletedimageurl([]);
          dispatch(listProductDetails(productId));

          setProductVariationList(product[0].variations);
        } else {
          dispatch(createSingleVariation(dispatch, formdata, productId));
          dispatch(listProductDetails(productId));
        }
      } else {
        addToVariationList(formik);
      }

      setShow(false);
      setShowAlert(false);
      setColor("");
    }
  };

  useLayoutEffect(() => {
    variations.map((variation) => {
      if (variation.id == varId) {
        setSelectedFiles(variation.images);
        setFormikFileArray(variation.images);
        if (variation.hasoffer === true) {
          sethasOffer({ checked: true });
        } else {
          sethasOffer({ checked: false });
        }
        setProductVariations(variation);

        setColor(variation.color_value);
      } else if (varId === 0) {
        setSelectedFiles([]);
        setProductVariations([]);
      }
    });
  }, [varId, variations]);

  return (
    <>
      {loadingVariationUpdate || loadingproductDetails ? (
        <Loader />
      ) : errorVariationUpdate || errorproductDetails ? (
        <Message />
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            images: [],
            price: productVariations.price || "",
            offerprice: productVariations.offerprice || 0,
            stocks: productVariations.stocks || "",
            color_name: productVariations.color_name || "",
            color_value: productVariations.color_value || "",
            hasoffer: productVariations.hasoffer || "",
            size_value: productVariations.size_value || "",
          }}
          onSubmit={(values, { resetForm }) => {}}
        >
          {(formik) => (
            <Form>
              <div>
                <div>
                  {console.log(formik.values)}
                  <div className="row g-3">
                    <div className="my-4">
                      <label
                        style={{ cursor: "pointer" }}
                        className="text-nowrap border shadow py-3 px-4 bg-white text-success add-photo rounded w-100"
                        htmlFor="file"
                      >
                        <i className="bx bx-image-add my-5 mx-4"> </i>
                      </label>
                    </div>
                    <div className="col">
                      <input
                        name="images"
                        type="file"
                        id="file"
                        multiple
                        onChange={(e) => handleVariationImageChange(e, formik)}
                      />
                      <div className="result">
                        <Row>{renderPhotos(selectedFiles, formik)}</Row>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <TextField
                        className="form-control shadow-none rounded"
                        label="Price"
                        name="price"
                        type="number"
                      />
                    </div>
                    <div className="col-md-6">
                      <TextField label="Stock" name="stocks" type="number" />
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckDefault"
                          checked={hasOffer.checked}
                          onChange={(d) => {
                            hasOffer.checked === true
                              ? (d = false)
                              : (d = true);
                            sethasOffer({ checked: d });
                            formik.setFieldValue("hasoffer", d);
                          }}
                        />

                        <label class="form-check-label">Has Offer</label>
                      </div>
                    </div>
                    {hasOffer.checked ? (
                      <div className="col-md-6">
                        <TextField
                          label="Offer Price"
                          name="offerprice"
                          type="number"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="row g-3 mx-1">
                  {hasColor.checked ? (
                    <div className="col-md-6">
                      <TextField
                        label="Color Name"
                        name="color_name"
                        type="text"
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {hasSize.checked ? (
                    <div className="col-md-6">
                      <TextField label="Size" name="size_value" type="text" />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {hasColor.checked ? (
                  <div className="row g-3 mx-1">
                    <div className="col-md-6">
                      <SketchPicker
                        color={color}
                        onChange={(updatedColor) => {
                          setColor(updatedColor.hex);
                          formik.setFieldValue("color_value", updatedColor.hex);
                        }}
                        width="300px"
                        height="50px"
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        className={`form-control shadow-none rounded`}
                        style={{ backgroundColor: `${color}` }}
                      ></input>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="d-flex justify-content-end my-5">
                <div>
                  <button
                    className="text-nowrap btn btn-outline-success mx-2 rounded p-3 my-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSaveVariation(formik);
                    }}
                  >
                    Save Varaition
                  </button>
                </div>
              </div>
              {showAlert ? (
                selectedFiles.length === 0 ? (
                  <Alert variant="danger">image required</Alert>
                ) : formik.values.price === "" ? (
                  <Alert variant="danger">price required</Alert>
                ) : formik.values.stocks === "" ? (
                  <Alert variant="danger">stock is required</Alert>
                ) : formik.values.color_name !== "" &&
                  formik.values.color_value === "" ? (
                  <Alert variant="danger">select a color</Alert>
                ) : hasColor.checked === true &&
                  formik.values.color_name === "" ? (
                  <Alert variant="danger">color is required</Alert>
                ) : hasSize.checked === true &&
                  formik.values.size_value === "" ? (
                  <Alert variant="danger">size is required</Alert>
                ) : hasOffer.checked === true &&
                  formik.values.offerprice === "" ? (
                  <Alert variant="danger">offer price required</Alert>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default VariationOptions;
