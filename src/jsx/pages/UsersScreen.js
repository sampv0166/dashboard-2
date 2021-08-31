import React from 'react';
import { useLayoutEffect } from 'react';
import { Button, Card, Nav, Pagination, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, listUsers } from '../../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UsersScreen = ({ history, match }) => {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users, pages, page } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingDelete, error: errorDelete } = userDelete;

  let pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  let items = [];

  const paginationClicked = async (e, number) => {
    e.preventDefault();
    pageNumber = number;
    dispatch(listUsers(pageNumber));
    history.push(`/usersList/page/${number}`);
  };

  useLayoutEffect(() => {
    dispatch(listUsers(pageNumber));
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
      className={`mt-4 mb-2 ${gutter ? 'pagination-gutter' : ''} ${
        variant && `pagination-${variant}`
      } ${!bg && 'no-bg'} ${circle && 'pagination-circle'}`}
    >
      {items}
    </Pagination>
  );

  const deleteUserHandler = async (id) => {
    let formdata = new FormData();
    formdata.set('id', id);
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(formdata));
    }
  };

  return (
    <>
      {loading || loadingDelete ? (
        <Loader />
      ) : error || errorDelete ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {' '}
          <div className="d-flex justify-content-end">
            <Link to="/user/addnewuser">
              <Button variant="secondary mb-2">Add New User</Button>
            </Link>
          </div>
          <Card>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <strong>ID</strong>
                    </th>
                    <th>
                      <strong>NAME</strong>
                    </th>
                    <th>
                      <strong>Email</strong>
                    </th>
                    <th>
                      <strong>Type</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item, index) => (
                    <tr>
                      <td>
                        <strong>542</strong>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.photo}
                            className="rounded-lg mr-2"
                            width="24"
                            alt=""
                          />{' '}
                          <span className="w-space-no">{item.name} </span>
                        </div>
                      </td>
                      <td>{item.email} </td>
                      <td>{item.typeofuser}</td>

                      <td>
                        <div className="d-flex">
                          <Link
                            to={`/users/edit/${item.id}`}
                            className="btn btn-primary shadow btn-xs sharp mr-1"
                          >
                            <i className="fa fa-pencil"></i>
                          </Link>
                          <Link
                            to={`/usersList/page/${pageNumber}`}
                            className="btn btn-danger shadow btn-xs sharp"
                          >
                            <i
                              className="fa fa-trash"
                              onClick={() => {
                                deleteUserHandler(item.id);
                              }}
                            ></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Nav>{pag('', true, 'danger', true, false)}</Nav>
        </div>
      )}
    </>
  );
};

export default UsersScreen;
