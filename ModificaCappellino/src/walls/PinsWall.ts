import { createWall } from "src/constructor_functions/createWall";

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
  