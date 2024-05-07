declare module 'public/saintIDsByDate.json' {
    export interface SaintIDsByDate {
      date: string;
      ids: string[];
    }
  
    const data: SaintIDsByDate[];
    export default data;
  }