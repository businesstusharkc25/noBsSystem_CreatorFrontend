const AppPagination = ({
  nextPageNumber,
  previousPageNumber = 0,
  onNextClick = () => {},
  onPreviousClick = () => {},
}) => {
  return (
    <div className="flex items-center justify-center p-8">
      <button
        onClick={() => onPreviousClick()}
        disabled={previousPageNumber == 0}
        className="text-white disabled:bg-gray-900 disabled:text-black mx-4 no_bs_creator_button_variant_0 py-1 px-4 disabled:hidden"
      >
        Previous
      </button>
      <button
        disabled={!nextPageNumber}
        onClick={() => onNextClick()}
        className="text-white mx-4 no_bs_creator_button_variant_0 py-1 px-4 disabled:bg-gray-900 disabled:text-black disabled:hidden"
      >
        Next
      </button>
    </div>
  );
};

export default AppPagination;
