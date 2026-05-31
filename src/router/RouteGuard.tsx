// import { message } from "antd";
// import { useEffect } from "react";
// import { matchRoutes, useLocation, useNavigate } from "react-router";
// import { routeConfigs } from "./CustomizeRoute";

// const RouteGuard= ({children, auth}: any) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const loginState = localStorage.getItem("loginInfo");
//   const matchs = matchRoutes(routeConfigs, location);
//   const isExist = matchs?.some((item) => item.pathname === location.pathname);

//   useEffect(() => {
//     if(!loginState && auth){
//       message.error("time out");
//       navigate("/login");
//     }

//     if(loginState && isExist && loginState === 'admin'){
//       if(location.pathname === '/' || location.pathname == '/login'){
//         navigate("/login");
//       } else {
//         navigate(location.pathname);
//       } 
//     }else {
//         navigate("/login");
//     }
//   },[loginState, location.pathname]);

//   return children;
// };
// export default RouteGuard;