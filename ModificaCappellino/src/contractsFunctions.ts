import { getProvider } from "@decentraland/web3-provider";
import RequestManager, { ContractFactory } from "eth-connect";
import Gestione_Esami_ABI from "./contractsABI/Gestione_Esami_ABI";
import { getUserAccount } from "@decentraland/EthereumController";
import * as ui from "@dcl/ui-scene-utils";
import Smart_Hat_ABI from "./contractsABI/Smart_Hat_ABI";

const Gestione_Esami_Address = "0x3566500Eb2B42a20bc2d7364970EFdd2fF6cbCC7";
var Smart_Hat_Address = "";

const successSound = new AudioClip("sounds/success_sound.mp3");
const failureSound = new AudioClip("sounds/failed_sound.mp3");

export function updateToGraduated(button: Entity, hatModel: Entity) {
  executeTask(async () => {
    button.addComponent(
      new OnPointerDown(
        async (e) => {
          try {
            const GE = await GEInstance();
            const SH = await SHInstance();

            const caller = await getUserAccount();
            //Graduation check
            let result = await GE.isGraduated(caller);
            //Initialization check
            let init = await SH.initialized();
            //Version check
            let version = await SH.isGraduatedVersion();

            if (result == false) {
              //Error message & sound
              const soundentity = new Entity();
              const audioSource = new AudioSource(failureSound);
              soundentity.addComponent(audioSource);
              soundentity.getComponent(AudioSource).playing = true;
              engine.addEntity(soundentity);
              ui.displayAnnouncement(
                "Operation failed! Not graduated!",
                2,
                Color4.Red(),
                25,
                true
              );
            } else {
              if (init == false || version == true) {
                //Error message & sound
                const soundentity = new Entity();
                const audioSource = new AudioSource(failureSound);
                soundentity.addComponent(audioSource);
                soundentity.getComponent(AudioSource).playing = true;
                engine.addEntity(soundentity);
                if (init == false)
                  ui.displayAnnouncement(
                    "Operation failed! Hat not initialized!",
                    2,
                    Color4.Red(),
                    25,
                    true
                  );
                if (version == true)
                  ui.displayAnnouncement(
                    "Operation failed! Upgrade already done!",
                    2,
                    Color4.Red(),
                    25,
                    true
                  );
              } else {
                //Hat changing
                await SH.updateToGraduated({ from: caller });

                //Success message & sound
                const soundentity = new Entity();
                const audioSource = new AudioSource(successSound);
                soundentity.addComponent(audioSource);
                soundentity.getComponent(AudioSource).playing = true;
                engine.addEntity(soundentity);
                ui.displayAnnouncement(
                  "Operation completed!",
                  2,
                  Color4.Green(),
                  25,
                  true
                );
              }
            }
          } catch (error) {
            log("Error:" + error);
            const soundentity = new Entity();
            const audioSource = new AudioSource(failureSound);
            soundentity.addComponent(audioSource);
            soundentity.getComponent(AudioSource).playing = true;
            engine.addEntity(soundentity);
            ui.displayAnnouncement(
              "Error occurred! " + error,
              3,
              Color4.Red(),
              25,
              true
            );
          }
        },
        {
          button: ActionButton.POINTER,
          hoverText: "Invoke the function",
        }
      )
    );
  });
}

export function updateHat(button: Entity, hatModel: Entity) {
  executeTask(async () => {
    button.addComponent(
      new OnPointerDown(
        async (e) => {
          try {
            const SH = await SHInstance();

            const caller = await getUserAccount();

            //Get 3D Model
            var result = await SH.get3DModel();
            var sliced = result.slice(7);
            var completelocation = "models/";
            completelocation = completelocation.concat(sliced);

            //Load the new shape of the hat
            hatModel.removeComponent(GLTFShape);
            hatModel.addComponent(new GLTFShape(completelocation));
            engine.addEntity(hatModel);

            //Success message & sound
            const soundentity = new Entity();
            const audioSource = new AudioSource(successSound);
            soundentity.addComponent(audioSource);
            soundentity.getComponent(AudioSource).playing = true;
            engine.addEntity(soundentity);
            ui.displayAnnouncement("NFT updated!", 2, Color4.Green(), 25, true);
          } catch (error) {
            log("Error:" + error);
            const soundentity = new Entity();
            const audioSource = new AudioSource(failureSound);
            soundentity.addComponent(audioSource);
            soundentity.getComponent(AudioSource).playing = true;
            engine.addEntity(soundentity);
            ui.displayAnnouncement(
              "Error occurred! " + error,
              3,
              Color4.Red(),
              25,
              true
            );
          }
        },
        {
          button: ActionButton.POINTER,
          hoverText: "Invoke the function",
        }
      )
    );
  });
}

export function updateHatModel(hatModel: Entity) {
  executeTask(async () => {
    try {
      const SH = await SHInstance();

      const caller = await getUserAccount();

      //Get 3D Model
      var result = await SH.get3DModel();
      var sliced = result.slice(7);
      var completelocation = "models/";
      completelocation = completelocation.concat(sliced);

      //Update the shape of the hat
      hatModel.removeComponent(GLTFShape);
      hatModel.addComponent(new GLTFShape(completelocation));

      //Success message & sound
      const soundentity = new Entity();
      const audioSource = new AudioSource(successSound);
      soundentity.addComponent(audioSource);
      soundentity.getComponent(AudioSource).playing = true;
      engine.addEntity(soundentity);
      ui.displayAnnouncement("NFT updated!", 2, Color4.Green(), 25, true);
    } catch (error) {
      log("Error:" + error);
      const soundentity = new Entity();
      const audioSource = new AudioSource(failureSound);
      soundentity.addComponent(audioSource);
      soundentity.getComponent(AudioSource).playing = true;
      engine.addEntity(soundentity);
      ui.displayAnnouncement(
        "Error occurred! " + error,
        3,
        Color4.Red(),
        25,
        true
      );
    }
  });
}

/**
 * Aggiunge all'esame "codice" il pin doro
 * @param button
 * @param codice
 * @param hatModel
 */
export function addGoldenPin(button: Entity, codice: string, hatModel: Entity) {
  executeTask(async () => {
    button.addComponent(
      new OnPointerDown(
        async (e) => {
          try {
            const GE = await GEInstance();
            const SH = await SHInstance();

            //Check exam result for the caller user
            const caller = await getUserAccount();
            let res = await GE.getExamState(caller, codice);

            if (res == 2) {
              //Put the new pin on the hat
              var result = await SH.addGoldenPin(codice, { from: caller });

              //Success message & sound
              const soundentity = new Entity();
              const audioSource = new AudioSource(successSound);
              soundentity.addComponent(audioSource);
              soundentity.getComponent(AudioSource).playing = true;
              engine.addEntity(soundentity);
              ui.displayAnnouncement(
                "Operation completed!",
                2,
                Color4.Green(),
                25,
                true
              );
            } else {
              //Failure message & sound
              const soundentity = new Entity();
              const audioSource = new AudioSource(failureSound);
              soundentity.addComponent(audioSource);
              soundentity.getComponent(AudioSource).playing = true;
              engine.addEntity(soundentity);
              if (res == 0)
                ui.displayAnnouncement(
                  "Operation failed! Exam not passed",
                  2,
                  Color4.Red(),
                  25,
                  true
                );
              else
                ui.displayAnnouncement(
                  "Operation failed! Exam passed without merit",
                  2,
                  Color4.Red(),
                  25,
                  true
                );
            }
          } catch (error) {
            log("Error:" + error);
            const soundentity = new Entity();
            const audioSource = new AudioSource(failureSound);
            soundentity.addComponent(audioSource);
            soundentity.getComponent(AudioSource).playing = true;
            engine.addEntity(soundentity);
            ui.displayAnnouncement(
              "Error occurred! " + error,
              3,
              Color4.Red(),
              25,
              true
            );
          }
        },
        {
          button: ActionButton.POINTER,
          hoverText: "Put this pin",
        }
      )
    );
  });
}

export function addSilverPin(button: Entity, codice: string, hatModel: Entity) {
  executeTask(async () => {
    button.addComponent(
      new OnPointerDown(
        async (e) => {
          try {
            const GE = await GEInstance();
            const SH = await SHInstance();

            //Check exam result for the caller user
            const caller = await getUserAccount();
            let res = await GE.getExamState(caller, codice);

            if (res == 1) {
              //Put the new pin on the hat
              var result = await SH.addSilverPin(codice, { from: caller });

              //Success message & sound
              const soundentity = new Entity();
              const audioSource = new AudioSource(successSound);
              soundentity.addComponent(audioSource);
              soundentity.getComponent(AudioSource).playing = true;
              engine.addEntity(soundentity);
              ui.displayAnnouncement(
                "Operation completed!",
                2,
                Color4.Green(),
                25,
                true
              );
            } else {
              //Failure message & sound
              const soundentity = new Entity();
              const audioSource = new AudioSource(failureSound);
              soundentity.addComponent(audioSource);
              soundentity.getComponent(AudioSource).playing = true;
              engine.addEntity(soundentity);
              if (res == 0)
                ui.displayAnnouncement(
                  "Operation failed! Exam not passed",
                  2,
                  Color4.Red(),
                  25,
                  true
                );
              else
                ui.displayAnnouncement(
                  "Operation failed! Exam passed with merit",
                  2,
                  Color4.Red(),
                  25,
                  true
                );
            }
          } catch (error) {
            log("Error:" + error);
            const soundentity = new Entity();
            const audioSource = new AudioSource(failureSound);
            soundentity.addComponent(audioSource);
            soundentity.getComponent(AudioSource).playing = true;
            engine.addEntity(soundentity);
            ui.displayAnnouncement(
              "Error occurred! " + error,
              3,
              Color4.Red(),
              25,
              true
            );
          }
        },
        {
          button: ActionButton.POINTER,
          hoverText: "Put this pin",
        }
      )
    );
  });
}

async function GEInstance() {
  try {
    //Get smart contracts
    const provider = await getProvider();
    const requestManager = new RequestManager(provider);
    const GEFactory = new ContractFactory(requestManager, Gestione_Esami_ABI);
    return (await GEFactory.at(Gestione_Esami_Address)) as any;
  } catch (error) {
    log("Error:" + error);
    const soundentity = new Entity();
    const audioSource = new AudioSource(failureSound);
    soundentity.addComponent(audioSource);
    soundentity.getComponent(AudioSource).playing = true;
    engine.addEntity(soundentity);
    ui.displayAnnouncement(
      "Error occurred! " + error,
      3,
      Color4.Red(),
      25,
      true
    );
  }
}
async function SHInstance() {
  try {
    //Get smart contracts
    const provider = await getProvider();
    const requestManager = new RequestManager(provider);
    const SHFactory = new ContractFactory(requestManager, Smart_Hat_ABI);
    return (await SHFactory.at(Smart_Hat_Address)) as any;
  } catch (error) {
    log("Error:" + error);
    const soundentity = new Entity();
    const audioSource = new AudioSource(failureSound);
    soundentity.addComponent(audioSource);
    soundentity.getComponent(AudioSource).playing = true;
    engine.addEntity(soundentity);
    ui.displayAnnouncement(
      "Error occurred! " + error,
      3,
      Color4.Red(),
      25,
      true
    );
  }
}

export function initializeHat(button: Entity, hatModel: Entity) {
  executeTask(async () => {
    button.addComponent(
      new OnPointerDown(
        async (e) => {
          let prompt = new ui.FillInPrompt(
            "Insert the contract address of the hat",
            async (e: string) => {
              try {
                Smart_Hat_Address = e;
                const GE = await GEInstance();
                const SH = await SHInstance();

                //Check hat state
                const caller = await getUserAccount();
                let res = await SH.initialized();

                // Shows the user's exam situation
                GE.getSituation(caller).then((r: any) =>
                  log("Situation caller:", r)
                );
                GE.getMySituation().then((r: any) => log("MySituation:", r));

                if (res == true) {
                  //Failure message & sound
                  const soundentity = new Entity();
                  const audioSource = new AudioSource(failureSound);
                  soundentity.addComponent(audioSource);
                  soundentity.getComponent(AudioSource).playing = true;
                  engine.addEntity(soundentity);
                  ui.displayAnnouncement(
                    "Hat already initialized",
                    2,
                    Color4.Yellow(),
                    25,
                    true
                  );
                } else {
                  //Invoke initializing function of the smart contract
                  await SH.createHat({ from: caller });

                  //Show hat model into the scenario
                  engine.addEntity(hatModel);

                  //Success message & sound
                  const soundentity = new Entity();
                  const audioSource = new AudioSource(successSound);
                  soundentity.addComponent(audioSource);
                  soundentity.getComponent(AudioSource).playing = true;
                  engine.addEntity(soundentity);
                  ui.displayAnnouncement(
                    "Operation completed!",
                    2,
                    Color4.Green(),
                    25,
                    true
                  );
                }
              } catch {
                log("Error:" + error);
                const soundentity = new Entity();
                const audioSource = new AudioSource(failureSound);
                soundentity.addComponent(audioSource);
                soundentity.getComponent(AudioSource).playing = true;
                engine.addEntity(soundentity);
                ui.displayAnnouncement(
                  "Error occurred! " + error,
                  3,
                  Color4.Red(),
                  25,
                  true
                );
              }
            },
            "Submit",
            "Address goes here"
          );
        },
        {
          button: ActionButton.POINTER,
        }
      )
    );
  });
}
