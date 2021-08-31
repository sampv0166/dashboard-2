import React, { useLayoutEffect } from 'react';
import { Badge, Card, Dropdown, Nav, Pagination, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrders, updateOrderStatus } from '../../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrdersScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, page, pages } = orderList;

  const orderStatusUpdate = useSelector((state) => state.orderStatusUpdate);
  const { loading: loadingStatusUpdate, error: errorStatusUpdate } =
    orderStatusUpdate;

  let pageNumber = match.params.pageNumber || 1;
  let items = [];

  const paginationClicked = async (e, number) => {
    e.preventDefault();
    pageNumber = number;
    dispatch(listOrders(pageNumber));
    history.push(`/orders/page/${number}`);
  };

  useLayoutEffect(() => {
    dispatch(listOrders(pageNumber));
    console.log(orders);
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

  return (
    <>
      {loading || loadingStatusUpdate ? (
        <Loader />
      ) : error || errorStatusUpdate ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Nav>{pag('', true, 'danger', true, false)}</Nav>
          <Card>
            <Card.Header>
              <Card.Title></Card.Title>
            </Card.Header>
            <Card.Body>
              <Table size="sm" className="table-responsive-xl mb-0">
                <thead>
                  <tr>
                    <th> Order Id</th>
                    <th> User</th>
                    <th> Total Price</th>
                    <th> Date</th>
                    <th> Status</th>;
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item, index) => (
                    <tr key={index}>
                      <td
                        onClick={() => {
                          history.push(`/orders/orderdetails/${item.id}`);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {item.id}
                      </td>
                      <td
                        onClick={() => {
                          history.push(`/orders/orderdetails/${item.id}`);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {item.user.name}
                      </td>
                      <td
                        onClick={() => {
                          history.push(`/orders/orderdetails/${item.id}`);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {item.total_amount}
                      </td>
                      <td
                        onClick={() => {
                          history.push(`/orders/orderdetails/${item.id}`);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {item.created_at}
                      </td>
                      <td
                        onClick={() => {
                          history.push(`/orders/orderdetails/${item.id}`);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {item.payment_status === 0 ? (
                          <Badge variant="warning">pending</Badge>
                        ) : (
                          ''
                        )}

                        {item.payment_status === 1 ? (
                          <Badge variant="success">confirmed</Badge>
                        ) : (
                          ''
                        )}

                        {item.payment_status === 2 ? (
                          <Badge variant="primary">shipping</Badge>
                        ) : (
                          ''
                        )}

                        {item.payment_status === 3 ? (
                          <Badge variant="danger">rejected</Badge>
                        ) : (
                          ''
                        )}

                        {item.payment_status === 4 ? (
                          <Badge variant="secondary">delivered</Badge>
                        ) : (
                          ''
                        )}

                        {item.payment_status === 5 ? (
                          <Badge variant="danger">cancelled</Badge>
                        ) : (
                          ''
                        )}
                      </td>

                      <td>
                        <Dropdown
                          style={{
                            position: 'relative',

                            marginBottom: '10px',
                          }}
                        >
                          <div>
                            <Dropdown.Toggle
                              variant=""
                              className="table-dropdown icon-false"
                              style={{
                                position: 'relative',

                                marginBottom: '10px',
                              }}
                            >
                              <svg
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                version="1.1"
                              >
                                <g
                                  stroke="none"
                                  strokeWidth="1"
                                  fill="none"
                                  fillRule="evenodd"
                                >
                                  <rect
                                    x="0"
                                    y="0"
                                    width="24"
                                    height="24"
                                  ></rect>
                                  <circle
                                    fill="#000000"
                                    cx="5"
                                    cy="12"
                                    r="2"
                                  ></circle>
                                  <circle
                                    fill="#000000"
                                    cx="12"
                                    cy="12"
                                    r="2"
                                  ></circle>
                                  <circle
                                    fill="#000000"
                                    cx="19"
                                    cy="12"
                                    r="2"
                                  ></circle>
                                </g>
                              </svg>
                            </Dropdown.Toggle>
                          </div>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => {
                                let formdata = new FormData();
                                formdata.set('order_id', item.id);
                                formdata.set('status', 0);
                                dispatch(updateOrderStatus(dispatch, formdata));
                              }}
                            >
                              pending
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                let formdata = new FormData();
                                formdata.set('order_id', item.id);
                                formdata.set('status', 1);
                                dispatch(updateOrderStatus(dispatch, formdata));
                              }}
                            >
                              confirmed
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                let formdata = new FormData();
                                formdata.set('order_id', item.id);
                                formdata.set('status', 2);
                                dispatch(updateOrderStatus(dispatch, formdata));
                              }}
                            >
                              shipping
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                let formdata = new FormData();
                                formdata.set('order_id', item.id);
                                formdata.set('status', 3);
                                dispatch(updateOrderStatus(dispatch, formdata));
                              }}
                            >
                              Rejected
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                let formdata = new FormData();
                                formdata.set('order_id', item.id);
                                formdata.set('status', 4);
                                dispatch(updateOrderStatus(dispatch, formdata));
                              }}
                            >
                              delivered
                            </Dropdown.Item>
                            <div className="dropdown-divider"></div>
                            <Dropdown.Item
                              onClick={() => {
                                let formdata = new FormData();
                                formdata.set('order_id', item.id);
                                formdata.set('status', 5);
                                dispatch(updateOrderStatus(dispatch, formdata));
                              }}
                              className="text-danger"
                            >
                              cancel
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
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

export default OrdersScreen;
