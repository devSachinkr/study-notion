import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, json, matchPath, useNavigate } from "react-router-dom";
import studyLogo from "../../assets/Logo.svg";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropdown from "./core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiConnect";
import { categories } from "../../services/apis";
import { MdKeyboardArrowDown } from "react-icons/md";
import { getAllCategories } from "../../services/operations/authApi";
const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("/");
  const navigate = useNavigate();
  // api calling for categories section (catalog)
  // const fetchSubLinks=async()=>{
  //     try{
  //        const result=await apiConnector("GET",categories.CATEGORIES_API)
  //        console.log(result)
  //        setSubLinks(result.data.data)
  //     }catch(err){
  //       console.log(err.message)
  //     }
  //    }
  useEffect(() => {
    const apiCalling = async () => {
      setLoading(true);
      const result = await getAllCategories(token);
      if (result) {
        setSubLinks(result?.allCategory);
      }
      setLoading(false);
    };
    apiCalling();
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
  }
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="flex h-14 justify-center border-b-[1px] border-richblack-700 bg-richblack-900">
      <div className="w-11/12 mx-auto max-w-maxContent flex items-center justify-between ">
        <Link to="/">
          <img src={studyLogo} width={160} height={42} alt="main logo" />
        </Link>
        <nav className="text-richblack-25">
          <ul className="flex">
            {NavbarLinks.map((ele, idx) => {
              return ele.title === "Catalog" ? (
                <div
                  className="flex items-center mx-4 gap-1 group relative"
                  key={idx}
                >
                  <p className="text-[19px] font-[300]">{ele.title}</p>
                  <MdKeyboardArrowDown className=" text-[1.5rem]" />
                  <div className="invisible absolute left-[50%] translate-x-[-50%]  translate-y-[30%] top-0 flex flex-col rounded-md bg-richblack-900 p-4 text-richblack-5 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] z-10 shadow-lg shadow-blue-100 border-[1px] border-richblack-5 text-[1.1rem]">
                    <div className=" absolute  left-[50%] top-1 translate-y-[-50%] translate-x-[100%] h-6 w-6 rotate-45 rounde bg-richblack-900 border-t-[1px] border-l-[1px] border-richblack-5 z-0"></div>
                    {subLinks.length ? (
                      subLinks
                        ?.filter((subLink) => subLink?.course?.length > 0)
                        ?.map((subLink, idx) => (
                          <Link
                            className="py-2 border-b-[1px] px-5 border-richblack-5 border-opacity-10 shadow-inner shadow-blue-100  mt-2 transition-all duration-200 hover:rotate-12 hover:text-yellow-25"
                            key={idx}
                            to={`/catalog/${subLink?.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                          >
                            <p>{subLink?.name}</p>
                          </Link>
                        ))
                    ) : (
                      <div>No Category Found</div>
                    )}
                  </div>
                </div>
              ) : (
                <li key={idx}>
                  <Link
                    to={ele?.path}
                    className={` ${
                      matchRoute(ele?.path)
                        ? "text-yellow-25"
                        : "text-rickblack-25"
                    } mx-4 text-[19px] font-[300]`}
                  >
                    {ele?.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Login Sign up */}

        <div className="flex items-center  text-richblack-25">
          {token && (
            <div className=" cursor-pointer">
              <img
                onClick={() => navigate("/dashboard/my-profile")}
                src={user?.image}
                width={40}
                height={40}
                alt="user logo"
                className="rounded-full aspect-square"
              />
            </div>
          )}
          {user && user.accountType !== "Instructor" && (
            <>
              <Link
                to={"/dashboard/cart"}
                className="relative  h-[6vh] flex items-center"
              >
                <AiOutlineShoppingCart className=" mx-3  text-[1.8rem] " />
                {totalItems > 0 && (
                  <span className=" absolute right-0 top-0 bg-green-5 w-[16px] h-[16px] rounded-full flex items-center justify-center p-[9px]">
                    {totalItems}
                  </span>
                )}
              </Link>
            </>
          )}
          {token === null && (
            <Link to="/login">
              <button className=" mx-3 flex items-center text-[1.2rem]  bg-transparent px-3 py-3 border-[1px] border-richblack-600 h-[40px] rounded-md bg-richblack-700">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className=" mx-3 flex items-center text-[1.2rem]  bg-transparent px-3 py-3 border-[1px] border-richblack-600 h-[40px] rounded-md bg-richblack-700">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
