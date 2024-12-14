import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { getEthereumPrice } from './services/api';
import { PortfolioForm } from './components/PortfolioForm';
import { PriceChart } from './components/PriceChart';
import { EthereumData, PriceData } from './types/ethereum';
import { Coins } from 'lucide-react';

function App() {
  const [ethereumData, setEthereumData] = useState<EthereumData>({
    amount: 0,
    currentPrice: 0,
    email: '',
    alertThreshold: 0,
  });

  const [priceHistory, setPriceHistory] = useState<PriceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPrice = async () => {
      try {
        setIsLoading(true);
        const price = await getEthereumPrice();
        
        if (isMounted) {
          setEthereumData(prev => ({ ...prev, currentPrice: price }));
          setPriceHistory(prev => {
            const newHistory = [...prev, { 
              price, 
              timestamp: new Date().toISOString() 
            }];
            // Keep only last 24 data points
            return newHistory.slice(-24);
          });
        }
      } catch (error) {
        if (isMounted) {
          toast.error(error instanceof Error ? error.message : 'Failed to fetch Ethereum price');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // Update every minute

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Portfolio updated successfully!');
    // In a real application, you would implement the email alert system here
  };

  const portfolioValue = ethereumData.amount * ethereumData.currentPrice;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Coins className="w-8 h-8 text-indigo-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Ethereum Portfolio Forecaster</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Portfolio Details</h2>
            <PortfolioForm
              amount={ethereumData.amount}
              email={ethereumData.email}
              alertThreshold={ethereumData.alertThreshold}
              onAmountChange={(value) => setEthereumData(prev => ({ ...prev, amount: value }))}
              onEmailChange={(value) => setEthereumData(prev => ({ ...prev, email: value }))}
              onAlertThresholdChange={(value) => setEthereumData(prev => ({ ...prev, alertThreshold: value }))}
              onSubmit={handleSubmit}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Portfolio Overview</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Current ETH Price</p>
                {isLoading ? (
                  <div className="animate-pulse h-8 bg-gray-200 rounded w-32"></div>
                ) : (
                  <p className="text-2xl font-bold text-indigo-600">
                    ${ethereumData.currentPrice.toLocaleString()}
                  </p>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">Portfolio Value</p>
                {isLoading ? (
                  <div className="animate-pulse h-8 bg-gray-200 rounded w-32"></div>
                ) : (
                  <p className="text-2xl font-bold text-indigo-600">
                    ${portfolioValue.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <PriceChart data={priceHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;