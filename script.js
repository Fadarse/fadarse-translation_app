const input = document.getElementById("input");
const translation = document.getElementById("transcription");

document.getElementById("input").addEventListener("input", wordTranslation);
document.querySelector(".translation-btn").addEventListener("click", wordTranslation);
    
async function wordTranslation() {    
    const translatedText = await apiCall(input.value, document.getElementById("transcript").value, document.getElementById("translated").value);
    if(translatedText) {
        translation.innerText = translatedText;
    } else {
        translation.innerText = "Translation failed";
    }
};

async function apiCall(text, sourceLang, targetLang) {
    const url =
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    try {
    const response = await fetch(url);
    if(!response.ok) {
        console.log("First_error!");
    }
    const info = await response.json();
    return info[0][0][0];
    
    } catch(error) {
            console.log("Second_error!");
            return null;
    }    
};

document.querySelector(".icon-sync").addEventListener("click", async () => {
    
    const text = transcription.innerText;
    input.value = text;
    const sourceLang = translated.value;
    const targetLang = transcript.value; 

    const translatedText = await apiCall(text, sourceLang, targetLang);
    if(translatedText) {
        translation.innerText = translatedText;  
    } else {
        translation.innerText = "Translation failed";
    }
    transcript.style.display = "none";
    translated.style.display = "none";
});

document.querySelector(".icon-audio").addEventListener("click", async () => {

        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "auto";
    
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.querySelector("#input").innerText = transcript;
        };
        recognition.start();

        await apiCall();
        });