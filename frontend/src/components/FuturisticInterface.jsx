import React, { useState } from 'react';
import { Slider } from './ui/slider';
import { 
  Car, Leaf, User, Zap, Settings, Trophy, Thermometer, Wind, Navigation, Shield, Eye, 
  Battery, Activity, Wifi, Phone, Camera, Lock, Lightbulb, MapPin, Wrench, Volume2, Gauge
} from 'lucide-react';

const FuturisticInterface = () => {
  const [selectedMode, setSelectedMode] = useState('deportivo');
  const [activeControl, setActiveControl] = useState(null);
  const [speed, setSpeed] = useState([85]);

  const modes = [
    { id: 'eco', name: 'Eco', icon: Leaf },
    { id: 'confort', name: 'Confort', icon: User },
    { id: 'deportivo', name: 'Deportivo', icon: Zap },
    { id: 'individual', name: 'Individual', icon: Settings },
    { id: 'offroad', name: 'Off-Road', icon: Trophy }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Panel Izquierdo */}
      <div className="w-20 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 space-y-6">
        <div className="text-xs font-bold transform -rotate-90 whitespace-nowrap mb-8">TROPHY 2025</div>
        
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={`p-3 rounded-lg transition-colors ${
              selectedMode === mode.id ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            <mode.icon size={20} />
          </button>
        ))}

        <div className="flex-1" />
        <div className="text-center">
          <div className="text-xs">22°C</div>
          <div className="text-xs opacity-60">EXT</div>
        </div>
      </div>

      {/* Área Central */}
      <div className="flex-1 relative overflow-hidden">
        {/* Header */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-800 rounded-full px-3 py-1 text-sm">Climatización</div>
            <div className="bg-gray-800 rounded-full px-3 py-1 text-sm">Auto</div>
          </div>
          <div className="flex items-center space-x-2">
            <Wifi size={16} className="text-blue-400" />
            <div className="text-sm">78%</div>
          </div>
        </div>

        {/* Vehículo Central */}
        <div className="flex items-center justify-center h-full relative">
          <div className="relative w-80 h-48">
            {/* Carrocería del vehículo */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700 rounded-[2.5rem] shadow-2xl transform rotate-6">
              <div className="absolute top-3 left-6 right-6 h-12 bg-gradient-to-b from-slate-200 to-slate-400 rounded-xl opacity-60"></div>
              <div className="absolute top-4 left-2 w-8 h-10 bg-gradient-to-r from-slate-300 to-slate-500 rounded-lg opacity-50"></div>
              <div className="absolute top-4 right-2 w-8 h-10 bg-gradient-to-l from-slate-300 to-slate-500 rounded-lg opacity-50"></div>
              <div className="absolute top-8 left-1 w-3 h-6 bg-white rounded-lg opacity-90"></div>
              <div className="absolute top-8 right-1 w-3 h-6 bg-white rounded-lg opacity-90"></div>
              <div className="absolute bottom-3 left-2 w-2 h-4 bg-red-500 rounded opacity-80"></div>
              <div className="absolute bottom-3 right-2 w-2 h-4 bg-red-500 rounded opacity-80"></div>
            </div>
            
            {/* Ruedas */}
            <div className="absolute -bottom-2 left-8 w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-600">
              <div className="absolute inset-1 bg-gray-700 rounded-full"></div>
            </div>
            <div className="absolute -bottom-2 right-8 w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-600">
              <div className="absolute inset-1 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Controles inferiores */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-medium">Modo {selectedMode}</div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">{speed[0]} km/h</span>
              <div className="w-16 h-1 bg-gray-600 rounded-full">
                <div className="h-1 bg-blue-400 rounded-full" style={{width: `${(speed[0]/200)*100}%`}}></div>
              </div>
            </div>
          </div>
          <Slider value={speed} onValueChange={setSpeed} min={0} max={200} className="mb-2" />
        </div>
      </div>

      {/* Panel Derecho */}
      <div className="w-20 bg-gray-800 border-l border-gray-700 flex flex-col items-center py-4 space-y-6">
        <div className="text-xs font-bold transform rotate-90 whitespace-nowrap mb-8">Control Touch</div>
        
        {[Eye, Shield, Battery, Activity, Settings, Navigation].map((Icon, i) => (
          <button key={i} onClick={() => setActiveControl(i)} className={`p-3 rounded-lg transition-colors ${activeControl === i ? 'bg-cyan-600' : 'hover:bg-gray-700'}`}>
            <Icon size={20} />
          </button>
        ))}

        <div className="flex-1" />
        <div className="text-center space-y-2">
          <div className="text-xs">Batería</div>
          <div className="text-sm font-bold text-green-400">78%</div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="absolute bottom-0 left-20 right-20 bg-gray-900 border-t border-gray-700 p-3">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6">
            {[Navigation, Thermometer, Volume2, Phone, Car, Settings, Camera, Eye, Zap, Wifi].map((Icon, i) => (
              <button key={i} className="flex flex-col items-center space-y-1 text-xs hover:text-blue-400 transition-colors">
                <Icon size={16} />
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-400">Trophy Truck Control System</div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticInterface;