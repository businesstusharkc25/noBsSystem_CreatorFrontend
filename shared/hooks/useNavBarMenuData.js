"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../components/User";

const useNavBarMenuData = () => {
  const user = useSelector(userSelector);
  const [channelsExists, setChannelsExists] = useState(false);

  useEffect(() => {
    if (user?.channels?.length == 0) {
      setChannelsExists(false);
    } else {
      setChannelsExists(true);
    }
  }, [user]);

  const navBarMenuItemsData = [
    {
      navItemName: "Analytics",
      route: "/",
      disabled: !channelsExists,
    },
    {
      navItemName: "Memberships",
      route: "/memberships",
      disabled: !channelsExists,
    },
    {
      navItemName: "Content",
      route: "/content",
      disabled: !channelsExists,
    },
    {
      navItemName: "Settings",
      route: "/settings",
      disabled: !channelsExists,
    },
  ];

  return { navBarMenuItemsData };
};

export default useNavBarMenuData;
