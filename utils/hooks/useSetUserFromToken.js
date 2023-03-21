import getCookieByName from "../functions/getCookieByName";
import jwt_decode from "jwt-decode";
import { setToken, setUser } from "../../components/User/userSlice";
import { useDispatch } from "react-redux";
import { useLazyGetChannelsDataQuery } from "../../sharedServices/userWalletServices/userWalletApi";

const useSetUserFromToken = () => {
  const dispatch = useDispatch();
  const [getAllChannels] = useLazyGetChannelsDataQuery();

  const setUserFromToken = async (token) => {
    let jwtToken = token || getCookieByName("no_bs_session_token");

    if (jwtToken) {
      const user = await jwt_decode(jwtToken)?.result;
      const currentChannel = await jwt_decode(jwtToken)?.currentChannel;

      dispatch(setToken(jwtToken));

      const channelData = await getAllChannels();
      const userObj = { ...user };

      userObj.currentChannel = currentChannel;
      userObj.channels = channelData?.data?.channelResults;

      dispatch(setUser(userObj));
    }
  };

  return { setUserFromToken };
};

export default useSetUserFromToken;
