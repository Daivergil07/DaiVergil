const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 520
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))
}

const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, 70 + i))
}

const charactersMap = []
for (let i = 0; i < charactersMapData.length; i += 70) {
  charactersMap.push(charactersMapData.slice(i, 70 + i))
}
console.log(charactersMap)

const boundaries = []
const offset = {
  x: -735,
  y: -650
}

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})

const battleZones = []

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})

const characters = []
const villagerImg = new Image()
villagerImg.src = './img/villager/Idle.png'

const oldManImg = new Image()
oldManImg.src = './img/oldMan/Idle.png'

charactersMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
 // 1026 === villager (Prabowo)
if (symbol === 1026) {
  characters.push(
    new Character({
      position: {
        x: j * Boundary.width + offset.x,
        y: i * Boundary.height + offset.y
      },
      image: villagerImg,
      frames: {
        max: 4,
        hold: 60
      },
      scale: 3,
      animate: true,
      dialogue: [
        'Prabowo: "Ayo! Jangan biarkan mereka merusak desa ini!"',
        'Prabowo: "Aku sudah mencari Faiz, tapi dia belum juga kembali... Mungkin kamu bisa membantuku?"',
        'Prabowo: "Aku tahu kamu bisa menghadapinya, kami butuh bantuanmu sekarang!"'
      ]
    })
  );
}

// 1024 === Mas Anis with interaction sound
else if (symbol === 1024) {
  characters.push(
    new Character({
      position: {
        x: j * Boundary.width + offset.x,
        y: i * Boundary.height + offset.y
      },
      image: villagerImg,
      frames: {
        max: 4,
        hold: 60
      },
      scale: 3,
      animate: true,
      dialogue: [
        'Mas Anis: "Ayo, kita tak boleh kalah! Semua harapan ada di tanganmu sekarang!"',
        'Mas Anis: "Tunjukkan pada mereka siapa yang lebih kuat! Hajar mereka dengan semangatmu!"',
        'Mas Anis: "Ingat, setiap kemenangan kita adalah langkah besar menuju kejayaan! Jangan ragu!"'
      ],
      onInteract: () => {
        console.log('Interaksi dengan Mas Anis dimulai');

        try {
          if (interactSound) { // Pastikan interactSound terdefinisi
            interactSound.stop(); // hentikan jika sedang bermain
            interactSound.play().then(() => {
              console.log('Audio diputar');
            }).catch(error => {
              console.error('Gagal memutar audio:', error);
            });
          } else {
            console.error('Audio interactSound tidak ditemukan!');
          }
        } catch (error) {
          console.error('Error saat memutar audio:', error);
        }
      }
    })
  );
}

// 1035 === Faiz (old man)
else if (symbol === 1035) {
  characters.push(
    new Character({
      position: {
        x: j * Boundary.width + offset.x,
        y: i * Boundary.height + offset.y
      },
      image: oldManImg,
      frames: {
        max: 4,
        hold: 60
      },
      scale: 3,
      dialogue: [
        'Faiz: "Ingatlah Wahai Anak Muda, jalanmu tidak akan mudah..."',
        'Faiz: "Kunci kemenangan ada di Jawa, kuharapkan kamu mampu menemukannya!"',
        'Faiz: "Jangan lupakan kata-kataku, karena keputusanmu akan menentukan masa depan!"'
      ]
    })
  );
}

// 1043 === Vergiil (old man with message)
else if (symbol === 1043) {
  characters.push(
    new Character({
      position: {
        x: j * Boundary.width + offset.x,
        y: i * Boundary.height + offset.y
      },
      image: oldManImg,
      frames: {
        max: 4,
        hold: 60
      },
      scale: 3,
      dialogue: [
        'Vergiil: "Fitur ini masih terkunci, kamu harus menunggu sedikit lebih lama..."',
        'Vergiil: "Ada banyak misteri yang menunggu untuk diungkap. Bersabarlah!"',
        'Vergiil: "Fitur ini sedang dalam pembaruan. Jangan khawatir, semuanya akan siap tidak lama lagi!"'
      ]
    })
  );
}


    // Add boundaries for non-zero symbol values
    if (symbol !== 0) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      );
    }
  });
});



const image = new Image()
image.src = './img/Pellet Town.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png'

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 10
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  }
})

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
})

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
  space: { pressed: false } // Tambahkan ini
}


const movables = [
  background,
  ...boundaries,
  foreground,
  ...battleZones,
  ...characters
]
const renderables = [
  background,
  ...boundaries,
  ...battleZones,
  ...characters,
  player,
  foreground
]

const battle = {
  initiated: false
}

function animate() {
  const animationId = window.requestAnimationFrame(animate)
  renderables.forEach((renderable) => {
    renderable.draw()
  })

  let moving = true
  player.animate = false

  if (battle.initiated) return

  // activate a battle
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i]
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y))
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.01
      ) {
        // deactivate current animation loop
        window.cancelAnimationFrame(animationId)

        audio.Map.stop()
        audio.initBattle.play()
        audio.battle.play()

        battle.initiated = true
        gsap.to('#overlappingDiv', {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to('#overlappingDiv', {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                // activate a new animation loop
                initBattle()
                animateBattle()
                gsap.to('#overlappingDiv', {
                  opacity: 0,
                  duration: 0.4
                })
              }
            })
          }
        })
        break
      }
    }
  }

  if (keys.w.pressed && lastKey === 'w') {
    player.animate = true
    player.image = player.sprites.up

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: 3 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3
      })
  } else if (keys.a.pressed && lastKey === 'a') {
    player.animate = true
    player.image = player.sprites.left

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 3, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3
      })
  } else if (keys.s.pressed && lastKey === 's') {
    player.animate = true
    player.image = player.sprites.down

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: -3 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3
      })
  } else if (keys.d.pressed && lastKey === 'd') {
    player.animate = true
    player.image = player.sprites.right

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: -3, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3
      })
  }
}
// animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
  if (player.isInteracting) {
    switch (e.key) {
      case ' ':
        player.interactionAsset.dialogueIndex++

        const { dialogueIndex, dialogue } = player.interactionAsset
        if (dialogueIndex <= dialogue.length - 1) {
          document.querySelector('#characterDialogueBox').innerHTML =
            player.interactionAsset.dialogue[dialogueIndex]
          return
        }

        // finish conversation
        player.isInteracting = false
        player.interactionAsset.dialogueIndex = 0
        document.querySelector('#characterDialogueBox').style.display = 'none'

        break
    }
    return
  }

  switch (e.key) {
case ' ':
  if (!player.interactionAsset) return

  // beginning the conversation
  const firstMessage = player.interactionAsset.dialogue[0]
  document.querySelector('#characterDialogueBox').innerHTML = firstMessage
  document.querySelector('#characterDialogueBox').style.display = 'flex'
  player.isInteracting = true

  // PANGGIL onInteract jika ada
  if (typeof player.interactionAsset.onInteract === 'function') {
    player.interactionAsset.onInteract()
  }
  break

    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break

    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break

    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
  }
})

// Menambahkan event listener untuk tombol sentuhan
// Menambahkan event listener untuk tombol sentuhan
const upButton = document.getElementById('up');
const leftButton = document.getElementById('left');
const downButton = document.getElementById('down');
const rightButton = document.getElementById('right');

// Fungsi reset tombol
const resetKeys = (key) => {
  switch (key) {
    case 'w':
      keys.w.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 's':
      keys.s.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
};

// Tombol virtual untuk tekan
upButton.addEventListener('touchstart', (e) => {
  e.preventDefault();
  keys.w.pressed = true;
  lastKey = 'w';
});
leftButton.addEventListener('touchstart', (e) => {
  e.preventDefault();
  keys.a.pressed = true;
  lastKey = 'a';
});
downButton.addEventListener('touchstart', (e) => {
  e.preventDefault();
  keys.s.pressed = true;
  lastKey = 's';
});
rightButton.addEventListener('touchstart', (e) => {
  e.preventDefault();
  keys.d.pressed = true;
  lastKey = 'd';
});

// Tombol virtual untuk lepas
upButton.addEventListener('touchend', () => resetKeys('w'));
leftButton.addEventListener('touchend', () => resetKeys('a'));
downButton.addEventListener('touchend', () => resetKeys('s'));
rightButton.addEventListener('touchend', () => resetKeys('d'));

// Event tombol interaksi sentuhan
window.addEventListener('load', () => {
  const interactBtn = document.getElementById('interact-button')
  interactBtn.addEventListener('click', () => {
    keys.space.pressed = true
    setTimeout(() => {
      keys.space.pressed = false
    }, 100)
  })
})

// Memastikan musik mulai saat layar disentuh
let clicked = false
addEventListener('click', () => {
  if (!clicked) {
    audio.Map.play()
    clicked = true
  }
})

