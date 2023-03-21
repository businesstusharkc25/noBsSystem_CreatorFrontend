"use client";
import queryString from "query-string";
import { useUrlQuery } from "../../../../utils";
import BlogSection from "../../components/blogComponents/BlogSection";
import AddPodcast from "../../components/podcastComponents/AddPodcast";
import AddVideo from "../../components/videoComponents/AddVideo";

const Page = () => {
  const { parsedQueryObject } = useUrlQuery();

  const renderContentForm = () => {
    switch (parsedQueryObject?.type) {
      case "podcast":
        return <AddPodcast updatingContent />;

      case "video":
        return <AddVideo updatingContent />;

      case "blog":
        return <BlogSection updatingContent />;

      default:
        return;
    }
  };

  return <>{renderContentForm()}</>;
};

export default Page;
