class CannonCameraController {
    constructor(camera, world, initialPosition) {
        this.camera = camera;
        this.world = world;
        this.initialPosition = initialPosition.clone();

        this.velocity = new CANNON.Vec3();
        this.cameraBody = new CANNON.Body({ mass: 1 });
        this.cameraBody.addShape(new CANNON.Sphere(0.2));
        this.cameraBody.position.copy(initialPosition);

        // Connect the Cannon.js body with Three.js camera
        this.camera.userData.physicsBody = this.cameraBody;
        this.world.add(this.cameraBody);

        // Initialize control states
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
        };

        // Set up keyboard input
        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    moveForward() {
        this.keys.forward = true;
    }

    moveBackward() {
        this.keys.backward = true;
    }

    moveLeft() {
        this.keys.left = true;
    }

    moveRight() {
        this.keys.right = true;
    }

    stopForwardBackward() {
        this.keys.forward = false;
        this.keys.backward = false;
    }

    stopLeftRight() {
        this.keys.left = false;
        this.keys.right = false;
    }

    onKeyDown(event) {
        switch (event.key) {
            case "w":
                this.moveForward();
                break;
            case "s":
                this.moveBackward();
                break;
            case "a":
                this.moveLeft();
                break;
            case "d":
                this.moveRight();
                break;
        }
    }

    onKeyUp(event) {
        switch (event.key) {
            case "w":
            case "s":
                this.stopForwardBackward();
                break;
            case "a":
            case "d":
                this.stopLeftRight();
                break;
        }
    }

    update(deltaTime) {
        // Update camera velocity based on control states

        // カメラの速度ベクトルを初期化
        this.velocity = new CANNON.Vec3(0, 0, 0);

        // 移動速度を設定
        var moveSpeed = 10;

        // カメラの向きに対して移動
        var cameraDirection = camera.getWorldDirection(new THREE.Vector3());
        var cameraRight = new THREE.Vector3(
            -cameraDirection.z,
            0,
            cameraDirection.x
        );

        if (this.keys.forward) {
            var forwardVector = new CANNON.Vec3(
                cameraDirection.x,
                cameraDirection.y,
                cameraDirection.z
            );
            this.velocity.vadd(forwardVector.mult(moveSpeed), this.velocity);
        }
        if (this.keys.backward) {
            var backwardVector = new CANNON.Vec3(
                -cameraDirection.x,
                -cameraDirection.y,
                -cameraDirection.z
            );
            this.velocity.vadd(backwardVector.mult(moveSpeed), this.velocity);
        }
        if (this.keys.left) {
            var leftVector = new CANNON.Vec3(
                -cameraRight.x,
                -cameraRight.y,
                -cameraRight.z
            );
            this.velocity.vadd(leftVector.mult(moveSpeed), this.velocity);
        }
        if (this.keys.right) {
            var rightVector = new CANNON.Vec3(
                cameraRight.x,
                cameraRight.y,
                cameraRight.z
            );
            this.velocity.vadd(rightVector.mult(moveSpeed), this.velocity);
        }

        // Apply the velocity to the Cannon.js body
        this.cameraBody.velocity.copy(this.velocity);

        // Apply gravity to the camera
        this.cameraBody.applyForce(
            new CANNON.Vec3(0, -9.82, 0),
            this.cameraBody.position
        );

        // Update Three.js camera position based on Cannon.js body
        this.camera.position.copy(this.cameraBody.position);

        // Handle collisions and update Cannon.js world
        this.world.step(1 / 60, deltaTime);

        // Update Three.js camera orientation based on Cannon.js body
        const quaternion = this.cameraBody.quaternion;
        // this.camera.quaternion.set(
        //     quaternion.x,
        //     quaternion.y,
        //     quaternion.z,
        //     quaternion.w
        // );
    }
}
