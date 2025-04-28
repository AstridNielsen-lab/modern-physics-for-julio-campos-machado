export interface Theory {
  id: string;
  title: string;
  equation: string;
  shortDescription: string;
  description: string;
  limitations: string[];
  applications: {
    technology: string;
    research: string;
    impact: string;
  };
  visualization: {
    type: 'line' | 'radar';
    data: any;
    options: any;
  };
}

export interface Discovery {
  title: string;
  description: string;
  items: string[];
}

export interface TheoryInconsistencies {
  theory: string;
  inconsistencies: Array<{
    title: string;
    description: string;
  }>;
  gaps: Array<{
    title: string;
    description: string;
  }>;
}

export interface Methodology {
  title: string;
  description: string;
  steps: Array<{
    title: string;
    description: string;
  }>;
}