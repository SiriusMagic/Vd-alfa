import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Wifi, Bluetooth, Battery, Gauge, Thermometer, Navigation, Lightbulb, Wind, Shield, Eye, Car } from "lucide-react";

const DashboardPanel = () => {
  const [temperature, setTemperature] = useState([21]);
  const [systemStatus] = useState({ battery: 78, range: 456, connectivity: true });

  const bottomOptions = [
    "Navegación", "Asiento", "Luces", "Ventanas", "Carga", 
    "ISOFIX", "Seguridad", "Conexión", "Notificaciones", 
    "Voz", "Pantalla", "Personalización"
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="h-12 sm:h-14 bg-gray-900 flex items-center justify-between px-4 sm:px-6 rounded-md">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-sm sm:text-base font-bold text-white">BMW Style</span>
          <Badge className="bg-blue-600 text-xs">Dashboard</Badge>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-blue-400">
          <Wifi size={14} />
          <Bluetooth size={14} />
          <span className="text-xs sm:text-sm text-white">{systemStatus.battery}%</span>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col sm:flex-row gap-4 py-4">
        {/* Vehicle visual */}
        <div className="flex-1 flex items-center justify-center p-2">
          <div className="relative w-full max-w-md">
            <div className="w-full aspect-[4/3] max-w-80 mx-auto relative">
              {/* Body */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 rounded-[2rem] sm:rounded-[3rem] shadow-2xl">
                {/* Roof/Windshield */}
                <div className="absolute top-3 sm:top-4 left-6 sm:left-10 right-6 sm:right-10 h-8 sm:h-14 bg-gradient-to-b from-slate-100 to-slate-300 rounded-lg sm:rounded-2xl opacity-70"></div>
                {/* Side windows */}
                <div className="absolute top-4 sm:top-6 left-3 sm:left-5 w-4 sm:w-8 h-6 sm:h-10 bg-gradient-to-r from-slate-200 to-slate-400 rounded opacity-60"></div>
                <div className="absolute top-4 sm:top-6 right-3 sm:right-5 w-4 sm:w-8 h-6 sm:h-10 bg-gradient-to-l from-slate-200 to-slate-400 rounded opacity-60"></div>
                {/* Headlights */}
                <div className="absolute top-1 sm:top-2 left-3 sm:left-5 w-3 sm:w-5 h-4 sm:h-7 bg-white rounded shadow-lg"></div>
                <div className="absolute top-1 sm:top-2 right-3 sm:right-5 w-3 sm:w-5 h-4 sm:h-7 bg-white rounded shadow-lg"></div>
                {/* Tail lights */}
                <div className="absolute bottom-1 sm:bottom-2 left-4 sm:left-7 w-2 sm:w-3 h-3 sm:h-5 bg-red-500 rounded opacity-90"></div>
                <div className="absolute bottom-1 sm:bottom-2 right-4 sm:right-7 w-2 sm:w-3 h-3 sm:h-5 bg-red-500 rounded opacity-90"></div>
              </div>
              {/* Wheels */}
              <div className="absolute -bottom-1 sm:-bottom-3 left-10 sm:left-16 w-5 sm:w-10 h-5 sm:h-10 bg-gray-900 rounded-full border border-gray-700">
                <div className="absolute inset-1 sm:inset-2 bg-gray-800 rounded-full"></div>
              </div>
              <div className="absolute -bottom-1 sm:-bottom-3 right-10 sm:right-16 w-5 sm:w-10 h-5 sm:h-10 bg-gray-900 rounded-full border border-gray-700">
                <div className="absolute inset-1 sm:inset-2 bg-gray-800 rounded-full"></div>
              </div>
              <div className="absolute -top-1 sm:-top-3 left-10 sm:left-16 w-5 sm:w-10 h-5 sm:h-10 bg-gray-900 rounded-full border border-gray-700">
                <div className="absolute inset-1 sm:inset-2 bg-gray-800 rounded-full"></div>
              </div>
              <div className="absolute -top-1 sm:-top-3 right-10 sm:right-16 w-5 sm:w-10 h-5 sm:h-10 bg-gray-900 rounded-full border border-gray-700">
                <div className="absolute inset-1 sm:inset-2 bg-gray-800 rounded-full"></div>
              </div>
            </div>
            {/* Overlays */}
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

        {/* Status cards */}
        <div className="w-full sm:w-80 space-y-3">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Gauge className="w-5 h-5 text-cyan-400" />
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">Velocidad</Badge>
              </div>
              <div className="text-2xl font-bold text-cyan-400 mb-1">85 km/h</div>
              <Progress value={42} className="h-2" />
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Battery className="w-5 h-5 text-green-400" />
                <Badge variant="outline" className="text-green-400 border-green-400">Batería</Badge>
              </div>
              <div className="text-2xl font-bold text-green-400 mb-1">78%</div>
              <Progress value={78} className="h-2" />
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Thermometer className="w-5 h-5 text-orange-400" />
                <Badge variant="outline" className="text-orange-400 border-orange-400">Temperatura</Badge>
              </div>
              <div className="text-2xl font-bold text-orange-400 mb-1">32°C</div>
              <Progress value={64} className="h-2" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom quick functions */}
      <div className="h-16 sm:h-20 bg-gray-900 border-t border-gray-700 px-2 sm:px-4 py-2 rounded-md">
        <div className="flex gap-1 sm:gap-2 overflow-x-auto">
          {bottomOptions.map((option, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center justify-center w-14 sm:w-16 h-10 sm:h-12 text-xs text-gray-300 bg-gray-800 rounded">
              <div className="mb-1">
                {i === 0 && <Navigation size={12} />} 
                {i === 2 && <Lightbulb size={12} />} 
                {i === 3 && <Wind size={12} />} 
                {i === 6 && <Shield size={12} />} 
                {i === 10 && <Eye size={12} />} 
                {i !== 0 && i !== 2 && i !== 3 && i !== 6 && i !== 10 && <Car size={12} />}
              </div>
              <span className="text-[10px] leading-none">{option.split(" ")[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPanel;