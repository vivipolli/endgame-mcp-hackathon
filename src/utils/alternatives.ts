export function getWeb3Alternatives(tool: string): string[] {
    const alternativesMap: Record<string, string[]> = {
      // Blockchains
      'ethereum': ['Solana', 'Avalanche', 'Polygon', 'Arbitrum', 'Optimism'],
      'solana': ['Ethereum', 'Avalanche', 'Near', 'Aptos'],
      'bitcoin': ['Ethereum', 'Litecoin', 'Bitcoin Cash'],
      'polygon': ['Ethereum', 'Arbitrum', 'Optimism', 'Avalanche'],
      'avalanche': ['Ethereum', 'Solana', 'Polygon', 'Fantom'],
      'fantom': ['Ethereum', 'Avalanche', 'Polygon'],
      'near': ['Ethereum', 'Solana', 'Avalanche'],
      'cosmos': ['Polkadot', 'Avalanche', 'Ethereum'],
      
      // Wallets
      'metamask': ['Coinbase Wallet', 'Trust Wallet', 'Rainbow', 'Brave Wallet'],
      'phantom': ['Solflare', 'Backpack', 'Glow'],
      'trustwallet': ['MetaMask', 'Coinbase Wallet', 'Exodus'],
      'coinbase wallet': ['MetaMask', 'Trust Wallet', 'Rainbow'],
      
      // Smart Contract Languages
      'solidity': ['Vyper', 'Rust', 'Move'],
      'rust': ['Solidity', 'Move', 'Ink'],
      'cairo': ['Solidity', 'Vyper', 'Rust'],
      
      // DeFi
      'uniswap': ['SushiSwap', 'Curve', 'Balancer', 'PancakeSwap'],
      'aave': ['Compound', 'Maker', 'Benqi'],
      'sushiswap': ['Uniswap', 'Curve', 'Balancer'],
      'curve': ['Uniswap', 'Balancer', 'SushiSwap'],
      
      // NFT Marketplaces
      'opensea': ['Blur', 'Rarible', 'Foundation', 'LooksRare'],
      'rarible': ['OpenSea', 'Foundation', 'SuperRare'],
      'blur': ['OpenSea', 'LooksRare', 'X2Y2'],
      'magic eden': ['OpenSea', 'Tensor', 'Solanart'],
      
      // Layer 2
      'arbitrum': ['Optimism', 'Polygon', 'zkSync', 'StarkNet'],
      'optimism': ['Arbitrum', 'Polygon', 'zkSync', 'Base'],
      'zksync': ['StarkNet', 'Polygon zkEVM', 'Arbitrum', 'Optimism'],
      'starknet': ['zkSync', 'Arbitrum', 'Optimism'],
      
      // Infrastructure
      'infura': ['Alchemy', 'QuickNode', 'Chainstack', 'Moralis'],
      'alchemy': ['Infura', 'QuickNode', 'Moralis', 'Ankr'],
      'moralis': ['Alchemy', 'Infura', 'QuickNode', 'thirdweb'],
      'chainlink': ['API3', 'Band Protocol', 'UMA', 'Pyth'],
      'graph': ['SubQuery', 'DIA', 'Covalent'],
      'ipfs': ['Arweave', 'Filecoin', 'Sia', 'Storj'],
      'thirdweb': ['Alchemy', 'Moralis', 'Truffle', 'Hardhat'],
      
      'default': ['Ethereum', 'Solana', 'Polygon', 'MetaMask', 'Alchemy']
    };
    
    const normalizedTool = tool.toLowerCase().trim();
    
    return alternativesMap[normalizedTool] || alternativesMap['default'];
  }