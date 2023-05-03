import { createWall } from "src/constructor_functions/createWall";

//----- Hat management wall -----
let mainWall=createWall(
    new Vector3(15, 10, 1),
    new Vector3(8, 0, 15),
    "Smart Hat",
    new Transform({
        position: new Vector3(8, 6, 15),
    })
  );