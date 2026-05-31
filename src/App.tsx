// import { Suspense } from "react";
import { BrowserRouter, RouterProvider } from "react-router";
// import { CustomizeRoute } from "./router/CustomizeRoute";

/**
 * i18n
 */
import i18n from './config/i18n';
import { useTranslation } from 'react-i18next';
import routerConfig from './router'

const App = () => {

  //切換語言
  const { t } = useTranslation();
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  }

  return (
    <RouterProvider router={routerConfig}></RouterProvider>

    // <BrowserRouter>
    //   <div>
    //     <h1>{t('welcome')}</h1>
    //     <p>{t('description')}</p>
    //     <div>
    //       <button onClick={toggleLanguage}>
    //         {i18n.language.toUpperCase()}
    //       </button>
    //     </div>
    //   </div >
    //   <Suspense fallback={<div>Loading...</div>}>
    //     <CustomizeRoute />
    //   </Suspense>
    // </BrowserRouter>
  );
};

export default App