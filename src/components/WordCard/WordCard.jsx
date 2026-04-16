import { useState } from "react";
import "./WordCard.css";
const WordCard = ({ word }) => {
  const [showMore, setShowMore] = useState(false);
  const handleClick = () => {
    window.open(`https://en.wiktionary.org/wiki/${word.name}`, "_blank");
  };

  const handleReadMore = () => {
    setShowMore(!showMore);
  };

  if (!word) return null;
  return (
    <div className="wordContainer">
      {word && (
        <div className="wordCard">
          <h2>{word.name.toUpperCase()}</h2>
          <div className="audio-text">
            {word.audio && (
              <audio controls>
                <source src={word.audio} type="audio/mpeg" />
                your browser does not support audio element
              </audio>
            )}
            {word.text && <p>Text : {word.text}</p>}
          </div>
          {word.definition && (
            <h3 className="definition">
              Definition :{" "}
              {word.definition.length > 74 ? (
                <>
                  {word.definition.slice(0, 74)}
                  {!showMore && (
                    <span className="moreBtn" onClick={handleReadMore}>Read More...</span>
                  )}
                  {showMore && word.definition.slice(74)}
                  {showMore && (
                    <><br/><span className="moreBtn" onClick={handleReadMore}>  Read Less...</span></>
                  )}
                </>
              ) :
                <>
                  {word.definition}
                </>
              }
            </h3>
          )}
          {word.example && <p className="example">Example : {word.example}</p>}
          {word.definition.length < 74 ?(
            !showMore &&<button onClick={handleClick}>More Info</button>
          ) : (
              showMore && <button onClick={handleClick}>More Info</button>
          )}
        </div>
      )}
    </div>
  );
};

export default WordCard;
