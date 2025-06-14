export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-tight">
          <span className="text-[#1a1a1a]">Buy Anything. </span>
          <span className="text-[#00008B]">Pay Later.</span>
          <br />
          <span className="text-[#1a1a1a]">Keep your Ada.</span>
        </h1>
        <p className="mt-8 text-xl text-gray-600 max-w-2xl mx-auto italic">
          Payano lets you shop online using your Ada as collateral—without selling it. Get instant approval, flexible repayment terms, and keep your Ada stacking.
        </p>
        <button className="mt-8 bg-[#00008B] text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-[#000066] transition-colors">
          Start with Payano
        </button>
      </div>
    </div>
  );
}
