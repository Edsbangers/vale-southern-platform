'use client';

import { useState, useEffect } from 'react';
import {
  Shield,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  Clock
} from 'lucide-react';

interface AccreditationStatus {
  name: string;
  shortName: string;
  status: 'valid' | 'pending' | 'expiring' | 'expired';
  validUntil: string;
  certificateNumber: string;
  verifyUrl: string;
  lastChecked: Date;
}

// Simulated PICMS.com API response
const fetchPICMSStatus = async (): Promise<AccreditationStatus[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    {
      name: 'ISO 9001:2015 Quality Management',
      shortName: 'ISO 9001',
      status: 'valid',
      validUntil: '2025-12-31',
      certificateNumber: 'QMS-2024-7823',
      verifyUrl: 'https://picms.com/verify/qms-2024-7823',
      lastChecked: new Date()
    },
    {
      name: 'ISO 14001:2015 Environmental Management',
      shortName: 'ISO 14001',
      status: 'valid',
      validUntil: '2025-12-31',
      certificateNumber: 'EMS-2024-4456',
      verifyUrl: 'https://picms.com/verify/ems-2024-4456',
      lastChecked: new Date()
    },
    {
      name: 'ISO 45001:2018 Occupational Health & Safety',
      shortName: 'ISO 45001',
      status: 'valid',
      validUntil: '2025-12-31',
      certificateNumber: 'OHSMS-2024-9912',
      verifyUrl: 'https://picms.com/verify/ohsms-2024-9912',
      lastChecked: new Date()
    },
    {
      name: 'CHAS Premier',
      shortName: 'CHAS Premier',
      status: 'valid',
      validUntil: '2025-08-15',
      certificateNumber: 'CP-55821',
      verifyUrl: 'https://chas.co.uk/verify/cp-55821',
      lastChecked: new Date()
    },
    {
      name: 'Constructionline Gold',
      shortName: 'CL Gold',
      status: 'valid',
      validUntil: '2025-10-22',
      certificateNumber: 'CLG-182994',
      verifyUrl: 'https://constructionline.co.uk/verify/clg-182994',
      lastChecked: new Date()
    },
    {
      name: 'SafeContractor',
      shortName: 'SafeContractor',
      status: 'valid',
      validUntil: '2025-09-30',
      certificateNumber: 'SC-44872',
      verifyUrl: 'https://safecontractor.com/verify/sc-44872',
      lastChecked: new Date()
    }
  ];
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'valid':
      return 'text-green-400';
    case 'expiring':
      return 'text-yellow-400';
    case 'pending':
      return 'text-blue-400';
    case 'expired':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'valid':
      return CheckCircle2;
    case 'expiring':
      return Clock;
    case 'pending':
      return RefreshCw;
    case 'expired':
      return AlertCircle;
    default:
      return Shield;
  }
};

export default function AccreditationRibbon() {
  const [accreditations, setAccreditations] = useState<AccreditationStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  useEffect(() => {
    const loadStatus = async () => {
      setIsLoading(true);
      const data = await fetchPICMSStatus();
      setAccreditations(data);
      setIsLoading(false);
    };

    loadStatus();

    // Refresh every 5 minutes
    const interval = setInterval(loadStatus, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#f8f9fa] border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Header */}
          <div className="flex items-center mb-4 lg:mb-0">
            <Shield className="h-6 w-6 text-[#002147] mr-3" />
            <div>
              <div className="flex items-center">
                <span className="font-semibold text-[#002147]">Audit Ready Status</span>
                <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 status-live"></span>
                  LIVE
                </span>
              </div>
              <span className="text-xs text-[#707070]">
                Verified by PICMS.com • Updated every 5 minutes
              </span>
            </div>
          </div>

          {/* Accreditation Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {isLoading ? (
              <div className="flex items-center text-sm text-[#707070]">
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                Loading accreditations...
              </div>
            ) : (
              accreditations.map((acc) => {
                const StatusIcon = getStatusIcon(acc.status);
                return (
                  <div
                    key={acc.certificateNumber}
                    className="relative group"
                    onMouseEnter={() => setShowDetails(acc.certificateNumber)}
                    onMouseLeave={() => setShowDetails(null)}
                  >
                    <div className="flex items-center px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-[#002147] transition-all cursor-pointer">
                      <StatusIcon className={`h-4 w-4 mr-2 ${getStatusColor(acc.status)}`} />
                      <span className="text-sm font-medium text-[#002147]">{acc.shortName}</span>
                    </div>

                    {/* Tooltip */}
                    {showDetails === acc.certificateNumber && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 bg-[#002147] text-white rounded-lg shadow-xl p-4 z-50">
                        <div className="text-sm font-semibold mb-2">{acc.name}</div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Certificate:</span>
                            <span>{acc.certificateNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Status:</span>
                            <span className={getStatusColor(acc.status)}>
                              {acc.status.charAt(0).toUpperCase() + acc.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Valid Until:</span>
                            <span>{new Date(acc.validUntil).toLocaleDateString('en-GB')}</span>
                          </div>
                        </div>
                        <a
                          href={acc.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 flex items-center justify-center text-xs text-[#c5a572] hover:text-[#d4ba8f]"
                        >
                          Verify Certificate
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                        {/* Tooltip Arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="border-8 border-transparent border-t-[#002147]"></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
