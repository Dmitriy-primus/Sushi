import Modal from "../UI/Modal";
import styles from "./Carte.module.css";
import React, { useContext, useState } from "react";
import CartContext from "../../Store/cart-context";
import CarteItem from "./CarteItem";
import SubmitOrder from "./SubmitOrder";

const Carte = (props) => {
  const cartContext = useContext(CartContext);
  const [openOrder, setOpenOrder] = useState(false);
  const [isDataSubmitting, setIsDataSubmitting] = useState(false);
  const [wasDataSendingSuccessful, setWasDataSendingSuccessful] =
    useState(false);

  const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const removeCartItemHandler = (id) => {
    cartContext.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const onOpenOrderHendler = () => {
    setOpenOrder(true);
  };

  const addOrderHendler = async (order) => {
    setIsDataSubmitting(true);
    const response = await fetch(
      "https://japankitchen-aec5b-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: order,
          meals: cartContext.items,
        }),
        headers: { "Content-Type": "aplication/json" },
      }
    );
    const data = await response.json();
    console.log(data);
    setIsDataSubmitting(false);
    setWasDataSendingSuccessful(true);
    cartContext.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartContext.items.map((item) => (
        <CarteItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalButtons = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onCloseWindow}>
        Закрыть
      </button>
      {hasItems && (
        <button className={styles.button} onClick={onOpenOrderHendler}>
          Заказать
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Итого</span>
        <span>{totalAmount}</span>
        {openOrder && (
          <SubmitOrder
            addOrder={addOrderHendler}
            closeOrder={props.onCloseWindow}
          />
        )}
      </div>
      {!openOrder && modalButtons}
    </React.Fragment>
  );

  const isDataSubmittingCartModalContent = <p>Отправка данных заказа ...</p>;

  const isDataSending = (
    <React.Fragment>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onCloseWindow}>
          Закрыть
        </button>
      </div>
      <p>Ваш заказ успешно отправлен!</p>
    </React.Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isDataSubmitting && !wasDataSendingSuccessful && cartModalContent}
      {isDataSubmitting && isDataSubmittingCartModalContent}
      {wasDataSendingSuccessful && isDataSending}
    </Modal>
  );
};

export default Carte;
