//  SERVERLESS FUNCTION:
//   https://tumhari-site.vercel.app/api/generate-itinerary
// Jab koi request aati hai, Vercel isko "spin up" karta hai, kaam karta hai,
// response deta hai, aur wapas band ho jaata hai. Tumhe server manage
// nahi karna padta.

export default async function handler(req, res) {
  // Sirf POST request allow karo (form data POST se aayega)
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { destination, travelDates, travellers, tourType, budget, requirements } = req.body;

  // Basic validation
  if (!destination || !travellers) {
    return res.status(400).json({ error: "Destination and travellers are required" });
  }

  // GROUNDING: Tumhara real tours data, isi ko AI ko bhejenge
  // taaki AI koi fake tour na banaye, sirf inhi mein se suggest kare.
  const toursData = [
    { id: 1, category: "Adventure", destination: "Manali, Himachal Pradesh", duration: "5 Days / 4 Nights", price: "₹18,999", description: "Trek through snow-capped peaks and raft the roaring Beas river.", inclusions: ["Hotel Stay", "River Rafting", "Trekking Guide", "Breakfast & Dinner"] },
    { id: 2, category: "Beach", destination: "Goa", duration: "4 Days / 3 Nights", price: "₹12,499", description: "Sun, sand and sea with beachside stays and water sports.", inclusions: ["Beach Resort", "Water Sports", "Airport Transfer", "Breakfast"] },
    { id: 3, category: "Cultural", destination: "Jaipur, Rajasthan", duration: "3 Days / 2 Nights", price: "₹9,999", description: "Explore forts, palaces and the vibrant culture of the Pink City.", inclusions: ["Heritage Hotel", "Fort Entry Tickets", "Local Guide", "Breakfast"] },
    { id: 4, category: "Family", destination: "Kerala Backwaters", duration: "6 Days / 5 Nights", price: "₹24,999", description: "Houseboat stays, backwater cruises and family-friendly activities.", inclusions: ["Houseboat Stay", "All Meals", "Ayurvedic Massage", "Sightseeing"] },
    { id: 5, category: "Luxury", destination: "Udaipur, Rajasthan", duration: "4 Days / 3 Nights", price: "₹49,999", description: "Lakeside palaces and 5-star luxury in the City of Lakes.", inclusions: ["5-Star Palace Hotel", "Private Boat Ride", "Fine Dining", "Spa Access"] },
    { id: 6, category: "Adventure", destination: "Rishikesh, Uttarakhand", duration: "3 Days / 2 Nights", price: "₹8,499", description: "Bungee jumping, river rafting and camping by the Ganges.", inclusions: ["Camping Stay", "Bungee Jump", "River Rafting", "Bonfire Dinner"] },
  ];

  // PROMPT ENGINEERING:
  // Yahan hum AI ko exact instructions dete hain — kya data use karna hai,
  // kis format mein jawab dena hai. "Sirf JSON do, kuch aur text mat likho"
  // — ye line bhot important hai warna AI extra explanation bhi jod deta hai
  // jisse JSON.parse() fail ho jaata hai.
  const prompt = `
You are a travel planner for an Indian travel company called Tripzo.

User's request:
- Destination: ${destination}
- Travel Dates: ${travelDates || "not specified"}
- Number of Travellers: ${travellers}
- Tour Type: ${tourType || "not specified"}
- Budget: ${budget || "not specified"}
- Special Requirements: ${requirements || "none"}

Tripzo's available tour packages (ONLY suggest from this list, do not invent new ones):
${JSON.stringify(toursData, null, 2)}

Task:
1. Create a short day-wise itinerary tailored to the user's request.
2. Give an estimated budget breakdown (stay, food, activities, transport) that roughly fits their stated budget.
3. Pick the 2 best-matching tours from Tripzo's list above (use their exact "id" and "destination").
4. Write a short 1-2 sentence explanation of why this plan fits their needs.

Respond with ONLY valid JSON, no markdown, no extra text, in exactly this shape:
{
  "itinerary": [
    { "day": 1, "title": "string", "activities": ["string", "string"] }
  ],
  "budgetBreakdown": {
    "stay": "string",
    "food": "string",
    "activities": "string",
    "transport": "string",
    "total": "string"
  },
  "matchedTours": [1, 2],
  "whyThisPlan": "string"
}
`;

  // MODEL FALLBACK LIST: Free tier mein kayi models available hain.
  // Hum inhe order mein try karenge — jo bhi busy (503) ya unavailable (404/429) na ho,
  // usi se response le lenge. Naya sabse pehle, phir purane, taaki best available mile.
  const MODELS_TO_TRY = [
    "gemini-3.8-flash",
    "gemini-3.1-flash-lite",
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
  ];

  const callGemini = async (modelName) => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const data = await response.json();
    return { ok: response.ok, data };
  };

  // Ek model ko 503 (busy) pe 1 baar khud retry karta hai, thoda wait karke
  const callGeminiWithRetry = async (modelName, retries = 1, delayMs = 1200) => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      const { ok, data } = await callGemini(modelName);
      if (ok) return data;

      const isBusy = data?.error?.code === 503;
      if (isBusy && attempt < retries) {
        await new Promise((r) => setTimeout(r, delayMs));
        continue;
      }
      // Is model se kaam nahi bana — error object hi wapas bhej do, taaki bahar wala loop dekh sake
      return { failed: true, error: data?.error };
    }
  };

  // Saare models ko baari-baari try karo, jo pehla success de wahi use karo
  const callGeminiWithFallback = async () => {
    let lastError = null;

    for (const modelName of MODELS_TO_TRY) {
      console.log(`Trying model: ${modelName}`);
      const result = await callGeminiWithRetry(modelName);

      if (!result?.failed) {
        console.log(`Success with model: ${modelName}`);
        return result; // ye model kaam kar gaya
      }

      lastError = result.error;
      console.log(`${modelName} failed (${result.error?.code}), trying next model...`);
      // agla model try karne ke liye loop continue hoga
    }

    // Sab models fail ho gaye
    throw new Error(
      lastError?.code === 503
        ? "All AI models are currently busy, please try again in a moment."
        : "AI request failed on all available models."
    );
  };

  try {
    // AI API INTEGRATION: Gemini ko call karna (multiple models try, retry ke saath)
    const data = await callGeminiWithFallback();

    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // AI kabhi-kabhi ```json ... ``` mein wrap kar deta hai, use clean karte hain
    const cleanedText = rawText.replace(/```json|```/g, "").trim();

    let aiResult;
    try {
      aiResult = JSON.parse(cleanedText);
    } catch (parseErr) {
      console.error("Failed to parse AI JSON:", rawText);
      return res.status(500).json({ error: "AI returned an invalid format, please try again" });
    }

    // Matched tour IDs ko full tour objects se jod dete hain,
    // taaki frontend ko image, price, sab kuch mile
    const matchedTourObjects = toursData.filter((t) =>
      aiResult.matchedTours?.includes(t.id)
    );

    return res.status(200).json({
      ...aiResult,
      matchedTours: matchedTourObjects,
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: err.message || "Something went wrong" });
  }
}