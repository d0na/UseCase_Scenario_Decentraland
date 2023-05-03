import { createWall } from "./createWall"
import * as ui from "@dcl/ui-scene-utils"
import { Door } from "./door"
import { imageEntity } from "./imageEntity"
import { getProvider } from "@decentraland/web3-provider";
import RequestManager, { ContractFactory } from "eth-connect";
import Conference_Hall_Door_ABI from "./contractsABI/Conference_Hall_Door_ABI";
import { getUserAccount } from "@decentraland/EthereumController";

const Conference_Hall_Door_Contract_Address = "0x6d8d499cb7488d4a68cb5a3745b55f0631897d48";

//Address of the Smart Hat
var Smart_Hat_Address="";

//Audio clips
const successSound=new AudioClip("sounds/success_sound.mp3");
const failureSound=new AudioClip("sounds/failed_sound.mp3");

// Base
const base = new Entity()
base.addComponent(new GLTFShape("models/baseDarkWithCollider.glb"))
engine.addEntity(base)

//Wall left
createWall(new Vector3(12.5, 14, 1), new Vector3(9, 0, 14));
//Wall right
createWall(new Vector3(12.5, 14, 1), new Vector3(9, 0, 1));
//Wall Back
createWall(new Vector3(1, 14, 15), new Vector3(14, 0, 8));
//Wall Front left 
createWall(new Vector3(1, 12, 7.75), new Vector3(3, 1, 12));
//Wall Front right
createWall(new Vector3(1, 12, 5.75), new Vector3(3, 1, 3));
//Roof
createWall(new Vector3(14.5, 1.5, 15), new Vector3(9.5, 7.5, 8));
//Floor
createWall(new Vector3(16, 3, 15), new Vector3(9.5, 0, 8));

//Door
createWall(new Vector3(3,1,2), new Vector3(3,5.5,7));
createWall(new Vector3(1,1,3.1), new Vector3(3,6.5,7));

//UniPiImage and conference Hall sign
let unipi=imageEntity(
    "images/UniPiLogo.png",
    new Vector3(2.45, 4, 3.5),
    Quaternion.Euler(0, 90, -180),
    new Vector3(2, 2, 6.5)
);
const conferenceText = new Entity();
const textShape = new TextShape("Conference Hall");
textShape.font=new Font(Fonts.SansSerif_SemiBold);
textShape.fontSize = 3;
textShape.color = Color3.Blue();
conferenceText.addComponent(textShape);
conferenceText.addComponent(new Transform({
  position: new Vector3(2.45, 3, 3.5),
  rotation: Quaternion.Euler(0, 90, 0)
}));
engine.addEntity(conferenceText);

//Conference sign
const conferenceTopicText = new Entity();
const textShape1 = new TextShape("'NFTs in Metaverse platforms'");
textShape1.font=new Font(Fonts.SansSerif_Heavy);
textShape1.fontSize = 5;
textShape1.color = Color3.Blue();
conferenceTopicText.addComponent(textShape1);
conferenceTopicText.addComponent(new Transform({
  position: new Vector3(2.45, 4.6, 12),
  rotation: Quaternion.Euler(0, 90, 0)
}));
engine.addEntity(conferenceTopicText);

const conferenceHourText = new Entity();
const textShape2 = new TextShape("Today 10.00 AM");
textShape2.font=new Font(Fonts.SansSerif_Bold);
textShape2.fontSize = 4;
textShape2.color = Color3.Blue();
conferenceHourText.addComponent(textShape2);
conferenceHourText.addComponent(new Transform({
  position: new Vector3(2.45, 4, 12),
  rotation: Quaternion.Euler(0, 90, 0)
}));
engine.addEntity(conferenceHourText);

const studentText = new Entity();
const textShape3 = new TextShape("Only graduated students admitted");
textShape3.font=new Font(Fonts.SansSerif_SemiBold);
textShape3.fontSize = 3;
textShape3.color = Color3.Red();
studentText.addComponent(textShape3);
studentText.addComponent(new Transform({
  position: new Vector3(2.45, 3.5, 12),
  rotation: Quaternion.Euler(0, 90, 0)
}));
engine.addEntity(studentText);

//Door
const door = new Door(new GLTFShape("models/door.glb"))
door.addComponent(new Transform({ position: new Vector3(3, 1.05, 7)}));
const transform=door.getComponent(Transform);
transform.rotate(Vector3.Up(),-90);
engine.addEntity(door);

door.addComponent(
    new OnPointerDown(async (e) => {
        let prompt = new ui.FillInPrompt(
            'Insert the contract address of the hat',
            async (e: string) => {
              try{
                Smart_Hat_Address=e;
                const provider = await getProvider();
                const requestManager = new RequestManager(provider);
                const CHDFactory = new ContractFactory(requestManager, Conference_Hall_Door_ABI);
                const CHD = (await CHDFactory.at(Conference_Hall_Door_Contract_Address)) as any

                const caller= await getUserAccount();
                
                let condition=await CHD.checkAccess(Smart_Hat_Address,{from:caller});
                
                if(condition==true){
                    door.playDoorOpen();
                    const soundentity = new Entity();
                    const audioSource=new AudioSource(successSound); 
                    soundentity.addComponent(audioSource);
                    soundentity.getComponent(AudioSource).playing=true; 
                    engine.addEntity(soundentity);
                }else{
                    const soundentity = new Entity();
                    const audioSource=new AudioSource(failureSound); 
                    soundentity.addComponent(audioSource);
                    soundentity.getComponent(AudioSource).playing=true; 
                    engine.addEntity(soundentity);
                    ui.displayAnnouncement("Not autorized! You are not graduated or this is not your hat!", 3, Color4.Red(), 25, true);
                }
              }catch(error){
                log("Error:"+error);
                const soundentity = new Entity();
                const audioSource=new AudioSource(failureSound); 
                soundentity.addComponent(audioSource);
                soundentity.getComponent(AudioSource).playing=true; 
                engine.addEntity(soundentity);
                ui.displayAnnouncement("Error occurred! "+error, 3, Color4.Red(), 25, true);
              }
                
            },
            'Submit',
            'Address goes here'
        )
        },
        {
        button: ActionButton.PRIMARY,
        hoverText: "Follow the seminar",
        showFeedback: true,
        }
    )
)

//Seminar: welcome & image
const welcomeText = new Entity();
const textShape4 = new TextShape("Welcome to the seminar!");
textShape4.font=new Font(Fonts.SansSerif_Heavy);
textShape4.fontSize = 5;
textShape4.color = Color3.Black();
welcomeText.addComponent(textShape4);
welcomeText.addComponent(new Transform({
  position: new Vector3(11, 5.5, 8),
  rotation: Quaternion.Euler(0, 90, 0)
}));
engine.addEntity(welcomeText);

let metaverse=imageEntity(
    "images/nfts-metaverse.jpg",
    new Vector3(11, 3, 8),
    Quaternion.Euler(0, 90, -180),
    new Vector3(4, 2.5, 7.5)
);
