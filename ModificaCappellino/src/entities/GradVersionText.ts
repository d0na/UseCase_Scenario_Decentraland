/**
 * //"Change to Graduated" button and text
 **/

//Text
const graduatedTextShape = new TextShape("Change to Graduated");
graduatedTextShape.font=new Font(Fonts.SansSerif_SemiBold);
graduatedTextShape.fontSize = 3;
graduatedTextShape.color = Color3.Yellow();

//
const gradVersionText = new Entity();
gradVersionText.addComponent(graduatedTextShape);
gradVersionText.addComponent(new Transform({
  position: new Vector3(13, 2, 14.44),
}));

