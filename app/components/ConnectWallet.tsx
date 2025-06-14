"use client";
import { useState, useEffect, useRef } from "react";
import { BrowserWallet } from '@meshsdk/core';

export default function ConnectWallet() {
  const [networkId, setNetworkId] = useState<number|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [dummyConnected, setDummyConnected] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // On mount, check localStorage for connection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const connected = localStorage.getItem('payano_wallet_connected');
      if (connected === 'true') {
        setDummyConnected(true);
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  async function handleConnect() {
    setLoading(true);
    setError(null);
    try {
      const wallet = await BrowserWallet.enable('eternl');
      const id = await wallet.getNetworkId();
      setNetworkId(id);
      localStorage.setItem('payano_wallet_connected', 'true');
      setDummyConnected(true);
      setDropdownOpen(false);
      console.log(wallet);
      console.log(id);
    } catch (e: unknown) {
      let message = 'Failed to connect';
      if (typeof e === 'object' && e !== null && 'message' in e && typeof (e as { message?: unknown }).message === 'string') {
        message = (e as { message: string }).message;
      }
      setError(message);
      localStorage.setItem('payano_wallet_connected', 'true');
      setDummyConnected(true);
      setDropdownOpen(false);
    }
    setLoading(false);
  }

  function handleDisconnect() {
    setDummyConnected(false);
    setNetworkId(null);
    localStorage.removeItem('payano_wallet_connected');
    setDropdownOpen(false);
  }

  const isConnected = networkId !== null || dummyConnected;

  return (
    <div className="flex flex-col items-end relative" ref={dropdownRef}>
      <button
        className="bg-white border border-[#00008B] text-[#00008B] px-6 py-2 rounded-lg text-lg font-bold flex items-center gap-2 hover:bg-[#f0f4ff] transition-colors cursor-pointer"
        onClick={isConnected ? () => setDropdownOpen((open) => !open) : handleConnect}
        disabled={loading}
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
      {isConnected && dropdownOpen && (
        <div className="absolute right-0 mt-16 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <button
            className="block w-full text-left px-4 py-2 text-[#00008B] hover:bg-[#f0f4ff] rounded-lg cursor-pointer"
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </div>
      )}
      {error && !isConnected && (
        <span className="mt-2 text-sm text-red-600">{error}</span>
      )}
    </div>
  );
} 