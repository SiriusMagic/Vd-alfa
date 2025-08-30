import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { 
  Car,
  Gauge,
  Leaf,
  User,
  Trophy,
  Thermometer,
  Wind,
  Settings,
  Battery,
  Navigation,
  Shield,
  Eye,
  Wrench,
  Zap,
  Volume2,
  Wifi,
  Phone,
  Camera,
  Lock,
  Lightbulb,
  MapPin,
  Target,
  Activity
} from 'lucide-react';

const FuturisticInterface = () => {
  const [selectedMode, setSelectedMode] = useState('deportivo');
  const [activeControl, setActiveControl] = useState(null);
  const [vehicleStats, setVehicleStats] = useState({
    velocidad: 85,
    bateria: 78,
    temperatura: 23,
    presion: 2.1
  });

  // Simulación de datos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicleStats(prev => ({
        velocidad: Math.max(60, Math.min(120, prev.velocidad + (Math.random() - 0.5) * 10)),
        bateria: Math.max(20, Math.min(100, prev.bateria + (Math.random() - 0.5) * 2)),
        temperatura: Math.max(18, Math.min(30, prev.temperatura + (Math.random() - 0.5) * 1)),
        presion: Math.max(1.8, Math.min(2.5, prev.presion + (Math.random() - 0.5) * 0.1))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const modosDuraccion = [
    { id: 'eco', name: 'Eco', icon: Leaf, color: 'text-green-400', bg: 'bg-green-900/30' },
    { id: 'confort', name: 'Confort', icon: User, color: 'text-blue-400', bg: 'bg-blue-900/30' },
    { id: 'deportivo', name: 'Deportivo', icon: Zap, color: 'text-red-400', bg: 'bg-red-900/30' },
    { id: 'individual', name: 'Individual', icon: Settings, color: 'text-purple-400', bg: 'bg-purple-900/30' },
    { id: 'off-road', name: 'Off-Road', icon: Trophy, color: 'text-orange-400', bg: 'bg-orange-900/30' }
  ];

  const controlesSuperiores = [
    { id: 'climatizacion', name: 'Climatización', icon: Thermometer, value: '23°C' },
    { id: 'ventilacion', name: 'Ventilación', icon: Wind, value: 'Auto' },
    { id: 'navegacion', name: 'Navegación', icon: Navigation, value: 'Activo' },
    { id: 'seguridad', name: 'Seguridad', icon: Shield, value: 'ON' }
  ];

  const controlesdrechos = [
    { id: 'vision', name: 'Visión', icon: Eye },
    { id: 'asistente', name: 'Asistente', icon: User },
    { id: 'suspension', name: 'Suspensión', icon: Settings },
    { id: 'hud', name: 'HUD', icon: Target },
    { id: 'energia', name: 'Energía', icon: Battery },
    { id: 'diagnostico', name: 'Diagnóstico', icon: Activity }
  ];

  const funcionesInferiores = [
    { id: 'bluetooth', icon: Wifi, name: 'Bluetooth' },
    { id: 'telefono', icon: Phone, name: 'Teléfono' },
    { id: 'camara', icon: Camera, name: 'Cámara 360°' },
    { id: 'bloqueo', icon: Lock, name: 'Bloqueo Central' },
    { id: 'luces', icon: Lightbulb, name: 'Iluminación' },
    { id: 'gps', icon: MapPin, name: 'GPS/Tracking' },
    { id: 'mantenimiento', icon: Wrench, name: 'Mantenimiento' },
    { id: 'audio', icon: Volume2, name: 'Sistema Audio' },
    { id: 'performance', icon: Gauge, name: 'Performance' },
    { id: 'configuracion', icon: Settings, name: 'Configuración' }
  ];

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black overflow-hidden relative">
      {/* Panel Izquierdo - Modos de Conducción */}
      <div className="absolute left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-r border-slate-600/50 z-10">
        <div className="p-6 space-y-4">
          <h3 className="text-white font-bold text-lg mb-6">Modo de Conducción</h3>
          
          {modosDuraccion.map((modo) => (
            <button
              key={modo.id}
              onClick={() => setSelectedMode(modo.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedMode === modo.id
                  ? `${modo.bg} ${modo.color} border-current shadow-lg shadow-current/30`
                  : 'bg-slate-800/50 border-slate-600 text-gray-300 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <modo.icon className="w-6 h-6" />
                <span className="font-semibold">{modo.name}</span>
              </div>
            </button>
          ))}

          {/* Información del Modo Seleccionado */}
          <div className="mt-8 p-4 bg-slate-800/80 rounded-xl">
            <h4 className="text-white font-semibold mb-2">Estado Actual</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Modo:</span>
                <span className="text-white capitalize">{selectedMode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Potencia:</span>
                <span className="text-green-400">
                  {selectedMode === 'eco' ? '65%' : selectedMode === 'deportivo' ? '100%' : '80%'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Eficiencia:</span>
                <span className="text-blue-400">
                  {selectedMode === 'eco' ? 'Máxima' : selectedMode === 'deportivo' ? 'Performance' : 'Balanceada'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel Superior */}
      <div className="absolute top-0 left-64 right-64 h-20 bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-b border-slate-600/50 flex items-center justify-center gap-8 px-8">
        {controlesSuperiores.map((control) => (
          <button
            key={control.id}
            onClick={() => setActiveControl(control.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeControl === control.id
                ? 'bg-blue-600/30 text-blue-400 border border-blue-500/50'
                : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <control.icon className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs opacity-75">{control.name}</div>
              <div className="font-semibold text-sm">{control.value}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Panel Derecho */}
      <div className="absolute right-0 top-0 h-full w-64 bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-l border-slate-600/50 z-10">
        <div className="p-6 space-y-3">
          <h3 className="text-white font-bold text-lg mb-6">Controles de Vehículo</h3>
          
          {controlesdrechos.map((control) => (
            <button
              key={control.id}
              onClick={() => setActiveControl(control.id)}
              className={`w-full p-3 rounded-xl border transition-all duration-200 ${
                activeControl === control.id
                  ? 'bg-cyan-600/30 text-cyan-400 border-cyan-500/50 shadow-lg'
                  : 'bg-slate-800/50 border-slate-600 text-gray-300 hover:border-slate-500 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <control.icon className="w-5 h-5" />
                <span className="font-medium">{control.name}</span>
                <div className="ml-auto">
                  <div className={`w-2 h-2 rounded-full ${
                    activeControl === control.id ? 'bg-cyan-400' : 'bg-gray-500'
                  }`} />
                </div>
              </div>
            </button>
          ))}

          {/* Panel de Estado */}
          <div className="mt-8 p-4 bg-slate-800/80 rounded-xl">
            <h4 className="text-white font-semibold mb-4">Estado del Sistema</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Velocidad</span>
                <span className="text-cyan-400 font-bold">{vehicleStats.velocidad} km/h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Batería</span>
                <span className="text-green-400 font-bold">{vehicleStats.bateria}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Temperatura</span>
                <span className="text-blue-400 font-bold">{vehicleStats.temperatura}°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Presión</span>
                <span className="text-orange-400 font-bold">{vehicleStats.presion.toFixed(1)} bar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Área Central - Vehículo */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ margin: '80px 264px' }}>
        <div className="relative">
          {/* Imagen del vehículo representativa */}
          <div className="w-96 h-64 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden border border-gray-600">
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
            
            {/* Icono del vehículo */}
            <Car className="w-32 h-32 text-gray-400" />
            
            {/* Detalles del vehículo */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-bold text-xl">Trophy Truck Eléctrico</h3>
              <p className="text-gray-400 text-sm">Sistema Inteligente Activo</p>
            </div>

            {/* Indicador de modo */}
            <div className="absolute top-4 right-4">
              <Badge className={`${
                modosDuraccion.find(m => m.id === selectedMode)?.bg || 'bg-gray-600'
              } ${
                modosDuraccion.find(m => m.id === selectedMode)?.color || 'text-white'
              } border-0`}>
                {modosDuraccion.find(m => m.id === selectedMode)?.name || 'Deportivo'}
              </Badge>
            </div>
          </div>

          {/* Slider de velocidad */}
          <div className="mt-8 px-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Control de Velocidad</span>
              <span className="text-white font-bold">{vehicleStats.velocidad} km/h</span>
            </div>
            <Slider
              value={[vehicleStats.velocidad]}
              onValueChange={(value) => setVehicleStats(prev => ({...prev, velocidad: value[0]}))}
              min={0}
              max={200}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Panel Inferior */}
      <div className="absolute bottom-0 left-64 right-64 h-20 bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-t border-slate-600/50 flex items-center justify-center gap-4 px-8">
        {funcionesInferiores.map((funcion, index) => (
          <button
            key={funcion.id}
            onClick={() => setActiveControl(funcion.id)}
            className={`p-3 rounded-xl transition-all duration-200 ${
              activeControl === funcion.id
                ? 'bg-emerald-600/30 text-emerald-400 shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
            }`}
            title={funcion.name}
          >
            <funcion.icon className="w-6 h-6" />
          </button>
        ))}
      </div>

      {/* Efectos de background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default FuturisticInterface;