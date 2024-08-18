import { useState } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto';

// Define types for the radar data
interface RadarItem {
  name: string;
  quadrant: string;
  ring: string;
  moved: number;
}

type Filters = Record<string, boolean>;

const quadrants = ['Frontend', 'Backend', 'DevOps', 'Data Science'];
const rings = ['Adopt', 'Trial', 'Assess', 'Hold'];

const generateRandomData = (): RadarItem[] => {
  const technologies = [
    'React',
    'Vue',
    'Angular',
    'TypeScript',
    'JavaScript',
    'Python',
    'Django',
    'Flask',
    'Node.js',
    'Express',
    'Docker',
    'Kubernetes',
    'TensorFlow',
    'PyTorch',
    'Keras',
    'GraphQL',
  ];

  return Array.from({ length: 20 }, () => {
    const quadrant = quadrants[Math.floor(Math.random() * quadrants.length)];
    const ring = rings[Math.floor(Math.random() * rings.length)];
    const name = technologies[Math.floor(Math.random() * technologies.length)];
    const moved = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1

    return { name, quadrant, ring, moved };
  });
};

const FilterControls: React.FC<{
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}> = ({ filters, setFilters }) => {
  const handleFilterChange = (key: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div>
      {Object.keys(filters).map((key) => (
        <div key={key}>
          <input
            type="checkbox"
            id={key}
            checked={filters[key]}
            onChange={() => {
              handleFilterChange(key);
            }}
          />
          <label htmlFor={key}>{key}</label>
        </div>
      ))}
    </div>
  );
};

const TechRadar: React.FC<{ data: RadarItem[]; filters: Filters }> = ({
  data,
  filters,
}) => {
  const filteredData = data.filter(
    (item) => filters[item.quadrant] && filters[item.ring]
  );

  const chartData: ChartData<'polarArea'> = {
    labels: filteredData.map((item) => `${item.name} (${item.quadrant})`),
    datasets: [
      {
        label: 'Tech Radar',
        data: filteredData.map((item) => rings.indexOf(item.ring) + 1),
        backgroundColor: filteredData.map((item) =>
          item.moved === 0
            ? 'rgba(54, 162, 235, 0.6)'
            : 'rgba(255, 159, 64, 0.6)'
        ),
        borderColor: filteredData.map((item) =>
          item.moved === 0 ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 159, 64, 1)'
        ),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<'polarArea'> = {
    scales: {
      r: {
        ticks: { beginAtZero: true, min: 0, max: rings.length },
        grid: {
          color: '#ddd',
        },
        angleLines: {
          color: '#ccc',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const label = context.chart.data.labels![index] as string;
            const value = context.dataset.data[index];
            return `${label}: ${rings[value - 1]}`;
          },
        },
      },
    },
  };

  return <PolarArea data={chartData} options={chartOptions} />;
};

const ChartJsDashboard: React.FC = () => {
  const radarData = generateRandomData();

  const initialFilters: Filters = {
    Frontend: true,
    Backend: true,
    DevOps: true,
    'Data Science': true,
    Adopt: true,
    Trial: true,
    Assess: true,
    Hold: true,
  };

  const [filters, setFilters] = useState<Filters>(initialFilters);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Developer Dashboard</h1>
      <section>
        <h2>Tech Radar</h2>
        <FilterControls filters={filters} setFilters={setFilters} />
        <TechRadar data={radarData} filters={filters} />
      </section>
    </div>
  );
};

export default ChartJsDashboard;
