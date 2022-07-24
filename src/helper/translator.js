const { Translate } = require('@google-cloud/translate').v2;
const projectId = 'chat-app-357321';
const translate = new Translate({projectId});

export const trans = () => {
    const text = 'Hello, world!';

    // The target language
    const target = 'ru';

    // Translates some text into Russian
    const [translation] = await translate.translate(text, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
}