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

      {/* Área Central del Vehículo */}
      <div className="flex-1 flex flex-col">
        {/* Header Superior */}
        <div className="h-16 flex items-center justify-between px-8">
          <div className="flex space-x-4">
            <div className="bg-gray-800 rounded-full px-4 py-2 text-sm text-white">
              Calentado
            </div>
            <div className="bg-gray-800 rounded-full px-4 py-2 text-sm text-white">
              Cancela
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Wifi size={16} className="text-blue-400" />
            <Bluetooth size={16} className="text-blue-400" />
            <span className="text-white">{systemStatus.battery}%</span>
          </div>
        </div>

        {/* Vehículo Central */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="relative">
            {/* Vehículo 3D Realista */}
            <div className="w-80 h-48 relative">
              {/* Carrocería principal con vista superior */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 rounded-[3rem] shadow-2xl">
                {/* Techo/Parabrisas */}
                <div className="absolute top-4 left-8 right-8 h-16 bg-gradient-to-b from-slate-100 to-slate-300 rounded-2xl opacity-70"></div>
                
                {/* Ventanas laterales */}
                <div className="absolute top-6 left-3 w-6 h-12 bg-gradient-to-r from-slate-200 to-slate-400 rounded-lg opacity-60"></div>
                <div className="absolute top-6 right-3 w-6 h-12 bg-gradient-to-l from-slate-200 to-slate-400 rounded-lg opacity-60"></div>
                
                {/* Luces delanteras */}
                <div className="absolute top-2 left-4 w-4 h-8 bg-white rounded-lg shadow-lg"></div>
                <div className="absolute top-2 right-4 w-4 h-8 bg-white rounded-lg shadow-lg"></div>
                
                {/* Luces traseras */}
                <div className="absolute bottom-2 left-6 w-3 h-6 bg-red-500 rounded opacity-90"></div>
                <div className="absolute bottom-2 right-6 w-3 h-6 bg-red-500 rounded opacity-90"></div>
                
                {/* Detalles del capó y maletero */}
                <div className="absolute top-12 left-6 right-6 h-1 bg-slate-500 opacity-30"></div>
                <div className="absolute bottom-12 left-6 right-6 h-1 bg-slate-500 opacity-30"></div>
              </div>
              
              {/* Ruedas */}
              <div className="absolute -bottom-3 left-12 w-10 h-10 bg-gray-900 rounded-full border-3 border-gray-700">
                <div className="absolute inset-2 bg-gray-800 rounded-full"></div>
                <div className="absolute inset-3 bg-gray-600 rounded-full"></div>
              </div>
              <div className="absolute -bottom-3 right-12 w-10 h-10 bg-gray-900 rounded-full border-3 border-gray-700">
                <div className="absolute inset-2 bg-gray-800 rounded-full"></div>
                <div className="absolute inset-3 bg-gray-600 rounded-full"></div>
              </div>
              <div className="absolute -top-3 left-12 w-10 h-10 bg-gray-900 rounded-full border-3 border-gray-700">
                <div className="absolute inset-2 bg-gray-800 rounded-full"></div>
                <div className="absolute inset-3 bg-gray-600 rounded-full"></div>
              </div>
              <div className="absolute -top-3 right-12 w-10 h-10 bg-gray-900 rounded-full border-3 border-gray-700">
                <div className="absolute inset-2 bg-gray-800 rounded-full"></div>
                <div className="absolute inset-3 bg-gray-600 rounded-full"></div>
              </div>
            </div>

            {/* Controles flotantes alrededor del vehículo */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <button className="bg-gray-800 rounded-full p-3 border border-gray-600 hover:bg-gray-700 transition-colors">
                <Thermometer size={16} className="text-blue-400" />
              </button>
            </div>
            
            <div className="absolute top-1/2 -left-20 transform -translate-y-1/2">
              <button className="bg-gray-800 rounded-full p-3 border border-gray-600 hover:bg-gray-700 transition-colors">
                <Wind size={16} className="text-cyan-400" />
              </button>
            </div>
            
            <div className="absolute top-1/2 -right-20 transform -translate-y-1/2">
              <button className="bg-gray-800 rounded-full p-3 border border-gray-600 hover:bg-gray-700 transition-colors">
                <Eye size={16} className="text-green-400" />
              </button>
            </div>
            
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <button className="bg-gray-800 rounded-full p-3 border border-gray-600 hover:bg-gray-700 transition-colors">
                <Settings size={16} className="text-purple-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Controles Inferiores de Clima */}
        <div className="h-24 bg-gray-900 border-t border-gray-700 px-8 py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-medium text-white">Modo {climateMode}</div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Muy alto</span>
              <div className="w-16 h-1 bg-gray-600 rounded-full">
                <div className="w-12 h-1 bg-blue-400 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white">
                <User size={16} />
              </button>
              <span className="text-sm text-gray-300">Alto</span>
              <span className="text-sm text-gray-300">Estándar</span>
              <span className="text-sm text-gray-300">Bajo</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Conc.de estacionamiento</span>
              <Checkbox defaultChecked className="border-blue-500 data-[state=checked]:bg-blue-600" />
            </div>
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