import { GoogleGenAI, Type } from "@google/genai";
import { PersonalityResult } from '../types';

export const analyzePersonality = async (answers: string[], name?: string, zodiac?: string): Promise<PersonalityResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    The user has taken a "Cosmic Personality Quiz" answering 10 metaphorical questions about space, gravity, and stars to reveal their inner self.
    
    User Details:
    Name: ${name || "Traveler"}
    Zodiac Sign: ${zodiac || "Unknown"}

    User Answers:
    ${answers.map((ans, i) => `${i + 1}. ${ans}`).join('\n')}

    Generate a Creative Cosmic Personality Archetype based primarily on the quiz answers. 
    
    Role of the Zodiac Sign:
    - Use the Zodiac sign (${zodiac}) as a "cosmic flavor" to add nuance to the description, but do not let it override the strong signals from the quiz answers.
    - Example: "As a ${zodiac}, your natural tendency for [trait] aligns perfectly with the [quiz answer theme], making you..."
    - If the sign clashes with the answers, frame it as a unique tension or balance (e.g., "Unlike the typical ${zodiac}, you gravitate towards...").

    Requirements:
    1. Title: A unique, evocative space-themed title (e.g., "The Solar Guardian", "The Nebula Weaver", "The Event Horizon", "The Comet Chaser").
    2. Description: A 5-6 line deep, psychological analysis using space metaphors. It should feel like a personalized astrological reading mixed with cosmic philosophy. Address the user by name (${name}) at least once.
    3. Tips: 3 actionable, real-life tips customized for this specific archetype.
    
    Tone: Mystical, insightful, empowering, and modern.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "The name of the cosmic personality archetype",
            },
            description: {
              type: Type.STRING,
              description: "A 5-6 line explanation of the personality using space metaphors",
            },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 actionable tips for this personality",
            },
          },
          required: ["title", "description", "tips"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as PersonalityResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback in case of API error
    return {
      title: "The Mysterious Void",
      description: `Like a black hole, ${name || "Traveler"}, your personality is dense with mystery and gravity. The stars didn't align for our AI this time, or perhaps you are just too complex to be categorized by a simple algorithm. You possess a depth that draws others in, even when you remain silent.`,
      tips: ["Try taking the quiz again later.", "Reflect on your answers personally.", "Embrace the mystery."]
    };
  }
};