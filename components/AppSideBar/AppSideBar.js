import { usePathname } from "next/navigation";
import { userSelector } from "../User";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { deleteCookie } from "../../utils/functions/utilFunctions";
import { setUser, setToken } from "../User";
import useNavBarMenuData from "../../shared/hooks/useNavBarMenuData";
import { useChangeCurrentChannelMutation } from "../../sharedServices/userWalletServices/userWalletApi";
import { useSetOrUpdateTokenCookie } from "../../utils/hooks";

const AppSideBar = ({ open, setOpen }) => {
  const user = useSelector(userSelector);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { navBarMenuItemsData } = useNavBarMenuData();
  const { setOrUpdateTokenCookie } = useSetOrUpdateTokenCookie();
  const [changeCurrentChannel, { data }] = useChangeCurrentChannelMutation();

  const onChannelSelectionChange = async (e) => {
    await changeCurrentChannel({ channelId: e.target.value });
    if (data) {
      const { token } = data;
      setOrUpdateTokenCookie(token);
    }
  };

  return (
    <div className="relative bg-black">
      <div
        className={`min-h-screen text-white ${
          open ? "w-72" : "w-20"
        } duration-500`}
      >
        <div className="py-3 flex justify-end mx-6">
          <div
            onClick={() => setOpen(!open)}
            className="space-y-2 cursor-pointer"
          >
            <span className="block w-5 h-0.5 bg-gray-600"></span>
            <span className="block w-8 h-0.5 bg-gray-600"></span>
            <span className="block w-8 h-0.5 bg-gray-600"></span>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 relative">
          {user?.channels?.length > 0 ? (
            <>
              <div
                className={`group flex items-center text-sm gap-3.5 font-medium p-2 ${
                  open && "hover:bg-gray-800"
                } rounded-md ${!open ? "cursor-default" : "cursor-pointer"}`}
              >
                <select
                  style={{
                    transitionDelay: `100ms`,
                  }}
                  value={user?.currentChannel?.id}
                  onChange={onChannelSelectionChange}
                  className={`appearance-none whitespace-pre duration-500 w-full bg-transparent ${
                    !open &&
                    "opacity-0 pointer-events-none translate-x-28 overflow-hidden"
                  }`}
                >
                  {user?.channels?.map((channelObj, index) => (
                    <option
                      value={channelObj?.id}
                      key={index}
                      className="bg-black m-1"
                    >
                      @{channelObj?.channelHandle}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <></>
          )}

          {navBarMenuItemsData?.map((menu, i) => (
            <button
              disabled={menu?.disabled}
              onClick={() => {
                router.push(menu.route);
                setOpen(false);
              }}
              href={menu?.route}
              key={i}
              className={`group ${
                menu?.disabled && "text-slate-700"
              } flex items-center text-sm gap-3.5 font-medium p-2 ${
                pathname == menu.route && open && "bg-gray-800"
              } ${open && !menu?.disabled && "hover:bg-gray-800"} rounded-md ${
                !open && "cursor-default pointer-events-none"
              }`}
            >
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open &&
                  "opacity-0 pointer-events-none translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.navItemName}
              </h2>
            </button>
          ))}
          <div
            className={`group flex items-center text-sm gap-3.5 font-medium p-2 ${
              open && "hover:bg-gray-800"
            } rounded-md ${!open ? "cursor-default" : "cursor-pointer"}`}
          >
            <h2
              onClick={() => {
                deleteCookie("no_bs_session_token");
                dispatch(setUser(null));
                dispatch(setToken(null));
              }}
              style={{
                transitionDelay: `600ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open &&
                "opacity-0 pointer-events-none translate-x-28 overflow-hidden"
              }`}
            >
              Disconnect Wallet
            </h2>
          </div>

          <div
            className={`group flex items-center text-sm gap-3.5 font-medium p-2 ${
              open && "hover:bg-gray-800"
            } rounded-md ${!open ? "cursor-default" : "cursor-pointer"}`}
          >
            <h2
              style={{
                transitionDelay: `700ms`,
              }}
              className={`truncate whitespace-pre duration-500 ${
                !open &&
                "opacity-0 pointer-events-none translate-x-28 overflow-hidden"
              }`}
              title={`Connected as ${user?.accountAddress}`}
            >
              Connected as {user?.accountAddress}
            </h2>
          </div>
        </div>

        <p className="absolute bottom-2 px-4">no_bs</p>
      </div>
    </div>
  );
};

export default AppSideBar;
