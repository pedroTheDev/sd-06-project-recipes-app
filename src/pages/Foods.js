import React, { useContext, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import RevenueContext from '../context/RevenueContext';

export default function Foods() {
  const { foods, fetchApi, searchParam, isLoading } = useContext(RevenueContext);
  const TWELVE = 12;
  const TWO = 2;
  const ZERO = 0;

  useEffect(() => {
    if (searchParam === 'Meal') {
      fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else if (searchParam === 'Drink') {
      fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }, [searchParam]);

  const foodOrDrink = (searchParam === 'Meal') ? 'comidas' : 'bebidas';
  const idFirstPosition = (foods && foods.length !== ZERO)
    ? foods[0][`id${searchParam}`]
    : null;
  const renderFoodOrDrink = () => (
    <Container>
      {(foods && foods.length === 1)
        ? <Redirect to={ `/${foodOrDrink}/${idFirstPosition}` } /> : null}
      {foods && foods.map((food, index) => {
        const id = food[`id${searchParam}`];
        if (index < TWELVE && (index % TWO === ZERO) && (index < foods.length - 1)) {
          // console.log(searchParam);
          // console.log(foods);
          let id1;
          if (foods[index + 1][`id${searchParam}`]) {
            id1 = foods[index + 1][`id${searchParam}`];
            // console.log(index + 1);
          }
          return (
            <Row>
              <Col>
                <Link to={ `/${foodOrDrink}/${id}` }>
                  <Card
                    key={ id }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <Card.Img
                      src={ foods[index][`str${searchParam}Thumb`] }
                      alt={ foods[index][`str${searchParam}`] }
                      data-testid={ `${index}-card-img` }
                    />
                    <Card.Title data-testid={ `${index}-card-name` }>
                      {foods[index][`str${searchParam}`]}
                    </Card.Title>
                  </Card>
                </Link>
              </Col>
              <Col>
                {
                  (id1) ? (
                    <Link to={ `/${foodOrDrink}/${id1}` }>
                      <Card
                        key={ foods[index + 1][`id${searchParam}`] }
                        data-testid={ `${index + 1}-recipe-card` }
                      >
                        <Card.Img
                          src={ foods[index + 1][`str${searchParam}Thumb`] }
                          alt={ foods[index + 1][`str${searchParam}`] }
                          data-testid={ `${index + 1}-card-img` }
                        />
                        <Card.Title data-testid={ `${index + 1}-card-name` }>
                          {foods[index + 1][`str${searchParam}`]}
                        </Card.Title>
                      </Card>
                    </Link>)
                    : ''
                }
              </Col>
            </Row>
          );
        }
        return '';
      })}
    </Container>
  );

  const renderIngredients = () => (
    <>
      {foods.map((food, index) => {
        if (index < TWELVE) {
          return (
            <div key={ food.idIngredient }>
              <h3>{ food.strIngredient }</h3>
              <p>{food.strDescription}</p>
            </div>
          );
        }
        return '';
      })}
    </>
  );

  if (!isLoading) {
    return (
      <div>
        {(searchParam === 'Ingredients') ? renderIngredients() : renderFoodOrDrink()}
      </div>
    );
  }
  return <div>Loading...</div>;
}
