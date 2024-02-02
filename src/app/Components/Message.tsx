//
// Renders a message, any message!
export const Message = ({ content }: { content: string }) => {
  const classes =
    "flex flex-wrap flex-col h-full justify-center w-[1200px] bg-white text-5xl p-10";
  return (
    <div tw={classes} className={classes}>
      {content}
    </div>
  );
};
