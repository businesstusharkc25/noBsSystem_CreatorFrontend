import { useConnectUserWalletMutation } from "../../sharedServices/userWalletServices/userWalletApi";
import { useSetOrUpdateTokenCookie } from "../../utils/hooks";
import connectUserWalletToDapp from "../../web3/connectWallet";

const useConnectUserWallet = () => {
  const [connectUserWallet] = useConnectUserWalletMutation();
  const { setOrUpdateTokenCookie } = useSetOrUpdateTokenCookie();

  const connectWalletHandler = () => {
    connectUserWalletToDapp().then((res) => {
      try {
        connectUserWallet({
          accountAddress: res,
        })
          .then(({ data: { token } }) => {
            setOrUpdateTokenCookie(token);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    });
  };

  return { connectWalletHandler };
};

export default useConnectUserWallet;
