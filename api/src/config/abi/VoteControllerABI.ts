export const VoteControllerABI = () => {
  return [
    {
      inputs: [
        {
          internalType: "address",
          name: "wakandaToken",
          type: "address",
        },
        {
          components: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "age",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "cult",
              type: "string",
            },
          ],
          internalType: "struct VoteController.CandidateDetail[]",
          name: "candidatesArray",
          type: "tuple[]",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "candidateId",
          type: "uint256",
        },
      ],
      name: "NewChallenger",
      type: "event",
    },
    {
      inputs: [],
      name: "award",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "candidates",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "voteCount",
          type: "uint256",
        },
        {
          components: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "age",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "cult",
              type: "string",
            },
          ],
          internalType: "struct VoteController.CandidateDetail",
          name: "details",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getCandidates",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "voteCount",
              type: "uint256",
            },
            {
              components: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "age",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "cult",
                  type: "string",
                },
              ],
              internalType: "struct VoteController.CandidateDetail",
              name: "details",
              type: "tuple",
            },
          ],
          internalType: "struct VoteController.Candidate[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "candidateId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "tokens",
          type: "uint256",
        },
      ],
      name: "vote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "voter",
      outputs: [
        {
          internalType: "bool",
          name: "registered",
          type: "bool",
        },
        {
          internalType: "bool",
          name: "voted",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "winningCandidates",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
};
