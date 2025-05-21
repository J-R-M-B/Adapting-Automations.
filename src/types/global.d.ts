export {};

declare global {
  interface Window {
    VG_CONFIG: {
      ID: string;
      region: 'eu' | 'na';
      render: string;
      stylesheets: string[];
      user?: {
        name?: string;
        email?: string;
        phone?: string;
      };
      userID?: string;
      autostart?: boolean;
    };
  }
}