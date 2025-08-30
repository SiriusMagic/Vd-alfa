import React, { useState } from 'react';
import { Slider } from './ui/slider';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  Car, Leaf, User, Zap, Settings, Trophy, Thermometer, Wind, Navigation, Shield, Eye, 
  Battery, Activity, Wifi, Phone, Camera, Lock, Lightbulb, MapPin, Wrench, Volume2, Gauge,
  AlertTriangle, CheckCircle, Info
} from 'lucide-react';

const FuturisticInterface = () => {
  const [selectedMode, setSelectedMode] = useState('deportivo');
  const [activeControl, setActiveControl] = useState(null);
  const [speed, setSpeed] = useState([85]);
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'info', title: 'Sistema Activo', desc: 'Todos los sistemas funcionando correctamente' }
  ]);

  const modes = [
    { id: 'eco', name: 'Eco', icon: Leaf, desc: 'Máxima eficiencia energética' },
    { id: 'confort', name: 'Confort', icon: User, desc: 'Balance entre rendimiento y comodidad' },
    { id: 'deportivo', name: 'Deportivo', icon: Zap, desc: 'Máximo rendimiento y potencia' },
    { id: 'individual', name: 'Individual', icon: Settings, desc: 'Configuración personalizada' },
    { id: 'offroad', name: 'Off-Road', icon: Trophy, desc: 'Optimizado para terrenos difíciles' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Panel Izquierdo Expandido */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col py-4">
        <div className="px-4 mb-6">
          <h2 className="text-lg font-bold text-white">TROPHY 2025</h2>
          <p className="text-xs text-gray-400">Sistema Inteligente</p>
        </div>
        
        <div className="px-4 mb-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="modes" className="border-gray-600">
              <AccordionTrigger className="text-white hover:text-blue-400">
                Modos de Conducción
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {modes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={`w-full p-3 rounded-lg transition-all text-left ${
                        selectedMode === mode.id 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      title={mode.desc}
                    >
                      <div className="flex items-center gap-3">
                        <mode.icon size={16} />
                        <div>
                          <div className="font-medium">{mode.name}</div>
                          <div className="text-xs opacity-75">{mode.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="px-4 mb-6">
          {alerts.map((alert) => (
            <Alert key={alert.id} className="bg-blue-900/30 border-blue-500/50 text-blue-100">
              <Info className="h-4 w-4" />
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.desc}</AlertDescription>
            </Alert>
          ))}
        </div>

        <div className="flex-1" />
        <div className="px-4 text-center">
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="text-sm font-medium text-white">22°C</div>
            <div className="text-xs text-gray-400">Temperatura Externa</div>
          </div>
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

      {/* Panel Derecho Expandido */}
      <div className="w-64 bg-gray-800 border-l border-gray-700 flex flex-col py-4">
        <div className="px-4 mb-6">
          <h2 className="text-lg font-bold text-white">Control Touch</h2>
          <p className="text-xs text-gray-400">Sistemas Avanzados</p>
        </div>
        
        <div className="px-4 mb-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="systems" className="border-gray-600">
              <AccordionTrigger className="text-white hover:text-cyan-400">
                Sistemas del Vehículo
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {[
                    { icon: Eye, name: 'Visión 360°', status: 'Activo' },
                    { icon: Shield, name: 'Seguridad', status: 'Protegido' },
                    { icon: Battery, name: 'Energía', status: '78%' },
                    { icon: Activity, name: 'Diagnóstico', status: 'OK' },
                    { icon: Settings, name: 'Config', status: 'Manual' },
                    { icon: Navigation, name: 'GPS', status: 'Conectado' }
                  ].map((system, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveControl(i)} 
                      className={`w-full p-3 rounded-lg transition-colors flex items-center justify-between ${
                        activeControl === i ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <system.icon size={16} />
                        <span className="text-sm font-medium">{system.name}</span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-600 rounded">{system.status}</span>
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="px-4 mb-6">
          <Alert className="bg-green-900/30 border-green-500/50 text-green-100">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Sistema OK</AlertTitle>
            <AlertDescription>Todos los sistemas funcionan correctamente</AlertDescription>
          </Alert>
        </div>

        <div className="flex-1" />
        <div className="px-4 space-y-3">
          <div className="bg-gray-700 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-400">78%</div>
            <div className="text-xs text-gray-400">Batería Principal</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-cyan-400">{speed[0]}</div>
            <div className="text-xs text-gray-400">km/h</div>
          </div>
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