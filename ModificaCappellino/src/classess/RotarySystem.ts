
/**
 * Rotatory system for the hat model
 */
class RotatorSystem {
    group = engine.getComponentGroup(Transform)
    update(dt: number) {
      const transform=hat.getComponent(Transform);
      transform.rotate(Vector3.Up(),dt*20);
    }
  }