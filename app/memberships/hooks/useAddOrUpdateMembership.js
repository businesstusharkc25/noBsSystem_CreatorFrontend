import {
  useAddMembershipMutation,
  useUpdateMembershipMutation,
} from "../services/membership.services";

const useAddOrUpdateMembership = () => {
  const [addMembership] = useAddMembershipMutation();
  const [updateMembership] = useUpdateMembershipMutation();

  const addOrUpdateMembership = async ({
    membershipFormData,
    isUpdate = false,
    id,
  }) => {
    if (!isUpdate) {
      await addMembership({ formBody: membershipFormData });
    } else updateMembership({ formBody: membershipFormData, id });
  };

  return { addOrUpdateMembership };
};

export default useAddOrUpdateMembership;
