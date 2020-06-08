import web3 from './web3';
//access out local copy to contract depoyed on rinkeby testnet
const address = '0x3536D3736C28C74939bBa5f3F295BB3e2030cfFc';
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "childnames",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "surname",
				"type": "string"
			},
			{
				"internalType": "enum SimpleStorage.Genders",
				"name": "gender",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "highschool",
				"type": "string"
			},
			{
				"internalType": "uint32",
				"name": "matricYear",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "aps",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "birthfile",
				"type": "string"
			}
		],
		"name": "createChild",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "x",
				"type": "string"
			}
		],
		"name": "setipfsfile",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getChild",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "enum SimpleStorage.Genders",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getipfsfile",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
export default new web3.eth.Contract(abi, address);
