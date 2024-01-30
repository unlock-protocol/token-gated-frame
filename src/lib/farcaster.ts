import axios from "axios";

const endpoint = "https://nemes.farcaster.xyz:2281";
const version = "v1";

function hexToBytes(hex: string) {
  for (var bytes = [], c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return new Uint8Array(bytes);
}

export const verifyMessage = async (message: string) => {
  const res = await axios.post(
    `${endpoint}/${version}/validateMessage`,
    hexToBytes(message),
    {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    }
  );
  return res.data;
};

export const getUserProfile = async (fid: string) => {
  const res = await axios.get(`${endpoint}/${version}/userDataByFid`, {
    params: { fid },
  });
  return res.data;
};

export const getUserAddresses = async (fid: string) => {
  const res = await axios.get(`${endpoint}/${version}/verificationsByFid`, {
    params: { fid },
  });
  return res.data.messages
    .filter((message: any) => {
      return message.data.type === "MESSAGE_TYPE_VERIFICATION_ADD_ETH_ADDRESS";
    })
    .map((message: any) => {
      return message.data.verificationAddEthAddressBody.address;
    });
};
