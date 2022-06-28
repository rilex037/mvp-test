export const VoteControllerABI = () => {
    return [
        {
            inputs: [
                {
                    internalType: "address",
                    name: "wakandaToken",
                    type: "address",
                },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            inputs: [],
            name: "award",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "getVoters",
            outputs: [
                {
                    internalType: "address[]",
                    name: "",
                    type: "address[]",
                },
            ],
            stateMutability: "view",
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
    ];
};
