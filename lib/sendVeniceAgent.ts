export async function sendToVeniceAgent(contractText: string, brief: string) {
  // Replace this with actual Venice API logic when ready
  return {
    message: '✅ Agent received',
    input: { contractText: contractText.slice(0, 500), brief },
    clauses: [
      {
        type: 'Non-compete',
        risk: 'High',
        original: 'The Developer shall not work with any competitor for 2 years.',
        suggested: 'The Developer shall not work with direct competitors during the project.',
      },
      {
        type: 'IP Ownership',
        risk: 'Medium',
        original: 'All deliverables are owned by the Client.',
        suggested: 'Ownership transfers upon full payment.',
      },
    ],
    emailReply: `Hi [Client],\n\nThanks for the contract. I’d like to clarify a few terms before moving forward...`,
  };
}
