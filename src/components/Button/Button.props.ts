import type { HTMLAttributes } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> { 
  children: React.ReactNode;
  appearence?: 'btn-small' | 'btn-big';
}