import { createWall } from "./constructor_functions/createWall"
import {createButton} from "./constructor_functions/createButton"
import { createImage } from "./constructor_functions/createImage"
import {addGoldenPin, addSilverPin, updateToGraduated, updateHat, initializeHat} from "./contractsFunctions"

engine.addSystem(new RotatorSystem());


const goldenPinButton=createButton(new Vector3(1.56, 1, 5.5), Quaternion.Euler(0, 0, -90));
engine.addEntity(goldenPinButton);
addGoldenPin(goldenPinButton,"245AA",hat);

const silverPinButton=createButton(new Vector3(1.56, 1, 2.5), Quaternion.Euler(0, 0, -90));
engine.addEntity(silverPinButton);
addSilverPin(silverPinButton,"245AA",hat);


const button4=createButton(new Vector3(1.56, 1, 11.5), Quaternion.Euler(0, 0, -90));
engine.addEntity(button4);
addGoldenPin(button4,"274AA",hat);


const button3=createButton(new Vector3(1.56, 1, 8.5), Quaternion.Euler(0, 0, -90));
engine.addEntity(button3);
addSilverPin(button3,"274AA",hat);

engine.addEntity(pinMarketText);



const button5=createButton(new Vector3(13, 1, 14.44), Quaternion.Euler(0, 90, -90));
engine.addEntity(button5);
updateToGraduated(button5,hat);


engine.addEntity(gradVersionText);

//"Update hat" button and text
const button6=createButton(new Vector3(10, 1, 14.44), Quaternion.Euler(0, 90, -90));
engine.addEntity(button6);
updateHat(button6,hat);

engine.addEntity(updateHatText);


engine.addEntity(initText);
const button7=createButton(new Vector3(8, 1, 14.44), Quaternion.Euler(0, 90, -90));
engine.addEntity(button7);
initializeHat(button7,hat);

//----- Hat management wall -----
let mainWall=createWall(
  new Vector3(15, 10, 1),
  new Vector3(8, 0, 15),
  "Smart Hat",
  new Transform({
      position: new Vector3(8, 6, 15),
  })
);


/// --- Pins wall ---
let pinsWall=createWall(
  new Vector3(1, 10, 13),
  new Vector3(1, 0, 8),
  "Smart Hat",
  new Transform({
      position: new Vector3(1.55, 5.5, 8),
      rotation: Quaternion.Euler(0, -90, 0)
  })
);
