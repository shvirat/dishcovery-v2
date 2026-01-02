
import { GoogleGenAI, Modality } from "@google/genai";

// Always use process.env.API_KEY directly for initialization as per guidelines
const getAI = () => new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

/**
 * Helper to convert an image URL or data URI into the base64 data and mimeType 
 * required by the Gemini API's inlineData part.
 */
async function imageUrlToData(url: string): Promise<{ data: string, mimeType: string }> {
  // If it's already a data URI, just parse it
  if (url.startsWith('data:')) {
    const matches = url.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) throw new Error("Invalid data URI format");
    return { mimeType: matches[1], data: matches[2] };
  }
  
  // If it's a regular URL, fetch it and convert to base64
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // result is "data:[mimeType];base64,[data]"
        const base64 = result.split(',')[1];
        resolve({ data: base64, mimeType: blob.type });
      };
      reader.onerror = () => reject(new Error("Failed to read image data"));
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image URL to base64:", error);
    throw new Error("Could not process the image for AI editing. This may be due to cross-origin restrictions on the source image.");
  }
}

export const geminiService = {
  /**
   * Generates a brand new meal image based on a prompt.
   */
  async generateMealImage(prompt: string, size: '1K' | '2K' | '4K' = '1K'): Promise<string> {
    const ai = getAI();
    // Using imagen-4.0-generate-001 for high quality as per instructions
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: `A professional, high-end food photography shot of: ${prompt}. Cinematic lighting, depth of field, appetizing colors.`,
      config: {
        numberOfImages: 1,
        aspectRatio: '1:1',
        outputMimeType: 'image/jpeg',
      }
    });

    const base64 = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64}`;
  },

  /**
   * Edits an existing meal image using Gemini 2.5 Flash Image.
   */
  async editMealImage(imageUri: string, editPrompt: string): Promise<string> {
    const ai = getAI();
    
    // Support both data URIs and standard URLs
    const { data, mimeType } = await imageUrlToData(imageUri);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: data,
              mimeType: mimeType,
            },
          },
          {
            text: `Apply these changes to the food image: ${editPrompt}. Maintain the composition but modify the specific request. Ensure it looks realistic and appetizing.`,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // Extract the generated image
    let editedImageBase64 = '';
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        editedImageBase64 = part.inlineData.data;
        break;
      }
    }

    if (!editedImageBase64) throw new Error("AI failed to generate an edited image");
    return `data:image/png;base64,${editedImageBase64}`;
  }
};
