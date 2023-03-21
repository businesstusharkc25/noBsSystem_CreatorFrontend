"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { noAuthRequiredPath } from "../../constants/noAuthRequiredPath";
import { useSetUserFromToken } from "../../utils/hooks";
import { AddNewChannel, NoWalletConnected } from "../UI";
import { appTokenState, userSelector } from "../User";

const AuthWrapper = ({ children }) => {
  const { setUserFromToken } = useSetUserFromToken();
  const userTokenFromStore = useSelector(appTokenState);
  const user = useSelector(userSelector);
  const pathName = usePathname();

  useEffect(() => {
    setUserFromToken();
  }, []);

  const renderChildren = () => {
    if (
      userTokenFromStore &&
      user?.channels?.length == 0 &&
      !noAuthRequiredPath.includes(pathName)
    ) {
      return <AddNewChannel />;
    } else if (userTokenFromStore) {
      return children;
    } else {
      return <NoWalletConnected />;
    }
  };

  return <>{renderChildren()}</>;
};

export default AuthWrapper;
