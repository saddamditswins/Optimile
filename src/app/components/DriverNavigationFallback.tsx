import { MapPin, Copy } from 'lucide-react';

interface DriverNavigationFallbackProps {
  address: string;
  customerName: string;
  onArrived: () => void;
}

export function DriverNavigationFallback({ address, customerName, onArrived }: DriverNavigationFallbackProps) {
  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(address).then(() => {
      alert('Address copied to clipboard');
    }).catch(() => {
      alert('Could not copy address');
    });
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        
        {/* Alert Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <MapPin className="w-10 h-10 text-gray-500" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
          Navigation unavailable
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Use the address below to navigate
        </p>

        {/* Address Card */}
        <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <div className="text-sm text-gray-500 mb-2">Destination</div>
          <div className="text-xl font-semibold text-gray-900 mb-3">
            {address}
          </div>
          <div className="text-gray-600 mb-4">
            Customer: {customerName}
          </div>

          {/* Copy Address Button */}
          <button
            onClick={copyAddressToClipboard}
            className="w-full bg-gray-100 text-gray-900 font-medium py-3 rounded-xl active:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <Copy className="w-5 h-5" />
            Copy Address
          </button>
        </div>

        {/* Arrived Button */}
        <button 
          onClick={onArrived}
          className="w-full bg-blue-600 text-white text-xl font-semibold py-5 rounded-2xl active:bg-blue-700 transition-colors"
        >
          I've Arrived
        </button>
      </div>
    </div>
  );
}
