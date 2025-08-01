interface ClauseCardProps {
  type: string;
  risk: 'Low' | 'Medium' | 'High';
  original: string;
  suggested: string;
}

export default function ClauseCard({ type, risk, original, suggested }: ClauseCardProps) {
  const riskColors: Record<string, string> = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-yellow-800',
  };

  const riskIcons: Record<string, string> = {
    Low: '🟢',
    Medium: '🟡',
    High: '🔴',
  };

  return (
    <div className="border rounded-xl p-4 mb-4 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold">{type}</h4>
        <span className={`text-sm font-medium px-2 py-1 rounded ${riskColors[risk]}`}>
          {riskIcons[risk]} {risk} Risk
        </span>
      </div>

      <div className="text-sm mb-2">
        <strong className="block mb-1 text-gray-600">Original Clause:</strong>
        <p className="bg-gray-50 p-2 rounded">{original}</p>
      </div>

      <div className="text-sm">
        <strong className="block mb-1 text-gray-600">Suggested Edit:</strong>
        <p className="bg-blue-50 p-2 rounded">{suggested}</p>
      </div>
    </div>
  );
}
