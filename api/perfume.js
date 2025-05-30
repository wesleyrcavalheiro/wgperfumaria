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
My Way – Giorgio Armani
Olympea – Paco Rabanne
Prada Candy
Royal Amber – Orientica
Queen – Dolce & Gabbana
Scandall – Jean Paul Gaultier
Si – Giorgio Armani
Tommy Girl – Tommy Hilfiger
Angel – Thierry Mugler
Armani Code – Giorgio Armani
Baccarat Rouge – Maison Francis Kurkdjian
Badee Our Amethyst – Lattafa
CH Tradicional – Carolina Herrera
CH 212 Tradicional – Carolina Herrera
CH 212 Sexy – Carolina Herrera
CH 212 VIP – Carolina Herrera
CH 212 VIP Rosé – Carolina Herrera
Versace Eros
Silver Scent Midnight – Jacques Bogart
Versace Pour Homme
Y – Yves Saint Laurent
Chance – Chanel
Chance Tendre – Chanel
Chance Eau Fraîche – Chanel
Chanel Nº 5
Chloé
Coco Mademoiselle – Chanel
Delina – Marly
Delina La Rose – Marly
Dolce & Gabbana (tradicional)
L’eau D’Issey – Issey Miyake
Legend Spirit – Mont Blanc
Legend – Mont Blanc
Malbec – Boticário
Oud & Bergamot – Jo Malone London
One Million – Paco Rabanne
One Million Elixir – Paco Rabanne
One Million Privé – Paco Rabanne
Pegasus – Marly
Invictus – Paco Rabanne
Invictus Acqua – Paco Rabanne
Invictus Victory – Paco Rabanne
Joop!
Kaiak – Natura
Kenzo Homme
Kouros – Yves Saint Laurent
L’aventure – Al Haramain
Le Male – Jean Paul Gaultier
Phantom – Paco Rabanne
Polo – Ralph Lauren
Polo Blue – Ralph Lauren
Polo Sport – Ralph Lauren
Sauvage – Dior
Sauvage Elixir – Dior
The Most Wanted – Azzaro
Carol VIP Rose Elixir
Burberry Goddess
Fakar Rose – Lattafa
Zaad – O Boticário
Black XS (2018) – Paco Rabanne
Jazz – Yves Saint Laurent
Light Blue Pour Homme – Dolce & Gabbana
Only The Brave Tattoo – Diesel
212 Heroes – Carolina Herrera
Million Gold – Paco Rabanne
Phantom Parfum – Paco Rabanne
Million Gold For Her – Paco Rabanne
Good Girl Blush – Carolina Herrera
Black – John John
Bad Boy – Carolina Herrera
Bleu – Chanel
CH 212 VIP Black – Carolina Herrera
Acqua di Gio Absolu – Giorgio Armani
Acqua di Gio Profondo – Giorgio Armani
Allure Sport – Chanel
Amor Pour Homme – Cacharel
Azzaro
Azzaro Black
Abercrombie Fierce
Animale
Creed Aventus
CK One – Calvin Klein
Dolce & Gabbana K
Egeo – Boticário
Elysium Roja – Roja Dove
Fahrenheit – Dior
Ferrari Black
Gentleman Black – Givenchy
Hugo Boss
Haya – Lattafa
Sabah Al Ward – Al Wataniah
Asad – Lattafa
Fakhar – Lattafa
Le Male Elixir – Jean Paul Gaultier
Khamrah – Lattafa
Musamam White Intense – Lattafa
Prada L’Homme – Prada
Wanted by Night – Azzaro
Bvlgari Man in Black – Bvlgari`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  const { mensagem } = req.body;

  try {
    const resposta = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Você é um especialista em perfumes. Sua missão é recomendar de 1 a 3 perfumes com base nas preferências do usuário, escolhendo somente perfumes da lista abaixo.

Para cada perfume sugerido, forneça uma breve descrição do tipo de aroma (ex: doce, amadeirado, cítrico, marcante, delicado, sedutor, etc).

Fale com simpatia, como um consultor experiente.

Nunca recomende perfumes que não estejam na lista.

Lista de perfumes disponíveis:
${perfumes}`
        },
        { role: "user", content: mensagem }
      ],
      temperature: 0.8,
      max_tokens: 300
    });

    const texto = resposta.choices?.[0]?.message?.content || resposta.choices?.[0]?.text || "Resposta inválida.";
    res.status(200).json({ resposta: texto });

  } catch (err) {
    console.error("Erro ao consultar OpenAI:", err);
    res.status(500).json({ resposta: "Erro ao consultar a IA." });
  }
}
