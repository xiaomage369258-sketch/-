export interface GenerateImageResult {
  imageUrl: string | null;
  error: string | null;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface PromptOption {
  id: string;
  label: string;
  value: string;
}