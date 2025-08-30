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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header con Controles Avanzados */}
      <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6 z-30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-blue-400" />
            <span className="text-lg font-bold text-white">Vista Futurística</span>
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              v2.5
            </Badge>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                  <Sliders className="w-4 h-4 mr-2" />
                  Configuración
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-600 text-white">
                <DialogHeader>
                  <DialogTitle className="text-blue-400">Configuración Avanzada</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Personaliza la interfaz y funcionalidades del sistema
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-white">Tema Visual</h4>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-blue-500 text-blue-400">
                        <Palette className="w-4 h-4 mr-2" />
                        Azul
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600">
                        Oscuro
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600">
                        Claro
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-white">Layout</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Panel Compacto</span>
                      <Checkbox />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Animaciones</span>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Auto-Actualizar</span>
                      <Checkbox defaultChecked />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" className="border-gray-600">Cancelar</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-600 text-white">
                <DropdownMenuLabel>Acciones Rápidas</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-600" />
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Configuración
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Importar Configuración
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reiniciar Sistema
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-600" />
                <DropdownMenuItem className="text-red-400 hover:bg-red-900/30">
                  <X className="w-4 h-4 mr-2" />
                  Resetear Todo
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Sistema Online
          </div>
          <Badge className="bg-green-600">
            Conectado
          </Badge>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 flex">
        {/* Panel Izquierdo Expandido */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col py-4 overflow-y-auto z-20">
        <div className="px-4 mb-6">
          <h2 className="text-lg font-bold text-white">TROPHY 2025</h2>
          <p className="text-xs text-gray-400">Sistema Inteligente</p>
        </div>
        
        <div className="px-4 mb-6">
          <Card className="bg-gray-800/50 border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-400" />
                Modos de Conducción
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configuraciones optimizadas de rendimiento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {modes.map((mode) => (
                <Card
                  key={mode.id}
                  className={`cursor-pointer transition-all border ${
                    selectedMode === mode.id 
                      ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20' 
                      : 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
                  }`}
                  onClick={() => setSelectedMode(mode.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <mode.icon 
                          size={20} 
                          className={selectedMode === mode.id ? 'text-blue-400' : 'text-gray-400'}
                        />
                        <div>
                          <div className={`font-medium ${selectedMode === mode.id ? 'text-white' : 'text-gray-300'}`}>
                            {mode.name}
                          </div>
                          <div className="text-xs text-gray-400">{mode.desc}</div>
                        </div>
                      </div>
                      {selectedMode === mode.id && (
                        <Badge variant="default" className="bg-blue-600 text-white">
                          Activo
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="px-4 mb-6">
          <Card className="bg-blue-900/20 border-blue-500/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-300 flex items-center gap-2 text-sm">
                <Info className="w-4 h-4" />
                Estado del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between">
                  <span className="text-blue-100 text-sm">{alert.desc}</span>
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    Activo
                  </Badge>
                </div>
              ))}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-500/30">
                <span className="text-blue-100 text-xs">Última actualización:</span>
                <Badge variant="secondary" className="text-xs">
                  Ahora
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1" />
        <div className="px-4">
          <Card className="bg-gradient-to-b from-orange-900/20 to-yellow-800/20 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Thermometer className="w-5 h-5 mx-auto mb-2 text-orange-400" />
              <div className="text-lg font-bold text-orange-400">22°C</div>
              <div className="text-xs text-orange-300 mb-2">Temperatura Externa</div>
              <Badge variant="outline" className="text-orange-400 border-orange-400">
                Confortable
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

        {/* Área Central Optimizada */}
        <div className="flex-1 flex flex-col">
          {/* Subheader con Estado */}
          <div className="h-12 bg-gray-800/50 border-b border-gray-700/50 flex items-center justify-between px-4 z-10">
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="text-green-400 border-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Climatización Auto
              </Badge>
              <Badge variant="outline" className="text-blue-400 border-blue-400">
                Modo {selectedMode}
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center gap-2 text-sm">
                <Wifi size={14} className="text-blue-400" />
                <span className="text-gray-300">5G</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Battery size={14} className="text-green-400" />
                <span className="text-green-400">78%</span>
              </div>
            </div>
          </div>

          {/* Carousel de Vistas del Vehículo */}
          <div className="flex-1 flex items-center justify-center p-8">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {/* Vista Exterior */}
              <CarouselItem>
                <Card className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 border-gray-600">
                  <CardHeader className="text-center pb-2">
                    <Badge variant="outline" className="mx-auto w-fit text-blue-400 border-blue-400">
                      Vista Exterior
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="relative w-full h-48 flex items-center justify-center">
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
                  </CardContent>
                  <CardFooter className="pt-0 justify-center">
                    <Badge className="bg-blue-600">Trophy Truck 2025</Badge>
                  </CardFooter>
                </Card>
              </CarouselItem>
              
              {/* Vista Dashboard */}
              <CarouselItem>
                <Card className="bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 border-blue-500/50">
                  <CardHeader className="text-center pb-2">
                    <Badge variant="outline" className="mx-auto w-fit text-cyan-400 border-cyan-400">
                      Dashboard Virtual
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="relative w-full h-48 bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
                      {/* Pantalla del dashboard */}
                      <div className="absolute inset-2 bg-gradient-to-b from-blue-950 to-gray-950 rounded">
                        <div className="p-4 space-y-3">
                          <div className="flex justify-between items-center">
                            <Monitor className="w-6 h-6 text-blue-400" />
                            <span className="text-blue-400 text-sm">HUD Activo</span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="text-center">
                              <div className="text-green-400 font-bold">{speed[0]}</div>
                              <div className="text-gray-400">km/h</div>
                            </div>
                            <div className="text-center">
                              <div className="text-cyan-400 font-bold">78%</div>
                              <div className="text-gray-400">Batería</div>
                            </div>
                            <div className="text-center">
                              <div className="text-orange-400 font-bold">22°C</div>
                              <div className="text-gray-400">Temp</div>
                            </div>
                          </div>
                          
                          <div className="flex justify-center space-x-1">
                            <div className="w-1 h-8 bg-green-400 rounded"></div>
                            <div className="w-1 h-6 bg-blue-400 rounded"></div>
                            <div className="w-1 h-10 bg-cyan-400 rounded"></div>
                            <div className="w-1 h-4 bg-purple-400 rounded"></div>
                            <div className="w-1 h-7 bg-green-400 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 justify-center">
                    <Badge className="bg-cyan-600">Modo {selectedMode}</Badge>
                  </CardFooter>
                </Card>
              </CarouselItem>

              {/* Vista Sistemas */}
              <CarouselItem>
                <Card className="bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20 border-green-500/50">
                  <CardHeader className="text-center pb-2">
                    <Badge variant="outline" className="mx-auto w-fit text-green-400 border-green-400">
                      Sistemas Activos
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="relative w-full h-48 bg-gray-900 rounded-lg border border-gray-600 p-4">
                      <div className="grid grid-cols-2 gap-3 h-full">
                        {[
                          { name: 'Visión 360°', status: true, icon: Eye },
                          { name: 'Seguridad', status: true, icon: Shield },
                          { name: 'GPS', status: true, icon: Navigation },
                          { name: 'Energía', status: true, icon: Battery },
                          { name: 'Clima', status: false, icon: Thermometer },
                          { name: 'Audio', status: true, icon: Volume2 }
                        ].map((system, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs">
                            <system.icon 
                              size={14} 
                              className={system.status ? 'text-green-400' : 'text-gray-500'}
                            />
                            <span className={system.status ? 'text-green-300' : 'text-gray-400'}>
                              {system.name}
                            </span>
                            <div className={`w-2 h-2 rounded-full ml-auto ${
                              system.status ? 'bg-green-400' : 'bg-gray-500'
                            }`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 justify-center">
                    <Badge className="bg-green-600">5/6 Sistemas OK</Badge>
                  </CardFooter>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="text-white border-gray-600 hover:bg-gray-700" />
            <CarouselNext className="text-white border-gray-600 hover:bg-gray-700" />
          </Carousel>
        </div>

          {/* Control de Velocidad */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-white">Control de Velocidad</div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-cyan-400">{speed[0]} km/h</span>
                <div className="w-20 h-2 bg-gray-600 rounded-full">
                  <div 
                    className="h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-300" 
                    style={{width: `${(speed[0]/200)*100}%`}}
                  />
                </div>
              </div>
            </div>
            <Slider 
              value={speed} 
              onValueChange={setSpeed} 
              min={0} 
              max={200} 
              step={5}
              className="w-full"
            />
          </div>

          {/* Funciones Rápidas Grid */}
          <div className="grid grid-cols-5 gap-2">
            {[
              { icon: Navigation, name: 'GPS', active: true, badge: 'ON' },
              { icon: Thermometer, name: 'Clima', active: advancedSettings.autoClimate, badge: '22°C' },
              { icon: Volume2, name: 'Audio', active: true, badge: 'ON' },
              { icon: Camera, name: 'Cámara', active: true, badge: '4K' },
              { icon: Eye, name: 'Seguridad', active: true, badge: 'OK' },
              { icon: Zap, name: 'Energía', active: advancedSettings.performanceMode, badge: '78%' },
              { icon: Wifi, name: 'WiFi', active: true, badge: '5G' },
              { icon: Monitor, name: 'HUD', active: advancedSettings.nightVision, badge: 'HD' },
              { icon: Phone, name: 'Teléfono', active: false, badge: '---' },
              { icon: Car, name: 'Vehículo', active: true, badge: 'RDY' }
            ].map((func, i) => (
              <Card 
                key={i} 
                className={`cursor-pointer transition-all border text-center ${
                  func.active 
                    ? 'bg-blue-600/20 border-blue-500 shadow-sm' 
                    : 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
                }`}
              >
                <CardContent className="p-2">
                  <func.icon 
                    size={16} 
                    className={func.active ? 'text-blue-400 mx-auto mb-1' : 'text-gray-400 mx-auto mb-1'}
                  />
                  <div className="text-xs text-white mb-1">{func.name}</div>
                  <Badge 
                    variant={func.active ? "default" : "outline"}
                    className={`text-xs ${
                      func.active 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 border-gray-500'
                    }`}
                  >
                    {func.badge}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticInterface;