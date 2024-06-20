import React from 'react';

// Ваш компонент Event
const Event = () => <div>Event Component</div>;

// Компонент для проверки наличия Event среди дочерних элементов
const CheckForEvent = ({ children }) => {
  let hasEvent = false;

  // Проверка наличия компонента Event среди детей
  React.Children.forEach(children, child => {
    if (React.isValidElement(child) && child.type === Event) {
      hasEvent = true;
    }
  });

  return (
    <div>
      {hasEvent ? (
        <p>Компонент содержит Event</p>
      ) : (
        <p>Компонент не содержит Event</p>
      )}
      <div>{children}</div>
    </div>
  );
};

export default CheckForEvent;
