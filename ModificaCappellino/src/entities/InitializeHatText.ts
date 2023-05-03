/**
 * "Initialize hat" button and text
 **/

const initTextShape = new TextShape("Initialize Hat");
initTextShape.font=new Font(Fonts.SansSerif_SemiBold);
initTextShape.fontSize = 3;
initTextShape.color = Color3.Yellow();

const initText = new Entity();
initText.addComponent(initTextShape);
initText.addComponent(new Transform({
  position: new Vector3(8, 2, 14.44),
}));
