'use client';

import { useState } from 'react';

const defaultClauses = [
  {
    id: 'nda',
    label: 'NDA Clause',
    text: `Both parties agree to maintain confidentiality regarding all project-related materials, including code, assets, and communications.`,
  },
  {
    id: 'net15',
    label: 'Net 15 Payment Terms',
    text: `Client agrees to remit payment within 15 days of invoice delivery.`,
  },
  {
    id: 'kill-fee',
    label: 'Kill Fee Clause',
    text: `If the project is terminated early, Developer will be compensated for all completed work plus a 20% termination fee.`,
  },
  {
    id: 'ip-transfer',
    label: 'IP Transfer on Payment',
    text: `Intellectual property rights for deliverables transfer only upon full payment.`,
  },
];

export default function ClausePackBuilder() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showOutput, setShowOutput] = useState(false);

  const toggleClause = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const generatePack = () => setShowOutput(true);

  const includedClauses = defaultClauses.filter((c) => selected.includes(c.id));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-8 space-y-4">
      <h3 className="text-lg font-bold">🧰 Add Protective Clauses</h3>

      <div className="space-y-2">
        {defaultClauses.map((clause) => (
          <div key={clause.id} className="flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(clause.id)}
              onChange={() => toggleClause(clause.id)}
              className="mr-2"
            />
            <label className="text-sm font-medium">{clause.label}</label>
          </div>
        ))}
      </div>

      <button
        onClick={generatePack}
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Generate Clause Pack
      </button>

      {showOutput && (
        <div className="mt-6">
          <h4 className="font-semibold mb-2">📄 Copy This Clause Pack:</h4>
          <pre className="bg-gray-50 p-4 rounded text-sm whitespace-pre-wrap">
            {includedClauses.map((c) => `• ${c.label}\n${c.text}\n\n`).join('')}
          </pre>
        </div>
      )}
    </div>
  );
}
