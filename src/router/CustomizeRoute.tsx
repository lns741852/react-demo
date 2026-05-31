// import { lazy, type ReactNode } from "react";
// import { Outlet, Route, Routes } from "react-router";


// import RouteGuard from "./RouteGuard";
// import Login from "../pages/login/login";
// import TestPage from "../pages/testPage";

// const ModalAndFormPage = lazy(() => import("../pages/modalAndForm/ModalAndFormPage"));

// interface RouteConifg {
//   path: string;
//   element: ReactNode;
//   auth: boolean;
//   children?: RouteConifg[];
//   redirect?: string;
// }

// export const routeConfigs: RouteConifg[] = [
//   { path: "/login", element: <Login />, auth: false },
//   {
//     path: "/",
//     element: <Outlet />,
//     auth: true,
//     children: [
//       { path: "/home", element: <ModalAndFormPage />, auth: true },
//       { path: "/test", element: <TestPage />, auth: false }
//     ]
//   }
// ];

// export const CustomizeRoute = () => {
//   const createRoutes = (routers: RouteConifg[]): ReactNode => {
//     return routers.map(({ path, element, auth, children }) => (
//       <Route
//         path={path}
//         element={
//           <RouteGuard auth={auth}>
//             {element}
//           </RouteGuard>
//         }
//         key={path}
//       >
//         {children && createRoutes(children)}
//       </Route>
//     ));
//   };
//   return <Routes>{createRoutes(routeConfigs)}</Routes>
// };

