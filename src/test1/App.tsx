import "./App.css";
import React from "react";
import { Button, Divider, Layout, Tag } from "antd";

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
};

function Test1() {
  const [shape, setShape] = React.useState<string[]>([
    "circle",
    "square",
    "oval",
    "rectangle",
    "trapezoid",
    "parallelogram",
  ]);

  const moveShape = () => {
    setShape((prevNumbers) => {
      const lastNumber = prevNumbers[prevNumbers.length - 1];
      return [lastNumber, ...prevNumbers.slice(0, -1)];
    });
  };

  const moveShapeBack = () => {
    setShape((prevNumbers) => {
      const firstNumber = prevNumbers[0];
      return [...prevNumbers.slice(1), firstNumber];
    });
  };

  const shuffleArray = (array: string[]): string[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleRandomize = () => {
    const shuffledNumbers = shuffleArray(shape);
    setShape(shuffledNumbers);
  };

  const [positions, setPositions] = React.useState<boolean>(false);

  const handleMovePosition = () => {
    setPositions(!positions);
  };

  const boxShape = (shape: string) => {
    switch (shape) {
      case "circle":
        return <div className="circle"></div>;
      case "square":
        return <div className="square"></div>;
      case "oval":
        return <div className="oval"></div>;
      case "rectangle":
        return <div className="rectangle"></div>;
      case "trapezoid":
        return <div className="trapezoid"></div>;
      case "parallelogram":
        return <div className="parallelogram"></div>;
      default:
        return <div></div>;
    }
  };

  const result = shape.filter((item, index) => index < 3);
  const result1 = shape.filter((item, index) => index >= 3);

  return (
    <div className="">
      <p>Layout & Style</p>
      <div className="App">
        <div className="btnBox">
          <Button className="btn" onClick={moveShapeBack}>
            <div className="left"></div>
          </Button>
          <Tag className="tag1">Move shape</Tag>
        </div>
        <div className="btnBox">
          <Button className="btn-mid" onClick={handleMovePosition}>
            <div className="up"></div>
            <div className="down"></div>
          </Button>
          <Tag className="tag2">Move position</Tag>
        </div>
        <div className="btnBox">
          <Button className="btn" onClick={moveShape}>
            <div className="right"></div>
          </Button>
          <Tag className="tag1">Move shape</Tag>
        </div>
      </div>
      <Divider />
      {!positions ? (
        <>
          <div className="row1">
            <Sider width="25%" style={siderStyle}></Sider>
            {result.map((shape) => (
              <Button className="btn" onClick={handleRandomize}>
                <div>{boxShape(shape)}</div>
              </Button>
            ))}
          </div>
          <div className="row1">
            {result1.map((shape) => (
              <Button className="btn" onClick={handleRandomize}>
                <div>{boxShape(shape)}</div>
              </Button>
            ))}
            <Sider width="25%" style={siderStyle}></Sider>
          </div>
        </>
      ) : (
        <>
          <div className="row1">
            {result1.map((shape) => (
              <Button className="btn" onClick={handleRandomize}>
                <div>{boxShape(shape)}</div>
              </Button>
            ))}
            <Sider width="25%" style={siderStyle}></Sider>
          </div>
          <div className="row1">
            <Sider width="25%" style={siderStyle}></Sider>
            {result.map((shape) => (
              <Button className="btn" onClick={handleRandomize}>
                <div>{boxShape(shape)}</div>
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Test1;
