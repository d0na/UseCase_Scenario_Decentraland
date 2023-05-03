/**
 * 
 */
const updateHatTextShape = new TextShape("Update Hat");
updateHatTextShape.font=new Font(Fonts.SansSerif_SemiBold);
updateHatTextShape.fontSize = 3;
updateHatTextShape.color = Color3.Yellow();


const updateHatText = new Entity();
updateHatText.addComponent(updateHatTextShape);
updateHatText.addComponent(new Transform({
  position: new Vector3(10, 2, 14.44),
}));