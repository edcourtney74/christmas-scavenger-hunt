import React from "react";

const playFinal = () => {
  const audioFinal = document.getElementsByClassName("audio-final")[0];
  setTimeout(() => {
    if (audioFinal !== undefined) audioFinal.play();
  }, 2000);
};

const Final = () => {
  playFinal();
  return (
    <div className="text-center">
      <h1>Congrats, Lainey and Ethan!</h1>
      <p className="lead mt-3">You solved the Christmas scavenger hunt!</p>
    </div>
  );
};

export default Final;
