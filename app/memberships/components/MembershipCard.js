import { useRouter } from "next/navigation";
import { editMembershipPlan } from "../../../constants/appRoutes";
import { useDeleteMembershipMutation } from "../services/membership.services";

const MembershipCard = ({ membershipData }) => {
  const {
    id,
    membershipName = "",
    perks = [],
    price = 0,
    status = "",
    totalMembers = 0,
  } = membershipData;

  const router = useRouter();

  const [deleteMembership] = useDeleteMembershipMutation();

  const navigateToEdit = () => {
    router.push(`${editMembershipPlan}/${id}`);
  };

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <div className="text-white bg-[#151515] m-0 md:m-8 shadow-2xl p-4 rounded-xl relative">
      <div className="flex items-center justify-between">
        <h1
          title={membershipName}
          className="text-2xl font-medium truncate max-w-[160px]"
        >
          {membershipName}
        </h1>

        <div className="flex items-center">
          <img
            src="/assets/icons/edit_membership_icon.svg"
            className="cursor-pointer"
            onClick={async (e) => {
              e.stopPropagation();
              navigateToEdit();
            }}
          />
          <img
            height={30}
            width={30}
            src="/assets/icons/trash_icon.svg"
            className="cursor-pointer"
            onClick={async (e) => {
              e.stopPropagation();
              deleteMembership({ id });
            }}
          />
        </div>
      </div>
      <div className="max-h-">
        {perks.length > 0 ? (
          <dl className="my-3">
            {perks?.map((perkLi, i) => (
              <li
                title={perkLi}
                key={i}
                className="text-base truncate max-w-xl"
              >
                {perkLi}
              </li>
            ))}
          </dl>
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center">
        <span className="bg-[#292929] text-center py-1 rounded shadow-lg px-3 inline-block my-1 md:my-3">
          <div className="flex items-center">
            <img
              className="mr-2"
              src="/assets/icons/members_icon.svg"
              height={20}
              width={20}
            />
            <p>{formatter.format(totalMembers)} Members</p>
          </div>
        </span>

        <span className="bg-[#292929] text-center py-1 rounded shadow-lg px-1 inline-block my-1 md:my-3 mx-0 md:mx-2">
          <div className="flex items-center mr-2">
            <img
              className="mx-1"
              src="/assets/illustrations/eth_illustration.png"
              height={20}
              width={20}
            />
            <p>{formatter.format(price)}</p>
          </div>
        </span>

        <span className="bg-[#292929] text-start md:text-center py-1 rounded shadow-lg px-1 inline-block my-1 md:my-3">
          <p>{status}</p>
        </span>
      </div>
    </div>
  );
};

export default MembershipCard;
