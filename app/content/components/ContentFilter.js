import { viewsFilter } from "../../../constants/contentFilter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { contentCategoryData } from "../../../constants/contentCategoryData";
import { setFilterObj } from "../services/contentSlice";
import { useDispatch } from "react-redux";

const ContentFilter = () => {
  const dispatch = useDispatch(setFilterObj);

  const filterObjInitialValue = {
    selectedViewId: 0,
    contentCategory: [],
    contentStatus: "",
  };

  const [filterOpen, setFilterOpen] = useState(false);
  const [contentFilterObj, setContentFilterObj] = useState(
    filterObjInitialValue
  );

  useEffect(() => {
    const filterObjModified = { ...contentFilterObj };

    if (contentFilterObj.selectedViewId != 0) {
      const foundViewFilter = viewsFilter.find(
        (viewFilterVal) => viewFilterVal.id == filterObjModified.selectedViewId
      );

      delete filterObjModified.selectedViewId;

      if (foundViewFilter?.minValue != 0) {
        filterObjModified.minValue = foundViewFilter?.minValue;
      }

      if (foundViewFilter?.maxValue) {
        filterObjModified.maxValue = foundViewFilter?.maxValue;
      }
    } else {
      delete filterObjModified.selectedViewId;
    }

    if (!filterObjModified.contentStatus) {
      delete filterObjModified.contentStatus;
    }

    if (filterObjModified.contentCategory.length == 0) {
      delete filterObjModified.contentCategory;
    }

    dispatch(setFilterObj(filterObjModified));
  }, [contentFilterObj]);

  const onContentStatusChange = (value) => {
    if (value != contentFilterObj.contentStatus) {
      setContentFilterObj({ ...contentFilterObj, contentStatus: value });
    } else setContentFilterObj({ ...contentFilterObj, contentStatus: "" });
  };

  const onContentCategoryChange = (e) => {
    if (!contentFilterObj.contentCategory.includes(e.target.value)) {
      const contentCategoryArrWithUpdatedVal = [
        ...contentFilterObj.contentCategory,
      ];

      contentCategoryArrWithUpdatedVal.push(e.target.value);

      setContentFilterObj({
        ...contentFilterObj,
        contentCategory: contentCategoryArrWithUpdatedVal,
      });
    } else {
      const contentCategoryArrWithoutUncheckedVal =
        contentFilterObj.contentCategory.filter(
          (categoryValue) => categoryValue != e.target.value
        );

      setContentFilterObj({
        ...contentFilterObj,
        contentCategory: contentCategoryArrWithoutUncheckedVal,
      });
    }
  };

  return (
    <div>
      <img
        onClick={() => setFilterOpen(!filterOpen)}
        src={"/assets/icons/filter_icon.svg"}
        className="mx-5 cursor-pointer h-4 md:h-6"
      />

      {filterOpen && (
        <div className="text-white absolute right-2 bg-[#0F0E0E] min-w-[240px] z-10 mt-2 md:mt-4 rounded border border-gray-800 shadow-xl">
          <div className="p-2">
            <button
              onClick={() => {
                setContentFilterObj(filterObjInitialValue);
                dispatch(setFilterObj({}));
              }}
              className="bg-[#292929] p-1 mb-2 min-w-full rounded"
            >
              Clear All
            </button>

            <p>Views</p>
            <select
              onChange={(e) => {
                setContentFilterObj({
                  ...contentFilterObj,
                  selectedViewId: parseInt(e.target.value),
                });
              }}
              className="bg-[#4141411e] min-w-full"
              name="viewsFilter"
            >
              {viewsFilter.map((viewFilter, i) => (
                <option value={viewFilter.id} className="bg-[#0F0E0E]" key={i}>
                  {viewFilter.name}
                </option>
              ))}
            </select>
            <div className="my-4">
              <p>News Categories</p>
              {contentCategoryData.map((contentCategory, i) => (
                <div className="flex justify-between" key={i}>
                  <label htmlFor={`contentCategory${i}`} className="mr-4">
                    {contentCategory.title}
                  </label>
                  <input
                    onChange={onContentCategoryChange}
                    value={contentCategory.value}
                    type={"checkbox"}
                    id={`contentCategory${i}`}
                    name={`contentCategory${i}`}
                  />
                </div>
              ))}
            </div>

            <p>Content Status</p>

            <div className="flex items-center justify-between">
              <label>
                <input
                  onChange={(e) => onContentStatusChange(e.target.value)}
                  type="checkbox"
                  value="active"
                  checked={contentFilterObj.contentStatus == "active"}
                />
                <span className="mx-2">Active</span>
              </label>
              <label>
                <input
                  checked={contentFilterObj.contentStatus == "draft"}
                  onChange={(e) => onContentStatusChange(e.target.value)}
                  type="checkbox"
                  value="draft"
                />
                <span className="mx-2">Draft</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentFilter;
