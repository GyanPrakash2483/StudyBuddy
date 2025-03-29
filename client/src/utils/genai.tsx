
export default async function getAIResponse(prompt: string) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/api/genai/response`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt
        })
    })
    const aiResponse = await response.json()
    
    return aiResponse
}