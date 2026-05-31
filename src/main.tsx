import ReactDOM from "react-dom/client";
// import "@/styles/reset.less";
// import "@/assets/iconfont/iconfont.less";
// import "@/assets/fonts/font.less";
// import "antd/dist/antd.less";
// import "@/styles/common.less";
// import "@/language/index";
// import "virtual:svg-icons-register";
import { Provider } from "react-redux";
import App from "@/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store, { persistor } from "./store";
import { PersistGate } from 'redux-persist/integration/react';

// * React Query Client 實例 */
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // * react严格模式
  // <React.StrictMode>
  // <Provider store={store}>
  //   <PersistGate persistor={persistor}>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>  {/* 提供全局狀態管理，頁面刷新後狀態會丟失，須配合redux-persist使用才能持久化儲存 */}
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </QueryClientProvider>

  //   </PersistGate>
  // </Provider>
  // </React.StrictMode>
);