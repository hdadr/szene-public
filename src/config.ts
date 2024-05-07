const devApiEndpoint: string = 'http://localhost:3001/api';
const prodApiEndpoint: string = ''; //miserend api?

export const apiUrl: string = import.meta.env.MODE === 'development' ? devApiEndpoint : prodApiEndpoint;
