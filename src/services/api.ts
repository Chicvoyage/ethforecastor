import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const getEthereumPrice = async (): Promise<number> => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/simple/price?ids=ethereum&vs_currencies=usd`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
    
    if (!response.data?.ethereum?.usd) {
      throw new Error('Invalid price data received');
    }
    
    return Number(response.data.ethereum.usd);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch Ethereum price: ${error.message}`);
    }
    throw new Error('Failed to fetch Ethereum price');
  }
};