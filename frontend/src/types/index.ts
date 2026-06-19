export type ThemeMode = 'dark' | 'light';
export type RoleId    = 'dalal' | 'admin';

export interface User {
  id:    string;
  // name:  string;
  role:  RoleId;
  token: string;
}

export interface RoleConfig {
  id:       RoleId;
  icon:     string;
  title:    string;
  desc:     string;
  features: string[];
  accent:   string;
  glow:     string;
  shadow:   string;
}