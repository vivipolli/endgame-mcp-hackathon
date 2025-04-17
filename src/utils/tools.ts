enum Web3Category {
    BLOCKCHAIN = "Blockchain",
    SMART_CONTRACT = "Smart Contracts",
    WALLET = "Carteiras",
    NFT = "NFTs",
    DEFI = "DeFi",
    EXCHANGE = "Exchanges",
    LAYER2 = "Layer 2",
    INFRASTRUCTURE = "Infraestrutura"
  }


export function categorizeWeb3Tool(tool: string): string {
    const normalizedTool = tool.toLowerCase().trim();
    
    const categoryMap: Record<string, string> = {
      // Blockchains
      'ethereum': Web3Category.BLOCKCHAIN,
      'solana': Web3Category.BLOCKCHAIN,
      'bitcoin': Web3Category.BLOCKCHAIN,
      'cardano': Web3Category.BLOCKCHAIN,
      'avalanche': Web3Category.BLOCKCHAIN,
      'polkadot': Web3Category.BLOCKCHAIN,
      'near': Web3Category.BLOCKCHAIN,
      'cosmos': Web3Category.BLOCKCHAIN,
      'tezos': Web3Category.BLOCKCHAIN,
      'algorand': Web3Category.BLOCKCHAIN,
      'stellar': Web3Category.BLOCKCHAIN,
      'flow': Web3Category.BLOCKCHAIN,
      'hedera': Web3Category.BLOCKCHAIN,
      'elrond': Web3Category.BLOCKCHAIN,
      'celo': Web3Category.BLOCKCHAIN,
      'harmony': Web3Category.BLOCKCHAIN,
      'fantom': Web3Category.BLOCKCHAIN,
      
      // Smart Contracts
      'solidity': Web3Category.SMART_CONTRACT,
      'rust': Web3Category.SMART_CONTRACT,
      'vyper': Web3Category.SMART_CONTRACT,
      'move': Web3Category.SMART_CONTRACT,
      'ink': Web3Category.SMART_CONTRACT,
      'cairo': Web3Category.SMART_CONTRACT,
      'cadence': Web3Category.SMART_CONTRACT,
      'yul': Web3Category.SMART_CONTRACT,
      
      // Wallets
      'metamask': Web3Category.WALLET,
      'phantom': Web3Category.WALLET,
      'trustwallet': Web3Category.WALLET,
      'coinbase wallet': Web3Category.WALLET,
      'ledger': Web3Category.WALLET,
      'trezor': Web3Category.WALLET,
      'brave wallet': Web3Category.WALLET,
      'rainbow': Web3Category.WALLET,
      'exodus': Web3Category.WALLET,
      
      // NFTs
      'opensea': Web3Category.NFT,
      'rarible': Web3Category.NFT,
      'foundation': Web3Category.NFT,
      'superrare': Web3Category.NFT,
      'nifty gateway': Web3Category.NFT,
      'zora': Web3Category.NFT,
      'blur': Web3Category.NFT,
      'magic eden': Web3Category.NFT,
      
      // DeFi
      'uniswap': Web3Category.DEFI,
      'aave': Web3Category.DEFI,
      'compound': Web3Category.DEFI,
      'curve': Web3Category.DEFI,
      'maker': Web3Category.DEFI,
      'pancakeswap': Web3Category.DEFI,
      'sushiswap': Web3Category.DEFI,
      'yearn': Web3Category.DEFI,
      'balancer': Web3Category.DEFI,
      
      // Exchanges
      'binance': Web3Category.EXCHANGE,
      'coinbase': Web3Category.EXCHANGE,
      'kraken': Web3Category.EXCHANGE,
      'ftx': Web3Category.EXCHANGE,
      'gemini': Web3Category.EXCHANGE,
      'kucoin': Web3Category.EXCHANGE,
      'huobi': Web3Category.EXCHANGE,
      'okx': Web3Category.EXCHANGE,
      
      // Layer 2
      'arbitrum': Web3Category.LAYER2,
      'optimism': Web3Category.LAYER2,
      'polygon': Web3Category.LAYER2,
      'zksync': Web3Category.LAYER2,
      'starknet': Web3Category.LAYER2,
      'loopring': Web3Category.LAYER2,
      'immutablex': Web3Category.LAYER2,
      'metis': Web3Category.LAYER2,
      
      // Infrastructure
      'infura': Web3Category.INFRASTRUCTURE,
      'alchemy': Web3Category.INFRASTRUCTURE,
      'moralis': Web3Category.INFRASTRUCTURE,
      'quicknode': Web3Category.INFRASTRUCTURE,
      'chainlink': Web3Category.INFRASTRUCTURE,
      'graph': Web3Category.INFRASTRUCTURE,
      'ipfs': Web3Category.INFRASTRUCTURE,
      'filecoin': Web3Category.INFRASTRUCTURE,
      'arweave': Web3Category.INFRASTRUCTURE,
      'ceramic': Web3Category.INFRASTRUCTURE,
      'web3auth': Web3Category.INFRASTRUCTURE,
      'worldcoin': Web3Category.INFRASTRUCTURE,
      'thirdweb': Web3Category.INFRASTRUCTURE,
      'lens protocol': Web3Category.INFRASTRUCTURE,
      'biconomy': Web3Category.INFRASTRUCTURE
    };
    
    return categoryMap[normalizedTool] || "Others";
  }