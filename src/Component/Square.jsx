const Square = (props) => {
  return (
    <div className="square" onClick={props.onClick}>
      <h5 className="text">{props.value}</h5>
    </div>
  );
};

export default Square;
