interface StatItem {
    label: string;
    value: number;
    color: string;
  }
  
  const stats: StatItem[] = [
    {
      label: 'Upcoming Events',
      value: 3,
      color: 'text-blue-600'
    },
    {
      label: 'Pending Tasks',
      value: 5,
      color: 'text-green-600'
    },
    {
      label: 'Shopping Items',
      value: 8,
      color: 'text-purple-600'
    }
  ];
  
  export default function QuickStats() {
    return (
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">
          Quick Stats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }