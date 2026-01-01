export interface ModelProvider {
  name: string;
  async complete(params: { prompt: string }): Promise<{ content: string }>;
}

export const lmStudioProvider: ModelProvider = {
  name: 'lm-studio',
  async complete({ prompt }) {
    const response = await fetch('http://localhost:1234/v1/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'local-model',
        prompt: `Convert to SQL query: ${prompt}`,
        max_tokens: 1000,
        temperature: 0.1,
      }),
    });
    const data = await response.json();
    return { content: data.choices[0].text.trim() };
  },
};
