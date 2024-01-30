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
  console.log("FETCHING", u.toString());
  const response = await fetch(u.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });
  console.log(response.status);
  // return response.json();
  return {
    valid: true,
    message: {
      data: {
        type: "MESSAGE_TYPE_FRAME_ACTION",
        fid: 6801,
        timestamp: 97197960,
        network: "FARCASTER_NETWORK_MAINNET",
        frameActionBody: {
          url: "aHR0cHM6Ly90b2tlbi1nYXRlZC1mcmFtZS52ZXJjZWwuYXBwL2MvMTMzNw==",
          buttonIndex: 1,
          castId: {
            fid: 6801,
            hash: "0xb099c72795bc4480ba504f30fc991e96410aba94",
          },
        },
      },
      hash: "0x3b78e42c1d7681acf3fd3e93a6a744e4825f2476",
      hashScheme: "HASH_SCHEME_BLAKE3",
      signature:
        "0exmRlwwLZJmlfWHPqrGzV0QteiWgZ0lTWEYRwlstG6ak+YTooFwPIddS5O6SIhYUjYPVJYWaZnH00XexPg8Bw==",
      signatureScheme: "SIGNATURE_SCHEME_ED25519",
      signer:
        "0xaa31207c6e971528bc984ff8b1bd991d3411cfb4422e0693b0a223bd2b5cc2ac",
    },
  };
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
