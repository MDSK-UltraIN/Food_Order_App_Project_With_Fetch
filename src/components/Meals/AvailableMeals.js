import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);


  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const responseData = await response.json();

      const loadedMeals = [];

      Object.keys(responseData).forEach(key => {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,

        });
      });
      setMeals(loadedMeals);
      setIsLoading(false);
    }



    fetchMeals().catch(error => {
      console.log('fetch failed');
      setIsLoading(false);
      setHttpError(error.message);
    });

  }, []);

  if (isLoading) {
    return <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
  }

  if (httpError) {
    return <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
