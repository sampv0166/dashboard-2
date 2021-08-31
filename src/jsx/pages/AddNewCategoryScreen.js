import React from 'react';
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCategory,
  getCategory,
  listCategoryDetails,
} from '../../actions/categoryActions';
import * as Yup from 'yup';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { ErrorMessage, Form, Formik } from 'formik';
import { Card, Col } from 'react-bootstrap';
import TextField from '../components/TextField';

const AddNewCategoryScreen = ({ match, history }) => {
  const [categoryImage, setCategoryImage] = useState([]);
  const [active, setActive] = useState({ checked: false });
  const categoryId = match.params.id;

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { loading, error, categoryDetails: category } = categoryDetails;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading: loadingcreate, error: errorcreate } = categoryCreate;

  const dispatch = useDispatch();

  const handleImageChange = (e, formik) => {
    if (e.target.files) {
      const U = URL.createObjectURL(e.target.files[0]);
      setCategoryImage(U);
      URL.revokeObjectURL(e.target.files);
    }

    formik.setFieldValue('image', e.currentTarget.files[0]);
  };

  useEffect(() => {
    if (category) {
      setCategoryImage(category.fullimageurl);
      if (category.active === true) {
        setActive({ checked: true });
      } else {
        setActive({ checked: false });
      }
    }
  }, [category]);

  useLayoutEffect(() => {
    dispatch(listCategoryDetails(categoryId));
  }, [dispatch, categoryId]);

  const validate = Yup.object({
    name_en: Yup.string()
      .min(1, 'Name must be atleast one character')
      .required('Required'),
    name_ar: Yup.string()
      .min(1, 'Name must be atleast one character')
      .required('Required'),
    image:
      Yup.mixed().required('required') || Yup.string().required('required'),
  });

  const handleSubmit = async (formdata) => {
    dispatch(createCategory(dispatch, formdata));

    dispatch(getCategory());

    history.push('/category');
  };

  return (
    <>
      {loading || loadingcreate ? (
        <Loader />
      ) : error || errorcreate ? (
        <Message variant="danger">{error || errorcreate}</Message>
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            name_en: (category && category.name_en) || '',
            name_ar: (category && category.name_ar) || '',
            isactive: (category && category.active) || '',
            image: (category && category.fullimageurl) || '',
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            let formdata = new FormData();

            if (categoryId) {
              formdata.append('id', categoryId);
            }

            formdata.append('name_en', values.name_en);
            formdata.append('name_ar', values.name_ar);

            if (values.isactive === true) {
              formdata.append('active', 1);
            } else {
              formdata.append('active', 0);
            }

            if (typeof values.image === 'string') {
              formdata.delete('image');
            } else {
              formdata.append('image', values.image);
            }

            handleSubmit(formdata);
          }}
        >
          {(formik) => (
            <div className="row">
              <div className="col-md-6">
                {categoryId ? (
                  <div>
                    <Card
                      className="my-2 p-1 rounded"
                      style={{ height: '280px', objectFit: 'cover' }}
                    >
                      <Card.Img
                        style={{ height: '270px', objectFit: 'contain' }}
                        src={categoryImage}
                        variant="top"
                      />
                    </Card>

                    <div className="d-flex my-2 ">
                      <label className="custom-file-upload w-100">
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, formik)}
                          name="image"
                        />
                        <ErrorMessage
                          component="div"
                          className="error text-danger"
                          name={'image'}
                        />
                        <i className="bx bx-cloud-upload mx-2"></i>Upload New
                        Image
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Card
                      className="my-2 p-1 rounded"
                      style={{ height: '280px', objectFit: 'cover' }}
                    >
                      <Card.Img
                        style={{ height: '270px', objectFit: 'contain' }}
                        src={categoryImage}
                        variant="top"
                      />
                    </Card>

                    <div className="d-flex my-2 ">
                      <label className="custom-file-upload w-100">
                        <input
                          type="file"
                          onChange={(e) => handleImageChange(e, formik)}
                          name="image"
                        />
                        <ErrorMessage
                          component="div"
                          className="error text-danger"
                          name={'image'}
                        />
                        <i className="bx bx-cloud-upload mx-2"></i>Upload New
                        Image
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <Form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <TextField
                        label="English Name"
                        name="name_en"
                        type="text"
                      />
                    </div>
                    <div className="col-md-6">
                      <TextField
                        label="Arabic Name"
                        name="name_ar"
                        type="text"
                      />
                    </div>
                  </div>

                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      checked={active.checked}
                      onChange={(d) => {
                        active.checked === true ? (d = false) : (d = true);
                        setActive({ checked: d });
                        formik.setFieldValue('isactive', d);
                      }}
                    />
                    {console.log(active)}
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDefault"
                    >
                      Active Status
                    </label>
                  </div>
                  <button className="btn btn-success mt-3 my-2" type="submit">
                    Save
                  </button>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddNewCategoryScreen;
