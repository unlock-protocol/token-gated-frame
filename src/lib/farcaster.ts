const endpoint = "https://nemes.farcaster.xyz:2281";
const version = "v1";

function hexToBytes(hex: string) {
  for (var bytes = [], c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return new Uint8Array(bytes);
}

export const validateMessage = async (message: string) => {
  const u = new URL(`${endpoint}/${version}/validateMessage`);
  const response = await fetch(u.toString(), {
    method: "POST",
    body: hexToBytes(message),
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });
  return response.json();
};

export const getUserProfile = async (fid: string) => {
  const u = new URL(`${endpoint}/${version}/userDataByFid`);
  u.searchParams.append("fid", fid);
  const response = await fetch(u.toString());
  return response.json();
};

export const getUserAddresses = async (fid: string) => {
  const u = new URL(`${endpoint}/${version}/verificationsByFid`);
  u.searchParams.append("fid", fid);
  const response = await fetch(u.toString());
  const data = await response.json();
  return data.messages
    .filter((message: any) => {
      return message.data.type === "MESSAGE_TYPE_VERIFICATION_ADD_ETH_ADDRESS";
    })
    .map((message: any) => {
      return message.data.verificationAddEthAddressBody.address;
    });
};
