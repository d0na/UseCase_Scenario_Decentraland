const textShape2 = new TextShape("Change to Graduated");
textShape2.font=new Font(Fonts.SansSerif_SemiBold);
textShape2.fontSize = 3;
textShape2.color = Color3.Yellow();

const gradVersionText = new Entity();
gradVersionText.addComponent(textShape2);
gradVersionText.addComponent(new Transform({
  position: new Vector3(13, 2, 14.44),
}));