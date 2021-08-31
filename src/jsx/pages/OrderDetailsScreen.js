import React, { useEffect, useLayoutEffect, useState } from "react";
import { Badge, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderDetailsScreen = ({ match, history }) => {
  const [order, setOrder] = useState(null);

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const orderId = match.params.id;

  useLayoutEffect(() => {
    orders.map((order) => {
      if (order.id == orderId) {
        setOrder(order);
      }
    });

  }, [orderId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {order && (
            <Row>
              <Col md={8}>
                <Card border="light" className="bg-white shadow-sm">
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <h2>
                          {" "}
                          {order.payment_status === 0 ? (
                            <Badge variant="warning">pending</Badge>
                          ) : (
                            ""
                          )}
                          {order.payment_status === 1 ? (
                            <Badge variant="success">confirmed</Badge>
                          ) : (
                            ""
                          )}
                          {order.payment_status === 2 ? (
                            <Badge variant="primary">shipping</Badge>
                          ) : (
                            ""
                          )}
                          {order.payment_status === 3 ? (
                            <Badge variant="danger">rejected</Badge>
                          ) : (
                            ""
                          )}
                          {order.payment_status === 4 ? (
                            <Badge variant="secondary">delivered</Badge>
                          ) : (
                            ""
                          )}
                          {order.payment_status === 5 ? (
                            <Badge variant="danger">cancelled</Badge>
                          ) : (
                            ""
                          )}
                        </h2>
                        <p>
                          <strong>Name: </strong> {order.user.name}
                        </p>
                        <p>
                          <strong>Email: </strong>
                          {order.user.email}
                        </p>
                        <p>
                          <strong>Address: </strong>
                          {order.address}
                        </p>
                        <p>
                          <strong>Phone: </strong>
                          {order.phone}
                        </p>
                        <p>
                          <strong>Whatsapp: </strong>
                          {order.haswhatsapp === true ? "Yes" : "No"}
                        </p>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <h2>Order Items</h2>

                        <ListGroup variant="flush">
                          {order.products.map((item, index) => (
                            <ListGroup.Item key={index}>
                              <Row>
                                {/*<Col md={1}>
                                  <Image
                                    src={item.image}
                                    alt={item.name_en}
                                    fluid
                                    rounded
                                  />
                          </Col>*/}
                                <Col>
                                  <Link to={`/product/${item.product_id}`}>
                                    {item.name_en}
                                  </Link>
                                </Col>
                                <Col md={4}>
                                  {item.quantity} x ${item.product_price} = $
                                  {item.quantity * item.product_price}
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col>{order.products.length}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${order.delivery_charge}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>${order.tax}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>${order.total_amount}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      )}
    </>
  );
};

export default OrderDetailsScreen;
