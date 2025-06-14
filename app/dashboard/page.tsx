"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DashboardCard } from '../components/dashboard-card';
import { CircleDollarSign, ArrowRight } from 'lucide-react';

interface TokenBalance {
  token: string;
  balance: string;
}

export default function Dashboard() {
  const router = useRouter();
  const adaBalance = 1000000000;

  // ADA values
  const adaAmount = Number(adaBalance) / 1_000_000; // Convert from lovelace to ADA
  const adaPrice = 0.42; // Current ADA price in USD (example)
  const adaLockedAmount = (adaAmount * 0.2).toFixed(2);
  const adaAvailableAmount = (adaAmount * 0.8).toFixed(2);
  const adaFormattedBalance = `${adaAmount.toFixed(2)} ADA`;
  const adaUsdEquivalent = adaAmount * adaPrice;
  const adaUsdFormatted = `$${adaUsdEquivalent.toFixed(2)}`;

  // Calculate borrowing power based on current USD equivalent
  const borrowingPower = adaUsdEquivalent / 1.5;
  const borrowingPowerFormatted = `$${borrowingPower.toFixed(2)}`;

  // Dummy loans data
  const loans = [
    {
      title: "New Laptop",
      lockedAmount: 200,
      dueDate: "3/15/2025",
    },
    {
      title: "Personal Loan",
      lockedAmount: 50,
      dueDate: "5/10/2025",
    },
    {
      title: "Travel Loan",
      lockedAmount: 400,
      dueDate: "7/20/2025",
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter text-[#00008B]">
            Dashboard
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <DashboardCard
            title="Your ADA Balance"
            value={adaFormattedBalance}
            secondaryValue={adaUsdFormatted}
            icon={<CircleDollarSign className="w-8 h-8 text-[#00008B]" />}
            subtext={`Available: ${adaAvailableAmount} ADA\nLocked: ${adaLockedAmount} ADA`}
          />
          <DashboardCard
            title="Borrowing Power"
            value={borrowingPowerFormatted}
            badge={{
              text: "80% LTV",
              color: "bg-[#e6eaff] text-[#00008B]"
            }}
            subtext="Based on your available ADA balance"
          />
          <DashboardCard
            title="Loan"
            button={{
              text: "+ Start New Purchase",
              onClick: () => {
                router.push('/purchase');
              }
            }}
            subtext="Borrow USD against ADA"
          />
        </div>

        {/* Active Loans Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#00008B] mb-6">Active Loans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loans.map((loan, index) => {
              const loanAmount = loan.lockedAmount * adaPrice * 1.5;
              return (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#00008B]">{loan.title}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                        Active
                      </span>
                    </div>
                    <button className="text-[#00008B] hover:text-[#000066] transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Loan Amount</span>
                      <span className="text-sm font-medium text-gray-900">${loanAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Locked ADA</span>
                      <span className="text-sm font-medium text-gray-900">{loan.lockedAmount} ADA</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Due</span>
                      <span className="text-sm font-medium text-gray-900">{loan.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-bold">
                      View Details
                    </button>
                    <button className="flex-1 px-4 py-2 bg-[#e6eaff] text-[#00008B] border border-[#00008B] rounded-lg 
                      hover:bg-[#d0d8ff] transition-all duration-300 font-bold">
                      Pay Installment
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
} 