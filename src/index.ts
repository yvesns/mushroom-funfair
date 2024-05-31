// We define the empty imports so the auto-complete feature works as expected.
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { Animator, EasingFunction, Entity, GltfContainer, Material, MeshRenderer, TextureFilterMode, TextureWrapMode, Transform, Tween, TweenLoop, TweenSequence, engine } from '@dcl/sdk/ecs'
import { changeColorSystem, circularSystem } from './systems'
import { setupUi } from './ui'
import * as npc from 'dcl-npc-toolkit'
import { Dialog } from 'dcl-npc-toolkit'
import { GuessingMachine } from './guessingMachine'
import { ReadOnlyVector3 } from '~system/EngineApi'

const Plane = engine.defineComponent('plane-id', {})


function setUVs(rows: number, cols: number) {
  return [
    // North side of unrortated plane
    0, //lower-left corner
    0,

    cols, //lower-right corner
    0,

    cols, //upper-right corner
    rows,

    0, //upper left-corner
    rows,

    // South side of unrortated plane
    cols, // lower-right corner
    0,

    0, // lower-left corner
    0,

    0, // upper-left corner
    rows,

    cols, // upper-right corner
    rows,
  ]
}

function createFloor() {
  const emissionColor = Color4.create(0, 0, 2, 1)
  const emissionColor2 = Color4.create(2, 0, 0, 1)
  const texture = Material.Texture.Common({
    src: 'images/leavesTransparent.png',
    filterMode: TextureFilterMode.TFM_TRILINEAR,
    wrapMode: TextureWrapMode.TWM_REPEAT,
  })
  const material = {
    texture: texture,
    diffuseColor: emissionColor,
  }

  const base = engine.addEntity()

  Plane.create(base)
  Transform.create(base, { 
    position: Vector3.create(32, 0, 32),
    scale: Vector3.create(64, 64, 0),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0)
  })
  MeshRenderer.setPlane(base, setUVs(10, 10))
  Material.setBasicMaterial(base, {
    diffuseColor: Color4.create(0, 0, 0, 1),
  })

  const floor = engine.addEntity()

  Plane.create(floor)
  Transform.create(floor, { 
    position: Vector3.create(32, 0.01, 32),
    scale: Vector3.create(64, 64, 0),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0)
  })
  MeshRenderer.setPlane(floor, setUVs(30, 30))
  Material.setBasicMaterial(floor, material)

  const floor2 = engine.addEntity()

  Plane.create(floor2)
  Transform.create(floor2, { 
    position: Vector3.create(32, 0.01, 32),
    scale: Vector3.create(64, 64, 0),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0)
  })
  MeshRenderer.setPlane(floor2, setUVs(20, 20))
  Material.setBasicMaterial(floor2, material)

  const floor3 = engine.addEntity()

  Plane.create(floor3)
  Transform.create(floor3, { 
    position: Vector3.create(32, 0.01, 32),
    scale: Vector3.create(64, 64, 0),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0)
  })
  MeshRenderer.setPlane(floor3, setUVs(10, 10))
  Material.setBasicMaterial(floor3, material)

  const floor4 = engine.addEntity()

  Plane.create(floor4)
  Transform.create(floor4, { 
    position: Vector3.create(32, 0.01, 32),
    scale: Vector3.create(64, 64, 0),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0)
  })
  MeshRenderer.setPlane(floor4, setUVs(40, 40))
  Material.setBasicMaterial(floor4, {
    texture: Material.Texture.Common({
      src: 'images/leavesTransparent.png',
      filterMode: TextureFilterMode.TFM_TRILINEAR,
      wrapMode: TextureWrapMode.TWM_REPEAT,
    }),
    diffuseColor: emissionColor,
  })

  const floor5 = engine.addEntity()

  Plane.create(floor5)
  Transform.create(floor5, { 
    position: Vector3.create(32, 0.01, 32),
    scale: Vector3.create(64, 64, 0),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0)
  })
  MeshRenderer.setPlane(floor5, setUVs(50, 50))
  Material.setBasicMaterial(floor5, {
    texture: Material.Texture.Common({
      src: 'images/leavesTransparent.png',
      filterMode: TextureFilterMode.TFM_TRILINEAR,
      wrapMode: TextureWrapMode.TWM_REPEAT,
    }),
    diffuseColor: emissionColor,
  })

  const floor6 = engine.addEntity()

  Plane.create(floor6)
  Transform.create(floor6, { 
    position: Vector3.create(32, 0.01, 32),
    scale: Vector3.create(64, 64, 0),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0)
  })
  MeshRenderer.setPlane(floor6, setUVs(50, 50))
  Material.setBasicMaterial(floor6, {
    texture: Material.Texture.Common({
      src: 'images/leavesTransparent.png',
      filterMode: TextureFilterMode.TFM_TRILINEAR,
      wrapMode: TextureWrapMode.TWM_REPEAT,
    }),
    diffuseColor: emissionColor,
  })

  const floor7 = engine.addEntity()

  Plane.create(floor7)
  Transform.create(floor7, { 
    position: Vector3.create(32, 0.01, 32),
    scale: Vector3.create(64, 64, 0),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0)
  })
  MeshRenderer.setPlane(floor7, setUVs(50, 50))
  Material.setBasicMaterial(floor7, {
    texture: Material.Texture.Common({
      src: 'images/leavesTransparent.png',
      filterMode: TextureFilterMode.TFM_TRILINEAR,
      wrapMode: TextureWrapMode.TWM_REPEAT,
    }),
    diffuseColor: emissionColor,
  })

  const floor8 = engine.addEntity()

  Plane.create(floor8)
  Transform.create(floor8, { 
    position: Vector3.create(32, 0.01, 32),
    scale: Vector3.create(64, 64, 0),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0)
  })
  MeshRenderer.setPlane(floor8, setUVs(1, 1))
  Material.setBasicMaterial(floor8, {
    texture: Material.Texture.Common({
      src: 'images/leavesTransparent.png',
      filterMode: TextureFilterMode.TFM_TRILINEAR,
      wrapMode: TextureWrapMode.TWM_REPEAT,
    }),
    diffuseColor: emissionColor2,
  })

  // const floor9 = engine.addEntity()

  // Plane.create(floor9)
  // Transform.create(floor9, { 
  //   position: Vector3.create(32, 0.01, 32),
  //   scale: Vector3.create(64, 64, 0),
  //   rotation: Quaternion.fromEulerDegrees(90, 0, 0)
  // })
  // MeshRenderer.setPlane(floor9, setUVs(0.5, 0.5))
  // Material.setBasicMaterial(floor9, {
  //   texture: Material.Texture.Common({
  //     src: 'images/leavesTransparent.png',
  //     filterMode: TextureFilterMode.TFM_TRILINEAR,
  //     wrapMode: TextureWrapMode.TWM_REPEAT,
  //   }),
  //   diffuseColor: emissionColor2,
  // })

  // const floor10 = engine.addEntity()

  // Plane.create(floor10)
  // Transform.create(floor10, { 
  //   position: Vector3.create(32, 0.01, 32),
  //   scale: Vector3.create(64, 64, 0),
  //   rotation: Quaternion.fromEulerDegrees(90, 0, 0)
  // })
  // MeshRenderer.setPlane(floor10, setUVs(0.1, 0.1))
  // Material.setBasicMaterial(floor10, {
  //   texture: Material.Texture.Common({
  //     src: 'images/leavesTransparent.png',
  //     filterMode: TextureFilterMode.TFM_TRILINEAR,
  //     wrapMode: TextureWrapMode.TWM_REPEAT,
  //   }),
  //   diffuseColor: emissionColor2,
  // })
}

function createFog() {
  let fog = engine.addEntity()
  let scale = 2.6

  GltfContainer.create(fog, {
    src: 'models/fog.glb',
  })

  Transform.create(fog, {
    position: Vector3.create(32, -25, 32),
    scale: Vector3.create(scale, scale, scale),
  })

  Tween.create(fog, {
    mode: Tween.Mode.Move({
      start: Vector3.create(32, -25, 32),
      end: Vector3.create(32, 10, 32),
    }),
    duration: 28000,
    easingFunction: EasingFunction.EF_LINEAR,
  })

  TweenSequence.create(fog, { sequence: [], loop: TweenLoop.TL_RESTART })

  // TweenSequence.create(fog, {
  //   loop: TweenLoop.TL_RESTART,
  //   sequence: [
  //     {
  //       mode: Tween.Mode.Move({
  //         start: Vector3.create(32, -25, 32),
  //         end: Vector3.create(32, 25, 32)
  //       }),
  //       duration: 700,
  //       easingFunction: EasingFunction.EF_LINEAR
  //     }
  //   ]
  // })
}

function createAmbient() {
  let ambient = engine.addEntity()
  let scale = 3.2
  let animationStates = []

  GltfContainer.create(ambient, {
    src: 'models/ambient.glb',
  })

  Transform.create(ambient, {
    position: Vector3.create(32, 1.3, 32),
    scale: Vector3.create(scale, scale, scale),
  })

  for(let i = 1; i <= 20; i++){
    animationStates.push(
      {
        clip: 'Idle' + i,
        playing: true,
        loop: true,
      }
    )
  }

  animationStates.push(
    {
      clip: 'CatIdle',
      playing: true,
      loop: true,
    }
  )

  animationStates.push(
    {
      clip: 'BarbersPoleRotating1',
      playing: true,
      loop: true,
    }
  )

  animationStates.push(
    {
      clip: 'BarbersPoleRotating2',
      playing: true,
      loop: true,
    }
  )

  animationStates.push(
    {
      clip: 'BarbersPoleRotating3',
      playing: true,
      loop: true,
    }
  )

  animationStates.push(
    {
      clip: 'BarbersPoleRotating4',
      playing: true,
      loop: true,
    }
  )

  Animator.create(ambient, {
    states: animationStates
  })
}

function createMachine() {
  let pivot = engine.addEntity()
  let machine = engine.addEntity()
  let scale = 0.3

  Transform.create(pivot, {
    // position: Vector3.create(26, 0.2, 38),
    position: Vector3.create(31, 0.2, 38),
    rotation: Quaternion.fromEulerDegrees(0, -90, 0),
  })

  GltfContainer.create(machine, {
    src: 'models/machineBase.gltf',
  })

  Transform.create(machine, {
    // position: Vector3.create(24.5, 0.2, 42),
    position: Vector3.create(0, 0, 0),
    scale: Vector3.create(scale, scale, scale),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    parent: pivot,
  })
}

function createMushroomGirl() {
  let lookAt = function (entity: Entity, target: ReadOnlyVector3) {
    const transform = Transform.getMutable(entity)
    const difference = Vector3.subtract(target, transform.position)
    const normalizedDifference = Vector3.normalize(difference)
    transform.rotation = Quaternion.lookRotation(normalizedDifference)
  }

  let dialog: Dialog[] = [
    {
      text: "Care to guess how many green mushrooms are in this pile? Just figure out how to use the machine next to me. The machine will tell you if you guessed it below or above the correct number. The chest will open if you guess it right. Keep at it!",
      portrait: { 
        path: 'images/mushroomGirl.jpg',
        height: 180, 
        width: 180,
        offsetX: 70,
        offsetY: 10,
      },
      isEndOfDialog: true,
    },
  ]
  let scale = 0.3
  let mushroomGirl = npc.create(
		{
			position: Vector3.create(25.5, 0.2, 32),
			rotation: Quaternion.Zero(),
			scale: Vector3.create(scale, scale, scale),
		},
		//NPC Data Object
		{
			type: npc.NPCType.CUSTOM,
			model: 'models/mushroomGirl.glb',
      onlyClickTrigger: true,
			onActivate: () => {
        let playerPosition = Transform.get(engine.PlayerEntity).position

        lookAt(mushroomGirl, playerPosition)
        npc.talk(mushroomGirl, dialog, 0)
			},
		}
	)
}

export function main() {
  // Defining behavior. See `src/systems.ts` file.
  // engine.addSystem(circularSystem)
  // engine.addSystem(changeColorSystem)

  // draw UI. Here is the logic to spawn cubes.
  // setupUi()

  new GuessingMachine(Vector3.create(31, 0.2, 38))

  setupUi()
  createFloor()
  createFog()
  createAmbient()
  // createMachine()
  createMushroomGirl()
}
