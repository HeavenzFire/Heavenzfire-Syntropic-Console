import { GoogleGenAI } from "@google/genai";
import { NodeMetrics } from '../types';

export const analyzeNetworkState = async (metrics: NodeMetrics[]): Promise<string> => {
    // Initialize the API client
    // The API key must be obtained exclusively from the environment variable process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
      Act as a Syntropic Network Engineer. Analyze the following Linux Kernel Networking metrics (TC QDisc).
      
      Current State:
      ${JSON.stringify(metrics, null, 2)}

      The available operators are:
      J (Join/Observe), C (Correct/AQM), R (Reset/Flush), H (Harmonize/Quantum), O (Optimize/ECN), M (Mutate/Interval).

      Rules:
      - Latency > 50ms requires C.
      - Queue > 1000 requires R.
      - Packet Loss > 1% requires O.

      Provide a concise 2-sentence tactical analysis and recommend the next manual intervention.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 1024 }
            }
        });
        return response.text || "Analysis complete, but no text returned.";
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        return "Failed to contact Syntropic Intelligence Core (Gemini API Error).";
    }
};