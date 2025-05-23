import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const perfumes = `Versace Dylan Turquoise
Vanilla – Victoria's Secret
Yara – Lattafa
J'adore – Dior
La Nuit Trésor – Lancôme
La Vie Est Belle – Lancôme
La Vie Est Belle L'Éclat – Lancôme
Lady Million – Paco Rabanne
La Belle – Jean Paul Gaultier
Libre – Yves Saint Laurent
Marina de Bourbon
Miami Blossom – Escada
Dolce & Gabbana Light Blue
Euphoria – Calvin Klein
Fantasy – Britney Spears
Flower by Kenzo
Gabriela Sabatini
Good Girl – Carolina Herrera
Good Girl Légère – Carolina Herrera
Good Girl Very – Carolina Herrera
Idôle – Lancôme
Miss Dior Chérie – Dior
My
