"use client";
import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string | ReactNode;
  value?: string;
  secondaryValue?: string;
  icon?: React.ReactNode;
  badge?: {
    text: string;
    color: string;
  };
  button?: {
    text: string;
    onClick: () => void;
  };
  subtext?: string;
}

export const DashboardCard = ({ title, value, secondaryValue, icon, badge, button, subtext }: DashboardCardProps) => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl border border-gray-100 p-8 
      shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,139,0.15)] 
      transition-all duration-300 hover:-translate-y-1">
      <h2 className="text-2xl font-semibold text-[#00008B] mb-8 text-center">
        {title}
      </h2>
      {button ? (
        <div className="flex flex-col items-center">
          <button
            onClick={button.onClick}
            className="px-6 py-3 bg-[#00008B] text-white rounded-xl 
              hover:bg-[#000066] transition-all duration-300 font-semibold
              shadow-[0_4px_12px_-2px_rgba(0,0,139,0.15)] hover:shadow-[0_6px_16px_-2px_rgba(0,0,139,0.2)]
              hover:-translate-y-0.5"
          >
            {button.text}
          </button>
          {subtext && (
            <p className="text-sm text-gray-500 mt-4 text-center">{subtext}</p>
          )}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {icon}
              {value && <span className="text-xl font-semibold text-gray-600">{value}</span>}
            </div>
            <div className="flex items-center space-x-3">
              {secondaryValue && (
                <span className="text-xl font-semibold text-gray-600">{secondaryValue}</span>
              )}
              {badge && (
                <span className={`px-4 py-1.5 bg-[#e6eaff] text-[#00008B] rounded-full text-sm font-semibold
                  shadow-[0_2px_8px_-2px_rgba(0,0,139,0.08)]`}>
                  {badge.text}
                </span>
              )}
            </div>
          </div>
          {subtext && (
            <p className="text-sm text-gray-500 mt-4 text-center whitespace-pre-line">{subtext}</p>
          )}
        </>
      )}
    </div>
  );
}; 