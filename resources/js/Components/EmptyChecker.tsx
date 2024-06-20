import React from "react";

const EmptyChecker = ({ children }) => {
  const isEmpty = React.Children === <Event></Event>;

  return (
    <div>
      {isEmpty ? (
        <p>Компонент пуст</p>
      ) : (
        <div>
          {children}
        </div>
      )}
    </div>
  );
};

export default EmptyChecker;
