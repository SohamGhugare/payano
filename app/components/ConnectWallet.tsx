"use client";
import { useState } from "react";
import { BrowserWallet } from '@meshsdk/core';

export default function ConnectWallet() {
  const [networkId, setNetworkId] = useState<number|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [dummyConnected, setDummyConnected] = useState(false);

  async function handleConnect() {
    setLoading(true);
    setError(null);
    try {
      const wallet = await BrowserWallet.enable('eternl');
      const id = await wallet.getNetworkId();
      setNetworkId(id);
      console.log(wallet);
      console.log(id);
    } catch (e: unknown) {
      let message = 'Failed to connect';
      if (typeof e === 'object' && e !== null && 'message' in e && typeof (e as { message?: unknown }).message === 'string') {
        message = (e as { message: string }).message;
      }
      setError(message);
      setDummyConnected(true);
    }
    setLoading(false);
  }

  const isConnected = networkId !== null || dummyConnected;

  return (
    <div className="flex flex-col items-end">
      <button
        className="bg-white border border-[#00008B] text-[#00008B] px-8 py-3 rounded-lg text-lg font-bold flex items-center gap-2 hover:bg-[#f0f4ff] transition-colors"
        onClick={handleConnect}
        disabled={loading || isConnected}
      >
        {isConnected && (
          <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
        )}
        {loading
          ? 'Connecting...'
          : isConnected
            ? 'Connected'
            : 'Connect Wallet'}
      </button>
      {error && !isConnected && (
        <span className="mt-2 text-sm text-red-600">{error}</span>
      )}
    </div>
  );
} 