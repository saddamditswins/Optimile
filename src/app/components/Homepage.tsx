import { motion } from 'motion/react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Radio,
  Route,
  Shield,
  Smartphone,
  Truck,
  Users,
} from 'lucide-react';
import { OptiMileLogo } from './OptiMileLogo';
import { ThemeToggle } from './ThemeToggle';

interface HomepageProps {
  onGetStarted: () => void;
}

const capabilities = [
  {
    title: 'Live Execution Monitoring',
    description:
      'Track every route, stop, and driver in real time, with risk surfaced the moment it emerges — not after the SLA is already missed.',
    icon: Activity,
    span: 'md:col-span-2',
  },
  {
    title: 'Intelligent Recovery Workflows',
    description:
      'Compare recovery options side by side, with live impact projections, before committing to a plan.',
    icon: Route,
    span: 'md:row-span-2',
  },
  {
    title: 'SLA Risk & Escalation Oversight',
    description:
      'Rank exceptions by operational impact and route the ones that need a second set of eyes.',
    icon: AlertTriangle,
    span: '',
  },
  {
    title: 'Fleet & Driver Coordination',
    description:
      'Keep dispatch, fleet supervisors, and drivers on the same page from first mile to last.',
    icon: Truck,
    span: '',
  },
  {
    title: 'Multi-Tenant Governance & Audit',
    description:
      'Role-based access, full decision history, and compliance-ready audit trails across every tenant workspace.',
    icon: Building2,
    span: 'md:col-span-3',
  },
];

const workflowSteps = [
  {
    label: 'Detect',
    title: 'See risk before it breaks your SLA',
    description:
      'Alerts and risk signals surface the moment they emerge, ranked by operational impact so nothing critical gets buried.',
    icon: AlertTriangle,
  },
  {
    label: 'Decide',
    title: 'Weigh every recovery option',
    description:
      'Build a recovery plan, preview its impact, and escalate for approval when a decision needs another set of eyes.',
    icon: Route,
  },
  {
    label: 'Resolve',
    title: 'Commit, execute, and confirm',
    description:
      'Commit the plan, monitor execution in real time, and close the loop with a full, audit-ready decision trail.',
    icon: CheckCircle2,
  },
];

const roles = [
  { name: 'Super Admin', icon: Shield },
  { name: 'Tenant Admin', icon: Users },
  { name: 'Dispatch Manager', icon: Radio },
  { name: 'Fleet Supervisor', icon: Truck },
  { name: 'Driver', icon: Smartphone },
  { name: 'Operations Manager', icon: BarChart3 },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

const routePath =
  'M 20 140 C 140 40, 260 40, 380 140 C 500 240, 620 240, 740 120';

const truckWaypoints = {
  left: ['2.6%', '26.3%', '50%', '73.7%', '97.4%'],
  top: ['50%', '17.9%', '50%', '82.1%', '42.9%'],
};

function DeliveryRouteScene() {
  return (
    <div className="relative w-full h-56 md:h-64" aria-hidden="true">
      <svg viewBox="0 0 760 280" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" fill="none">
        <defs>
          <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
        </defs>
        {/* Planned route */}
        <path
          d={routePath}
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 8"
          className="text-gray-300 dark:text-gray-700"
        />
        {/* Optimized route, drawn in on load */}
        <motion.path
          d={routePath}
          stroke="url(#routeGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.3 }}
        />
      </svg>

      {/* Depot marker */}
      <div className="absolute z-20" style={{ left: '2.6%', top: '50%' }}>
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-3 h-3 rounded-full bg-blue-600">
          <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-50" />
        </div>
        <span className="absolute top-4 left-0 text-[11px] font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
          Dispatched
        </span>
      </div>

      {/* Risk detected -> resolved marker */}
      <div className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={{ left: '50%', top: '50%' }}>
        <div className="relative w-8 h-8">
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border-2 border-amber-300 dark:border-amber-700"
            animate={{ opacity: [1, 1, 0, 0, 1] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.35, 0.45, 0.9, 1] }}
          >
            <AlertTriangle className="w-4 h-4" />
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-300 dark:border-emerald-700"
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.35, 0.45, 0.9, 1] }}
          >
            <CheckCircle2 className="w-4 h-4" />
          </motion.div>
        </div>
        <span className="absolute top-9 left-1/2 -translate-x-1/2 text-[11px] font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
          Risk detected → resolved
        </span>
      </div>

      {/* Destination marker */}
      <div className="absolute z-20" style={{ left: '97.4%', top: '42.9%' }}>
        <div className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full bg-emerald-600 text-white">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <span className="absolute top-6 right-0 text-[11px] font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
          Delivered
        </span>
      </div>

      {/* Truck following the optimized route */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ left: truckWaypoints.left[0], top: truckWaypoints.top[0] }}
        animate={{ left: truckWaypoints.left, top: truckWaypoints.top }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-700 dark:bg-blue-600 text-white shadow-lg shadow-blue-700/30 ring-4 ring-white dark:ring-gray-900">
          <Truck className="w-3.5 h-3.5" />
        </div>
      </motion.div>
    </div>
  );
}

export function Homepage({ onGetStarted }: HomepageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950 relative overflow-x-hidden">
      {/* Ambient background pattern (shared visual language with Role Selection) */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="homeRoutePattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" className="text-blue-700 dark:text-blue-300" />
              <circle cx="60" cy="40" r="2" fill="currentColor" className="text-blue-700 dark:text-blue-300" />
              <circle cx="100" cy="30" r="2" fill="currentColor" className="text-blue-700 dark:text-blue-300" />
              <circle cx="140" cy="50" r="2" fill="currentColor" className="text-blue-700 dark:text-blue-300" />
              <circle cx="180" cy="35" r="2" fill="currentColor" className="text-blue-700 dark:text-blue-300" />
              <path d="M 20 20 Q 40 30, 60 40" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3,3" className="text-blue-700 dark:text-blue-300" />
              <path d="M 60 40 Q 80 35, 100 30" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3,3" className="text-blue-700 dark:text-blue-300" />
              <path d="M 100 30 Q 120 40, 140 50" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3,3" className="text-blue-700 dark:text-blue-300" />
              <path d="M 140 50 Q 160 42, 180 35" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3,3" className="text-blue-700 dark:text-blue-300" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#homeRoutePattern)" />
        </svg>
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-700 to-transparent opacity-20 animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-300 dark:via-teal-700 to-transparent opacity-20 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute -top-32 -right-32 w-[32rem] h-[32rem] bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[28rem] h-[28rem] bg-teal-400/10 dark:bg-teal-500/10 rounded-full blur-3xl" />
      </div> */}

      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="min-w-0 shrink">
            <OptiMileLogo size="default" />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#capabilities" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Capabilities
            </a>
            <a href="#workflow" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Workflow
            </a>
            <a href="#roles" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Roles
            </a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Hero */}
        <section className="px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,5vw,4.25rem)] font-bold tracking-tight text-gray-900 dark:text-gray-100 leading-[1.1] mb-6"
            >
              Real-time control for last-mile delivery, from alert to resolution.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              OptiMile unifies dispatch, fleet, and operations teams around one system of
              execution — surfacing risk early, guiding recovery decisions, and keeping every
              stakeholder in sync until the delivery is done.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={onGetStarted}
                className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-700/20 hover:shadow-xl hover:shadow-blue-700/30 hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#capabilities"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold px-7 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
              >
                Explore Capabilities
              </a>
            </motion.div>

            {/* Live delivery route illustration */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-16 max-w-3xl mx-auto rounded-3xl border-2 border-gray-100 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm px-6 pt-8 pb-4 md:px-10 md:pt-10 shadow-sm"
            >
              <DeliveryRouteScene />
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                A live look at how OptiMile keeps every delivery on track.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="px-6 py-24 md:py-32 scroll-mt-20 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
                Everything execution teams need, one system
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Purpose-built for the moments that decide whether a delivery day goes right.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(180px,auto)] gap-5 grid-flow-dense">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-7 border-2 border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between ${capability.span}`}
                >
                  <div>
                    <div className="mb-5 inline-flex p-3.5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 text-blue-700 dark:text-blue-300 transition-transform duration-300 group-hover:scale-110">
                      <capability.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {capability.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section id="workflow" className="px-6 py-24 md:py-32 scroll-mt-20 bg-white/50 dark:bg-gray-900/30 border-y border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
                From first signal to closed loop
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Every recovery follows the same disciplined path, so nothing falls through the cracks.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950 dark:to-teal-950 text-blue-700 dark:text-blue-300">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold tracking-wide uppercase text-blue-700 dark:text-blue-300">
                      {step.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 z-10 items-center justify-center w-6 h-6 text-gray-300 dark:text-gray-600">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Roles */}
        <section id="roles" className="px-6 py-24 md:py-32 scroll-mt-20">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
                Built for every seat in the operation
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-14">
                From dispatch to the boardroom, OptiMile adapts to what each role needs to see and do.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
              {roles.map((role, index) => (
                <motion.div
                  key={role.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300">
                    <role.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-snug">
                    {role.name}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.button
              {...fadeUp}
              onClick={onGetStarted}
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-700/20 hover:shadow-xl hover:shadow-blue-700/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              Choose Your Role
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 pb-24 md:pb-32">
          <motion.div
            {...fadeUp}
            className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-blue-700 to-blue-900 dark:from-blue-800 dark:to-gray-950 px-8 py-16 md:py-20 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute -top-16 -right-16 w-72 h-72 bg-white rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-teal-300 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Ready to see it in action?
              </h2>
              <p className="text-lg text-blue-100 max-w-xl mx-auto leading-relaxed mb-8">
                Explore OptiMile as any role in demo mode — no setup required.
              </p>
              <button
                onClick={onGetStarted}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-800 font-semibold px-7 py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Enterprise-grade security and compliance enabled</span>
            </div>
            <div>© 2025 OptiMile. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
