//
// Renders a message, any message!
export const Message = ({ content }: { content: string }) => {
  const classes =
    "flex flex-wrap flex-col h-full justify-center bg-white text-5xl p-10 items-center ";
  return (
    <div tw={classes} className={classes}>
      {content}
    </div>
  );
};
