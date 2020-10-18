const abi = [
  {
    "entrys": [
      {
        "name": "endCycle",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "inputs": [
          {
            "name": "_recipient",
            "type": "address"
          },
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "transferUploadedFund",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "inputs": [
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "compoundGrowthFund",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "inputs": [
          {
            "name": "_recipient",
            "type": "address"
          },
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "transferReferralIncentive",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "payable": true,
        "name": "upload_fund",
        "stateMutability": "Payable",
        "type": "Function"
      },
      {
        "outputs": [
          {
            "name": "upline",
            "type": "address"
          },
          {
            "name": "uploaded_fund",
            "type": "uint256"
          },
          {
            "name": "received_fund",
            "type": "uint256"
          },
          {
            "name": "growth_fund",
            "type": "uint256"
          },
          {
            "name": "referral_incentive",
            "type": "uint256"
          },
          {
            "name": "new_fund",
            "type": "uint256"
          },
          {
            "name": "cycleStartTime",
            "type": "uint256"
          },
          {
            "name": "total",
            "type": "uint256"
          },
          {
            "name": "duration",
            "type": "uint256"
          },
          {
            "name": "referrals",
            "type": "uint256"
          },
          {
            "name": "totalStructure",
            "type": "uint256"
          },
          {
            "name": "CF_Fund",
            "type": "uint256"
          },
          {
            "name": "cycle",
            "type": "uint256"
          }
        ],
        "constant": true,
        "inputs": [
          {
            "type": "address"
          }
        ],
        "name": "accounts",
        "stateMutability": "View",
        "type": "Function"
      },
      {
        "inputs": [
          {
            "name": "code",
            "type": "string"
          }
        ],
        "name": "set_referral_code",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "outputs": [
          {
            "type": "uint256"
          }
        ],
        "constant": true,
        "inputs": [
          {
            "name": "a",
            "type": "uint256"
          },
          {
            "name": "b",
            "type": "uint256"
          }
        ],
        "name": "min",
        "stateMutability": "Pure",
        "type": "Function"
      },
      {
        "inputs": [
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "withdrawUploadedFund",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "outputs": [
          {
            "type": "address"
          }
        ],
        "constant": true,
        "name": "owner",
        "stateMutability": "View",
        "type": "Function"
      },
      {
        "outputs": [
          {
            "type": "string"
          }
        ],
        "constant": true,
        "inputs": [
          {
            "type": "address"
          }
        ],
        "name": "getReferralCode",
        "stateMutability": "View",
        "type": "Function"
      },
      {
        "inputs": [
          {
            "name": "_recipient",
            "type": "address"
          },
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "transferReceivedFund",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "inputs": [
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "withdrawGrowthFund",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "inputs": [
          {
            "name": "_code",
            "type": "string"
          }
        ],
        "name": "setUpline",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "inputs": [
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "compoundUploadedFund",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "outputs": [
          {
            "type": "uint256"
          }
        ],
        "constant": true,
        "inputs": [
          {
            "type": "uint256"
          }
        ],
        "name": "incentive",
        "stateMutability": "View",
        "type": "Function"
      },
      {
        "inputs": [
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "compoundReferralIncentive",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "inputs": [
          {
            "name": "_days",
            "type": "uint256"
          }
        ],
        "name": "startCycle",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "inputs": [
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "setMinimumFund",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "inputs": [
          {
            "name": "_recipient",
            "type": "address"
          },
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "transferGrowthFund",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "inputs": [
          {
            "name": "_duration",
            "type": "uint256"
          }
        ],
        "name": "setMinimumDuration",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "inputs": [
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "compoundReceivedFund",
        "stateMutability": "Nonpayable",
        "type": "Function"
      },
      {
        "outputs": [
          {
            "type": "bool"
          }
        ],
        "constant": true,
        "inputs": [
          {
            "name": "_address",
            "type": "address"
          }
        ],
        "name": "hasActiveCycle",
        "stateMutability": "View",
        "type": "Function"
      },
      {
        "stateMutability": "Nonpayable",
        "type": "Constructor"
      },
      {
        "inputs": [
          {
            "name": "_sender",
            "type": "address"
          },
          {
            "name": "_recipient",
            "type": "address"
          },
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "FundsTransferred",
        "type": "Event"
      },
      {
        "inputs": [
          {
            "name": "_address",
            "type": "address"
          },
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "FundsWithdrawn",
        "type": "Event"
      },
      {
        "inputs": [
          {
            "name": "_address",
            "type": "address"
          },
          {
            "name": "_cycle",
            "type": "uint256"
          }
        ],
        "name": "CycleStarted",
        "type": "Event"
      }
    ]
  }
    ]
    export default abi
