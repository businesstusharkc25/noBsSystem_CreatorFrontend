import { useSelector } from "react-redux";
import { userSelector } from "../../../components/User";
import {
  useAddContentMutation,
  useUpdateContentMutation,
} from "../services/content.services";

const useAddContentHook = ({ contentData }) => {
  const [addContent] = useAddContentMutation();
  const [updateContent] = useUpdateContentMutation();
  const user = useSelector(userSelector);

  const addOrUpdateContent = async ({
    isDraft = false,
    contentType,
    updatingContent = false,
    id,
  }) => {
    contentData = {
      ...contentData,
      status: isDraft ? "draft" : "active",
      creatorId: user?._id,
      creatorAccountAddress: user?.accountAddress,
      contentType: contentType,
    };

    const formData = new FormData();

    Object.keys(contentData).map((item) => {
      formData.append(item, contentData[item]);
    });

    if (!updatingContent) {
      await addContent({ contentData: formData });
    } else {
      await updateContent({ contentData: formData, id: id });
    }
  };

  return { addOrUpdateContent };
};

export default useAddContentHook;
