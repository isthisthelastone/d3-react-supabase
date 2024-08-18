import { useState } from 'react';
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Define types for the radar data
interface RadarItem {
  name: string;
  quadrant: string;
  ring: string;
  moved: number;
}

type Filters = Record<string, boolean>;

const generateRandomData = (): RadarItem[] => {
  const quadrants = ['Frontend', 'Backend', 'DevOps', 'Data Science'];
  const rings = ['Adopt', 'Trial', 'Assess', 'Hold'];
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

  const mapToCoordinates = (item: RadarItem) => {
    const quadrantMap = {
      Frontend: 0,
      Backend: 90,
      DevOps: 180,
      'Data Science': 270,
    };

    const ringMap = {
      Adopt: 1,
      Trial: 2,
      Assess: 3,
      Hold: 4,
    };

    const angle = quadrantMap[item.quadrant];
    const distance = ringMap[item.ring];

    return {
      angle: angle,
      radius: distance * 20,
      name: item.name,
      quadrant: item.quadrant,
      ring: item.ring,
      moved: item.moved,
    };
  };

  const chartData = filteredData.map(mapToCoordinates);

  return (
    <ResponsiveContainer width="100%" height={800}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="10%"
        outerRadius="100%"
        barSize={10}
        data={chartData}
        startAngle={180}
        endAngle={-180}
      >
        <PolarAngleAxis type="number" domain={[0, 360]} dataKey="angle" />
        <Tooltip />
        <RadialBar
          minAngle={15}
          background
          clockWise
          dataKey="radius"
          cornerRadius={5}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

const RechartsDashboard: React.FC = () => {
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
      <h1 className="text-9xl">Recharts Implementation</h1>
      <section>
        <h2>Tech Radar</h2>
        <FilterControls filters={filters} setFilters={setFilters} />
        <TechRadar data={radarData} filters={filters} />
      </section>
    </div>
  );
};

export default RechartsDashboard;
