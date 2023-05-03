export function createWall(scale: Vector3, position: Vector3, text: string, transform: Transform) {
    const wall = new Entity();
    wall.addComponent(new BoxShape());
    wall.addComponent(new Transform({
        scale: scale,
        position: position
    }))
    
    let wallMaterial= new Material();
    wallMaterial.albedoColor = Color3.FromHexString("#003C71");
    wall.addComponent(wallMaterial);

    const textSign = new Entity();
    const textShape = new TextShape(text);
    textShape.font=new Font(Fonts.SansSerif_SemiBold);
    textShape.fontSize = 11;
    textShape.color = Color3.FromHexString("#0066ff");
    
    textSign.addComponent(textShape);
    textSign.addComponent(transform);

    engine.addEntity(wall);
    engine.addEntity(textSign);

    return wall;
}