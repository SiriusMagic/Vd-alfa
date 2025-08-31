import React, { useState } from 'react';
import { Slider } from './ui/slider';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { 
  Car, Leaf, User, Zap, Settings, Trophy, Thermometer, Wind, Navigation, Shield, Eye, 
  Battery, Activity, Wifi, Phone, Camera, Lock, Lightbulb, MapPin, Wrench, Volume2, Gauge,
  AlertTriangle, CheckCircle, Info, Cpu, Signal, Bluetooth, Clock, RotateCcw, Maximize2,
  Monitor, Smartphone, Tablet, Video, MoreHorizontal, Sliders, Save, Download, Upload, 
  RefreshCw, Palette, X
} from 'lucide-react';

const FuturisticInterface = () => {
  const [selectedMode, setSelectedMode] = useState('Individual');
  const [activeControl, setActiveControl] = useState(null);
  const [temperature, setTemperature] = useState([21]);
  const [fanSpeed, setFanSpeed] = useState([3]);
  const [climateMode, setClimateMode] = useState('Auto');
  const [vehicleControls, setVehicleControls] = useState({
    alarm: false,
    security: true,
    suspension: 'Sport',
    lights: true,
    eco: false
  });
  const [systemStatus, setSystemStatus] = useState({
    battery: 78,
    range: 456,
    temperature: 21,
    connectivity: true
  });
  const [speed, setSpeed] = useState([85]);
  const [advancedSettings, setAdvancedSettings] = useState({
    nightVision: true,
    parkingAssist: true,
    autoClimate: true,
    adaptiveSuspension: false,
    ecoAssist: false,
    performanceMode: true
  });

  const modes = [
    { id: 'Individual', name: 'Individual', desc: 'Personalizado', icon: User },
    { id: 'Eco', name: 'Eco', desc: 'Eficiencia', icon: Leaf },
    { id: 'Sport', name: 'Sport', desc: 'Deportivo', icon: Zap },
    { id: 'Comfort', name: 'Comfort', desc: 'Confort', icon: Car }
  ];

  const alerts = [
    { id: 1, desc: 'Sistema de navegación' },
    { id: 2, desc: 'Control de tracción' },
    { id: 3, desc: 'Asistente de parking' }
  ];

  const leftControls = [
    { id: 'modo', name: 'Modo de conducción', icon: Car, active: true },
    { id: 'alarm', name: 'Alarma', icon: Shield, active: vehicleControls.alarm },
    { id: 'modo2', name: 'Modo', icon: Settings, active: false },
    { id: 'individual', name: 'Individual', icon: User, active: true },
    { id: 'deporte', name: 'Deporte', icon: Zap, active: false },
    { id: 'eco', name: 'Eco', icon: Leaf, active: vehicleControls.eco }
  ];

  const rightControls = [
    { id: 'control-fresco', name: 'Control Fresco', icon: Thermometer, active: true },
    { id: 'volume', name: 'Volume', icon: Volume2, active: true },
    { id: 'suspen', name: 'Suspen', icon: Settings, active: true },
    { id: 'hud', name: 'HUD', icon: Monitor, active: true },
    { id: 'energy', name: 'Energy', icon: Battery, active: true }
  ];

  const bottomOptions = [
    'Navegación', 'Asiento', 'Luces', 'Puertas y ventanas', 'Cargo', 
    'ISOFIX/AO', 'Seguridad', 'Conectividad', 'Solución y notificaciones', 
    'Voz', 'Visualización', 'Personalización'
  ];

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Header Horizontal Superior */}
      <div className="h-12 sm:h-16 bg-gray-900 flex items-center justify-between px-4 sm:px-6 z-30">
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-sm sm:text-base font-bold text-white">BMW 2024</span>
          <Badge className="bg-blue-600 text-xs">Trophy</Badge>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <Wifi size={14} className="text-blue-400" />
          <Bluetooth size={14} className="text-blue-400" />
          <span className="text-xs sm:text-sm text-white">{systemStatus.battery}%</span>
        </div>
      </div>

      {/* Controles Horizontales Superiores */}
      <div className="h-12 bg-gray-800 flex items-center justify-center gap-2 sm:gap-4 px-4 overflow-x-auto">
        {leftControls.map((control, i) => (
          <button
            key={control.id}
            onClick={() => setActiveControl(control.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs transition-all ${
              control.active 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <control.icon size={14} className="mr-1 inline" />
            {control.name}
          </button>
        ))}
      </div>

      {/* Área Central del Vehículo - Optimizada para Móvil */}
      <div className="flex-1 flex flex-col sm:flex-row relative">
        {/* Vehículo y Stats */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm">
            {/* Vehículo 3D Responsivo */}
            <div className="w-full aspect-[4/3] max-w-80 mx-auto relative">
              {/* Carrocería principal con vista superior */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 rounded-[2rem] sm:rounded-[3rem] shadow-2xl">
                {/* Techo/Parabrisas */}
                <div className="absolute top-2 sm:top-4 left-4 sm:left-8 right-4 sm:right-8 h-8 sm:h-16 bg-gradient-to-b from-slate-100 to-slate-300 rounded-lg sm:rounded-2xl opacity-70"></div>
                
                {/* Ventanas laterales */}
                <div className="absolute top-3 sm:top-6 left-1 sm:left-3 w-3 sm:w-6 h-6 sm:h-12 bg-gradient-to-r from-slate-200 to-slate-400 rounded opacity-60"></div>
                <div className="absolute top-3 sm:top-6 right-1 sm:right-3 w-3 sm:w-6 h-6 sm:h-12 bg-gradient-to-l from-slate-200 to-slate-400 rounded opacity-60"></div>
                
                {/* Luces delanteras */}
                <div className="absolute top-1 sm:top-2 left-2 sm:left-4 w-2 sm:w-4 h-4 sm:h-8 bg-white rounded shadow-lg"></div>
                <div className="absolute top-1 sm:top-2 right-2 sm:right-4 w-2 sm:w-4 h-4 sm:h-8 bg-white rounded shadow-lg"></div>
                
                {/* Luces traseras */}
                <div className="absolute bottom-1 sm:bottom-2 left-3 sm:left-6 w-2 sm:w-3 h-3 sm:h-6 bg-red-500 rounded opacity-90"></div>
                <div className="absolute bottom-1 sm:bottom-2 right-3 sm:right-6 w-2 sm:w-3 h-3 sm:h-6 bg-red-500 rounded opacity-90"></div>
              </div>
              
              {/* Ruedas Responsivas */}
              <div className="absolute -bottom-1 sm:-bottom-3 left-6 sm:left-12 w-4 sm:w-10 h-4 sm:h-10 bg-gray-900 rounded-full border border-gray-700">
                <div className="absolute inset-0.5 sm:inset-2 bg-gray-800 rounded-full"></div>
              </div>
              <div className="absolute -bottom-1 sm:-bottom-3 right-6 sm:right-12 w-4 sm:w-10 h-4 sm:h-10 bg-gray-900 rounded-full border border-gray-700">
                <div className="absolute inset-0.5 sm:inset-2 bg-gray-800 rounded-full"></div>
              </div>
              <div className="absolute -top-1 sm:-top-3 left-6 sm:left-12 w-4 sm:w-10 h-4 sm:h-10 bg-gray-900 rounded-full border border-gray-700">
                <div className="absolute inset-0.5 sm:inset-2 bg-gray-800 rounded-full"></div>
              </div>
              <div className="absolute -top-1 sm:-top-3 right-6 sm:right-12 w-4 sm:w-10 h-4 sm:h-10 bg-gray-900 rounded-full border border-gray-700">
                <div className="absolute inset-0.5 sm:inset-2 bg-gray-800 rounded-full"></div>
              </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute -top-2 -right-2 bg-gray-800 rounded-lg p-2 text-xs">
              <div className="text-blue-400 font-bold">{systemStatus.battery}%</div>
              <div className="text-gray-400">BAT</div>
            </div>
            
            <div className="absolute -bottom-2 -left-2 bg-gray-800 rounded-lg p-2 text-xs">
              <div className="text-green-400 font-bold">{temperature[0]}°C</div>
              <div className="text-gray-400">EXT</div>
            </div>
          </div>
        </div>

        {/* Panel Lateral de Controles */}
        <div className="w-full sm:w-20 bg-gray-900 p-2">
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-x-visible overflow-y-auto">
            {rightControls.map((control, i) => (
              <button
                key={control.id}
                onClick={() => setActiveControl(control.id)}
                className={`flex-shrink-0 w-12 sm:w-16 h-12 sm:h-16 rounded-lg flex flex-col items-center justify-center transition-all ${
                  control.active 
                    ? 'bg-cyan-600 text-white shadow-lg' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <control.icon size={16} />
                <span className="text-xs mt-1 leading-none">{control.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Panel Derecho Vertical */}
      <div className="w-20 bg-gray-900 flex flex-col items-center py-4 z-20">
        {/* Título rotado */}
        <div className="text-xs text-white transform rotate-90 whitespace-nowrap mb-8 font-bold">
          Central Touch
        </div>
        
        {/* Controles */}
        <div className="space-y-4">
          {rightControls.map((control, i) => (
            <button
              key={control.id}
              onClick={() => setActiveControl(control.id)}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                control.active 
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <control.icon size={18} />
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Controles de volumen */}
        <div className="flex flex-col items-center space-y-4">
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400">
            <Volume2 size={16} />
          </button>
          
          <div className="flex flex-col items-center space-y-2">
            <div className="text-xs text-gray-400">Volume</div>
            <div className="w-1 h-16 bg-gray-700 rounded-full relative">
              <div className="w-1 h-10 bg-blue-400 rounded-full absolute bottom-0"></div>
            </div>
          </div>
          
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400">
            <Settings size={16} />
          </button>
          
          <div className="flex flex-col items-center space-y-2 mt-4">
            <div className="text-xs text-gray-400">HUD</div>
            <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600">
              <Eye size={16} className="text-cyan-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Barra Inferior */}
      <div className="absolute bottom-0 left-16 right-20 h-20 bg-black border-t border-gray-800 px-6 py-3 z-30">
        <div className="grid grid-cols-6 gap-4 h-full">
          {bottomOptions.slice(0, 12).map((option, i) => (
            <button 
              key={i}
              className="flex flex-col items-center justify-center space-y-1 text-xs hover:text-blue-400 transition-colors text-gray-400"
            >
              <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                {i === 0 && <Navigation size={12} />}
                {i === 1 && <User size={12} />}
                {i === 2 && <Lightbulb size={12} />}
                {i === 3 && <Wind size={12} />}
                {i === 4 && <Car size={12} />}
                {i === 5 && <Shield size={12} />}
                {i === 6 && <Eye size={12} />}
                {i === 7 && <Wifi size={12} />}
                {i === 8 && <Settings size={12} />}
                {i === 9 && <Volume2 size={12} />}
                {i === 10 && <Monitor size={12} />}
                {i === 11 && <Wrench size={12} />}
              </div>
              <span>{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Slider de Temperatura */}
      <div className="absolute left-20 top-1/2 transform -translate-y-1/2 -rotate-90">
        <div className="w-32 px-4">
          <Slider
            value={temperature}
            onValueChange={setTemperature}
            min={16}
            max={30}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FuturisticInterface;