import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

// css
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// api
import * as API from "../../lib/api";

// context
import { OrderContext } from "../contexts/OrderContext";

// components
import SelectCompany from "../common/SelectCompany";
import OrderList from "./OrderList";
import Loading from "../common/Loading";

const OrderAdmin: React.FC = () => {
  const { companies } = useContext(OrderContext);
  const [companyOrders, setCompanyOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { slug } = useParams();
  const history = useHistory();

  const currentCompany: Company | undefined = companies.find(
    company => company.slug === slug?.toLowerCase()
  );

  const currentCompanyId = currentCompany ? currentCompany.id : 0;

  useEffect(() => {
    const setOrdersAsync = async () => {
      const orders: Order[] = await API.get<Order>(
        `orders?companyId=${currentCompanyId}`
      );
      orders.sort((x, y) => (x.created < y.created ? 1 : -1));
      setCompanyOrders(orders);
      setLoading(false);
    };
    if (currentCompanyId) setOrdersAsync();
    else setLoading(false);
  }, [currentCompanyId]);

  const changeCompany = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCompanyId = parseInt(e.target.value);
    const selectedCompany = companies.find(
      company => company.id === selectedCompanyId
    );
    const _slug = selectedCompany ? selectedCompany.slug : "";
    history.push(`/admin/${_slug}`);
  };

  const changeOrderStatus = (status: number, order: Order) => {
    order.status = status;

    const filteredOrders = companyOrders.filter(o => o !== order);
    const updatedOrders = filteredOrders
      .concat([order])
      .sort((x, y) => (x.created < y.created ? 1 : -1));
    setCompanyOrders(updatedOrders);
  };

  const updateItem: UpdateItem = ({ items, item, order, quantity }) => {
    if (!items || !item || !order) return;
    if (quantity) {
      item.quantity = quantity;
    } else {
      items = items.filter(i => i !== item);
    }
    order.totalPrice = getTotalPrice(items);
    order.orderRows = toOrderRows(items, order.id);

    updateOrder(order);
  };

  const saveOrder: (order: Order) => Promise<Order> = async (order: Order) => {
    const response = await API.save<Order>(order, "orders", order.id);
    console.log("save order:", JSON.stringify(order));
    console.log("response:", response);
    return response;
  };

  const updateOrder = (order: Order) => {
    const filteredOrders = companyOrders.filter(o => o !== order);
    const updatedOrders = filteredOrders
      .concat([order])
      .sort((x, y) => (x.created < y.created ? 1 : -1));

    setCompanyOrders(updatedOrders);
  };

  const deleteOrder: (order: Order) => Promise<Order> = async (
    order: Order
  ) => {
    if (order.id) {
      const response = await API.del("orders", order.id);
      console.log("delete order:", JSON.stringify(order));
      console.log("response:", response);
      if (response && response.status && response.status === 200) {
        const filteredOrders = companyOrders
          .filter(o => o !== order)
          .sort((x, y) => (x.created < y.created ? 1 : -1));
        setCompanyOrders(filteredOrders);
      }
      return response;
    }
  };

  const getTotalPrice = (items: CartItem[]) => {
    let result = 0;
    items.map(item => (result += item.product.price * item.quantity));
    return result;
  };

  const toOrderRows = (items: CartItem[], orderId: number | undefined) => {
    return items.map(item => ({
      productId: item.product.id,
      orderId,
      amount: item.quantity
    })) as OrderRow[];
  };

  return (
    <>
      <Row>
        <Col>
          <h1 className="pt-4 text-secondary">Order admin</h1>
        </Col>
        <Col xs={12} sm={6} className="my-2">
          <SelectCompany selected={currentCompanyId} onChange={changeCompany} />
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <Loading />
          ) : (
            <OrderList
              orders={companyOrders}
              changeStatus={changeOrderStatus}
              updateItem={updateItem}
              saveOrder={saveOrder}
              deleteOrder={deleteOrder}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default OrderAdmin;
