import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface ConnectionData {
  time: string;
  connections: number;
}

interface ConnectionsChartProps {
  deployTime: string;
  connectionLimit: number;
  height?: number;
}

export const ConnectionsChart = ({ deployTime, connectionLimit, height = 100 }: ConnectionsChartProps) => {
  const generateConnectionsData = (): ConnectionData[] => {
    const data: ConnectionData[] = [];
    const times = ['09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30'];
    
    let connections = 150;
    times.forEach((time, index) => {
      if (time === deployTime) {
        connections = 200;
      } else if (time > deployTime) {
        if (index <= times.indexOf(deployTime) + 4) {
          connections = Math.min(connectionLimit - 10, connections + Math.floor(Math.random() * 70) + 30);
        } else {
          connections = Math.min(connectionLimit, connections + (Math.random() * 40 - 15));
        }
      } else {
        connections = Math.max(100, Math.min(200, connections + (Math.random() * 40 - 20)));
      }
      
      data.push({
        time,
        connections: Math.floor(connections),
      });
    });
    
    return data;
  };
  
  const connectionsData = generateConnectionsData();
  const deployTimeIndex = connectionsData.findIndex(item => item.time === deployTime);
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={connectionsData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
        <XAxis dataKey="time" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <Tooltip
          formatter={(value) => [value, 'Connections']}
          labelFormatter={(label) => `Time: ${label}`}
        />
        <ReferenceLine x={deployTimeIndex} stroke="#666" strokeDasharray="3 3" label={{ value: "Deploy", position: "top", fontSize: 10 }} />
        <ReferenceLine y={connectionLimit} stroke="#e74c3c" strokeDasharray="3 3" label={{ value: "Limit", position: "right", fontSize: 10 }} />
        <Line 
          type="monotone" 
          dataKey="connections" 
          stroke="#3498db" 
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 5, stroke: '#3498db', strokeWidth: 1, fill: '#fff' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}; 