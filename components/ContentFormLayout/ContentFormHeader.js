const ContentFormHeader = ({ onExit, onDraftClick, onSubmitClick }) => {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="bg-[#141414] col-span-12 py-3">
          <div className="flex md:block items-center justify-center float-none md:float-right">
            <button
              onClick={onSubmitClick}
              type="submit"
              className="text-white mx-3 md:mx-4 bg-[#1C1B1B] py-0 md:py-1 px-2 md:px-5 rounded-md"
            >
              Done
            </button>
            <button
              onClick={onDraftClick}
              type="submit"
              className="text-white mx-3 md:mx-4 bg-[#1C1B1B] py-0 md:py-1 px-2 md:px-5 rounded-md"
            >
              Save as draft
            </button>
            <button
              onClick={onExit}
              className="text-white mx-3 md:mx-4 bg-[#590000] py-0 md:py-1 px-2 md:px-5 rounded-md"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentFormHeader;
