export function OptiMileLogo({ size = 'default' }: { size?: 'default' | 'large' }) {
  const dimensions = size === 'large' ? 'w-16 h-16' : 'w-12 h-12';
  
  return (
    <div className="flex items-center gap-4">
      {/* Logo Icon - Delivery truck with route marker */}
      <div className={`${dimensions} relative flex-shrink-0`}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Circular background */}
          <circle cx="24" cy="24" r="22" fill="#1E40AF" opacity="0.1"/>
          <circle cx="24" cy="24" r="18" fill="white"/>
          <circle cx="24" cy="24" r="18" stroke="#1E40AF" strokeWidth="2"/>
          
          {/* Delivery Truck */}
          <g transform="translate(24, 24)">
            {/* Truck cargo area */}
            <rect x="-9" y="-5" width="10" height="7" rx="1" fill="#1E40AF"/>
            
            {/* Truck cab */}
            <path 
              d="M 1 -5 L 5 -5 L 7 -2 L 7 2 L 1 2 Z" 
              fill="#1E40AF"
            />
            
            {/* Windshield */}
            <path 
              d="M 2 -4 L 5 -4 L 6 -2 L 2 -2 Z" 
              fill="#60A5FA" 
              opacity="0.5"
            />
            
            {/* Wheels */}
            <circle cx="-6" cy="3" r="2" fill="#374151"/>
            <circle cx="-6" cy="3" r="1" fill="#9CA3AF"/>
            <circle cx="4" cy="3" r="2" fill="#374151"/>
            <circle cx="4" cy="3" r="1" fill="#9CA3AF"/>
            
            {/* Motion lines behind truck */}
            <line x1="-12" y1="-2" x2="-9" y2="-2" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="-13" y1="1" x2="-9" y2="1" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
            
            {/* Package/box icon on cargo */}
            <rect x="-6.5" y="-3" width="3" height="3" rx="0.5" fill="#60A5FA" opacity="0.4"/>
            <line x1="-6.5" y1="-1.5" x2="-3.5" y2="-1.5" stroke="white" strokeWidth="0.5"/>
            <line x1="-5" y1="-3" x2="-5" y2="0" stroke="white" strokeWidth="0.5"/>
          </g>
        </svg>
      </div>
      
      {/* Logo Text */}
      <div>
        <h1 className={`${size === 'large' ? 'text-4xl' : 'text-2xl'} font-bold text-gray-900 dark:text-gray-100 tracking-tight`}>
          OptiMile
        </h1>
        <p className={`${size === 'large' ? 'text-sm' : 'text-xs'} text-gray-500 dark:text-gray-400 font-medium tracking-wide`}>
          Last-Mile Execution Control Platform
        </p>
      </div>
    </div>
  );
}