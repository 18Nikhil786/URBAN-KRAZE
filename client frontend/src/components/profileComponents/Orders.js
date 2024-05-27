// Importing necessary modules and components
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

// Functional component definition for displaying user orders
const Orders = (props) => {
  // Destructuring props to get loading, error, and orders
  const { loading, error, orders } = props;

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      {loading ? (
        // If loading, display a loading spinner
        <Loading />
      ) : error ? (
        // If there is an error, display an error message
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {/* Display orders if there are any */}
          {orders.length === 0 ? (
            // If no orders, display a message to start shopping
            <div className="col-12 alert alert-info text-center mt-3">
              No Orders
              <Link
                className="btn btn-success mx-2 px-3 py-2"
                to="/"
                style={{
                  fontSize: "12px",
                }}
              >
                START SHOPPING
              </Link>
            </div>
          ) : (
            // If there are orders, display a table with order details
            <div className="table-responsive">
              <table className="table">
                <thead>
                  {/* Table header with columns: ID, STATUS, DATE, TOTAL */}
                  <tr>
                    <th>ID</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through orders and display each order in a table row */}
                  {orders.map((order) => (
                    <tr
                      className={`${
                        order.isPaid ? "alert-success" : "alert-danger"
                      }`}
                      key={order._id}
                    >
                      {/* Display order ID as a link to the order details page */}
                      <td>
                        <a href={`/order/${order._id}`} className="link">
                          {order._id}
                        </a>
                      </td>
                      {/* Display order payment status */}
                      <td>{order.isPaid ? <>Paid</> : <>Not Paid</>}</td>
                      {/* Display order date using moment.js for formatting */}
                      <td>
                        {order.isPaid
                          ? moment(order.paidAt).calendar()
                          : moment(order.createdAt).calendar()}
                      </td>
                      {/* Display order total price */}
                      <td>&#8377;{order.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Export the Orders component
export default Orders;
