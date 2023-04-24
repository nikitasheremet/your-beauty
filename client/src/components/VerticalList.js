import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
`;

const ItemImage = styled.img`
  height: 100%;
  margin-right: 10px;
`;

export default function VerticalList({ items }) {
  return (
    <div>
      {items.map((item, index) => (
        <ItemContainer key={index}>
          <ItemImage src={item.imageUrl} alt={`${item.name} - ${item.brand}`} />
          <span>{item.name} - {item.brand}</span>
        </ItemContainer>
      ))}
    </div>
  );
}


