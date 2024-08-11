// Interfaz ChatAI actualizada
export interface ChatAI {
    history: { role: string; parts: { text: string } }[]; 
    prompt: string;
}
