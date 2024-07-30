import Header from "./Components/Layout/Header";
import React, { useState } from "react";
import Meals from "./Components/Meals/Meals";
import Carte from "./Components/Carte/Carte";
import CartContextProvider from "./Store/CartContextProvider";

function App() {
  const [visibleModal, setVisibleModal] = useState(false);

  const onCarteVisible = () => {
    return setVisibleModal(true);
  };
  const windowCloseHendler = () => {
    return setVisibleModal(false);
  };

  return (
    <CartContextProvider>
      {visibleModal && <Carte onCloseWindow={windowCloseHendler} />}
      <Header onVisible={onCarteVisible} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
