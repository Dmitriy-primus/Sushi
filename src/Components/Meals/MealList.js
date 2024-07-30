import styles from "./MealList.module.css";
import Card from "./Card";
import MealItem from "./MealItem/MealItem";
import React, { useEffect, useState } from "react";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: 'Ролл "Наоми"',
//     description:
//       "Сыр Филадельфия, куриное филе, масаго, помидор, огурец, кунжут",
//     price: 11.99,
//   },
//   {
//     id: "m2",
//     name: "Спайс в лососе",
//     description: "Рис, лосось, соус спайс",
//     price: 3.99,
//   },
//   {
//     id: "m3",
//     name: "Суши с угрем",
//     description: "Угорь копченый, соус унаги, кунжут",
//     price: 4.99,
//   },
//   {
//     id: "m4",
//     name: 'Салат "Поке с лососем"',
//     description:
//       "Рис, лосось, огурец, чука, нори, стружка тунца, соус ореховый",
//     price: 7.99,
//   },
// ];

const MealList = (props) => {
  const [stateMeals, setStateMeals] = useState([]);
  const [fetchError, setFetchError] = useState();
  const [loading, setLoading] = useState(false);

  const fetchMealList = async () => {
    setLoading(false);
    setFetchError(null);
    try {
      const response = await fetch(
        "https://japankitchen-aec5b-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Что-то пошло не так!:(");
      }
      const data = await response.json();

      console.log(data);
      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setStateMeals(loadedMeals);
    } catch (e) {
      setLoading(false);
      setFetchError(e.message);
      console.log(e.message);
    }
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  };

  useEffect(() => {
    fetchMealList();
  }, []);

  const mealList = stateMeals.map((meal) => (
    <MealItem
      name={meal.name}
      description={meal.description}
      price={meal.price}
      key={meal.id}
      id={meal.id}
    />
  ));
  let content;

  if (!loading) {
    content = <p>Идёт загрузка данных...</p>;
  }
  if (fetchError) {
    content = <p>{fetchError}</p>;
  }
  if (loading && !fetchError) {
    content = <ul>{mealList}</ul>;
  }
  return (
    <div className={styles.meals}>
      <Card>{content}</Card>
    </div>
  );
};

export default MealList;
