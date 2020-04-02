import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useHistory } from "react-router-dom";

// init
import { companies, emptyOrder, orderStatus } from "../lib/init";

// api
import * as API from "../lib/api";

// components
import SelectCompany from "./SelectCompany";
import OrderList from "./OrderList";
import OrderRows from "./OrderRows";

interface OrderAdminProps {
  orderStatus: string[];
  products: Product[];
}

const OrderAdmin: React.FC<OrderAdminProps> = ({ orderStatus, products }) => {
  const [companyOrders, setCompanyOrders] = useState<Order[]>([emptyOrder]);

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
    };
    setOrdersAsync();
  }, [currentCompanyId]);

  console.log(companyOrders);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedCompanyId = parseInt(e.target.value);
    const selectedCompany = companies.find(
      company => company.id === selectedCompanyId
    );
    history.push(`/admin/${selectedCompany?.slug}`);
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

    const filteredOrders = companyOrders.filter(o => o !== order);
    const updatedOrders = filteredOrders
      .concat([order])
      .sort((x, y) => (x.created < y.created ? 1 : -1));

    setCompanyOrders(updatedOrders);
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
      <div className="row">
        <h1 className="m-4 text-secondary">Order admin</h1>
      </div>
      <div className="row">
        <div className="col col-12 col-lg-6 mb-4">
          <SelectCompany
            companies={companies}
            selected={currentCompanyId}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <OrderList
            orders={companyOrders}
            products={products}
            orderStatus={orderStatus}
            updateItem={updateItem}
          />
        </div>
      </div>
    </>
  );
};

export default OrderAdmin;
