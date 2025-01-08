import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../Registration/FreelancerReg/FreelancerReg.css";
import "../Registration/Reg.css";
import AllOrders from "./OrderListCompo/AllOrders";
import { Route, Routes } from "react-router-dom";
import Orders from "./OrderListCompo/Order";

const OrderList = () => {
  const location = useLocation();
  const isOrderDetail = location.pathname.match(
    /^\/admin\/jobs\/([^/]+)\/([^/]+)$/
  );
  return (
    <>
      <main className="registration-container">
        {!isOrderDetail && (
          <div className="tabs">
            <div className="tab-titles">
              <Link
                to="/admin/jobs/pending"
                className={
                  location.pathname.includes("pending") ? "active" : ""
                }
              >
                <p>Pending</p> <p>|</p>
              </Link>
              <Link
                to="/admin/jobs/active"
                className={location.pathname.includes("active") ? "active" : ""}
              >
                <p>Active</p> <p>|</p>
              </Link>
              <Link
                to="/admin/jobs/ongoing"
                className={
                  location.pathname.includes("ongoing") ? "active" : ""
                }
              >
                <p>Ongoing</p> <p>|</p>
              </Link>
              <Link
                to="/admin/jobs/satisfied"
                className={
                  location.pathname.includes("satisfied") ? "active" : ""
                }
              >
                <p>Satisfied</p> <p>|</p>
              </Link>
              <Link
                to="/admin/jobs/completed"
                className={
                  location.pathname.includes("completed") ? "active" : ""
                }
              >
                <p>Completed</p>
              </Link>
            </div>
          </div>
        )}
        <Routes>
          <Route index element={<AllOrders />} />
          <Route path="pending" element={<AllOrders />} />
          <Route path="active" element={<AllOrders />} />
          <Route path="ongoing" element={<AllOrders />} />
          <Route path="satisfied" element={<AllOrders />} />
          <Route path="completed" element={<AllOrders />} />
          <Route
            path="pending/:orderid"
            element={<Orders type={"pending"} />}
          />
          <Route path="active/:orderid" element={<Orders type={"active"} />} />
          <Route
            path="ongoing/:orderid"
            element={<Orders type={"ongoing"} />}
          />
          <Route
            path="satisfied/:orderid"
            element={<Orders type={"satisfied"} />}
          />
          <Route
            path="completed/:orderid"
            element={<Orders type={"completed"} />}
          />
        </Routes>
      </main>
    </>
  );
};

export default OrderList;
