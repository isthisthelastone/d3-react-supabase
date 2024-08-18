import { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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

  const seriesData = filteredData.map((item) => {
    const angleMap = {
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

    const angle = angleMap[item.quadrant];
    const distance = ringMap[item.ring] * 10;

    return {
      name: item.name,
      x: distance * Math.cos((angle * Math.PI) / 180),
      y: distance * Math.sin((angle * Math.PI) / 180),
      quadrant: item.quadrant,
      ring: item.ring,
      marker: {
        fillColor: item.moved ? 'orange' : 'blue',
        radius: 5,
      },
    };
  });

  const options: Highcharts.Options = {
    chart: {
      type: 'scatter',
      plotBackgroundColor: null,
      plotBorderWidth: 1,
      plotShadow: false,
      polar: true,
    },
    title: {
      text: 'Tech Radar',
    },
    xAxis: {
      min: -50,
      max: 50,
      gridLineWidth: 1,
    },
    yAxis: {
      min: -50,
      max: 50,
      gridLineWidth: 1,
    },
    plotOptions: {
      scatter: {
        tooltip: {
          headerFormat: '',
          pointFormat:
            '<b>{point.name}</b><br/>Quadrant: {point.quadrant}<br/>Ring: {point.ring}',
        },
      },
    },
    series: [
      {
        name: 'Technologies',
        type: 'scatter',
        data: seriesData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

const HighchartsDashboard: React.FC = () => {
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
      <h1 className="Highchart Implementation">Developer Dashboard</h1>
      <section>
        <h2>Tech Radar</h2>
        <FilterControls filters={filters} setFilters={setFilters} />
        <TechRadar data={radarData} filters={filters} />
      </section>
    </div>
  );
};

export default HighchartsDashboard;
