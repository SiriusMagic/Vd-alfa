import React, { useEffect, useMemo, useState } from "react";
import {
  Eye,
  Shield,
  Move,
  MapPin,
  Wind,
  CircleDot,
  Target,
  ArrowUp,
  Sparkles,
  Activity,
  AlertTriangle,
  Leaf,
  Battery,
  ArrowLeftRight,
  Settings,
  Car,
  Heart,
  Mountain,
  Radar,
  Gauge,
  RotateCcw,
  Smartphone
} from "lucide-react";

// Sistemas (24) - excluimos VehicleInterface y FuturisticInterface
import ReconnaissanceSystem from "./ReconnaissanceSystem";
import SecuritySystem from "./SecuritySystem";
import CrabModeSystem from "./CrabModeSystem";
import VidenSystem from "./VidenSystem";
import GeocercasSystem from "./GeocercasSystem";
import AerodinamicaSystem from "./AerodinamicaSystem";
import TireSystem from "./TireSystem";
import EnhancedTireSystem from "./EnhancedTireSystem";
import CompressorSystem from "./CompressorSystem";
import UVHygienizationSystem from "./UVHygienizationSystem";
import ParameterMonitoringSystem from "./ParameterMonitoringSystem";
import CodesSystem from "./CodesSystem";
import TreeRSystem from "./TreeRSystem";
import AutonomyControl from "./AutonomyControl";
import TractionControl from "./TractionControl";
import SmartVehicleControl from "./SmartVehicleControl";
import ComfortSystems from "./ComfortSystems";
import AdvancedDriving from "./AdvancedDriving";
import PowerControlSystem from "./PowerControlSystem";
import BionicCooling from "./BionicCooling";
import SuspensionControl from "./SuspensionControl";
import SituationalAwareness from "./SituationalAwareness";
import AdvancedDiagnostics from "./AdvancedDiagnostics";
import VirtualTransmission from "./VirtualTransmission"; // para completar 24

const FuturisticInterface = () => {
  // Forzar paisaje (landscape) con overlay bloqueante
  const [isLandscape, setIsLandscape] = useState(() => window.innerWidth > window.innerHeight);

  useEffect(() => {
    const onResize = () => setIsLandscape(window.innerWidth > window.innerHeight);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  // Definir 24 secciones (icono + nombre)
  const sections = useMemo(
    () => [
      { id: "reconnaissance", name: "Reconocimiento", icon: Eye },
      { id: "security", name: "Seguridad", icon: Shield },
      { id: "crab-mode", name: "Modo Cangrejo", icon: Move },
      { id: "viden", name: "Viden", icon: Shield },
      { id: "geocercas", name: "Geocercas", icon: MapPin },
      { id: "aerodinamica", name: "Aerodinámica", icon: Wind },
      { id: "tires", name: "Neumáticos", icon: CircleDot },
      { id: "enhanced-tires", name: "Neumáticos Pro", icon: Target },
      { id: "compressor", name: "Compresor", icon: ArrowUp },
      { id: "uv-hygiene", name: "Higienización UV", icon: Sparkles },
      { id: "monitoring", name: "Monitoreo", icon: Activity },
      { id: "codes", name: "Códigos", icon: AlertTriangle },
      { id: "treer", name: "TreeR", icon: Leaf },
      { id: "autonomy", name: "Autonomía", icon: Battery },
      { id: "traction", name: "Tracción", icon: ArrowLeftRight },
      { id: "smart", name: "Inteligente", icon: Sparkles },
      { id: "comfort", name: "Confort", icon: Settings },
      { id: "driving", name: "Conducción", icon: Car },
      { id: "power", name: "Potencia", icon: Battery },
      { id: "cooling", name: "Criogénico", icon: Heart },
      { id: "suspension", name: "Suspensión", icon: Mountain },
      { id: "awareness", name: "Sensores", icon: Radar },
      { id: "diagnostics", name: "Diagnósticos", icon: Activity },
      { id: "transmission", name: "Transmisión", icon: Gauge } // para completar 24
    ],
    []
  );

  const [activeSection, setActiveSection] = useState(sections[0].id);

  const renderActive = () => {
    switch (activeSection) {
      case "reconnaissance":
        return <ReconnaissanceSystem />;
      case "security":
        return <SecuritySystem />;
      case "crab-mode":
        return <CrabModeSystem />;
      case "viden":
        return <VidenSystem />;
      case "geocercas":
        return <GeocercasSystem />;
      case "aerodinamica":
        return <AerodinamicaSystem />;
      case "tires":
        return <TireSystem />;
      case "enhanced-tires":
        return <EnhancedTireSystem />;
      case "compressor":
        return <CompressorSystem />;
      case "uv-hygiene":
        return <UVHygienizationSystem />;
      case "monitoring":
        return <ParameterMonitoringSystem />;
      case "codes":
        return <CodesSystem />;
      case "treer":
        return <TreeRSystem />;
      case "autonomy":
        return <AutonomyControl />;
      case "traction":
        return <TractionControl />;
      case "smart":
        return <SmartVehicleControl />;
      case "comfort":
        return <ComfortSystems />;
      case "driving":
        return <AdvancedDriving />;
      case "power":
        return <PowerControlSystem />;
      case "cooling":
        return <BionicCooling />;
      case "suspension":
        return <SuspensionControl />;
      case "awareness":
        return <SituationalAwareness />;
      case "diagnostics":
        return <AdvancedDiagnostics />;
      case "transmission":
        return <VirtualTransmission />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-950 text-white overflow-hidden">
      {/* Overlay para forzar orientación horizontal */}
      {!isLandscape && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center text-center p-6">
          <div className="flex items-center gap-3 mb-4">
            <RotateCcw className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-semibold">Gira tu dispositivo</span>
          </div>
          <div className="text-slate-300 mb-6">
            Esta experiencia funciona solo en orientación horizontal (landscape)
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Smartphone className="w-4 h-4" />
            Bloqueo activo hasta girar a horizontal
          </div>
        </div>
      )}

      {/* Layout principal: Menú izquierdo + Contenido */}
      <div className="h-full w-full flex">
        {/* Menú lateral izquierdo */}
        <aside className="w-64 bg-slate-900/80 border-r border-slate-800 h-full flex flex-col">
          <div className="px-4 py-3 border-b border-slate-800">
            <div className="text-lg font-bold">Trophy Truck</div>
            <div className="text-xs text-slate-400">Panel de Sistemas</div>
          </div>

          <nav className="flex-1 overflow-y-auto p-2 space-y-1">
            {sections.map((s) => {
              const Icon = s.icon;
              const active = s.id === activeSection;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    active
                      ? "bg-cyan-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="truncate">{s.name}</span>
                </button>
              );
            })}
          </nav>

          <div className="px-3 py-2 text-xs text-slate-500 border-t border-slate-800">
            Modo: Horizontal obligatorio
          </div>
        </aside>

        {/* Área de contenido */}
        <main className="flex-1 h-full overflow-y-auto">
          <div className="h-full p-4">{renderActive()}</div>
        </main>
      </div>
    </div>
  );
};

export default FuturisticInterface;