import PodcastFormSection from "./PodcastFormSection";
import { ContentFormLayout } from "../../../../components";
import { useEffect, useState } from "react";
import useAddContentHook from "../../hooks/useAddContentHook";
import { useGetContentByIdQuery } from "../../services/content.services";
import { usePathname, useRouter } from "next/navigation";

const AddPodcast = ({ updatingContent = false }) => {
  const pathName = usePathname();
  const id = pathName.replace(/[^0-9]/g, "");
  const { data, isLoading } = useGetContentByIdQuery({ id });
  const router = useRouter();

  const [newsData, setNewsData] = useState({
    newsTitle: "",
    newsBody: "",
    isMemberOnly: false,
    thumbnailFile: null,
    contentCategory: "",
    podcastFile: null,
  });

  const { addOrUpdateContent } = useAddContentHook({ contentData: newsData });

  useEffect(() => {
    if (!isLoading && data && Object.keys(data?.results).length > 0) {
      setNewsData({
        ...newsData,
        newsTitle: data?.results?.newsTitle,
        newsBody: data?.results?.newsBody,
        isMemberOnly: data?.results?.isMemberOnly,
        contentCategory: data?.results?.contentCategory,
        thumbnailUrl: data?.results?.thumbnailUrl,
        podcastFileUrl: data?.results?.contentUrl,
      });
    }
  }, [data?.results]);

  return (
    <ContentFormLayout
      onExit={() => router.back()}
      onDraftClick={() =>
        addOrUpdateContent({
          isDraft: true,
          contentType: "PODCAST",
          updatingContent,
          id,
        })
      }
      onSubmitClick={() =>
        addOrUpdateContent({ contentType: "PODCAST", updatingContent, id })
      }
    >
      <div className="p-6 text-white">
        <PodcastFormSection newsData={newsData} setNewsData={setNewsData} />
      </div>
    </ContentFormLayout>
  );
};

export default AddPodcast;
