export function createButton(position: Vector3, rotation : Quaternion) {
    const button = new Entity();
    engine.addEntity(button);
    button.addComponent(new GLTFShape("models/Square_Button.glb"));
    button.addComponent(new Transform({
        position,rotation
    }));
    return button;
}