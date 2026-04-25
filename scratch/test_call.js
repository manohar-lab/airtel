import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: 'AIzaSyC6CyoPy5_Ymg5SMlkBWdWkgnaFMk69rG4' });
try {
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [{ role: 'user', parts: [{ text: 'Say hello' }] }],
  });
  console.log('Response type:', typeof response);
  console.log('Response keys:', Object.keys(response));
  if (response.text) console.log('Response.text type:', typeof response.text);
} catch (err) {
  console.error('Error:', err.message);
}
