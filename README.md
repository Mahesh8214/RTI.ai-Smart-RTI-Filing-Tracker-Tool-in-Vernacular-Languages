
---

## 🏛️ `README.md` – *RTI.ai* — A Civic Technology for Democratic Empowerment

```markdown
# 🧾 RTI.ai – Vernacular RTI Filing and Intelligence Companion

*Veritas per Informationem* — Truth through Information

RTI.ai is an avant-garde React + TypeScript application designed to empower Indian citizens in asserting their Right to Information (RTI) with elegance, efficiency, and linguistic inclusivity.

This project leverages Google Gemini (AI Studio) for intelligent query synthesis, guiding users from raw problem statements to legally-structured RTI applications — even in vernacular tongues like Hindi.

---

## 🏗️ Project Structure

```plaintext

📦 rti-ai
┣ 📁 components/
┃ ┣ 📁 icons/
┃ ┣ 📄 Header.tsx
┃ ┣ 📄 RtiForm.tsx
┃ ┣ 📄 RtiResult.tsx
┃ ┗ 📄 RtiTracker.tsx
┣ 📁 hooks/
┃ ┗ 📄 useRtiTracker.ts
┣ 📁 services/
┃ ┗ 📄 geminiService.ts       ← Gemini API integration
┣ 📄 .env.local                ← Local Gemini API key
┣ 📄 App.tsx                   ← App root
┣ 📄 constants.ts              ← Static data definitions
┣ 📄 index.html                ← HTML shell
┣ 📄 index.tsx                 ← Main render entry
┣ 📄 metadata.json             ← RTI metadata schema
┣ 📄 package.json              ← Dependencies & scripts
┣ 📄 tsconfig.json             ← TypeScript config
┣ 📄 vite.config.ts            ← Vite build configuration
┣ 📄 types.ts                  ← Custom type definitions
┗ 📄 README.md                 ← This file

````

---

## ✨ Core Features

- 🎙️ **Vernacular Query Input**: Accepts natural language input (typed or voice) in Hindi or English.
- 🤖 **AI-Powered Drafting**: Uses **Gemini LLM** to reformulate raw grievances into legal RTI requests.
- 🏛️ **Department Prediction**: Suggests appropriate government office using keywords and AI mapping.
- 📄 **Auto-Generated PDF**: Produces RTI documents in downloadable, printable format.
- ⏰ **RTI Tracker**: Monitors submission date and reminds users as per RTI timelines (30-day rule).
- 🌐 **React + Vite + TypeScript**: Ensures blazing-fast frontend development and maintainability.

---

## 🧠 How RTI.ai Works

1. The user narrates or types their issue (e.g., *“electricity is gone in my area for 2 months”*).
2. Gemini transforms this into a formal legal RTI question using an embedded prompt structure.
3. The system auto-suggests the relevant public department.
4. A PDF is dynamically generated in the standard RTI template.
5. Users are guided to download and submit the RTI manually or via online channels.

---

## 🧪 Technologies Used

| Layer         | Stack                            |
|---------------|-----------------------------------|
| Frontend      | React.js, TypeScript, Vite       |
| AI/LLM        | Google Gemini via AI Studio API  |
| State Mgmt    | Hooks (useRtiTracker)            |
| Styling       | Tailwind / Native CSS            |
| Deployment    | Vercel / Netlify (recommended)   |

---

## 🚀 How to Run Locally

```bash
git clone 
cd rti-ai
npm install
# Add your Gemini API key in `.env.local`
npm run dev
````

Sample `.env.local`:

```env
VITE_GEMINI_API_KEY=your_google_ai_studio_key
```

---

## 📜 Sample Prompt to Gemini

> "Convert the following user complaint into a formal RTI draft in Hindi under the RTI Act, 2005: 'I paid fees but didn’t get my hostel room yet.'"

Gemini responds with a structured and respectful legal draft in Hindi, ready to paste into the RTI form.

---

## 📈 Future Scope

* 🌍 **Multi-language Support**: Add Marathi, Bengali, Tamil using Bhashini or IndicTrans.
* 🤝 **Digital Filing Integration**: Direct RTI submission to [https://rtionline.gov.in](https://rtionline.gov.in)
* 🧾 **Auto-Fill Aadhaar/DigiLocker Integration**
* 📱 **Mobile App (React Native)**: One-click RTI filing for Bharat’s 600M smartphone users.
* 🧠 **Offline Local LLMs**: On-device generation using Mistral or LLaMA2 for privacy-first RTI drafting.
* 🧑‍⚖️ **Legal Chatbot (RTI GPT)**: Ask RTI doubts with context-aware assistant trained on the RTI Act.

---

## 📢 License

This project is released under the **MIT License** — free for public good, civic engagement, and open government.

---

> “Information is the currency of democracy.” – Thomas Jefferson

```



