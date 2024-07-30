import CartContext from "../../../Store/cart-context";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";

const MealItem = (props) => {
  const context = useContext(CartContext);

  const formattedPrice = `$${props.price.toFixed(2)}`;

  const addCartHendler = (amount) => {
    context.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{formattedPrice}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addCartHendler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
