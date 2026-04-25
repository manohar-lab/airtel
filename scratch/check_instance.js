import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: 'dummy' });
console.log('ai keys:', Object.keys(ai));
console.log('ai.models keys:', Object.keys(ai.models));
