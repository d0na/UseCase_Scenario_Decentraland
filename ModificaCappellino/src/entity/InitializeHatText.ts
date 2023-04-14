const initText = new Entity();
const textShape4 = new TextShape("Initialize Hat");
textShape4.font=new Font(Fonts.SansSerif_SemiBold);
textShape4.fontSize = 3;
textShape4.color = Color3.Yellow();
initText.addComponent(textShape4);
initText.addComponent(new Transform({
  position: new Vector3(8, 2, 14.44),
}));