export const mockGraphData = {
  nodes: [
    { id: 'rafiq', name: 'Rafiq Hassan', type: 'person', x: 420, y: 190, central: true },
    { id: 'amina', name: 'Amina Noor', type: 'person', x: 210, y: 360 },
    { id: 'sami', name: 'Sami Farooq', type: 'person', x: 640, y: 330 },
    { id: 'naveed', name: 'Naveed Qureshi', type: 'person', x: 870, y: 260 },
    { id: 'lea', name: 'Lea Carter', type: 'person', x: 930, y: 470 },
    { id: 'farhan', name: 'Farhan Ali', type: 'person', x: 780, y: 610 },
    { id: 'hamza', name: 'Hamza Khan', type: 'person', x: 140, y: 620 },
    { id: 'car_jacking', name: 'Car Jacking', type: 'crime', x: 280, y: 500 },
    { id: 'vehicle_ring', name: 'Vehicle Theft Ring', type: 'crime', x: 560, y: 500 },
    { id: 'drug_trade', name: 'Drug Trafficking', type: 'crime', x: 760, y: 540 },
    { id: 'warehouse', name: 'Warehouse Assault', type: 'crime', x: 170, y: 520 },
    { id: 'logistics', name: 'Logistics Cell', type: 'crime', x: 620, y: 660 }
  ],
  edges: [
    { source: 'rafiq', target: 'car_jacking', label: 'Linked to', relation: 'Was involved with Amina and Sami in car jacking.' },
    { source: 'car_jacking', target: 'amina', label: 'Co-offender', relation: 'Amina was involved with Rafiq in car jacking.' },
    { source: 'car_jacking', target: 'sami', label: 'Association', relation: 'Sami was linked to the same car jacking cell.' },
    { source: 'rafiq', target: 'vehicle_ring', label: 'Broker', relation: 'Managed movements of stolen vehicles across the network.' },
    { source: 'amina', target: 'vehicle_ring', label: 'Transfer lead', relation: 'Coordinated vehicle handoff through the theft ring.' },
    { source: 'naveed', target: 'vehicle_ring', label: 'Resale chain', relation: 'Handled resale logistics for stolen vehicles.' },
    { source: 'lea', target: 'vehicle_ring', label: 'Asset broker', relation: 'Sold stolen vehicles through a brokerage channel.' },
    { source: 'rafiq', target: 'drug_trade', label: 'Financial broker', relation: 'Managed cash flow and payments linked to trafficking.' },
    { source: 'sami', target: 'drug_trade', label: 'Transport support', relation: 'Provided route assistance for narcotics movement.' },
    { source: 'farhan', target: 'drug_trade', label: 'Cash movement', relation: 'Moved illicit proceeds through the trafficking chain.' },
    { source: 'rafiq', target: 'logistics', label: 'Operational review', relation: 'Reviewed transport routes with the logistics cell.' },
    { source: 'farhan', target: 'logistics', label: 'Dispatch lead', relation: 'Managed route planning and final dispatch for shipments.' },
    { source: 'rafiq', target: 'amina', label: 'Direct association', relation: 'Shared routes and accomplice details.' },
    { source: 'sami', target: 'amina', label: 'Joint logistics', relation: 'Used Amina for coordinated stolen-vehicle handoffs.' },
    { source: 'rafiq', target: 'naveed', label: 'Escrow network', relation: 'Passed stolen vehicles through a shared transfer chain.' },
    { source: 'warehouse', target: 'hamza', label: 'Assault participant', relation: 'Hamza participated in the warehouse assault.' },
    { source: 'warehouse', target: 'sami', label: 'Coordinated attack', relation: 'Sami coordinated the warehouse assault with the same network.' },
    { source: 'vehicle_ring', target: 'logistics', label: 'Distribution', relation: 'The theft ring used the logistics cell to move assets.' },
    { source: 'drug_trade', target: 'warehouse', label: 'Cross-crime overlap', relation: 'Warehouse funds were reused to support trafficking logistics.' },
    { source: 'naveed', target: 'lea', label: 'Settlement', relation: 'Shared proceeds and vehicle listings.' },
    { source: 'rafiq', target: 'hamza', label: 'Intimidation', relation: 'Used Hamza to apply pressure during escalation.' }
  ]
};
