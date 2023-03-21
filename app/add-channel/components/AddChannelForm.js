import { useState } from "react";
import { ToastMessage } from "../../../components";
import FileUpload from "../../../components/FileUpload/FileUpload";
import useHandleFormChange from "../hooks/useHandleFormChange";

const AddChannelForm = () => {
  const [channelFormData, setChannelFormData] = useState({
    channelName: "",
    channelDescription: "",
    channelHandle: "",
    channelCoverImage: null,
    channelLogo: null,
  });
  const [toastList, setToastList] = useState([]);
  const [formError, setFormError] = useState(false);

  const { onFormSubmit } = useHandleFormChange();

  const handleImageChange = (event, uploadType = "cover") => {
    event.preventDefault();
    const fileUploaded = event.target.files[0];
    if (
      fileUploaded?.type !== "image/jpeg" &&
      fileUploaded?.type !== "image/png"
    ) {
      setToastList((prevState) => [
        ...prevState,
        {
          id: Math.floor(Math.random() * 101 + 1),
          title: "Error",
          description: "File type is invalid",
          backgroundColor: "#590000",
        },
      ]);
    } else {
      const obj = {
        ...channelFormData,
      };

      if (uploadType == "cover") {
        obj.channelCoverImage = fileUploaded;
      } else {
        obj.channelLogo = fileUploaded;
      }
      setChannelFormData(obj);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          !channelFormData.channelDescription ||
          !channelFormData?.channelName ||
          !channelFormData?.channelHandle
        ) {
          setFormError(true);
        } else {
          setFormError(false);
          onFormSubmit({ channelFormData });
        }
      }}
    >
      <div className="p-4 text-white">
        <div className="my-4">
          <input
            value={channelFormData?.channelName}
            name="channelName"
            className="w-full bg-transparent border rounded p-3"
            placeholder="Channel Name"
            onChange={(e) => {
              setChannelFormData({
                ...channelFormData,
                channelName: e.target.value,
              });
            }}
          />
          {formError && !channelFormData?.channelName ? (
            <p className="mt-2 text-red-600">This field is required</p>
          ) : (
            <></>
          )}
        </div>

        <textarea
          value={channelFormData?.channelDescription}
          name="channelDescription"
          className="w-full bg-transparent border rounded p-3 min-h-[200px]"
          placeholder="Channel Description"
          onChange={(e) => {
            setChannelFormData({
              ...channelFormData,
              channelDescription: e.target.value,
            });
          }}
        />

        {formError && !channelFormData?.channelDescription ? (
          <p className="mt-2 text-red-600">This field is required</p>
        ) : (
          <></>
        )}

        <div className="my-4">
          <input
            name="channelHandle"
            className="w-full bg-transparent border rounded p-3"
            placeholder="Channel Handle"
            value={channelFormData?.channelHandle}
            onChange={(e) => {
              setChannelFormData({
                ...channelFormData,
                channelHandle: `${e.target.value?.replace(/\s/g, "")}`,
              });
            }}
          />

          {formError && !channelFormData?.channelDescription ? (
            <p className="mt-2 text-red-600">This field is required</p>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-stretch justify-center md:justify-start">
          <FileUpload
            className="my-1 mr-0 md:mr-2"
            defaultText="Upload Cover Image"
            acceptance="image/*"
            fileName={channelFormData?.channelCoverImage?.name}
            handleChange={handleImageChange}
            handleFileRemove={() => {
              setChannelFormData({
                ...channelFormData,
                channelCoverImage: null,
              });
            }}
          />
          <FileUpload
            className="my-1 mr-0 md:mr-2"
            defaultText="Upload Channel logo"
            acceptance="image/*"
            fileName={channelFormData?.channelLogo?.name}
            handleChange={(e) => {
              handleImageChange(e, "logo");
            }}
            handleFileRemove={() => {
              setChannelFormData({
                ...channelFormData,
                channelLogo: null,
              });
            }}
          />

          <button
            type="submit"
            className="no_bs_creator_button_variant_1 my-1 px-3 py-1 flex items-center bg-[#1D341B]"
          >
            <span className="text-center w-[100%]">Submit</span>
          </button>
        </div>

        {toastList.length > 0 && (
          <ToastMessage
            position={"top_right"}
            autoDelete
            autoDeleteTime={2000}
            toastList={toastList}
          />
        )}
      </div>
    </form>
  );
};

export default AddChannelForm;
