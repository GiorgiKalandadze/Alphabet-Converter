import {useState} from 'react';
import styles from './LanguageConverter.module.css';

export default function LanguageConverter() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');

    function handleConvert(currentInputText) {
        let outputTextResult = '';
        for (const letter of currentInputText) {
            if (alphabetMap.hasOwnProperty(letter)) {
                outputTextResult += alphabetMap[letter];
            } else {
                outputTextResult += letter;
            }
        }
        setOutputText(outputTextResult);
    }

    function handleInputChange(e) {
        const newText = e.currentTarget.value;
        setInputText(newText);
        handleConvert(newText);
    }

    return (
        <div className={styles['container']}>
            <h2>Alphabet Converter</h2>
            <div className={styles['box-items']}>
                <textarea
                    id="input"
                    className={styles['textarea']}
                    placeholder="Input"
                    cols="50"
                    rows="25"
                    value={inputText}
                    onChange={handleInputChange}></textarea>
                <textarea
                    id="output"
                    className={styles['textarea']}
                    placeholder="Output"
                    cols="50"
                    rows="25"
                    value={outputText}></textarea>
            </div>
        </div>
    );
}

const alphabetMap = {
    'ა': 'ⴀ',
    'ბ': 'ⴁ',
    'გ': 'ⴂ',
    'დ': 'ⴃ',
    'ე': 'ⴄ',
    'ვ': 'ⴅ',
    'ზ': 'ⴆ',
    'თ': 'ⴇ',
    'ი': 'ⴈ',
    'კ': 'ⴉ',
    'ლ': 'ⴊ',
    'მ': 'ⴋ',
    'ნ': 'ⴌ',
    'ო': 'ⴍ',
    'პ': 'ⴎ',
    'ჟ': 'ⴏ',
    'რ': 'ⴐ',
    'ს': 'ⴑ',
    'ტ': 'ⴒ',
    'უ': 'ⴓ',
    'ფ': 'ⴔ',
    'ქ': 'ⴕ',
    'ღ': 'ⴖ',
    'ყ': 'ⴗ',
    'შ': 'ⴘ',
    'ჩ': 'ⴙ',
    'ც': 'ⴚ',
    'ძ': 'ⴛ',
    'წ': 'ⴜ',
    'ჭ': 'ⴝ',
    'ხ': 'ⴞ',
    'ჯ': 'ⴟ',
    'ჰ': 'ⴠ',
};
