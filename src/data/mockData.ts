import { User, Problem, OpenChallenge, CommunitySolution, Innovation, Consultation } from '../types';

export const DEMO_USERS: Record<string, User> = {
  citizen: {
    id: 'usr-citizen-1',
    name: 'Ananya Deshmukh',
    email: 'ananya.citizen@demo.org',
    role: 'citizen',
    roleTitle: 'Active Resident',
    ward: 'Ward 12, West Zone'
  },
  field_officer: {
    id: 'usr-officer-1',
    name: 'Rahul Sharma',
    email: 'rahul.officer@civic.gov',
    role: 'field_officer',
    roleTitle: 'Senior Field Engineer',
    department: 'Public Works Department (PWD)',
    ward: 'Central & West Ward'
  },
  dept_admin: {
    id: 'usr-admin-1',
    name: 'Vikram Patil',
    email: 'vikram.admin@civic.gov',
    role: 'dept_admin',
    roleTitle: 'Executive Engineer / Dept Head',
    department: 'Public Works Department (PWD)'
  },
  super_admin: {
    id: 'usr-super-1',
    name: 'Dr. Sunita Mehta',
    email: 'commissioner@civic.gov',
    role: 'super_admin',
    roleTitle: 'Municipal Commissioner',
    department: 'City Administration'
  }
};

export const INITIAL_PROBLEMS: Problem[] = [
  {
    id: 'CB-2026-1042',
    title: 'Pothole near college',
    description: 'Deep 8-inch pothole right outside Government Engineering College main gate. Two scooter riders slipped yesterday during evening rain.',
    category: 'Roads',
    location: {
      lat: 19.8762,
      lng: 75.3433,
      address: 'Waluj Road, Opp. Engineering College Gate, Chhatrapati Sambhajinagar, Maharashtra',
      source: 'pin'
    },
    evidencePhotos: [
      'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'in_progress',
    department: 'Public Works Department (PWD)',
    assignedOfficer: 'Rahul Sharma',
    deadline: '15 Sep 2026',
    createdAt: '2026-09-10T09:30:00Z',
    reportedBy: 'Ananya Deshmukh',
    reportedByEmail: 'ananya.citizen@demo.org',
    urgency: 'urgent',
    timeline: [
      {
        id: 'tl-1',
        status: 'reported',
        timestamp: '10 Sep 2026, 09:30 AM',
        note: 'Complaint registered by citizen with photo evidence.',
        author: 'Ananya Deshmukh'
      },
      {
        id: 'tl-2',
        status: 'assigned',
        timestamp: '11 Sep 2026, 11:15 AM',
        note: 'Assigned to Senior Field Engineer Rahul Sharma with priority deadline.',
        author: 'Vikram Patil (Dept Admin)'
      },
      {
        id: 'tl-3',
        status: 'in_progress',
        timestamp: '12 Sep 2026, 02:45 PM',
        note: 'Field inspection completed. Cold-mix asphalt repair batch scheduled for filling.',
        author: 'Rahul Sharma (Field Officer)'
      }
    ]
  },
  {
    id: 'CB-2026-1049',
    title: 'Broken streetlight at Junction 4',
    description: 'High-mast LED light fixture hanging loose from support arm. Junction is completely pitch dark after 7:30 PM.',
    category: 'Streetlights',
    location: {
      lat: 19.8821,
      lng: 75.3325,
      address: 'Junction 4, Station Road, Chhatrapati Sambhajinagar',
      source: 'gps'
    },
    evidencePhotos: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'assigned',
    department: 'Electrical Department',
    assignedOfficer: 'Rahul Sharma',
    deadline: 'Tomorrow, 14 Sep',
    createdAt: '2026-09-12T14:10:00Z',
    reportedBy: 'Ananya Deshmukh',
    urgency: 'high',
    timeline: [
      {
        id: 'tl-10',
        status: 'reported',
        timestamp: '12 Sep 2026, 02:10 PM',
        note: 'Reported by resident via GPS.',
        author: 'Ananya Deshmukh'
      },
      {
        id: 'tl-11',
        status: 'assigned',
        timestamp: '12 Sep 2026, 04:30 PM',
        note: 'Dispatched to Electrical field team. Hydraulic ladder truck required.',
        author: 'Vikram Patil (Dept Admin)'
      }
    ]
  },
  {
    id: 'CB-2026-1031',
    title: 'Open stormwater drain near primary school',
    description: 'Broken concrete slab over storm drain. Concrete patch repair has been finished by field team and is awaiting citizen sign-off.',
    category: 'Drainage',
    location: {
      lat: 19.8654,
      lng: 75.3512,
      address: 'Near Balak Mandir Primary School, Ward 12, Maharashtra',
      source: 'pin'
    },
    evidencePhotos: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'resolution_pending',
    department: 'Drainage & Stormwater',
    assignedOfficer: 'Rahul Sharma',
    deadline: '13 Sep 2026',
    createdAt: '2026-09-08T10:00:00Z',
    reportedBy: 'Ananya Deshmukh',
    urgency: 'high',
    resolutionPhoto: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80',
    resolutionNotes: 'Heavy reinforced precast concrete slab installed and sealed over the storm drain. Site cleaned and hazard cleared.',
    timeline: [
      {
        id: 'tl-21',
        status: 'reported',
        timestamp: '08 Sep 2026, 10:00 AM',
        note: 'Hazard reported near primary school.',
        author: 'Ananya Deshmukh'
      },
      {
        id: 'tl-22',
        status: 'assigned',
        timestamp: '08 Sep 2026, 01:20 PM',
        note: 'Assigned urgently to Drainage Team.',
        author: 'Vikram Patil'
      },
      {
        id: 'tl-23',
        status: 'in_progress',
        timestamp: '09 Sep 2026, 09:00 AM',
        note: 'Procured precast slab and masonry team at location.',
        author: 'Rahul Sharma'
      },
      {
        id: 'tl-24',
        status: 'resolution_pending',
        timestamp: '12 Sep 2026, 05:00 PM',
        note: 'Resolution completed and submitted for Citizen Verification.',
        author: 'Rahul Sharma',
        photoUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'CB-2026-1038',
    title: 'Garbage accumulation behind market',
    description: 'Commercial vegetable waste dumped behind weekly market creating foul odor and blocking secondary pedestrian path.',
    category: 'Garbage',
    location: {
      lat: 19.8711,
      lng: 75.3289,
      address: 'Behind Weekly Mandi, Cidco Sector N-4, Maharashtra',
      source: 'gps'
    },
    evidencePhotos: [
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'resolved',
    department: 'Solid Waste Management',
    assignedOfficer: 'Suresh More',
    deadline: '09 Sep 2026',
    createdAt: '2026-09-05T08:15:00Z',
    reportedBy: 'Ananya Deshmukh',
    urgency: 'medium',
    resolutionPhoto: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80',
    resolutionNotes: 'Compactor cleared 2.4 tons of accumulated waste. Area sanitized with lime powder and 2 closed community bins placed.',
    citizenFeedback: 'solved',
    citizenFeedbackNote: 'Verified on spot. Completely cleaned and bins installed. Thank you!',
    timeline: [
      {
        id: 'tl-31',
        status: 'reported',
        timestamp: '05 Sep 2026, 08:15 AM',
        note: 'Complaint registered.',
        author: 'Ananya Deshmukh'
      },
      {
        id: 'tl-32',
        status: 'assigned',
        timestamp: '05 Sep 2026, 11:00 AM',
        note: 'Assigned to Sanitation Inspector.',
        author: 'Vikram Patil'
      },
      {
        id: 'tl-33',
        status: 'in_progress',
        timestamp: '06 Sep 2026, 07:30 AM',
        note: 'Garbage compactor team deployed.',
        author: 'Suresh More'
      },
      {
        id: 'tl-34',
        status: 'resolution_pending',
        timestamp: '06 Sep 2026, 02:00 PM',
        note: 'Site cleared and sanitized. Submitted for verification.',
        author: 'Suresh More'
      },
      {
        id: 'tl-35',
        status: 'resolved',
        timestamp: '07 Sep 2026, 10:15 AM',
        note: 'Citizen confirmed: Problem Solved.',
        author: 'Ananya Deshmukh'
      }
    ]
  },
  {
    id: 'CB-2026-1051',
    title: 'Severe monsoon waterlogging in Ward 12',
    description: 'Every heavy shower leads to 3-foot water submersion. Natural slope gradients and traditional drains overflow into residential basements. Pumping alone fails.',
    category: 'Water',
    location: {
      lat: 19.8699,
      lng: 75.3402,
      address: 'Low-Lying Area, Ward 12 Main Sector, Maharashtra',
      source: 'pin'
    },
    evidencePhotos: [
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'in_progress',
    department: 'Municipal Corporation & Stormwater',
    assignedOfficer: 'Rahul Sharma',
    deadline: '20 Sep 2026',
    createdAt: '2026-09-01T11:00:00Z',
    reportedBy: 'Kavita Verma',
    urgency: 'urgent',
    publishedToChallenge: true,
    timeline: [
      {
        id: 'tl-41',
        status: 'reported',
        timestamp: '01 Sep 2026, 11:00 AM',
        note: 'Repeated severe flooding reported by neighborhood association.',
        author: 'Kavita Verma'
      },
      {
        id: 'tl-42',
        status: 'in_progress',
        timestamp: '03 Sep 2026, 04:00 PM',
        note: 'Standard drainage deepening failed due to underground utility clashes. Published as Open Civic Challenge for community innovation!',
        author: 'Vikram Patil (Dept Admin)'
      }
    ]
  }
];

export const INITIAL_CHALLENGES: OpenChallenge[] = [
  {
    id: 'chal-101',
    title: 'How can we reduce waterlogging in Ward 12?',
    problemDescription: 'Ward 12 sits in a natural geological saucer basin. Every monsoon, rainfall accumulates faster than the 40-year-old gravity culverts can discharge into the Kham river.',
    whyDifficult: 'Traditional widening of concrete culverts is blocked by dense underground fiber optics, water mains, and century-old structural foundations. Budget for total excavation exceeds city reserves.',
    location: 'Ward 12, Municipal Corporation',
    department: 'Municipal Corporation & Stormwater',
    status: 'open',
    solutionsCount: 4,
    linkedProblemId: 'CB-2026-1051',
    createdAt: '2026-09-03T16:00:00Z'
  },
  {
    id: 'chal-102',
    title: 'How can we improve waste collection in narrow lanes?',
    problemDescription: 'Older inner-city heritage alleys are under 2.5 meters wide, preventing standard 4-wheel refuse compactor trucks from reaching over 4,200 households daily.',
    whyDifficult: 'Tricycle pushcarts break down frequently and hand-carry causes occupational strain and illegal corner dumping. Heavy vehicular access is physically impossible.',
    location: 'Old City Core, Ward 3 & 4',
    department: 'Solid Waste Management',
    status: 'open',
    solutionsCount: 2,
    createdAt: '2026-09-06T10:00:00Z'
  },
  {
    id: 'chal-103',
    title: 'How can we create safe pedestrian crossings on High-Traffic Arteries?',
    problemDescription: 'A 6-lane bypass divides dense residential neighborhoods from schools and health sub-centers without designated speed breaks.',
    whyDifficult: 'Overhead footbridges have less than 11% utilization due to steep stairs for senior citizens; signalized crossings create 2km vehicular queues during rush hour.',
    location: 'Bypass Ring Road, Sector 8',
    department: 'Traffic & Urban Mobility',
    status: 'open',
    solutionsCount: 1,
    createdAt: '2026-09-08T12:00:00Z'
  }
];

export const INITIAL_SOLUTIONS: CommunitySolution[] = [
  {
    id: 'sol-1',
    challengeId: 'chal-101',
    title: 'Smart drainage monitoring with automated sub-sump sluice gates',
    idea: 'Deploy IoT ultrasonic water level nodes along the 6 branch drains linked to low-power solar actuated sluice valves. When a branch nears 80% capacity, excess flow is sequentially buffered into 3 dry park detention basins.',
    howItHelps: 'Prevents storm surges from hitting the main bottle-necked culvert simultaneously by staggering discharge peaks by 35 minutes.',
    expectedImpact: 'Estimated 65% drop in street ponding depth with zero underground utility excavation needed.',
    author: 'Prof. Milind Joshi (Civil & IoT Lab)',
    likes: 850,
    status: 'shortlisted',
    createdAt: '2026-09-04T10:20:00Z',
    reviewerNotes: 'Highly feasible. Recommended for rapid pilot at Sector 14 dry playground basin.'
  },
  {
    id: 'sol-2',
    challengeId: 'chal-101',
    title: 'Rainwater channel redesign using modular permeable pavers',
    idea: 'Replace impermeable roadside shoulders with slotted bio-retention swales and porous aggregate gravel beds that absorb initial run-off into underground aquifer recharge bores.',
    howItHelps: 'Naturally filters storm runoff into the shallow water table instead of choking downstream culverts.',
    expectedImpact: 'Recharges groundwater table by 1.2M liters while clearing roadside puddles in 20 minutes.',
    author: 'GreenCity Youth Collective',
    likes: 642,
    status: 'expert_review',
    createdAt: '2026-09-04T15:40:00Z',
    reviewerNotes: 'Under technical review with Hydrogeology Department.'
  },
  {
    id: 'sol-3',
    challengeId: 'chal-101',
    title: 'Community rainwater harvesting incentives for low-lying apartments',
    idea: 'Offer a 15% municipal property tax rebate to apartment complexes in Ward 12 that install 50,000-liter rooftop retention tanks that hold rooftop runoff for 4 hours during peak downpours.',
    howItHelps: 'Stops 400,000 square meters of roof catchment from dumping immediately onto neighborhood roads.',
    expectedImpact: 'Rapid decentralization of flood retention without municipal land acquisition.',
    author: 'Sunil Rao (Ward 12 Resident Association)',
    likes: 421,
    status: 'submitted',
    createdAt: '2026-09-05T09:10:00Z'
  },
  {
    id: 'sol-4',
    challengeId: 'chal-101',
    title: 'Road slope redesign and localized micro-gutters',
    idea: 'Re-mill the crown angle of the 400-meter feeder road to divert water towards the eastern boundary ditch rather than pooling in the central intersection.',
    howItHelps: 'Eliminates stagnant water vortex at the lowest elevation crossing.',
    expectedImpact: 'Immediate relief for 800 motorists daily.',
    author: 'Devendra Kulkarni',
    likes: 187,
    status: 'submitted',
    createdAt: '2026-09-06T14:30:00Z'
  },
  {
    id: 'sol-5',
    challengeId: 'chal-102',
    title: 'Narrow-chassis electric tipping carts with localized hub transfer',
    idea: 'Deploy 1-meter wide battery-electric carts with hydraulic rear tipping bins that operate silently in 1.8m lanes and transfer directly into stationary sealed compactors at ward gates.',
    howItHelps: 'Allows 100% door-to-door waste collection in ancient heritage alleys without noise or diesel emissions.',
    expectedImpact: 'Eliminates 14 illegal lane dump spots and covers 4,200 homes on scheduled clockwork.',
    author: 'CleanAlley Initiative',
    likes: 312,
    status: 'pilot',
    createdAt: '2026-09-07T11:00:00Z',
    reviewerNotes: 'Approved for 3-vehicle pilot in Ward 3 starting next week.'
  },
  {
    id: 'sol-6',
    challengeId: 'chal-102',
    title: 'Color-coded community drop-vaults with RFID segregation tracking',
    idea: 'Place stainless steel sealed wall-mounted receptacles at 50m intervals along narrow streets accessible only with resident keycards.',
    howItHelps: 'Citizens drop segregated waste at their convenience, and carts empty vaults twice daily.',
    expectedImpact: 'Reduces street littering by 80%.',
    author: 'Pooja Rathi',
    likes: 145,
    status: 'submitted',
    createdAt: '2026-09-08T08:30:00Z'
  },
  {
    id: 'sol-7',
    challengeId: 'chal-103',
    title: 'Mid-block raised pedestrian table with solar illuminated radar flashers',
    idea: 'Construct a 10cm gently ramped pedestrian crossing table that forces vehicles to slow to 25 km/h, paired with pedestrian-activated radar flashing amber cat-eyes.',
    howItHelps: 'Zero steps for elderly and disabled pedestrians; visible 300m away in heavy rain or fog.',
    expectedImpact: 'Safe crossing time reduced to 12 seconds with 90% pedestrian compliance.',
    author: 'Urban SafeStreet Alliance',
    likes: 278,
    status: 'submitted',
    createdAt: '2026-09-09T17:00:00Z'
  }
];

export const INITIAL_INNOVATIONS: Innovation[] = [
  {
    id: 'inn-1',
    title: 'Solar-Powered Water Level Telemetry Nodes',
    problem: 'Storm drains overflow without early warning, flooding basements before municipal pumps can be mobilized.',
    solution: 'Ultra-low-cost IoT sensor bracket with LoRaWAN wireless telemetry mounted inside manholes to send real-time SMS alerts to ward engineers.',
    expectedImpact: '15-minute advance flood alert allowing field teams to open sluice valves proactively.',
    author: 'Ananya Deshmukh',
    status: 'shortlisted',
    createdAt: '2026-09-02T10:00:00Z'
  },
  {
    id: 'inn-2',
    title: 'Plastic-to-Pavement Aggregate Recycling for Rural Link Roads',
    problem: 'Single-use plastic pouches clog stormwater canals while rural feeder roads deteriorate after every monsoon.',
    solution: 'Shredded non-recyclable multi-layered plastics melted into standard bitumen at 165°C to form durable polymer-modified asphalt.',
    expectedImpact: '3x longer road surface lifespan and upcycles 1 ton of plastic per kilometer of road.',
    author: 'EcoRoads Tech Group',
    status: 'pilot',
    createdAt: '2026-08-28T14:30:00Z'
  }
];

export const INITIAL_CONSULTATIONS: Consultation[] = [
  {
    id: 'con-1',
    question: 'Should the city introduce dedicated cycling and micro-mobility lanes on major arterial corridors?',
    explanation: 'The proposed 22-kilometer network would repurpose 1.8 meters of outer curb lane along Station Road and Jalna Road with physical bollards, promoting clean transit and reducing scooter congestion.',
    deadline: '30 Sep 2026',
    category: 'Urban Mobility',
    department: 'Department of Transportation',
    options: [
      { key: 'strongly_support', label: 'Strongly Support (Protected bollards)', votes: 842 },
      { key: 'support', label: 'Support (Paint markings only)', votes: 315 },
      { key: 'neutral', label: 'Neutral / Need more traffic data', votes: 94 },
      { key: 'oppose', label: 'Oppose (Concerns on car lanes)', votes: 121 }
    ],
    totalVotes: 1372
  },
  {
    id: 'con-2',
    question: 'Should commercial shops and restaurants have municipal fees tied to waste segregation compliance?',
    explanation: 'Establishments producing more than 20kg organic waste daily would receive a 25% rebate if they maintain 100% wet/dry separation, or face escalation if unsegregated.',
    deadline: '15 Oct 2026',
    category: 'Solid Waste Management',
    department: 'Health & Sanitation',
    options: [
      { key: 'strongly_support', label: 'Strongly Support (Incentives + Audits)', votes: 620 },
      { key: 'support', label: 'Support (Incentives only)', votes: 410 },
      { key: 'neutral', label: 'Neutral', votes: 78 },
      { key: 'oppose', label: 'Oppose (Increases compliance burden)', votes: 95 }
    ],
    totalVotes: 1203
  }
];
