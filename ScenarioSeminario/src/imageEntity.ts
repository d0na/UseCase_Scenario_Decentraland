 export function imageEntity(imagePath: string, position: Vector3, rotation: Quaternion, scale?: Vector3) {
        //Create entity and assign shape
        let image = new Entity();
        image.addComponent(new PlaneShape());

        //Create material and configure its fields
        const myMaterial = new BasicMaterial();
        myMaterial.texture = new Texture(imagePath);

        //Assign the material to the entity
        image.addComponent(myMaterial);

        //Create the Transform component
        let transform: Transform;
        if (typeof scale !== 'undefined') {
            transform = new Transform({
                position: position,
                rotation: rotation,
                scale: scale
            })
        } else {
            transform = new Transform({
                position: position,
                rotation: rotation
            })
        }
        
        image.addComponent(transform);
        engine.addEntity(image);
        return image;
}
