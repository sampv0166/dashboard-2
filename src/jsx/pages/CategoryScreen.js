import React, { useLayoutEffect } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCategory, getCategory } from '../../actions/categoryActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const CategoryScreen = ({ history }) => {
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, categoryError, category } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { loading: loadingDelete, error: errorDelete } = categoryDelete;

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const deleteCategoryHandler = async (id) => {
    let formdata = new FormData();
    formdata.set('id', id);
    if (window.confirm('Are you sure')) {
      dispatch(deleteCategory(id, dispatch));
    }
  };

  return (
    <>
      {loading || loadingDelete ? (
        <Loader />
      ) : categoryError || errorDelete ? (
        <Message variant="danger">{categoryError}</Message>
      ) : (
        <div>
          <div className="d-flex justify-content-end">
            <Link to="/category/addcategory">
              <Button variant="secondary mb-2">Add New Category</Button>
            </Link>
          </div>

          <Card>
            <Card.Body>
              <Table responsive className="header-border ">
                <thead>
                  <tr>
                    <th> Id</th>
                    <th> Name</th>
                    <th> Image</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((item, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          history.push(`/category/addcategory/${item.id}`);
                        }}
                      >
                        {item.id}
                      </td>
                      <td
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          history.push(`/category/addcategory/${item.id}`);
                        }}
                      >
                        {item.name}
                      </td>
                      <td
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          history.push(`/category/addcategory/${item.id}`);
                        }}
                      >
                        <Card.Img
                          style={{
                            height: '80px',
                            width: '80px',
                            objectFit: 'contain',
                          }}
                          src={item.fullimageurl}
                          variant="top"
                        />
                      </td>

                      <td>
                        <div className="d-flex justify-content-around">
                          <i
                            className="fa fa-trash"
                            style={{
                              cursor: 'pointer',
                              color: 'red',
                            }}
                            onClick={() => deleteCategoryHandler(item.id)}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default CategoryScreen;
