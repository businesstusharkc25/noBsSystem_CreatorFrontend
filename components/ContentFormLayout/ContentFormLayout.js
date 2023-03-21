import ContentFormHeader from "./ContentFormHeader";

const ContentFormLayout = ({
  onSubmitClick,
  onDraftClick,
  onExit,
  children,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <ContentFormHeader
        onDraftClick={onDraftClick}
        onSubmitClick={onSubmitClick}
        onExit={onExit}
      />

      {children}
    </form>
  );
};

export default ContentFormLayout;
