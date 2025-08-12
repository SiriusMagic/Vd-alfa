export const mockData = {
  speed: 85, // km/h
  batteryLevel: 78, // percentage
  batteryTemp: 32.5, // celsius
  torque: 280, // Nm
  powerConsumption: 45, // kW
  range: 342, // km
  efficiency: 4.2, // km/kWh
};

export const presetConfigs = [
  {
    name: "Eco Mode",
    driveMode: "FWD",
    powerDistribution: [20, 80],
    motorControls: {
      rear: { voltage: 300, amperage: 100 },
      front: { voltage: 320, amperage: 120 }
    }
  },
  {
    name: "Sport Mode",
    driveMode: "AWD", 
    powerDistribution: [70, 30],
    motorControls: {
      rear: { voltage: 550, amperage: 250 },
      front: { voltage: 450, amperage: 180 }
    }
  },
  {
    name: "Track Mode",
    driveMode: "RWD",
    powerDistribution: [100, 0],
    motorControls: {
      rear: { voltage: 600, amperage: 300 },
      front: { voltage: 200, amperage: 50 }
    }
  },
  {
    name: "Snow Mode",
    driveMode: "AWD",
    powerDistribution: [40, 60], 
    motorControls: {
      rear: { voltage: 350, amperage: 130 },
      front: { voltage: 380, amperage: 150 }
    }
  }
];