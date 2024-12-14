import React from 'react';
import { Mail, Wallet, DollarSign, Bell } from 'lucide-react';

interface PortfolioFormProps {
  amount: number;
  email: string;
  alertThreshold: number;
  onAmountChange: (value: number) => void;
  onEmailChange: (value: string) => void;
  onAlertThresholdChange: (value: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PortfolioForm: React.FC<PortfolioFormProps> = ({
  amount,
  email,
  alertThreshold,
  onAmountChange,
  onEmailChange,
  onAlertThresholdChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            ETH Amount
          </div>
        </label>
        <input
          type="number"
          step="0.0001"
          value={amount}
          onChange={(e) => onAmountChange(parseFloat(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter ETH amount"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address
          </div>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter email for alerts"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Alert Threshold (USD)
          </div>
        </label>
        <input
          type="number"
          step="100"
          value={alertThreshold}
          onChange={(e) => onAlertThresholdChange(parseFloat(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Set price alert threshold"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Update Portfolio
      </button>
    </form>
  );
};