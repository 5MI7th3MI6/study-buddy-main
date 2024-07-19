import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const calcDuration = (start: string, end: string) => {
  const startTime = new Date(`2021-01-01T${start}`);
  const endTime = new Date(`2021-01-01T${end}`);
  const diff = endTime.getTime() - startTime.getTime();
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  return `${hours}h ${minutes}m`;
};

export const dateToUTC = (date: string, time: string) => {
  const [year, month, day] = date.split('-')
  const [hour, minute] = time.split(':')
  return new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute)))
}

export function getHighContrastColor(eventType: string) {
  switch (eventType) {
    case 'assignment':
      return {
        color: '#1E90FF', // DodgerBlue
        backgroundColor: '#F0F8FF', // AliceBlue
        borderColor: '#1E90FF',
        textColor: '#1E90FF'
      };
    case 'quiz':
      return {
        color: '#32CD32', // LimeGreen
        backgroundColor: '#F5FFFA', // MintCream
        borderColor: '#32CD32',
        textColor: '#32CD32'
      };
    case 'meeting':
      return {
        color: '#FF4500', // OrangeRed
        backgroundColor: '#FFF5EE', // Seashell
        borderColor: '#FF4500',
        textColor: '#FF4500'
      };
    case 'other':
      return {
        color: '#800080',
        backgroundColor: '#E6E6FA', // Lavender
        borderColor: '#800080',
        textColor: '#800080'
      };
    case 'completed':
      // return white on gray
      return {
        color: '#222',
        backgroundColor: '#222', // LightGrey
        borderColor: '#aaa',
        textColor: '#FFFFFF'
      };
    default:
      return {
        color: '#FFD700', // Gold
        backgroundColor: '#FFF8DC', // Cornsilk
        borderColor: '#FFD700',
        textColor: '#FFD700'
      };
  }
}
