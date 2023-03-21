import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ContentFormLayout } from "../../../../components";
import useAddContentHook from "../../hooks/useAddContentHook";
import { useGetContentByIdQuery } from "../../services/content.services";
import VideoFormSection from "./VideoFormSection";

const AddVideo = ({ updatingContent = false }) => {
  const pathName = usePathname();
  const router = useRouter();
  const id = pathName.replace(/[^0-9]/g, "");
  const { data, isLoading } = useGetContentByIdQuery({ id });

  const [newsData, setNewsData] = useState({
    newsTitle: "",
    newsBody: "",
    videoFile: null,
    isMemberOnly: false,
    thumbnailFile: null,
    contentCategory: "",
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
        videoFileUrl: data?.results?.contentUrl,
      });
    }
  }, [data?.results]);

  return (
    <div>
      <ContentFormLayout
        onExit={() => router.back()}
        onDraftClick={() =>
          addOrUpdateContent({
            isDraft: true,
            contentType: "VIDEO",
            updatingContent,
            id,
          })
        }
        onSubmitClick={() =>
          addOrUpdateContent({ contentType: "VIDEO", updatingContent, id })
        }
      >
        <div className="text-white p-6">
          <VideoFormSection newsData={newsData} setNewsData={setNewsData} />
        </div>
      </ContentFormLayout>
    </div>
  );
};

export default AddVideo;
