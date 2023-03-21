import ContentSearchBar from "./ContentSearchBar";
import ContentTabHeadRight from "./ContentTabHeadRight";

const ContentTabTop = () => {
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="bg-[#141414] col-span-12 py-3 flex flex-col md:flex-row items-center justify-between">
          <ContentSearchBar />
          <ContentTabHeadRight />
        </div>
      </div>
    </div>
  );
};

export default ContentTabTop;
