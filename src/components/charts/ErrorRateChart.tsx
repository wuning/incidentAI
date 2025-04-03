import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface ErrorRateData {
  time: string;
  errorRate: number;
}

interface ErrorRateChartProps {
  deployTime: string;
  height?: number;
}

export const ErrorRateChart = ({ deployTime, height = 100 }: ErrorRateChartProps) => {
  const generateErrorRateData = (): ErrorRateData[] => {
    const data: ErrorRateData[] = [];
    const times = ['09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30'];
    
    let rate = 2;
    times.forEach((time, index) => {
      if (time === deployTime) {
        rate = 5;
      } else if (time > deployTime) {
        if (index <= times.indexOf(deployTime) + 3) {
          rate = rate + Math.floor(Math.random() * 5) + 5;
        } else {
          rate = Math.max(15, rate + (Math.random() * 10 - 5));
        }
      } else {
        rate = Math.max(1, rate + (Math.random() * 2 - 1));
      }
      
      data.push({
        time,
        errorRate: parseFloat(rate.toFixed(1)),
      });
    });
    
    return data;
  };
  
  const errorData = generateErrorRateData();
  const deployTimeIndex = errorData.findIndex(item => item.time === deployTime);
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={errorData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
        <XAxis dataKey="time" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <Tooltip
          formatter={(value) => [`${value}%`, 'Error Rate']}
          labelFormatter={(label) => `Time: ${label}`}
        />
        <ReferenceLine x={deployTimeIndex} stroke="#666" strokeDasharray="3 3" label={{ value: "Deploy", position: "top", fontSize: 10 }} />
        <Line 
          type="monotone" 
          dataKey="errorRate" 
          stroke="#e74c3c" 
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 5, stroke: '#e74c3c', strokeWidth: 1, fill: '#fff' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}; 