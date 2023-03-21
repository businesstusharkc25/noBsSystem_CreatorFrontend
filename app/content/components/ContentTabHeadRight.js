import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createBlogRoute,
  createVideoRoute,
  createPodcastRoute,
} from "../../../constants/appRoutes";
import ContentFilter from "./ContentFilter";

const ContentTabHeadRight = () => {
  const [showContentCreationOptions, setShowContentCreationOptions] =
    useState(false);

  const router = useRouter();

  return (
    <div className="flex items-end justify-between w-full md:w-fit mt-2 md:mt-0 text-xs md:text-base">
      <button
        onClick={() =>
          setShowContentCreationOptions(!showContentCreationOptions)
        }
        className="text-white mx-4 no_bs_creator_button_variant_0 py-1 px-1 md:px-4"
      >
        Add Content
      </button>

      {showContentCreationOptions && (
        <div className="absolute rounded border border-gray-800 shadow-xl text-white bg-[#0F0E0E] p-2 top-24 md:top-14 mx-4 z-20">
          <p
            onClick={() => {
              router.push(createBlogRoute);
            }}
            className="bg-[#000] p-1 rounded-lg m-1 cursor-pointer"
          >
            Add Blog
          </p>
          <p
            onClick={() => {
              router.push(createPodcastRoute);
            }}
            className="bg-[#000] p-1 rounded-lg m-1 cursor-pointer"
          >
            Add Podcast
          </p>
          <p
            onClick={() => {
              router.push(createVideoRoute);
            }}
            className="bg-[#000] p-1 rounded-lg m-1 cursor-pointer"
          >
            Add Video
          </p>
        </div>
      )}
      <ContentFilter />
    </div>
  );
};

export default ContentTabHeadRight;
