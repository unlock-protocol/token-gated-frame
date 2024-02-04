export const getImage = (
  base: string,
  message: { id: string },
  state = "pending"
) => {
  const u = new URL(`${base}/api/og/${message.id}`);
  if (state !== "pending") {
    u.searchParams.append("state", state);
  }
  return u.toString();
};
