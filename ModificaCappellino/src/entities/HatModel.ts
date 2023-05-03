/**
 * Hat model
 **/
const hat=new Entity();
hat.addComponent(new GLTFShape("models/Cappellino.glb"));
hat.addComponent(new Transform({ position: new Vector3(8, -0.25, 8)}));