export interface Device {
  udid: string;
  name: string;
  version: string;
  isAvailable: boolean;
  lastDetected: string;
  inUseBy?: string | null;
}

export interface SessionSummary {
  id: string;
  udid?: string;
  device?: Device;
  deviceInfo?: Device;
  appiumPort?: number;
  status: string;
  flow: string;
  checkpoint: string;
  startTime?: string;
  error?: string | null;
  result?: any | null;
  infinite?: boolean;
  runCount?: number;
  maxRuns?: number;
}

export interface AppiumServer {
  udid: string;
  appiumPort: number;
  wdaPort: number;
  mjpegPort: number;
  uptime: number;
}

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  data: any;
}

export interface SystemHealth {
  status: string;
  version: string;
  timestamp: string;
}

export interface ProfileOptions {
  age: number;
  nameType: string;
  nameVariant: string;
}

export interface AutomationParams {
  waitTimeAfterCaptcha: number;
  photoCount: number;
  dragDistanceSlider: boolean;
  totalAccountCreationTime: number;
}

export interface StartParams {
  flow: string;
  checkpoint: string;
  generateProfile: boolean;
  infinite: boolean;
  maxRuns: number;
  maxConsecutiveErrors: number;
  profileOptions: ProfileOptions;
  params: AutomationParams;
}

export interface Checkpoint {
  id: string;
  label: string;
  description: string;
}
