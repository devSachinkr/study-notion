import React from "react";
import { useSelector } from "react-redux";
import CartCourses from "./CartCourses";
import CartPrice from "./CartPrice.jsx";
import Sidebar from "../../dashboard/Sidebar.jsx";
import { MdRemoveShoppingCart } from "react-icons/md";
const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="text-white flex">
      <Sidebar />
      <div className="p-5">
        <div>
          Home / Dashboard / <span className="text-yellow-50">My WishList</span>
        </div>
        <div className="text-[2rem]">My Wish List</div>
        <p className="mt-2 text-richblack-400 font-bold">
          {totalItems} Courses in Wishlist{" "}
        </p>
        <div className="border-t-[1px] border-richblack-700 w-[70vw] mt-5">
          {total > 0 ? (
            <div className="flex">
              <div>
                <CartCourses />
              </div>
              <div>
                <div>
                  <CartPrice />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-[75vw] h-[40vh] flex flex-col items-center justify-center text-[2rem] text-yellow-50">
              <div>
              No Items in Cart
              </div>
              <div><MdRemoveShoppingCart className="text-[5rem]"/></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
