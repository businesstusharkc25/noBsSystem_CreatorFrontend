import { Provider } from "react-redux";
import { store } from "../../store";
import AuthWrapper from "./AuthWrapper";

const AppWrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthWrapper>{children}</AuthWrapper>
    </Provider>
  );
};

export default AppWrapper;
