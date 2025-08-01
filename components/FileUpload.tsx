'use client';

import { useState, useRef } from 'react';
import ClauseCard from './ClauseCard';
import html2pdf from 'html2pdf.js';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [brief, setBrief] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const pdfRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file || !brief) return alert('Please upload a PDF and enter a brief.');

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('brief', brief);

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setResponse(data);
    setLoading(false);
  };

  const downloadMarkdown = () => {
    if (!response) return;

    const md = response.clauses
      .map((clause: any) => {
        return `### ${clause.type} (${clause.risk} Risk)\n\n**Original Clause:**\n${clause.original}\n\n**Suggested Edit:**\n${clause.suggested}\n`;
      })
      .join('\n\n---\n\n');

    const email = `### Suggested Email Reply\n\n${response.emailReply || 'N/A'}`;

    const fullMd = `# Contract Genie Report\n\n${md}\n\n---\n\n${email}`;

    const blob = new Blob([fullMd], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contract-analysis.md';
    link.click();
  };
  const sendEmail = async () => {
    const email = prompt('Enter your email to receive the PDF:');
    if (!email || !response) return;

    const res = await fetch('/api/emailReport', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, report: response }),
    });

    const result = await res.json();
    alert(result.message || 'Email sent!');
  };

  const downloadPDF = () => {
    if (!pdfRef.current) return;
    html2pdf()
      .from(pdfRef.current)
      .set({
        margin: 0.5,
        filename: 'contract-analysis.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .save();
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">🧾 Contract Genie</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}


  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">🧾 Contract Genie</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="w-full border p-2 rounded"
      />

      <textarea
        placeholder="Enter a short project or client brief..."
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        className="w-full border p-2 rounded"
        rows={4}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
      >
        {loading ? 'Analyzing...' : 'Analyze Contract'}
      </button>
      <button
        onClick={sendEmail}
        className="bg-purple-600 text-white py-1 px-3 text-sm rounded hover:bg-purple-700"
      >
        📧 Email Report
      </button>

      {response?.clauses && (
        <div className="mt-8 bg-white border rounded-xl p-6 shadow-inner max-h-[600px] overflow-y-auto space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">📄 Analyzed Clauses</h3>
            <button
              onClick={downloadMarkdown}
              className="bg-blue-600 text-white py-1 px-3 text-sm rounded hover:bg-blue-700"
            >
              📥 Download Analysis
            </button>
          </div>

          {response.clauses.map((clause: any, idx: number) => (
            <ClauseCard
              key={idx}
              type={clause.type}
              risk={clause.risk}
              original={clause.original}
              suggested={clause.suggested}
            />
          ))}
        </div>
      )}

      {response?.emailReply && (
        <div className="mt-8 bg-gray-50 p-4 rounded text-sm whitespace-pre-wrap">
          <h3 className="text-lg font-bold mb-2">📬 Suggested Email Response</h3>
          {response.emailReply}
        </div>
      )}
    </div>
  );
}
