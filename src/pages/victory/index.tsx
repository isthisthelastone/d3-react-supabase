import { useState } from 'react';
import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryScatter,
  VictoryLabel,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryBar,
} from 'victory';

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

  const angleScale = (quadrant: string) => {
    return (quadrants.indexOf(quadrant) / quadrants.length) * 360;
  };

  const radiusScale = (ring: string) => {
    return ((rings.indexOf(ring) + 1) / rings.length) * 200; // Scale the radius to fit within a 200 radius
  };

  const scatterData = filteredData.map((item) => ({
    x: angleScale(item.quadrant),
    y: radiusScale(item.ring),
    label: `${item.name}\n${item.quadrant} - ${item.ring}`,
    fill: item.moved ? 'orange' : 'blue',
  }));

  return (
    <VictoryChart
      polar
      theme={VictoryTheme.material}
      domain={{ y: [0, 200] }}
      containerComponent={<VictoryVoronoiContainer />}
    >
      {quadrants.map((quadrant, index) => (
        <VictoryPolarAxis
          key={index}
          dependentAxis
          style={{
            axisLabel: { padding: 20 },
            axis: { stroke: 'none' },
            grid: { stroke: 'gray', strokeDasharray: '4, 8' },
          }}
          label={quadrant}
          labelPlacement="perpendicular"
          tickFormat={() => ''}
        />
      ))}
      <VictoryPolarAxis
        labelPlacement="parallel"
        style={{
          axis: { stroke: 'none' },
          grid: { stroke: 'gray', strokeDasharray: '4, 8' },
        }}
      />
      <VictoryScatter
        style={{ data: { fill: ({ datum }) => datum.fill } }}
        size={5}
        data={scatterData}
      />
    </VictoryChart>
  );
};

const RandomChart: React.FC = () => {
  const randomData = Array.from({ length: 7 }, (_, i) => ({
    x: `Day ${i + 1}`,
    y: Math.floor(Math.random() * 100),
  }));

  return (
    <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
      <VictoryBar data={randomData} />
    </VictoryChart>
  );
};

const VictoryDashboard: React.FC = () => {
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
      <section>
        <h2>Random Chart</h2>
        <RandomChart />
      </section>
    </div>
  );
};

export default VictoryDashboard;
