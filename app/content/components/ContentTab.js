import { useDispatch, useSelector } from "react-redux";
import { AppPagination } from "../../../components";
import { useGetContentQuery } from "../services/content.services";
import { filterObj, setFilterObj } from "../services/contentSlice";
import ContentTabTop from "./ContentTabTop";
import IndividualNewsComponent from "./IndividualNewsComponent";

const ContentTab = () => {
  const filterObjFromStore = useSelector(filterObj);
  const dispatch = useDispatch();

  const { data, isLoading } = useGetContentQuery({
    filter: filterObjFromStore,
  });

  return (
    <>
      <div>
        <ContentTabTop />
        <div className="grid grid-cols-12 gap-5 my-8 px-6">
          {!isLoading
            ? data?.results?.map((newsDataElement, index) => (
                <div key={index} className="col-span-12 md:col-span-3">
                  <IndividualNewsComponent newsData={newsDataElement} />
                </div>
              ))
            : Array.from({ length: 10 }, (_, i) => i + 1).map((_, i) => (
                <div key={i} className="col-span-12 md:col-span-3">
                  <IndividualNewsComponent isLoading={isLoading} />
                </div>
              ))}
        </div>
      </div>

      {!isLoading && data?.results?.length > 0 && (
        <AppPagination
          onNextClick={() =>
            dispatch(
              setFilterObj({
                ...filterObjFromStore,
                page: data?.next?.page,
              })
            )
          }
          onPreviousClick={() =>
            dispatch(
              setFilterObj({
                ...filterObjFromStore,
                page: data?.previous?.page,
              })
            )
          }
          previousPageNumber={data?.previous?.page}
          nextPageNumber={data?.next?.page}
        />
      )}
    </>
  );
};

export default ContentTab;
