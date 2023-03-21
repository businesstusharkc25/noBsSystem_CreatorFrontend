import { useState } from "react";
import {
  AppTextEditor,
  FileUpload,
  ToastMessage,
} from "../../../../components";
import { contentCategoryData } from "../../../../constants/contentCategoryData";

const VideoFormSection = ({ newsData, setNewsData }) => {
  const [toastList, setToastList] = useState([]);

  const handleChange = (event) => {
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
      setNewsData({
        ...newsData,
        thumbnailUrl: null,
        thumbnailFile: fileUploaded,
      });
    }
  };

  const addVideoHandler = (event) => {
    const fileUploaded = event.target.files[0];

    if (
      fileUploaded?.type !== "video/mp4" &&
      fileUploaded?.type !== "video/x-m4v"
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
      setNewsData({
        ...newsData,
        videoFileUrl: null,
        videoFile: fileUploaded,
      });
    }
  };

  return (
    <>
      <input
        type={"text"}
        name="newsTitle"
        id="newsTitle"
        value={newsData.newsTitle}
        className="p-3 min-w-full bg-[#1A1818]"
        placeholder="Video Title"
        onChange={(e) => {
          setNewsData({ ...newsData, newsTitle: e.target.value });
        }}
      />

      <AppTextEditor
        addImage={false}
        className={`mt-8 mb-8 md:mb-16 editor_container`}
        onChangeFunction={(value) => {
          setNewsData({ ...newsData, newsBody: value });
        }}
        value={newsData?.newsBody}
      />

      <span className="flex items-center justify-between my-2 bg-[#4141411e] p-2">
        <label htmlFor="isMemberOnly" className="mr-4">
          Only for Member?
        </label>
        <input
          onChange={() =>
            setNewsData({
              ...newsData,
              isMemberOnly: !newsData?.isMemberOnly ? true : false,
            })
          }
          value={newsData?.isMemberOnly}
          type={"checkbox"}
          checked={newsData?.isMemberOnly}
          className="p-4"
          id="isMemberOnly"
          name="isMemberOnly"
        />
      </span>

      <span className="flex items-center justify-between my-2 bg-[#4141411e] p-2">
        <p>Upload Video thumbnail</p>
        <FileUpload
          acceptance="image/*"
          handleChange={handleChange}
          fileName={newsData?.thumbnailFile?.name}
          handleFileRemove={() =>
            setNewsData({
              ...newsData,
              thumbnailFile: null,
              thumbnailUrl: null,
            })
          }
        />
      </span>

      <span className="flex items-center justify-between my-2 bg-[#4141411e] p-2">
        <p>Select Content Category</p>
        <select
          onChange={(e) => {
            setNewsData({ ...newsData, contentCategory: e.target.value });
          }}
          className="text-white bg-[#4141411e]"
          value={newsData?.contentCategory}
        >
          {contentCategoryData.map((options, index) => (
            <option className="bg-[#0F0E0E]" value={options.value} key={index}>
              {options.title}
            </option>
          ))}
        </select>
      </span>

      <span className="flex items-center justify-between my-2 bg-[#4141411e] p-2">
        <p>Upload video</p>
        <FileUpload
          acceptance="video/mp4,video/x-m4v,video/*/*"
          handleChange={addVideoHandler}
          fileName={newsData?.videoFile?.name}
          handleFileRemove={() =>
            setNewsData({ ...newsData, videoFile: null, videoFileUrl: null })
          }
        />
      </span>

      {toastList.length > 0 && (
        <ToastMessage
          position={"top_right"}
          autoDelete
          autoDeleteTime={2000}
          toastList={toastList}
        />
      )}
    </>
  );
};

export default VideoFormSection;
