import { useAddChannelMutation } from "../services/addChannel.services";

const useHandleFormChange = () => {
  const [addChannel] = useAddChannelMutation();

  const onFormSubmit = ({ channelFormData }) => {
    const formData = new FormData();

    Object.keys(channelFormData).map((item) => {
      formData.append(item, channelFormData[item]);
    });

    addChannel({ channelFormData: formData });
  };

  return { onFormSubmit };
};

export default useHandleFormChange;
