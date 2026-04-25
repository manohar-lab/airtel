import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: 'AIzaSyC6CyoPy5_Ymg5SMlkBWdWkgnaFMk69rG4' });
try {
  const models = await ai.models.list();
  console.log('Available models:', models.map(m => m.name));
} catch (err) {
  console.error('Error listing models:', err.message);
}
