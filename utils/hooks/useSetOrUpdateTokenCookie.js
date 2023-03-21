import useSetUserFromToken from "./useSetUserFromToken";

const useSetOrUpdateTokenCookie = () => {
  const { setUserFromToken } = useSetUserFromToken();

  const setOrUpdateTokenCookie = (token) => {
    let now = new Date();
    now.setTime(now.getTime() + 1 * 3600 * 1000);
    document.cookie = `no_bs_session_token=${token}; expires=${now.toUTCString()}; SameSite=None; Secure`;

    setUserFromToken(token);
  };
  return { setOrUpdateTokenCookie };
};

export default useSetOrUpdateTokenCookie;
