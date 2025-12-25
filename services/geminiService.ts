
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function detectOpportunities(releaseData: any) {
  // Complex Reasoning task: using gemini-3-pro-preview
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Analyze this music release data for the Gresham Protocol:
      Genre: ${releaseData.genre}
      Mood: ${releaseData.mood}
      BPM: ${releaseData.bpm}
      Current streams: ${releaseData.streams}
      Geographic performance: ${JSON.stringify(releaseData.geoData)}
      
      Identify 4 strategic market opportunities for decentralized equity growth.
      Return a list of objects with fields: type (Sync, Playlist, or Marketing), description, confidence (0-1), and potentialROI.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING },
            description: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            potentialROI: { type: Type.STRING }
          },
          required: ['type', 'description', 'confidence', 'potentialROI']
        }
      }
    }
  });

  return JSON.parse(response.text);
}

export async function generateACMEMutation(issue: any) {
  const prompt = `You are ACME (Autonomous Code Mutation Engine), a core component of the Gresham Protocol.
    Trigger: operational_metric_anomaly
    Issue type: ${issue.type}
    Current Metric: ${issue.metric} = ${issue.value}
    
    Task: Generate a surgical code mutation (in Python or TypeScript) to optimize this parameter within the distribution logic.
    Constraint: Only return the code snippet.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
}
