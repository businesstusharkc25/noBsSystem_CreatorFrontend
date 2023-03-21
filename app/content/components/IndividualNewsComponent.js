import { capitalizeFirstLetter } from "../../../utils/functions";
import styles from "../styles/contentTabStyles.module.scss";
import { updateContentRoute } from "../../../constants/appRoutes";
import { useDeleteContentByIdMutation } from "../services/content.services";
import { useRouter } from "next/navigation";

const IndividualNewsComponent = ({ newsData = {}, isLoading }) => {
  const {
    thumbnailUrl = "",
    newsTitle = "",
    contentCategory = "",
    views = 0,
    amountRaised = 0,
    contentType = "",
    id = 0,
    isMemberOnly = false,
    status = "",
  } = newsData;

  const [deleteContent] = useDeleteContentByIdMutation();
  const router = useRouter();

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  const navigateToEdit = () => {
    router.push(
      `${updateContentRoute}/${id}?type=${modifiedContentType?.toLocaleLowerCase()}`
    );
  };

  const modifiedContentType = contentType
    ?.replace(/\_/g, " ")
    ?.toLocaleLowerCase();

  return (
    <>
      <div className="bg-[#141414] text-white shadow-2xl rounded-md px-1 md:px-3 relative">
        {!isLoading && (
          <>
            <img
              src="/assets/icons/edit_membership_icon.svg"
              className="cursor-pointer absolute right-14 top-1"
              onClick={async (e) => {
                navigateToEdit();
              }}
            />

            <img
              height={32}
              width={32}
              src="/assets/icons/trash_icon.svg"
              className="cursor-pointer absolute right-5 top-1 bg-[#292929] p-1 rounded-full"
              onClick={async (e) => {
                e.stopPropagation();
                await deleteContent({ id });
              }}
            />
          </>
        )}

        {isLoading || !thumbnailUrl ? (
          <div className="h-40 bg-[#292929] animate-pulse"></div>
        ) : (
          <img src={thumbnailUrl} className="rounded" />
        )}

        <h2 className="my-2">{newsTitle}</h2>
        <div className={`flex pb-2 flex-wrap ${isLoading && "animate-pulse"}`}>
          <p className={`${styles.news_utils_chip} px-3 py-1 my-1 capitalize`}>
            {contentCategory}
          </p>
          <p
            className={`${styles.news_utils_chip} px-3 py-1 ml-1 my-1 capitalize`}
          >
            {formatter.format(views)} Views
          </p>
          <p
            className={`${styles.news_utils_chip} px-3 py-1 ml-1 my-1 capitalize`}
          >
            {capitalizeFirstLetter(modifiedContentType)}
          </p>
          <p
            className={`${styles.news_utils_chip} px-3 py-1 ml-1 my-1 capitalize`}
          >
            {capitalizeFirstLetter(status)}
          </p>

          {isMemberOnly && (
            <p
              className={`${styles.news_utils_chip} px-3 py-1 ml-1 my-1 capitalize`}
            >
              Only for members
            </p>
          )}

          <p className={`${styles.news_utils_chip} px-3 py-1 ml-1 my-1`}>
            {amountRaised} eth Raised
          </p>
        </div>
      </div>
    </>
  );
};

export default IndividualNewsComponent;
