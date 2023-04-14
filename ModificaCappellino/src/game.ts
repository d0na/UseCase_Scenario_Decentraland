import { createWall } from "./constructor_functions/createWall"
import {createButton} from "./constructor_functions/createButton"
import { createImage } from "./constructor_functions/createImage"
import {addGoldenPin, addSilverPin, updateToGraduated, updateHat, initializeHat} from "./contractsFunctions"


class RotatorSystem {
  //Rotatory system for the hat model
  group = engine.getComponentGroup(Transform)
  update(dt: number) {
    const transform=hat.getComponent(Transform);
    transform.rotate(Vector3.Up(),dt*20);
  }
}


//Hat model
const hat=new Entity();
hat.addComponent(new GLTFShape("models/Cappellino.glb"));
hat.addComponent(new Transform({ position: new Vector3(8, -0.25, 8)}));
engine.addSystem(new RotatorSystem());


/// --- Pins wall ---
let pinsWall=createWall(
  new Vector3(1, 10, 14),
  new Vector3(1, 0, 8),
  "Smart Hat",
  new Transform({
      position: new Vector3(1.55, 5.5, 8),
      rotation: Quaternion.Euler(0, -90, 0)
  })
);

const CryptoGoldenPin = createImage(
  "images/CrittoOro.png",
  new Vector3(1.56, 2.5, 5.5),
  Quaternion.Euler(0, -90, 180),
  new Vector3(3, 1.5, 0)
);

const button2=createButton(new Vector3(1.56, 1, 5.5), Quaternion.Euler(0, 0, -90));
engine.addEntity(button2);
addGoldenPin(button2,"245AA",hat);

const CryptoSilverPin = createImage(
  "images/CrittoArgento.png",
  new Vector3(1.56, 2.5, 2.5),
  Quaternion.Euler(0, -90, 180),
  new Vector3(3, 1.5, 0)
);
const button1=createButton(new Vector3(1.56, 1, 2.5), Quaternion.Euler(0, 0, -90));
engine.addEntity(button1);
addSilverPin(button1,"245AA",hat);

const ComputerNetworkGoldenPin = createImage(
  "images/RetiOro.png",
  new Vector3(1.56, 2.5, 11.5),
  Quaternion.Euler(0, -90, 180),
  new Vector3(3, 1.5, 0)
);
const button4=createButton(new Vector3(1.56, 1, 11.5), Quaternion.Euler(0, 0, -90));
engine.addEntity(button4);
addGoldenPin(button4,"274AA",hat);

const ComputerNetworkSilverPin = createImage(
  "images/RetiArgento.png",
  new Vector3(1.56, 2.5, 8.5),
  Quaternion.Euler(0, -90, 180),
  new Vector3(3, 1.5, 0)
);
const button3=createButton(new Vector3(1.56, 1, 8.5), Quaternion.Euler(0, 0, -90));
engine.addEntity(button3);
addSilverPin(button3,"274AA",hat);

const pinMarketText = new Entity();
const textShape = new TextShape("Exam's Pin Claiming");
textShape.font=new Font(Fonts.SansSerif_SemiBold);
textShape.fontSize = 5;
textShape.color = Color3.White();
pinMarketText.addComponent(textShape);
pinMarketText.addComponent(new Transform({
  position: new Vector3(1.56, 3.5, 7),
  rotation: Quaternion.Euler(0, -90, 0)
}));
engine.addEntity(pinMarketText);

//----- Hat management wall -----
let hatWall=createWall(
  new Vector3(15, 10, 1),
  new Vector3(8, 0, 15),
  "Smart Hat",
  new Transform({
      position: new Vector3(8, 6, 15),
  })
);

//"Change to Graduated" button and text
const button5=createButton(new Vector3(13, 1, 14.44), Quaternion.Euler(0, 90, -90));
engine.addEntity(button5);
updateToGraduated(button5,hat);

const gradVersionText = new Entity();
const textShape2 = new TextShape("Change to Graduated");
textShape2.font=new Font(Fonts.SansSerif_SemiBold);
textShape2.fontSize = 3;
textShape2.color = Color3.Yellow();
gradVersionText.addComponent(textShape2);
gradVersionText.addComponent(new Transform({
  position: new Vector3(13, 2, 14.44),
}));
engine.addEntity(gradVersionText);

//"Update hat" button and text
const button6=createButton(new Vector3(10, 1, 14.44), Quaternion.Euler(0, 90, -90));
engine.addEntity(button6);
updateHat(button6,hat);
const updateHatText = new Entity();
const textShape3 = new TextShape("Update Hat");
textShape3.font=new Font(Fonts.SansSerif_SemiBold);
textShape3.fontSize = 3;
textShape3.color = Color3.Yellow();
updateHatText.addComponent(textShape3);
updateHatText.addComponent(new Transform({
  position: new Vector3(10, 2, 14.44),
}));
engine.addEntity(updateHatText);

//"Initialize hat" button and text
const initText = new Entity();
const textShape4 = new TextShape("Initialize Hat");
textShape4.font=new Font(Fonts.SansSerif_SemiBold);
textShape4.fontSize = 3;
textShape4.color = Color3.Yellow();
initText.addComponent(textShape4);
initText.addComponent(new Transform({
  position: new Vector3(8, 2, 14.44),
}));
engine.addEntity(initText);
const button7=createButton(new Vector3(8, 1, 14.44), Quaternion.Euler(0, 90, -90));
engine.addEntity(button7);
initializeHat(button7,hat);