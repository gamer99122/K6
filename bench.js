import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [

	{ duration: '5s', target: 9000},
	{ duration: '60s', target: 50000},
    { duration: '5s', target: 0 },  // 降壓
  ],
};

export default function () {
	
	
  http.get('http://localhost:8089/api/OpdRegRoom?limit=10');
  
  sleep(1);
}