import './App.css'
import { useEffect, useState } from 'react';
import WordCard from './components/WordCard/WordCard';
import assets from './assets/assets';

function App() {
  const [word, setWord] = useState("");
  const [wordInfo, setWordInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!word.trim()) {
      return
    }
    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true)
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!res.ok) {
          throw new Error("word not found ❌")
        }
        setError('');
        const data = await res.json();
        console.log(data[0]);
        setWordInfo({
          name: data[0].word,
          audio: data[0].phonetics?.find(p => p.audio)?.audio || "",
          text: data[0].phonetics?.find(p => p.text)?.text || "",
          definition: data[0].meanings?.[0]?.definitions?.find(p => p.definition)?.definition || "",
          example: data[0].meanings?.[0]?.definitions?.find(p => p.example)?.example || ""
        })
        setLoading(false);
      }
      catch (err) {
        setWordInfo(null)
        setError(err.message);
        setLoading(false)
      }
    }, 500)
    return (() => clearTimeout(timeoutId))
  }, [word])
  return (
    <>
      <div className="searchContainer">
        <div className="logoContainer">
          <img className='logoImg' src={assets.logo} alt="logo" />
          <h2>WORD WISE</h2>
        </div>
        <div className="searchSection">
          <img src={assets.search} alt="" />
          <input
            type="text"
            placeholder="Search Word"
            value={word}
            onChange={(e) => {
              const value = e.target.value
              setWord(value)
              if (!value.trim()) {
                setWordInfo(null)
                setError('')
              }
            }
            }
          />
        </div>
      </div>
      {error && <h2 className='errMessage'>{error}</h2>}
      {loading && <div className='loadImage'><img src={assets.loading} alt='load image' /></div>}
      {!loading && !error && wordInfo && <WordCard word={wordInfo} />}
    </>
  )
}

export default App
