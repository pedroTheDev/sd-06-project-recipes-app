import React from 'react';

export default function Recipe(props) {
  const { match: { params: { id } } } = props;
  return (
    <>
      {id}
      {' '}
    </>);
}
