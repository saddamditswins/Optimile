interface RoleCardProps {
  role: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    level: 'critical' | 'high' | 'medium';
  };
  onClick: () => void;
}

export function RoleCard({ role, onClick }: RoleCardProps) {
  // Role-specific accent colors and styling
  const getRoleStyles = () => {
    // Dispatch Manager - Orange/Amber, live/time-sensitive
    if (role.id === 'dispatch-manager') {
      return {
        accentColor: 'from-orange-500 to-amber-500',
        hoverGlow: 'hover:shadow-orange-200',
        iconBg: 'bg-gradient-to-br from-orange-50 to-amber-50',
        iconColor: 'text-orange-600',
        accentStrip: 'bg-gradient-to-r from-orange-500 to-amber-500',
        pulse: true
      };
    }
    
    // Driver - Blue, mobile-focused
    if (role.id === 'driver') {
      return {
        accentColor: 'from-blue-500 to-blue-600',
        hoverGlow: 'hover:shadow-blue-200',
        iconBg: 'bg-gradient-to-br from-blue-50 to-blue-100',
        iconColor: 'text-blue-600',
        accentStrip: 'bg-gradient-to-r from-blue-500 to-blue-600',
        pulse: false
      };
    }
    
    // Fleet Supervisor - Teal, operational/resource-based
    if (role.id === 'fleet-supervisor') {
      return {
        accentColor: 'from-teal-500 to-cyan-500',
        hoverGlow: 'hover:shadow-teal-200',
        iconBg: 'bg-gradient-to-br from-teal-50 to-cyan-50',
        iconColor: 'text-teal-600',
        accentStrip: 'bg-gradient-to-r from-teal-500 to-cyan-500',
        pulse: false
      };
    }
    
    // Operations Manager - Purple/Deep Blue, governance
    if (role.id === 'operations-manager') {
      return {
        accentColor: 'from-purple-600 to-blue-700',
        hoverGlow: 'hover:shadow-purple-200',
        iconBg: 'bg-gradient-to-br from-purple-50 to-blue-50',
        iconColor: 'text-purple-700',
        accentStrip: 'bg-gradient-to-r from-purple-600 to-blue-700',
        pulse: false
      };
    }
    
    // Admins - Neutral, stable
    return {
      accentColor: 'from-gray-600 to-gray-700',
      hoverGlow: 'hover:shadow-gray-200',
      iconBg: 'bg-gradient-to-br from-gray-50 to-gray-100',
      iconColor: 'text-gray-700',
      accentStrip: 'bg-gradient-to-r from-gray-600 to-gray-700',
      pulse: false
    };
  };

  const styles = getRoleStyles();

  return (
    <button
      onClick={onClick}
      className={`
        relative group
        bg-white dark:bg-gray-800 rounded-2xl p-7 text-left 
        transition-all duration-300 ease-out
        border-2 border-gray-100 dark:border-gray-700
        hover:border-gray-200 dark:hover:border-gray-600
        hover:-translate-y-1
        hover:shadow-xl ${styles.hoverGlow}
        focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900
        overflow-hidden
      `}
    >
      {/* Accent strip at top */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${styles.accentStrip} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Subtle pulse indicator for time-sensitive roles */}
      {styles.pulse && (
        <div className="absolute top-4 right-4">
          <div className="relative w-3 h-3">
            <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-75" />
            <div className="relative w-3 h-3 bg-orange-500 rounded-full" />
          </div>
        </div>
      )}

      {/* Icon */}
      <div className="mb-5">
        <div className={`
          ${styles.iconBg} ${styles.iconColor} 
          p-4 rounded-xl inline-flex
          transition-transform duration-300
          group-hover:scale-110
        `}>
          {role.icon}
        </div>
      </div>

      {/* Role Name */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 transition-colors group-hover:text-gray-800 dark:group-hover:text-gray-200">
        {role.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {role.description}
      </p>
      
      {/* Hover accent glow effect */}
      <div className={`
        absolute inset-0 bg-gradient-to-br ${styles.accentColor} 
        opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10
        transition-opacity duration-300 rounded-2xl
      `} />
    </button>
  );
}