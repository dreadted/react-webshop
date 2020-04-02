import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useHistory } from "react-router-dom";

// init
import { companies, emptyOrder } from "../lib/init";

// api
import * as API from "../lib/api";

// components
import SelectCompany from "./SelectCompany";

interface OrderAdminProps {
  orderStatus: string[];
}

const OrderAdmin: React.FC<OrderAdminProps> = () => {
  const [companyOrders, setcompanyOrders] = useState<Order[]>([emptyOrder]);

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
      setcompanyOrders(orders);
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

  return (
    <>
      <div className="row">
        <h1 className="m-4 text-secondary">Order admin</h1>
      </div>
      <div className="row">
        <div className="col col-12 col-lg-6 mx-2 mb-4">
          <SelectCompany
            companies={companies}
            selected={currentCompanyId}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default OrderAdmin;
