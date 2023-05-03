/**
 * Pin Market
 */
const pinMarketTextShape = new TextShape("Exam's Pin Claiming");
pinMarketTextShape.font=new Font(Fonts.SansSerif_SemiBold);
pinMarketTextShape.fontSize = 5;
pinMarketTextShape.color = Color3.White();

const pinMarketText = new Entity();
pinMarketText.addComponent(pinMarketTextShape);
pinMarketText.addComponent(new Transform({
  position: new Vector3(1.56, 3.5, 7),
  rotation: Quaternion.Euler(0, -90, 0)
}));