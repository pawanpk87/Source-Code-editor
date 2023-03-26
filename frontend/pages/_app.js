import "@/styles/globals.css";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import CustomThemeProvider from "@/styles/theme/CustomThemeProvider";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { isEmptyObject } from "@/util/UtilFuntion";
import store, { persistor } from "@/src/app/store/store";
import { setUser } from "@/src/app/store/slices/userSlice";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Auth>
          <CustomThemeProvider>
            <Component {...pageProps} />
          </CustomThemeProvider>
        </Auth>
      </PersistGate>
    </Provider>
  );
}

const Auth = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("api/user/login", {
          withCredentials: true,
        });
        const data = response?.data;
        if (data !== null && data !== undefined) {
          if (isEmptyObject(data) === false) {
            dispatch(setUser(data));
          }
        }
      } catch (error) {
        //do nothing
      }
    };
    fetchUser();
  }, []);

  return children;
};
