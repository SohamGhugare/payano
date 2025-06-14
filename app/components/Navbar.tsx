import Image from "next/image";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-white">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Payano Logo" width={36} height={36} className="cursor-pointer" />
            <span className="text-2xl font-bold text-[#00008B] tracking-tight">Payano</span>
        </Link>
      </div>
      <ConnectWallet />
    </nav>
  );
} 