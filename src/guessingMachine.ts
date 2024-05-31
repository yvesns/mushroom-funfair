import { 
    AudioSource,
    EasingFunction,
    Entity, 
    GltfContainer, 
    InputAction, 
    Material, 
    MeshCollider, 
    MeshRenderer, 
    TextureFilterMode, 
    TextureWrapMode, 
    Transform, 
    Tween, 
    TweenLoop, 
    TweenSequence, 
    VisibilityComponent, 
    engine,
    pointerEventsSystem
} from "@dcl/sdk/ecs";
import { Color3, Quaternion, Vector3 } from "@dcl/sdk/math";
import { Plane } from "./components";

class MushroomChest {
    base: Entity
    lid: Entity
    mushroomHatPivot: Entity
    mushroomHat: Entity
    scale = 0.5
    mushroomHatScale = 0.5

    constructor(position: Vector3) {
        this.base = engine.addEntity()
        this.lid = engine.addEntity()
        this.mushroomHatPivot = engine.addEntity()
        this.mushroomHat = engine.addEntity()

        GltfContainer.create(this.base, {
            src: 'models/chestBase.gltf',
        })

        GltfContainer.create(this.lid, {
            src: 'models/chestLid.gltf',
        })

        GltfContainer.create(this.mushroomHat, {
            src: 'models/mushroomHat.gltf',
        })

        Transform.create(this.base, {
            position: position,
            scale: Vector3.create(this.scale, this.scale, this.scale),
            rotation: Quaternion.fromEulerDegrees(0, -55, 0)
        })

        Transform.create(this.lid, {
            parent: this.base,
        })

        Transform.create(this.mushroomHatPivot, {
            parent: this.base,
            rotation: Quaternion.fromEulerDegrees(0, 0 ,0),
        })

        Transform.create(this.mushroomHat, {
            parent: this.mushroomHatPivot,
            scale: Vector3.create(this.mushroomHatScale, this.mushroomHatScale, this.mushroomHatScale),
            rotation: Quaternion.fromEulerDegrees(40, 0 ,0),
            position: Vector3.create(0, 1, 0)
        })
    }

    open(){
        // Transform.getMutable(this.lid).rotation = Quaternion.fromEulerDegrees(-60, 0, 0)

        Tween.create(this.lid, {
            mode: Tween.Mode.Rotate({
              start: Quaternion.fromEulerDegrees(0, 0, 0),
              end: Quaternion.fromEulerDegrees(-60, 0, 0),
            }),
            duration: 2800,
            easingFunction: EasingFunction.EF_EASESINE,
        })

        // Tween.create(this.mushroomHatPivot, {
        //     mode: Tween.Mode.Rotate({
        //         start: Quaternion.fromEulerDegrees(0, 0, 0),
        //         end: Quaternion.fromEulerDegrees(0, 180, 0)
        //     }),
        //     duration: 6000,
        //     easingFunction: EasingFunction.EF_EASESINE,
        // })

        // Tween.create(this.mushroomHatPivot, {
        //     mode: Tween.Mode.Rotate({
        //         start: Quaternion.fromEulerDegrees(0, 180, 0),
        //         end: Quaternion.fromEulerDegrees(0, 360, 0)
        //     }),
        //     duration: 6000,
        //     easingFunction: EasingFunction.EF_EASESINE,
        // })

        // TweenSequence.create(this.mushroomHatPivot, {
        //     loop: TweenLoop.TL_RESTART,
        //     sequence: [
        //         {
        //             mode: Tween.Mode.Rotate({
        //                 start: Quaternion.fromEulerDegrees(0, 0, 0),
        //                 end: Quaternion.fromEulerDegrees(0, 180, 0)
        //             }),
        //             duration: 6000,
        //             easingFunction: EasingFunction.EF_EASESINE,
        //         },
        //         // {
        //         //     mode: Tween.Mode.Rotate({
        //         //         start: Quaternion.fromEulerDegrees(0, 180, 0),
        //         //         end: Quaternion.fromEulerDegrees(0, 360, 0)
        //         //     }),
        //         //     duration: 6000,
        //         //     easingFunction: EasingFunction.EF_EASESINE,
        //         // }
        //     ]
        // })

        Tween.create(this.mushroomHat, {
            mode: Tween.Mode.Move({
              start: Transform.get(this.mushroomHat).position,
              end: Vector3.create(0, 3, 0),
            }),
            duration: 6000,
            easingFunction: EasingFunction.EF_EASESINE,
        })
    }
}

class MushroomButton {
    entity: Entity
    isClicked = false
    clickedZOffset = 0.25

    constructor(parent: Entity, modelSrc: string, clickCallback: Function) {
        this.entity = engine.addEntity()

        GltfContainer.create(this.entity, {
            src: modelSrc,
        })

        Transform.create(this.entity, {
            parent: parent,
        })

        pointerEventsSystem.onPointerDown(
            {
                entity: this.entity,
                opts: {
                    button: InputAction.IA_POINTER,
                    hoverText: 'Click'
                }
            },
            function () {
                clickCallback()
            }
        )
    }

    click() {
        const mutableTransform = Transform.getMutable(this.entity)
        mutableTransform.position.z -= this.clickedZOffset
        this.isClicked = true
    }

    reset() {
        const mutableTransform = Transform.getMutable(this.entity)
        mutableTransform.position.z = 0
        this.isClicked = false
    }

    invert() {
        if(this.isClicked) {
            return this.reset()
        }

        return this.click()
    }
}

export class GuessingMachine {
    machine: Entity
    tryLowerLabel: Entity
    tryHigherLabel: Entity
    tlButton: MushroomButton
    tmButton: MushroomButton
    trButton: MushroomButton
    mlButton: MushroomButton
    mmButton: MushroomButton
    mrButton: MushroomButton
    blButton: MushroomButton
    bmButton: MushroomButton
    brButton: MushroomButton
    redFrogButton: Entity
    greenFrogButton: Entity
    chest: MushroomChest
    scale = 0.3
    score = 0
    correctScore = 257

    constructor(position: Vector3){
        this.machine = engine.addEntity()
        this.tryLowerLabel = engine.addEntity()
        this.tryHigherLabel = engine.addEntity()

        this.chest = new MushroomChest(Vector3.create(
            position.x - 3,
            position.y,
            position.z -3
        ))

        this.tlButton = new MushroomButton(
            this.machine, 
            'models/topLeftBronzeMushroom.gltf',
            () => {
                if(this.tlButton.isClicked) {
                    return
                }

                this.tlButton.click()
                this.tmButton.invert()
                this.mlButton.invert()
                this.addScore(1)

                AudioSource.playSound(this.machine, 'sfx/button3.mp3')
            }
        )

        this.tmButton = new MushroomButton(
            this.machine, 
            'models/topMiddleSilverMushroom.gltf',
            () => {
                if(this.tmButton.isClicked) {
                    return
                }

                this.tmButton.click()
                this.tlButton.invert()
                this.trButton.invert()
                this.mmButton.invert()
                this.addScore(10)

                AudioSource.playSound(this.machine, 'sfx/button2.mp3')
            }
        )

        this.trButton = new MushroomButton(
            this.machine, 
            'models/topRightBronzeMushroom.gltf',
            () => {
                if(this.trButton.isClicked) {
                    return
                }

                this.trButton.click()
                this.tmButton.invert()
                this.mrButton.invert()
                this.addScore(1)

                AudioSource.playSound(this.machine, 'sfx/button3.mp3')
            }
        )

        this.mlButton = new MushroomButton(
            this.machine, 
            'models/middleLeftSilverMushroom.gltf',
            () => {
                if(this.mlButton.isClicked) {
                    return
                }

                this.mlButton.click()
                this.tlButton.invert()
                this.mmButton.invert()
                this.blButton.invert()
                this.addScore(10)

                AudioSource.playSound(this.machine, 'sfx/button2.mp3')
            }
        )

        this.mmButton = new MushroomButton(
            this.machine, 
            'models/centerGoldMushroom.gltf',
            () => {
                if(this.mmButton.isClicked) {
                    return
                }

                this.mmButton.click()
                this.tmButton.invert()
                this.mlButton.invert()
                this.mrButton.invert()
                this.bmButton.invert()
                this.addScore(100)

                AudioSource.playSound(this.machine, 'sfx/button1.mp3')
            }
        )

        this.mrButton = new MushroomButton(
            this.machine, 
            'models/middleRightSilverMushroom.gltf',
            () => {
                if(this.mrButton.isClicked) {
                    return
                }

                this.mrButton.click()
                this.trButton.invert()
                this.mmButton.invert()
                this.brButton.invert()
                this.addScore(10)

                AudioSource.playSound(this.machine, 'sfx/button2.mp3')
            }
        )

        this.blButton = new MushroomButton(
            this.machine, 
            'models/bottomLeftBronzeMushroom.gltf',
            () => {
                if(this.blButton.isClicked) {
                    return
                }

                this.blButton.click()
                this.mlButton.invert()
                this.bmButton.invert()
                this.addScore(1)

                AudioSource.playSound(this.machine, 'sfx/button3.mp3')
            }
        )

        this.bmButton = new MushroomButton(
            this.machine, 
            'models/bottomMiddleSilverMushroom.gltf',
            () => {
                if(this.bmButton.isClicked) {
                    return
                }

                this.bmButton.click()
                this.blButton.invert()
                this.mmButton.invert()
                this.brButton.invert()
                this.addScore(10)

                AudioSource.playSound(this.machine, 'sfx/button2.mp3')
            }
        )

        this.brButton = new MushroomButton(
            this.machine, 
            'models/bottomRightBronzeMushroom.gltf',
            () => {
                if(this.brButton.isClicked) {
                    return
                }

                this.brButton.click()
                this.bmButton.invert()
                this.mrButton.invert()
                this.addScore(1)

                AudioSource.playSound(this.machine, 'sfx/button3.mp3')
            }
        )

        this.redFrogButton = engine.addEntity()
        this.greenFrogButton = engine.addEntity()

        VisibilityComponent.create(this.tryLowerLabel, { visible: false })
        VisibilityComponent.create(this.tryHigherLabel, { visible: false })

        GltfContainer.create(this.machine, {
            src: 'models/machineBase.gltf',
        })

        GltfContainer.create(this.tryHigherLabel, {
            src: 'models/tryHigher.gltf',
        })

        GltfContainer.create(this.tryLowerLabel, {
            src: 'models/tryLower.gltf',
        })

        GltfContainer.create(this.redFrogButton, {
            src: 'models/redFrogButton.gltf',
        })

        GltfContainer.create(this.greenFrogButton, {
            src: 'models/greenFrogButton.gltf',
        })
      
        Transform.create(this.machine, {
            // position: Vector3.create(31, 0.2, 38),
            position: position,
            scale: Vector3.create(this.scale, this.scale, this.scale),
            rotation: Quaternion.fromEulerDegrees(0, -90, 0),
        })

        Transform.create(this.tryHigherLabel, {
            parent: this.machine
        })

        Transform.create(this.tryLowerLabel, {
            parent: this.machine
        })

        Transform.create(this.redFrogButton, {
            parent: this.machine
        })

        Transform.create(this.greenFrogButton, {
            parent: this.machine
        })

        pointerEventsSystem.onPointerDown(
            {
                entity: this.redFrogButton,
                opts: {
                    button: InputAction.IA_POINTER,
                    hoverText: 'Click'
                }
            },
            this.reset.bind(this)
        )

        pointerEventsSystem.onPointerDown(
            {
                entity: this.greenFrogButton,
                opts: {
                    button: InputAction.IA_POINTER,
                    hoverText: 'Click'
                }
            },
            this.submitScore.bind(this)
        )
    }

    addScore(score = 0) {
        this.score += score

        console.log(this.score)
    }

    submitScore() {
        let playerScore = this.score

        this.reset()

        if(playerScore > this.correctScore) {
            VisibilityComponent.getMutable(this.tryLowerLabel).visible = true
            VisibilityComponent.getMutable(this.tryHigherLabel).visible = false
            
            return
        }

        if(playerScore < this.correctScore) {
            VisibilityComponent.getMutable(this.tryLowerLabel).visible = false
            VisibilityComponent.getMutable(this.tryHigherLabel).visible = true

            return
        }

        this.handleVictory()
    }

    handleVictory() {
        this.chest.open()
    }

    reset() {
        this.score = 0

        this.tlButton.reset()
        this.tmButton.reset()
        this.trButton.reset()
        this.mlButton.reset()
        this.mmButton.reset()
        this.mrButton.reset()
        this.blButton.reset()
        this.bmButton.reset()
        this.brButton.reset()
    }
}

// function createMachine() {
//     let machine = engine.addEntity()
//     let scale = 0.3
  
//     Transform.create(pivot, {
//         // position: Vector3.create(26, 0.2, 38),
//         position: Vector3.create(31, 0.2, 38),
//         rotation: Quaternion.fromEulerDegrees(0, -90, 0),
//     })
  
//     GltfContainer.create(machine, {
//         src: 'models/machineBase.gltf',
//     })
  
//     Transform.create(machine, {
//         position: Vector3.create(31, 0.2, 38),
//         scale: Vector3.create(scale, scale, scale),
//         rotation: Quaternion.fromEulerDegrees(0, 0, 0),
//     })
//   }