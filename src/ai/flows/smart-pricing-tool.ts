'use server';

/**
 * @fileOverview An AI-powered tool to suggest optimal crop prices for farmers.
 *
 * - suggestPrice - A function that suggests an optimal price for a crop.
 * - SmartPricingInput - The input type for the suggestPrice function.
 * - SmartPricingOutput - The return type for the suggestPrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const SmartPricingInputSchema = z.object({
  cropName: z.string().describe('The name of the crop.'),
  quantity: z.number().describe('The quantity of the crop available (e.g., in kg).'),
  harvestDate: z.string().describe('The harvest date of the crop (YYYY-MM-DD).'),
  pesticidesUsed: z.boolean().describe('Whether pesticides were used on the crop.'),
  organicCertification: z.string().optional().describe('URL to the organic certification document, if available.'),
  location: z.string().describe('The location where the crop is grown.'),
  farmingMethod: z.string().describe('The farming method used (e.g., organic, conventional).'),
  expectedYield: z.number().describe('The expected yield of the crop (e.g., in kg per hectare).'),
  currentMarketPrice: z.number().optional().describe('The current market price of the crop (if known).'),
});
export type SmartPricingInput = z.infer<typeof SmartPricingInputSchema>;

const SmartPricingOutputSchema = z.object({
  suggestedPrice: z.number().describe('The suggested optimal price for the crop per unit (e.g., per kg).'),
  reasoning: z.string().describe('The reasoning behind the suggested price, considering market trends, seasonality, and crop quality.'),
});
export type SmartPricingOutput = z.infer<typeof SmartPricingOutputSchema>;

export async function suggestPrice(input: SmartPricingInput): Promise<SmartPricingOutput> {
  return suggestPriceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartPricingPrompt',
  input: {schema: SmartPricingInputSchema},
  output: {schema: SmartPricingOutputSchema},
  model: googleAI.model('gemini-pro'),
  prompt: `You are an AI-powered agricultural pricing advisor. You will provide a suggested price per unit (e.g., kg) for a farmer's crop based on the following information:

Crop Name: {{{cropName}}}
Quantity: {{{quantity}}} kg
Harvest Date: {{{harvestDate}}}
Pesticides Used: {{{pesticidesUsed}}}
Organic Certification: {{{organicCertification}}}
Location: {{{location}}}
Farming Method: {{{farmingMethod}}}
Expected Yield: {{{expectedYield}}} kg per hectare
Current Market Price (if known): {{{currentMarketPrice}}}

Consider market trends, seasonality, crop quality (based on farming method and pesticide usage), and location to determine the optimal price. Explain your reasoning.

Respond with a JSON object with "suggestedPrice" and "reasoning" fields.
`, // Changed response format to JSON object with suggestedPrice and reasoning.
});

const suggestPriceFlow = ai.defineFlow(
  {
    name: 'suggestPriceFlow',
    inputSchema: SmartPricingInputSchema,
    outputSchema: SmartPricingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
