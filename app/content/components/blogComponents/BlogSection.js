import { useRouter } from "next/navigation";
import { useState } from "react";
import { ContentFormLayout } from "../../../../components";
import BlogFormSection from "./BlogFormSection";

const BlogSection = ({ updatingContent = false }) => {
  const [newsData, setNewsData] = useState({
    newsTitle: "",
    newsBody: "",
    isMemberOnly: false,
    contentCategory: "",
    newsThumbnail: null,
  });

  const router = useRouter();

  return (
    <ContentFormLayout onExit={() => router.back()}>
      <div className="p-6">
        <BlogFormSection setNewsData={setNewsData} newsData={newsData} />
      </div>
    </ContentFormLayout>
  );
};

export default BlogSection;
