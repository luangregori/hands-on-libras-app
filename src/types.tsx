export type Navigation = {
  navigate: (scene: string, params?: any) => void;
  addListener: (event: string, callback: () => void) => void;
};

export type Route = {
  params: any
};
