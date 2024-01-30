import Markdown from "react-markdown";

//
// Renders a message, any message!
export const Message = ({ content }: { content: string }) => {
  const classes =
    "flex flex-col w-full h-full items-center relative justify-center bg-white bg-black text-2xl ";
  return (
    <div
      tw={classes}
      className={classes}
      style={{
        background: "white",
        width: "1200px",
        height: "630px",
        margin: "0px",
        // textAlign: "center",
        // justifyContent: "center",
        // alignItems: "center",
        // textWrap: "wrap",
      }}
    >
      {content.split("\n").map((line, l) => {
        return <Markdown key={l}>{line}</Markdown>;
      })}
    </div>
  );
};
