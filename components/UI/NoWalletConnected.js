import useConnectUserWallet from "../hooks/useConnectUserWallet";

const NoWalletConnected = () => {
  const { connectWalletHandler } = useConnectUserWallet();

  return (
    <div className="text-white flex items-center justify-center min-h-screen w-screen">
      <div>
        <h1 className="text-4xl text-center">Connect With</h1>
        <div className="flex items-center justify-center">
          <img
            onClick={connectWalletHandler}
            className="my-8 max-h-20 cursor-pointer px-4"
            src="/assets/illustrations/meta_mask_logo.png"
          />
        </div>
      </div>
    </div>
  );
};

export default NoWalletConnected;
