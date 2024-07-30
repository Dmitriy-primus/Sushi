import styles from "./SubmitOrder.module.css";
import { useState } from "react";

const isInputValid = (inputValue) => inputValue.trim() !== "";

const SubmitOrder = (props) => {
  const [nameValue, setNameValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [telephoneValue, setTelephoneValue] = useState("");

  const [onTouchName, setOnTouchName] = useState(false);
  const [onTouchAddress, setOnTouchAddress] = useState(false);
  const [onTouchTelephone, setOnTouchTelephone] = useState(false);

  const onChengeNameHedler = (event) => {
    setNameValue(event.target.value);
  };

  const onChengeAddressHedler = (event) => {
    setAddressValue(event.target.value);
  };

  const onChengeTelephoneHedler = (event) => {
    setTelephoneValue(event.target.value);
  };

  const onTouchNameHendler = () => {
    setOnTouchName(true);
  };
  const onTouchAddressHendler = () => {
    setOnTouchAddress(true);
  };
  const onTouchTelephoneHendler = () => {
    setOnTouchTelephone(true);
  };

  const validateNameCheck = isInputValid(nameValue);
  const validateAddressCheck = isInputValid(addressValue);
  const validateTelephoneCheck = isInputValid(telephoneValue);

  const onSubmitHendler = (event) => {
    event.preventDefault();

    const isFormValid =
      validateAddressCheck && validateNameCheck && validateTelephoneCheck;

    if (!isFormValid) {
      return;
    }

    const orderValue = {
      name: nameValue,
      address: addressValue,
      telephone: telephoneValue,
    };

    props.addOrder(orderValue);

    setNameValue("");
    setAddressValue("");
    setTelephoneValue("");
  };

  const isNameInputInvalid = !validateNameCheck && onTouchName;
  const isAddressInputInvalid = !validateAddressCheck && onTouchAddress;
  const isTelephoneInputInvalid = !validateTelephoneCheck && onTouchTelephone;

  const nameStylesControl = `${styles.control} ${
    !isNameInputInvalid ? "" : styles.invalid
  }`;
  const addressStylesControl = `${styles.control} ${
    !isAddressInputInvalid ? "" : styles.invalid
  }`;
  const telephoneStylesControl = `${styles.control} ${
    !isTelephoneInputInvalid ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={onSubmitHendler}>
      <div className={nameStylesControl}>
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          onChange={onChengeNameHedler}
          onBlur={onTouchNameHendler}
          value={nameValue}
        />
        {isNameInputInvalid && <p>Пожалуйста введите имя</p>}
      </div>
      <div className={addressStylesControl}>
        <label htmlFor="address">Адрес:</label>
        <input
          type="text"
          id="address"
          onChange={onChengeAddressHedler}
          onBlur={onTouchAddressHendler}
          value={addressValue}
        />
        {isAddressInputInvalid && <p>Пожалуйста введите адрес</p>}
      </div>
      <div className={telephoneStylesControl}>
        <label htmlFor="telephone">Телефон:</label>
        <input
          type="number"
          id="telephone"
          onChange={onChengeTelephoneHedler}
          onBlur={onTouchTelephoneHendler}
          value={telephoneValue}
        />
        {isTelephoneInputInvalid && <p>Пожалуйста введите телефон</p>}
      </div>
      <div>
        <div className={styles.actions}>
          <button type="submit" className={styles.submit}>
            Подтвердить заказ
          </button>
          <button type="button" onClick={props.closeOrder}>
            Отменить
          </button>
        </div>
      </div>
    </form>
  );
};

export default SubmitOrder;
