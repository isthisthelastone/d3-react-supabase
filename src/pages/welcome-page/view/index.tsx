import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Define types for the radar data
interface RadarItem {
  name: string;
  quadrant: string;
  ring: string;
  moved: number;
}

interface RadarProps {
  data: RadarItem[];
  filters: Filters;
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

const TechRadar: React.FC<RadarProps> = ({ data, filters }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 800;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const rings = ['Adopt', 'Trial', 'Assess', 'Hold'];
    const quadrants = [...new Set(data.map((item) => item.quadrant))];

    const angle = d3
      .scalePoint()
      .domain(quadrants)
      .range([0, 2 * Math.PI]);

    const radialScale = d3.scalePoint().domain(rings).range([0, radius]);

    // Draw Rings
    rings.forEach((ring) => {
      svg
        .append('circle')
        .attr('r', radialScale(ring)!)
        .style('fill', 'none')
        .style('stroke', '#ccc');
    });

    // Draw Quadrants
    quadrants.forEach((quadrant, i) => {
      const quadrantGroup = svg
        .append('g')
        .attr(
          'transform',
          `rotate(${((angle(quadrant) || 0) * 180) / Math.PI})`
        );

      quadrantGroup
        .append('text')
        .attr('x', radius + 10)
        .attr('y', 0)
        .text(quadrant)
        .style('font-size', '16px')
        .attr('alignment-baseline', 'middle');
    });

    // Plot Items
    data.forEach((item) => {
      if (!filters[item.quadrant] || !filters[item.ring]) return;

      const angleValue = angle(item.quadrant) || 0;
      const radiusValue = radialScale(item.ring) || 0;

      const x = radiusValue * Math.cos(angleValue);
      const y = radiusValue * Math.sin(angleValue);

      svg
        .append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 5)
        .style('fill', item.moved ? 'orange' : 'blue');

      svg
        .append('text')
        .attr('x', x + 10)
        .attr('y', y)
        .text(item.name)
        .style('font-size', '12px');
    });
  }, [data, filters]);

  return <svg ref={svgRef} />;
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

const Dashboard: React.FC = () => {
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
      <h1 className="text-9xl">D3 implemntation</h1>
      <section>
        <h2>Tech Radar</h2>
        <FilterControls filters={filters} setFilters={setFilters} />
        <TechRadar data={radarData} filters={filters} />
      </section>
    </div>
  );
};

export default Dashboard;
