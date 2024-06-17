import React from "react";
import studylogo from "../../assets/Logo.svg";
import { FooterLinks } from "../../data/footer-links";
import  heartLogo from "../../assets/heart.png"
const Footer = ({size}) => {
  const footerData = [
    {
      heading: "Company",
      links: [
        { title: "About", link: "/about" },
        { title: "Carrers", link: "/carrers" },
        { title: "Affiliates", link: "/affiliates" },
      ],
    },

    {
      heading: "Resources",
      links: [
        { title: "Articles", link: "/about" },
        { title: "Blog", link: "/blog" },
        { title: "Chart Sheet", link: "/chartsheet" },
        { title: "Code Challanges", link: "/" },
        { title: "Docs", link: "/" },
        { title: "Projects", link: "/" },
        { title: "Videos", link: "/" },
        { title: "Workplaces", link: "/" },
      ],
    },
    {
      heading: "Plans",
      links: [
        { title: "Paid membership", link: "/" },
        { title: "For Students", link: "/" },
        { title: "Business Solutions", link: "/" },
      ],
    },
    {
      heading: "Community",
      links: [
        { title: "Fourms", link: "/" },
        { title: "Chapters", link: "/" },
        { title: "Events", link: "/" },
      ],
    },
    {
      heading: "Support",
      links: [{ title: "Help Center", link: "/" }],
    },
  ];
  return (
    <>
    <div className={` w-100vw  mt-16 mx-auto flex  h-fit bg-richblack-800 `}>
      {/* left */}
      <div className=" w-[50%]  h-[500px] border-r-[1px] border-richblack-700 ">
        <div className="lg:w-[90%]  flex-wrap lg:h-[70%]">
          <div>
            <img src={studylogo} className="w-[150px] h-[50px] " alt="" />
          </div>
          <div className="flex">
            {footerData.map((ele, idx) => {
              return (
                <div key={idx} className=" flex  flex-col ml-7  h-fit w-fit">
                  <h3 className="py-4 font-inter text-md font-bold text-richblack-50">
                    {ele.heading}
                  </h3>
                  <p className="">
                    {ele.links.map((element,idx) => {
                      return (
                        <a
                          className="flex flex-col py-1 text-richblack-300 hover:text-richblack-25"
                          href={element.link}
                          key={idx}
                        >
                          {element.title}
                        </a>
                      );
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="  w-[50%]  flex pt-7 justify-center pl-10">
        {FooterLinks.map((ele, idx) => {
          return (
            <div key={idx} className=" flex flex-col m-6">
              <h3 className="py-2 font-inter text-md font-bold text-richblack-50">
                {ele.title}
              </h3>
              <p className="w-fit">
                {ele.links.map((element,idx) => {
                  return (
                    <a
                      className="flex flex-col w-[140p] text-richblack-300 hover:text-richblack-25"
                      href={element.link}
                      key={idx}
                    >
                      {element.title}
                    </a>
                  );
                })}
              </p>
            </div>
          );
        })}
      </div>

    </div>
      <div className="flex justify-between w-11/12 mx-auto max-w-maxContent border-t-[1px] border-richblack-700 pt-7 pb-7">
      <div className="flex items-center text-richblack-300 ">
          <div className=" pl-5 border-r-[1px] border-richblack-700 px-3">Privacy Policy</div>
          <div className=" pl-5 border-r-[1px] border-richblack-700 px-3">Cookie Policy</div>
          <div className=" pl-5">Terms</div>
      </div>
      <div className="flex items-center text-richblack-300">
        Made With
        <img src={heartLogo} alt="heart logo" className="w-[30px] h-[30px]" />
        CodeHelp &copy; Studynoation
      </div>
      </div>
    </>
  );
};

export default Footer;
